from fastapi import APIRouter
from app.services.complaint_service import get_department_complaints
from app.services.feedback_service import get_department_summary

router = APIRouter()

@router.get("/department/{dept_name}/complaints")
def get_complaints(dept_name: str):
    return get_department_complaints(dept_name)

@router.get("/department/{dept_name}/summary")
def get_summary(dept_name: str):
    return get_department_summary(dept_name)