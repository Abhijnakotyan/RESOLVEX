from fastapi import APIRouter, HTTPException, status,Depends
from passlib.context import CryptContext
from app.schemas.user_schema import UserCreate, UserLogin
from app.database.mongodb import db
from app.utils.jwt_utils import create_access_token
from app.services.auth_service import get_current_user
from app.models.user_model import User



router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register")
async def register_user(user: UserCreate):
    existing_user = await db.users.find_one({
        "$or": [{"email": user.email}, {"username": user.username}]
    })
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = pwd_context.hash(user.password)
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed
    }

    await db.users.insert_one(new_user)
    return {"message": "User registered successfully"}

@router.post("/login")
async def login_user(data: UserLogin):
    user = await db.users.find_one({
        "$or": [{"email": data.username_or_email}, {"username": data.username_or_email}]
    })

    if not user or not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"user_id": str(user["_id"])})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"]
        }
    }
