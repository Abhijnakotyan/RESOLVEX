from pydantic import BaseModel

class Department(BaseModel):
    name: str
    username: str
    password: str