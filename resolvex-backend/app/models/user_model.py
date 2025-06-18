from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    id: Optional[str] = None  # MongoDB _id field
    username: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"