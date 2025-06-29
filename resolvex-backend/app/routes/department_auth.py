from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database.mongodb import db
from bson.objectid import ObjectId
from passlib.context import CryptContext

router = APIRouter(prefix="/auth/department", tags=["Department Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class DepartmentLoginSchema(BaseModel):
    email: str
    password: str
    department_name: str


@router.post("/login")
async def department_login(payload: DepartmentLoginSchema):
    department = await db.departments.find_one({"email": payload.email})

    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    if department.get("department_name") != payload.department_name:
        raise HTTPException(status_code=400, detail="Department name mismatch")

    if not pwd_context.verify(payload.password, department["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {
        "message": "Login successful",
        "department_id": str(department["_id"]),
        "department_name": department["department_name"],
    }
