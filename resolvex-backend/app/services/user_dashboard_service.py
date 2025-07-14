from bson import ObjectId
from app.database.mongodb import db

async def get_user_dashboard_stats(current_user):
    user_id = ObjectId(current_user["id"])  # ✅ Ensure correct type

    total = await db.complaints.count_documents({"user_id": user_id})
    
    open_count = await db.complaints.count_documents({
        "user_id": user_id,
        "status": {"$in": ["Pending", "In Progress"]}  # ✅ open = pending + in progress
    })
    
    resolved = await db.complaints.count_documents({
        "user_id": user_id,
        "status": "Resolved"
    })
    
    rejected = await db.complaints.count_documents({
        "user_id": user_id,
        "status": "Rejected"
    })

    return {
        "total": total,
        "open": open_count,
        "resolved": resolved,
        "rejected": rejected  # ✅ include this
    }
