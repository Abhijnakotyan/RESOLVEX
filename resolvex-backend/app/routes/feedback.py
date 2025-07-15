from fastapi import APIRouter, Depends, HTTPException
from app.schemas.feedback import FeedbackSchema
from app.services.feedback_service import submit_feedback
from app.services.auth_service import get_current_user
from app.database.mongodb import db
from app.models.feedback import feedback_model
from bson import ObjectId

router = APIRouter(prefix="/feedback", tags=["Feedback"])

@router.post("/")
async def create_feedback(
    feedback: FeedbackSchema,
    user: dict = Depends(get_current_user)
):
    feedback_data = feedback.dict()
    feedback_data["user_id"] = ObjectId(user["id"])
    result = await submit_feedback(feedback_data)
    return result

@router.get("/my")
async def get_my_feedback(user: dict = Depends(get_current_user)):
    feedback_cursor = db.feedback.find({"user_id": ObjectId(user["id"])})
    feedback_list = []
    async for feedback in feedback_cursor:
        feedback_list.append(feedback_model(feedback))

    return feedback_list
