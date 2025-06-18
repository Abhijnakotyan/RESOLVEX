from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from bson.objectid import ObjectId
from app.database.mongodb import db
from app.schemas.user_schema import UserCreate, UserLogin
from app.utils.jwt_utils import create_access_token
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Register endpoint
@router.post("/register")
async def register_user(user: UserCreate):
    # Check for existing user by email or username
    existing_user = db.users.find_one({
        "$or": [
            {"email": user.email},
            {"username": user.username}
        ]
    })

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )

    hashed_password = pwd_context.hash(user.password)
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }

    result = db.users.insert_one(new_user)
    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id)
    }

# Login request model
class LoginRequest(BaseModel):
    username_or_email: str
    password: str

# Login endpoint
@router.post("/login")
async def login_user(data: LoginRequest):
    user = db.users.find_one({
        "$or": [
            {"email": data.username_or_email},
            {"username": data.username_or_email}
        ]
    })

    if not user or not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    access_token = create_access_token(user_id=str(user["_id"]))



    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"]
        }
    }
