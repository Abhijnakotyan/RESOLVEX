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
    current_user:Optional[dict] = Depends(get_current_user)
):
    complaint_data = complaint.dict()
     if complaint.anonymous:
        # Don't attach user_id
        token = str(uuid4())  # Unique token for anonymous complaint
        complaint_data["tracking_token"] = token
    else:
        complaint_data["user_id"] = current_user["_id"]  # Attach user ID

    complaint_id = await create_complaint(complaint_data)

    response = {"message": "Complaint submitted", "id": complaint_id}
    if complaint.anonymous:
        response["tracking_token"] = complaint_data["tracking_token"]

    return response
@router.get("/user")
async def fetch_complaints_by_user(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    complaints = await get_complaints_by_user(user_id)
    return complaints

@router.get("/token/{token}")
async def get_complaint_by_token(token: str):
    complaint = await db.complaints.find_one({"tracking_token": token})

    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    # Optional: customize which fields to return
    return {
        "subject": complaint.get("subject"),
        "description": complaint.get("description"),
        "status": complaint.get("status", "Pending"),
        "timestamp": complaint.get("timestamp"),
        "urgency": complaint.get("urgency"),
        "department": complaint.get("department"),
        "sub_department": complaint.get("sub_department", None)
    }

