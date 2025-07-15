from datetime import datetime
from app.database.mongodb import db
from bson.objectid import ObjectId
from app.models.feedback import feedback_model

async def submit_feedback(data: dict):
    data["created_at"] = datetime.utcnow()
    result = await db.feedback.insert_one(data)
    saved_feedback = await db.feedback.find_one({"_id": result.inserted_id})
    return feedback_model(saved_feedback)
