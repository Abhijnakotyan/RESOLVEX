import smtplib
import ssl
from email.message import EmailMessage
from app.config import SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_SENDER

async def send_otp_email(receiver_email: str, otp: str):
    subject = "Your ResolveX OTP Code"
    body = f"""
    Hello Admin,

    Your OTP code for ResolveX login is: {otp}

    This OTP is valid for 5 minutes only.

    Regards,
    ResolveX Team
    """

    em = EmailMessage()
    em['From'] = EMAIL_SENDER
    em['To'] = receiver_email
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context) as server:
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(em)
            print("✅ OTP sent to admin.")
    except Exception as e:
        print("❌ Error sending email:", str(e))
        raise
