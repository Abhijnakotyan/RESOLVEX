from pydantic import BaseModel
from typing import Optional

class ComplaintCreate(BaseModel):
    department: str
    content: str
    anonymous: bool = False

class AnonymousTrack(BaseModel):
    token: str