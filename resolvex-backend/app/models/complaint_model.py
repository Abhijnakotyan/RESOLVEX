from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Complaint(BaseModel):
    user_id: Optional[str]
    anonymous_token: Optional[str]
    department: str
    content: str
    status: str = "Pending"
    created_at: datetime = datetime.utcnow()
    resolved_at: Optional[datetime] = None