from fastapi import APIRouter, HTTPException
from app.database.mongodb import db
from datetime import datetime
from app.schemas.alert import AlertRequest  # ✅ Import the schema

router = APIRouter(prefix="/admin", tags=["Admin Alerts"])

@router.post("/alerts/send")
async def send_alert_to_department(alert: AlertRequest):
    print("Received alert:", alert.dict())
    alert_doc = {
        "complaint_id": alert.complaint_id,
        "department_name": alert.department_name,
        "message": alert.message,
        "timestamp": datetime.utcnow(),
        "read": False
    }
    result = await db["department_alerts"].insert_one(alert_doc)

    if result.inserted_id:
        return {"message": "Alert sent successfully", "alert_id": str(result.inserted_id)}
    else:
        raise HTTPException(status_code=500, detail="Failed to send alert")
