import random
from datetime import datetime, timedelta

otp_store = {
    "otp": None,
    "expires": None,
    "email": None
}

def generate_otp(email: str):
    otp = str(random.randint(100000, 999999))
    expiry = datetime.utcnow() + timedelta(minutes=5)
    otp_store["otp"] = otp
    otp_store["expires"] = expiry
    otp_store["email"] = email
    return otp

def verify_otp(email: str, otp: str):
    if otp_store.get("email") != email:
        return False, None
    if otp_store.get("otp") != otp:
        return False, None
    if datetime.utcnow() > otp_store["expires"]:
        clear_otp()
        return False, None
    return True, email


def clear_otp():
    otp_store["otp"] = None
    otp_store["expires"] = None
    otp_store["email"] = None
