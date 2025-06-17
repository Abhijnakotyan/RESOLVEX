from pydantic import BaseModel

class Feedback(BaseModel):
    department: str
    comment: str
    rating: int  # 1 to 5