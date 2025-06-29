from fastapi import APIRouter, Depends, HTTPException
from app.schemas.complaint_schema import ComplaintCreate
from app.services import complaint_service
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/complaints", tags=["Complaints"])

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
@router.get("/my")
async def my_complaints(user=Depends(get_current_user)):
    if not user:
        print("❌ No user returned from get_current_user")
        raise HTTPException(status_code=401, detail="Login required")
    
    print("✅ Logged-in user:", user)
    print("🧩 user['_id'] (type):", user["_id"], type(user["_id"]))

    from app.services.complaint_service import get_complaints_by_user
    return await get_complaints_by_user(user["_id"])
