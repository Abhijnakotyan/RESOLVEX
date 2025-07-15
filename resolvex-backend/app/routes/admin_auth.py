from fastapi import APIRouter, HTTPException,Depends
from app.schemas.admin import AdminLogin,OTPVerify
from app.utils.auth import verify_password
from app.utils.otp import generate_otp
from app.utils.email import send_otp_email
from app.utils.otp import verify_otp
from bson import ObjectId
from app.utils.jwt_utils import create_access_token
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson.son import SON
from app.utils.serializer import serialize_doc
from app.database.mongodb import db, get_db,complaints_collection
from app.models.feedback import feedback_model
from app.ml.severity import compute_severity
  # ✅ importing db directly

router = APIRouter(prefix="/admin", tags=["Admin Auth"])

@router.post("/login")
async def login_admin(login_data: AdminLogin):
    print(f"Login attempt: {login_data.email} | {login_data.password}")
    
    admin = await db["admin"].find_one({"email": login_data.email})
    print("Admin found:", admin)

    if not admin:
        raise HTTPException(status_code=401, detail="Admin not found")

    if not verify_password(login_data.password, admin["hashed_password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    otp = generate_otp(login_data.email)
    await send_otp_email(login_data.email, otp)
    return {"message": "OTP sent to admin email"}

@router.post("/verify-otp")
async def verify_admin_otp(data: OTPVerify):
    if verify_otp(data.email, data.otp):
        token = create_access_token({"sub": data.email})
        return {"access_token": token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid or expired OTP")



@router.get("/complaints/count-by-department")
async def get_complaint_counts():
    # Fetch all departments
    departments_cursor = db["departments"].find({})
    departments = await departments_cursor.to_list(length=None)

    # Get complaint counts per department
    pipeline = [
        {"$group": {"_id": "$department_name", "count": {"$sum": 1}}},
        {"$sort": SON([("count", -1)])}
    ]
    complaint_counts = await db["complaints"].aggregate(pipeline).to_list(length=None)

    # Convert to dict for easy lookup
    complaint_dict = {item["_id"]: item["count"] for item in complaint_counts}

    # Merge counts with all departments
    result = []
    total = 0
    for dept in departments:
        name = dept.get("name") or dept.get("department_name")
        count = complaint_dict.get(name, 0)
        result.append({"department": name, "count": count})
        total += count

    return {
        "total": total,
        "by_department": result
    }

@router.get("/complaints/department/{department}")
async def get_complaints_by_department(department: str):
    complaints = complaints_collection.find({
        "$or": [
            {"department": {"$regex": department, "$options": "i"}},
            {"department_name": {"$regex": department, "$options": "i"}}
        ]
    })
    result = [serialize_doc(c) async for c in complaints]
    return result

@router.get("/feedbacks", tags=["Admin"])
async def get_all_feedbacks():
    feedbacks_cursor = db["feedback"].find()
    feedbacks = await feedbacks_cursor.to_list(length=None)
    return [feedback_model(fb) for fb in feedbacks]

@router.get("/complaints/{complaint_id}")
async def get_complaint_by_id(complaint_id: str):
    try:
        complaint = await db["complaints"].find_one({"_id": ObjectId(complaint_id)})
        if not complaint:
            raise HTTPException(status_code=404, detail="Complaint not found")
        return serialize_doc(complaint)
    except Exception as e:
        print("Error fetching complaint:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/unresolved-alerts")
async def get_unresolved_alerts():
    complaints_cursor = db["complaints"].find({"status": {"$ne": "Resolved"}})
    complaints = [serialize_doc(c) async for c in complaints_cursor]

    enriched = []
    for c in complaints:
        meta = compute_severity(c)
        c.update(meta)
        enriched.append(c)

    # Sort by severity descending
    enriched.sort(key=lambda x: x["severity_score"], reverse=True)
    return enriched