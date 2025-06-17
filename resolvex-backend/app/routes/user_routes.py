from fastapi import APIRouter
from app.services.complaint_service import get_user_complaints_by_id, get_complaints_by_token
from app.schemas.complaint_schema import AnonymousTrack

router = APIRouter()

@router.get("/user/complaints/{user_id}")
def get_user_complaints(user_id: str):
    return get_user_complaints_by_id(user_id)

@router.post("/anonymous/track")
def track_anonymous(data: AnonymousTrack):
    return get_complaints_by_token(data.token)