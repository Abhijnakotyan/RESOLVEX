from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Complaint(BaseModel):
    name: Optional[str]
    role: Optional[str]
    department: str
    sub_department: Optional[str]
    subject: str
    description: str
    urgency: str
    anonymous: bool
    user_id: Optional[str]  # For logged-in users
    tracking_token: Optional[str]
    status: str = "Pending"
    created_at: datetime = datetime.utcnow()
