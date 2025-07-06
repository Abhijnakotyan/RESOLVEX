from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from datetime import datetime
from app.utils.PyObjectId import PyObjectId

class Complaint(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    
    name: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    category: Optional[str] = None
    subject: str
    description: str
    urgency: str
    anonymous: bool = False
    user_id: Optional[PyObjectId] = None  # ✅ Optional for anonymous complaints
    tracking_token: Optional[str] = None
    status: str = "Pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat()
        }
