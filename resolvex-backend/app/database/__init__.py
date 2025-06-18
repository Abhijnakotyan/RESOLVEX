from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)

db = client["resolvex_db"]  # <-- this must exist and match your import

print("Connected to MongoDB:", db)

def get_db():
    return db
