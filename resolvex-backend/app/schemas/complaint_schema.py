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
  


class ComplaintResponse(ComplaintCreate):
    id: Optional[str]
    status: Optional[str] = "Pending"
    tracking_token:Optional[str]

    class Config:
        from_attributes = True
