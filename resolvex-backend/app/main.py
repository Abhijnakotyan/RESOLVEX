from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import (
    auth_routes, user_routes, complaint_routes, 
    department_routes, feedback_routes, admin_routes
)

app = FastAPI()
origins = [
    "*",
]
# Allow frontend to communicate with backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API route modules
app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(complaint_routes.router)
app.include_router(department_routes.router)
app.include_router(feedback_routes.router)
app.include_router(admin_routes.router)

@app.get("/")
def root():
    return {"message": "Welcome to ResolveX API"}
