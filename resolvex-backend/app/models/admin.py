from pydantic import BaseModel, EmailStr, Field

class Admin(BaseModel):
    email: EmailStr
    hashed_password: str
    role: str = Field(default="admin")
