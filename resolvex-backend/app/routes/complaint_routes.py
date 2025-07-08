from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from typing import List
from app.utils.serializer import serialize_doc
from app.schemas.complaint_schema import ComplaintCreate, ComplaintOut
from app.services import complaint_service
from app.services.auth_service import get_current_user
from app.services.complaint_service import get_complaints_by_user
from app.database.mongodb import db
from app.models.complaint_model import Complaint

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])

complaints_collection = db["complaints"]


@router.post("/")
async def submit_complaint(data: ComplaintCreate, user=Depends(get_current_user)):
    return await complaint_service.create_complaint(data, user)


@router.get("/track/{token}")
async def track_complaint(token: str):
    complaints = await complaints_collection.find({"tracking_token": token}).to_list(length=100)
    
    if not complaints:
        raise HTTPException(status_code=404, detail="No complaints found for this token")

    return JSONResponse(content=jsonable_encoder(complaints))


@router.get("/my", response_model=List[ComplaintOut])
async def my_complaints(user=Depends(get_current_user)):
    if not user:
        raise HTTPException(status_code=401, detail="Login required")

    try:
        complaints = await get_complaints_by_user(user["_id"])
        return complaints
    except Exception as e:
        print("❌ Error in /my route:", e)
        raise HTTPException(status_code=500, detail="Server Error")


@router.get("/department/{department_id}")
async def get_complaints_by_department(department_id: str):
    try:
        if not ObjectId.is_valid(department_id):
            raise HTTPException(status_code=400, detail="Invalid department_id")

        department_obj_id = ObjectId(department_id)

        complaints = await complaints_collection.find({
            "department_id": department_obj_id
        }).to_list(100)

        serialized_complaints = [serialize_doc(c) for c in complaints]
        return JSONResponse(content=serialized_complaints)

    except Exception as e:
        print("❌ Error in get_complaints_by_department:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/unresolved", response_model=List[Complaint])
async def get_unresolved_complaints(department_id: str = Query(...)):
    if not ObjectId.is_valid(department_id):
        raise HTTPException(status_code=400, detail="Invalid department_id")

    dept_obj_id = ObjectId(department_id)

    complaints = await complaints_collection.find({
        "$or": [
            {"department_id": dept_obj_id},
            {"department_id": department_id}
        ],
        "status": {"$in": ["Pending", "In Progress"]}
    }).to_list(length=100)

    valid_complaints = []
    for c in complaints:
        try:
            c.setdefault("department", None)
            c.setdefault("tracking_token", None)
            c.setdefault("sub_department", None)
            complaint_model = Complaint(**c)
            valid_complaints.append(complaint_model)
        except Exception as e:
            print(f"⚠️ Skipping invalid complaint {c.get('_id')}: {e}")

    return valid_complaints


@router.get("/resolved", response_model=List[Complaint])
async def get_resolved_complaints(department_id: str = Query(...)):
    if not ObjectId.is_valid(department_id):
        raise HTTPException(status_code=400, detail="Invalid department_id")

    dept_obj_id = ObjectId(department_id)

    complaints = await complaints_collection.find({
        "status": "Resolved",
        "department_id": dept_obj_id
    }).to_list(length=100)

    valid_complaints = []
    for c in complaints:
        try:
            c.setdefault("department", None)
            c.setdefault("tracking_token", None)
            c.setdefault("sub_department", None)
            complaint_model = Complaint(**c)
            valid_complaints.append(complaint_model)
        except Exception as e:
            print(f"⚠️ Skipping invalid complaint {c.get('_id')}: {e}")

    return valid_complaints


@router.get("/rejected")
async def get_rejected_complaints(department_id: str = Query(...)):
    if not ObjectId.is_valid(department_id):
        raise HTTPException(status_code=400, detail="Invalid department_id")

    complaints = await complaints_collection.find({
        "status": "Rejected",
        "department_id": ObjectId(department_id)
    }).to_list(length=100)

    return JSONResponse(content=jsonable_encoder(complaints))


@router.patch("/{complaint_id}/resolve")
async def resolve_complaint(complaint_id: str):
    result = await complaints_collection.update_one(
        {"_id": ObjectId(complaint_id)},
        {"$set": {"status": "Resolved"}}
    )
    if result.modified_count == 1:
        return {"message": "Complaint marked as resolved"}
    raise HTTPException(status_code=404, detail="Complaint not found")


@router.patch("/{complaint_id}/progress")
async def mark_complaint_in_progress(complaint_id: str):
    if not ObjectId.is_valid(complaint_id):
        raise HTTPException(status_code=400, detail="Invalid complaint ID")
    
    result = await complaints_collection.update_one(
        {"_id": ObjectId(complaint_id)},
        {"$set": {"status": "In Progress"}}
    )
    if result.modified_count == 1:
        return {"message": "Complaint marked as In Progress"}
    raise HTTPException(status_code=404, detail="Complaint not found")


@router.patch("/{complaint_id}/reject")
async def reject_complaint(complaint_id: str):
    result = await complaints_collection.update_one(
        {"_id": ObjectId(complaint_id)},
        {"$set": {"status": "Rejected"}}
    )
    if result.modified_count == 1:
        return {"message": "Complaint rejected"}
    raise HTTPException(status_code=404, detail="Complaint not found")
