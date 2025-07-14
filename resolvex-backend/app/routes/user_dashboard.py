from fastapi import APIRouter, Depends
from app.services.user_dashboard_service import get_user_dashboard_stats
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/user", tags=["User"])

@router.get("/dashboard-stats")
async def user_dashboard_stats(current_user: dict = Depends(get_current_user)):
    return await get_user_dashboard_stats(current_user)  # ✅ await here
