from pydantic import BaseModel

class AdminLogin(BaseModel):
    email: str
    password: str

class OTPVerify(BaseModel):
    otp: str
    email: str 
