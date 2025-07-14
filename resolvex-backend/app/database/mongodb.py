from motor.motor_asyncio import AsyncIOMotorClient,AsyncIOMotorDatabase

MONGO_URI = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URI)
db = client["resolvex_db"]
complaints_collection = db["complaints"]

def get_db() -> AsyncIOMotorDatabase:
    return db
