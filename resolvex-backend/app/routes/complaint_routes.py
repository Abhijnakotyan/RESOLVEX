from fastapi import APIRouter
from app.schemas.complaint_schema import ComplaintCreate
from app.services.complaint_service import submit_complaint

router = APIRouter()

@router.post("/complaints")
def file_complaint(data: ComplaintCreate):
    return submit_complaint(data)