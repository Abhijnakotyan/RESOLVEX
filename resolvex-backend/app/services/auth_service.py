from fastapi import Header, HTTPException
from jose import jwt, JWTError
from app.config import SECRET_KEY, ALGORITHM
from app.database.mongodb import db
from bson import ObjectId
from typing import Optional

async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        return None  # For anonymous users

    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return {"_id": str(user["_id"]), "email": user["email"]}

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")
