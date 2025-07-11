from pydantic import BaseModel

class AdminLogin(BaseModel):
    email: str
    password: str

class AdminOTPVerify(BaseModel):
    otp: str  # No email here now
