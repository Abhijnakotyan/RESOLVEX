from fastapi import APIRouter, Depends, HTTPException, status
from app.services.complaint_service import get_user_complaints_by_id
from app.services.auth_service import get_current_user
from app.models.user_model import User

router = APIRouter()

@router.get("/user/complaints/{user_id}")
def get_user_complaints(user_id: str, current_user: User = Depends(get_current_user)):
    if current_user.id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own complaints."
        )
    return get_user_complaints_by_id(user_id)
