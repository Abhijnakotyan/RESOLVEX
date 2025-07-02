from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ComplaintCreate(BaseModel):
    name: Optional[str]
    role: Optional[str]
    department: str
    subDepartment: Optional[str]
    subject: str
    description: str
    urgency: str
    anonymous: bool

class ComplaintOut(BaseModel):
    id: str  # This maps Mongo _id to "id"
    name: Optional[str]
    role: Optional[str]
    department_id: Optional[str]
    department: Optional[str]
    sub_department: Optional[str]
    subject: Optional[str]
    description: Optional[str]
    urgency: Optional[str]
    anonymous: Optional[bool]
    status: Optional[str]
    user_id: Optional[str]
    tracking_token: Optional[str]
    created_at: datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True