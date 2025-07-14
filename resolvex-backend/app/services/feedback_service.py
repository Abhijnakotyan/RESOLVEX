# app/services/feedback_service.py

from datetime import datetime
from app.database.mongodb import db
from bson.objectid import ObjectId
from app.models.feedback import feedback_model

async def submit_feedback(data: dict):
    data["created_at"] = datetime.utcnow()
    
    # ✅ Await the insert
    result = await db.feedback.insert_one(data)

    # ✅ Await the find_one
    saved_feedback = await db.feedback.find_one({"_id": result.inserted_id})

    return feedback_model(saved_feedback)
