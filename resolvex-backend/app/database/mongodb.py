from motor.motor_asyncio import AsyncIOMotorClient
from app.config import MONGO_URI

client = AsyncIOMotorClient(MONGO_URI)
db = client["resolvex_db"]

users_collection = db["users"]
complaints_collection = db["complaints"]
departments_collection = db["departments"]
feedback_collection = db["feedback"]
notifications_collection = db["admin_notifications"]
