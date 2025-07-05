from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.user import AdminLogin
from app.models.admin import Admin
from app.utils.auth import verify_password
from app.database import get_admin_collection
from jose import jwt
from datetime import datetime, timedelta
from app.config import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/admin", tags=["Admin Auth"])

@router.post("/login")
async def login_admin(login_data: AdminLogin):
    admins = get_admin_collection()
    admin = await admins.find_one({"email": login_data.email})
    if not admin or not verify_password(login_data.password, admin["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    payload = {
        "sub": admin["email"],
        "role": "admin",
        "exp": datetime.utcnow() + timedelta(hours=2)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer"}
