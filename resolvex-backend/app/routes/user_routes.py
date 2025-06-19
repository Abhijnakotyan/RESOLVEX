from fastapi import APIRouter, Depends
from app.services.auth_service import get_current_user  # adjust path as needed
from app.database.mongodb import db

router = APIRouter(prefix="/users", tags=["User"])

@router.get("/me")
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    user_id = current_user["_id"]
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "_id": str(user["_id"]),
        "username": user.get("username"),
        "email": user.get("email"),
        "name": user.get("name"),
        "role": user.get("role", "user"),
        "created_at": user.get("created_at"),
    }
