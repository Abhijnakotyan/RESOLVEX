from fastapi import APIRouter
from app.services.ranking_service import calculate_ranking
from app.services.complaint_service import get_all_complaints, get_delayed_complaints

router = APIRouter()

@router.get("/admin/complaints")
def all_complaints():
    return get_all_complaints()

@router.get("/admin/delays")
def delayed():
    return get_delayed_complaints()

@router.get("/admin/rankings")
def get_rankings():
    return calculate_ranking()