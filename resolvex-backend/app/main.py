from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_routes, admin_auth, complaint_routes, department_auth, user_dashboard, feedback

app = FastAPI()

# ✅ CORS middleware must come BEFORE routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_routes.router)
app.include_router(complaint_routes.router)
app.include_router(department_auth.router)
app.include_router(admin_auth.router) 
app.include_router(user_dashboard.router)
app.include_router(feedback.router)  
