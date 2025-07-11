from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env

# MongoDB
MONGODB_URL = os.getenv("MONGODB_URL")

# JWT
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# Email (for sending OTP)
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
