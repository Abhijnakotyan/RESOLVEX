from pydantic import BaseModel
from typing import Optional

class ComplaintCreate(BaseModel):
    name: Optional[str]
    role: Optional[str]
    department: str
    subDepartment: Optional[str]
    subject: str
    description: str
    urgency: str
    anonymous: bool
