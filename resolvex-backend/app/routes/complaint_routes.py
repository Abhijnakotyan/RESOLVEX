from fastapi import APIRouter, Depends, HTTPException,Query
from app.schemas.complaint_schema import ComplaintCreate
from app.services import complaint_service
from app.services.auth_service import get_current_user
from app.database.mongodb import db
from bson import ObjectId
from typing import List
from app.models.complaint_model import Complaint
from app.schemas.complaint_schema import ComplaintOut
from app.services.complaint_service import get_complaints_by_user

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])

complaints_collection = db["complaints"]


@router.post("/")
async def submit_complaint(data: ComplaintCreate, user=Depends(get_current_user)):
    return await complaint_service.create_complaint(data, user)

@router.get("/track/{token}")
async def track_complaint(token: str):
    complaint = await complaint_service.get_complaint_by_token(token)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return {
        "subject": complaint["subject"],
        "status": complaint["status"],
        "department": complaint["department"],
        "submitted_on": complaint["created_at"]
    }

# @router.get("/my")
# async def my_complaints(user=Depends(get_current_user)):
#     if not user:
#         raise HTTPException(status_code=401, detail="Login required")
#     return await complaint_service.get_complaints_by_user(user["_id"])
@router.get("/my",response_model=List[ComplaintOut])
async def my_complaints(user=Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail="Login required")

    try:
        return await get_complaints_by_user(user["_id"])
    except Exception as e:
        print("❌ Error in /my route:", e)
        raise HTTPException(status_code=500, detail="Server Error")


@router.get("/department/{department_id}")
async def get_complaints_by_department(department_id: str):
    try:
        if not ObjectId.is_valid(department_id):
            raise HTTPException(status_code=400, detail="Invalid department_id")

        department_obj_id = ObjectId(department_id)

        # Fetch complaints
        complaints = await db.complaints.find({
            "department_id": department_obj_id
        }).to_list(100)

        # Serialize ObjectId fields
        for c in complaints:
            c["_id"] = str(c["_id"])
            c["department_id"] = str(c.get("department_id", ""))
            c["user_id"] = str(c.get("user_id", ""))

        return complaints

    except Exception as e:
        print("❌ Error in get_complaints_by_department:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
from fastapi import Query

from fastapi.encoders import jsonable_encoder

@router.get("/unresolved", response_model=List[Complaint])
async def get_unresolved_complaints(department_id: str = Query(...)):
    if not ObjectId.is_valid(department_id):
        raise HTTPException(status_code=400, detail="Invalid department_id")

    dept_obj_id = ObjectId(department_id)

    complaints = await complaints_collection.find({
        "status": {"$ne": "Resolved"},
        "department_id": dept_obj_id
    }).to_list(length=100)

    valid_complaints = []
    for c in complaints:
        try:
            complaint_model = Complaint(**c)
            valid_complaints.append(complaint_model)
        except Exception as e:
            print(f"⚠️ Skipping invalid complaint {c.get('_id')}: {e}")

    return valid_complaints

# ✅ Resolve a specific complaint
@router.patch("/{complaint_id}/resolve")
async def resolve_complaint(complaint_id: str):
    result = await complaints_collection.update_one(
        {"_id": ObjectId(complaint_id)},
        {"$set": {"status": "Resolved"}}
    )
    if result.modified_count == 1:
        return {"message": "Complaint marked as resolved"}
    raise HTTPException(status_code=404, detail="Complaint not found")
