from pydantic import BaseModel
from typing import Optional

class ComplaintCreate(BaseModel):
    department: str
    sub_department: str
    subject: str
    description: str
    urgency: str
    anonymous: bool
    name: str | None = None
    role: str | None = None
    user_id: Optional[str] = None 


class ComplaintResponse(ComplaintCreate):
    id: Optional[str]
    status: Optional[str] = "Pending"

    class Config:
        from_attributes = True
