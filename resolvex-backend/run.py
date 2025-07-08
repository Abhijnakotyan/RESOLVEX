from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from app.main import app

MONGO_URI = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URI)
db = client["resolvex_db"]

# Attach db to app so routes can access it
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = client
    app.database = db
    print("✅ MongoDB connected")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    print("❌ MongoDB disconnected")
