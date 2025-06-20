from pydantic import BaseModel,EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username_or_email: str
    password: str

class TokenData(BaseModel):
    sub: Optional[str] = None