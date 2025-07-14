from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class FeedbackType(str, Enum):
    complaint = "complaint"
    department = "department"

class FeedbackSchema(BaseModel):
    feedback_type: FeedbackType
    rating: int = Field(ge=1, le=5)
    comment: Optional[str] = ""
    complaint_id: Optional[str] = None
    department_name: Optional[str] = None
    category: Optional[str] = None
