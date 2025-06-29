from app.database.mongodb import db
from app.utils.token_utils import generate_tracking_token
from datetime import datetime
from bson import ObjectId

async def create_complaint(data, user=None):
    complaint = {
        "name": data.name if not data.anonymous else None,
        "role": data.role if not data.anonymous else None,
        "department": data.department,
        "sub_department": data.subDepartment,
        "subject": data.subject,
        "description": data.description,
        "urgency": data.urgency,
        "anonymous": data.anonymous,
        "status": "Pending",
        "created_at": datetime.utcnow(),
    }

    if user:
        print("📌 Saving complaint for user ID:", user["_id"], type(user["_id"]))
        complaint["user_id"] = ObjectId(user["_id"])  

    if data.anonymous:
        complaint["tracking_token"] = generate_tracking_token()

    result = await db.complaints.insert_one(complaint)
    return {
        "message": "Complaint submitted",
        "id": str(result.inserted_id),
        "tracking_token": complaint.get("tracking_token")
    }

async def get_complaint_by_token(token):
    return await db.complaints.find_one({"tracking_token": token})

# async def get_complaints_by_user(user_id):
#     complaints = await db.complaints.find({"user_id": ObjectId(user_id)}).to_list(length=100)
#     for c in complaints:
#         c["_id"] = str(c["_id"])
#     return complaints
async def get_complaints_by_user(user_id):
    print("🔍 Querying complaints for user_id:", user_id, type(user_id))

    complaints = await db.complaints.find({
        "user_id": ObjectId(user_id)
    }).to_list(length=100)

    print(f"📦 Found {len(complaints)} complaints")

    for c in complaints:
        c["_id"] = str(c["_id"])
        c["user_id"] = str(c["user_id"])  # 👈 ADD THIS LINE

    return complaints


