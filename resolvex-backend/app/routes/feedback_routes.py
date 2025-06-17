from fastapi import APIRouter
from app.schemas.feedback_schema import Feedback
from app.services.feedback_service import save_feedback

router = APIRouter()

@router.post("/feedback")
def give_feedback(data: Feedback):
    return save_feedback(data)
