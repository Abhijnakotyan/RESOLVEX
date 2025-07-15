from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import MONGODB_URL  # import the correct URL from config

client = AsyncIOMotorClient(MONGODB_URL)
db = client["resolvex"]  # Use the name of your Atlas DB
complaints_collection = db["complaints"]

def get_db() -> AsyncIOMotorDatabase:
    return db
