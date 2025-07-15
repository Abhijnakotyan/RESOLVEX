from app.database.mongodb import db
from app.utils.token_utils import generate_tracking_token
from app.schemas.complaint_schema import ComplaintOut
from datetime import datetime
from bson import ObjectId

async def create_complaint(data, user=None):
    department = await db.departments.find_one({"department_name": data.department})
    if not department:
        raise Exception("❌ Department not found")

    complaint = {
        "name": data.name if not data.anonymous else None,
        "role": data.role if not data.anonymous else None,
        "department_id": department["_id"],  
        "department_name": department["department_name"],  # ✅ Add this line
        "category": data.category,
        "subject": data.subject,
        "description": data.description,
        "urgency": data.urgency,
        "anonymous": data.anonymous,
        "status": "Pending",
        "created_at": datetime.utcnow(),
    }

    if user and not data.anonymous:
        complaint["user_id"] = ObjectId(user["id"])



    if data.anonymous:
        complaint["tracking_token"] = generate_tracking_token()

    result = await db.complaints.insert_one(complaint)
    return {
        "message": "Complaint submitted",
        "id": str(result.inserted_id),
        "tracking_token": complaint.get("tracking_token")
    }

async def get_complaint_by_token(token):
    return await db.complaints.find_one({"tracking_token": token})

async def get_complaints_by_user(user_id):
    if isinstance(user_id, str):
        user_id = ObjectId(user_id)

    complaints = await db.complaints.find({
        "user_id": user_id,
        "anonymous": False
    }).to_list(length=100)

    results = []
    for c in complaints:
        department = await db.departments.find_one({"_id": c.get("department_id")})
        department_name = department["department_name"] if department else "Unknown"

        results.append(ComplaintOut(
            id=str(c["_id"]),
            name=c.get("name"),
            role=c.get("role"),
            department_id=str(c.get("department_id", "")),
            category=c.get("category", ""),
            subject=c.get("subject", ""),
            description=c.get("description", ""),
            urgency=c.get("urgency", ""),
            anonymous=c.get("anonymous", False),
            status=c.get("status", "Pending"),
            user_id=str(c.get("user_id", "")),
            tracking_token=c.get("tracking_token", ""),
            created_at=c.get("created_at"),
            department=department_name
        ))

    return results
