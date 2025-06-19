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
    existing_user = await db.users.find_one({
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

    result = await db.users.insert_one(new_user)

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
    user = await db.users.find_one({
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

    access_token = create_access_token(data={"user_id": str(user["_id"])})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"]
        }
    }

class DepartmentLogin(BaseModel):
    email: EmailStr
    password: str
    department_name: str

@router.post("/department/login")
async def department_login(dept: DepartmentLogin):
    # Use await for async MongoDB call
    department_user = await db.departments.find_one({
        "email": dept.email,
        "department_name": dept.department_name
    })

    # Check if user exists and password matches
    if not department_user or not pwd_context.verify(dept.password, department_user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "department": department_user["department_name"],
        "email": department_user["email"]
    }