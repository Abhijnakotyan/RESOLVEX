from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes
from app.routes import complaint_routes
from app.routes import department_auth
from app.routes import admin_auth


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(complaint_routes.router)
app.include_router(department_auth.router)
app.include_router(admin_auth.router) 
