from fastapi import APIRouter, HTTPException, Depends
from app.schemas.complaint_schema import ComplaintCreate, ComplaintResponse
from typing import List
from app.models.complaint_model import create_complaint, get_complaints_by_user
from app.services.auth_service import get_current_user

router = APIRouter(
    prefix="/api/complaints",
    tags=["Complaints"]
)

@router.post("/", response_model=ComplaintResponse)
async def submit_complaint(
    complaint: ComplaintCreate,
    current_user: dict = Depends(get_current_user)
):
    complaint_data = complaint.dict()
    complaint_data["user_id"] = current_user["_id"]  # Attach user to complaint
    complaint_id = await create_complaint(complaint_data)
    return {"message": "Complaint submitted", "id": complaint_id}


@router.get("/user")
async def fetch_complaints_by_user(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    complaints = await get_complaints_by_user(user_id)
    return complaints
