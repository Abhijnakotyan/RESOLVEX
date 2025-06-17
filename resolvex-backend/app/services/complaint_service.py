from app.database.mongodb import complaints_collection
from app.schemas.complaint_schema import ComplaintCreate
from datetime import datetime, timedelta
import uuid


def submit_complaint(data: ComplaintCreate):
    complaint = data.dict()
    complaint["status"] = "Pending"
    complaint["created_at"] = datetime.utcnow()
    if data.anonymous:
        token = str(uuid.uuid4())
        complaint["anonymous_token"] = token
        complaints_collection.insert_one(complaint)
        return {"message": "Anonymous complaint submitted", "track_token": token}
    else:
        complaints_collection.insert_one(complaint)
        return {"message": "Complaint submitted"}


def get_user_complaints_by_id(user_id: str):
    data = list(complaints_collection.find({"user_id": user_id}))
    for d in data:
        d["_id"] = str(d["_id"])
    return data


def get_complaints_by_token(token: str):
    data = list(complaints_collection.find({"anonymous_token": token}))
    for d in data:
        d["_id"] = str(d["_id"])
    return data


def get_department_complaints(dept_name: str):
    data = list(complaints_collection.find({"department": dept_name}))
    for d in data:
        d["_id"] = str(d["_id"])
    return data


def get_all_complaints():
    data = list(complaints_collection.find())
    for d in data:
        d["_id"] = str(d["_id"])
    return data


def get_delayed_complaints():
    threshold = datetime.utcnow() - timedelta(days=7)
    data = list(complaints_collection.find({"status": "Pending", "created_at": {"$lt": threshold}}))
    for d in data:
        d["_id"] = str(d["_id"])
    return data