from fastapi import Header, HTTPException, status
from jose import jwt, JWTError
from app.config import SECRET_KEY, ALGORITHM
from app.database.mongodb import db
from bson.objectid import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient

async def get_current_user(authorization: str = Header(...)):
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return {"_id": str(user["_id"]), "email": user["email"]}

    except JWTError as e:
        print("JWTError:", str(e))  # ✅ Add this line for debugging
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print("Exception:", str(e))  # ✅ Add this line for debugging
        raise HTTPException(status_code=401, detail="Invalid Authorization header format")
