from pydantic import BaseModel

class AlertRequest(BaseModel):
    complaint_id: str
    department_name: str
    message: str
