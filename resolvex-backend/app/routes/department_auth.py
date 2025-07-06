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
@router.get("/{department_id}/complaints/count")
async def get_department_complaint_count(department_id: str):
    try:
        count = await db.complaints.count_documents({
            "department_id": ObjectId(department_id)
        })
        return {"total_complaints": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{department_id}/complaints/resolved-count")
async def get_resolved_complaints_count(department_id:str):
    try:
        count=await db.complaints.count_documents({
            "department_id":ObjectId(department_id),
            "status":"Resolved"
        })
        return{"resolved_count":count}
    except exception as e:
        raise HTTPException(status_code=500,detail=str(e))

@router.get("/{department_id}/complaints/pending-count")
async def get_pending_complaints_count(department_id: str):
    try:
        count = await db.complaints.count_documents({
            "department_id": ObjectId(department_id),
            "status": "Pending"
        })
        return {"pending_count": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
