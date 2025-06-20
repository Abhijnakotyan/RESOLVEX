from pymongo import MongoClient
from datetime import datetime
from app.database.mongodb import db
from bson.objectid import ObjectId 

complaints_collection = db["complaints"]

async def create_complaint(data: dict):
    data["timestamp"] = datetime.utcnow()

    # If anonymous, remove PII
    if "user_id" in data:
        data["user_id"] = str(data["user_id"])

    if data.get("anonymous"):
        data.pop("name", None)
        data.pop("role", None)

    result =await complaints_collection.insert_one(data)
    return str(result.inserted_id)
async def get_complaints_by_user(user_id):
    cursor = db.complaints.find({"user_id": user_id})  # No ObjectId here
    complaints = await cursor.to_list(length=100)
    return complaints




