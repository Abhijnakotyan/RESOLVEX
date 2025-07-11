from fastapi import APIRouter, HTTPException
from app.schemas.admin import AdminLogin
from app.utils.auth import verify_password
from app.utils.otp import generate_otp
from app.utils.email import send_otp_email
from app.database.mongodb import db  # ✅ importing db directly

router = APIRouter(prefix="/admin", tags=["Admin Auth"])

@router.post("/login")
async def login_admin(login_data: AdminLogin):
    admin = await db["admin"].find_one({"email": login_data.email})
    if not admin or not verify_password(login_data.password, admin["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    otp = generate_otp(login_data.email)
    await send_otp_email(login_data.email, otp)
    return {"message": "OTP sent to admin email"}
