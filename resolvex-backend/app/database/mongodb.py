from pymongo import MongoClient
from app.config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client["resolvex_db"]

users_collection = db["users"]
complaints_collection = db["complaints"]
departments_collection = db["departments"]
feedback_collection = db["feedback"]
notifications_collection = db["admin_notifications"]
