from pydantic import BaseModel,Field
from typing import Optional
from bson import ObjectId
from datetime import datetime
from app.utils.PyObjectId import PyObjectId

class Complaint(BaseModel):
    id:Optional[PyObjectId]=Field(alias="_id")
    name: Optional[str]
    role: Optional[str]
    department: Optional[str] 
    sub_department: Optional[str]
    subject: str
    description: str
    urgency: str
    anonymous: bool
    user_id: Optional[PyObjectId]  # For logged-in users
    tracking_token: Optional[str]
    status: str = "Pending"
    created_at: datetime = datetime.utcnow()

    class Config:
        allow_population_by_field_name=True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            datetime:lambda dt: dt.isoformat()
        }