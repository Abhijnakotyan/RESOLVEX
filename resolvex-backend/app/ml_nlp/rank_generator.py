from collections import defaultdict


def generate_department_rank(feedback_data):
    score_map = defaultdict(list)
    for fb in feedback_data:
        dept = fb["department"]
        score_map[dept].append(fb.get("rating", 0))

    avg_scores = [(dept, sum(ratings)/len(ratings)) for dept, ratings in score_map.items()]
    return sorted(avg_scores, key=lambda x: x[1], reverse=True)


# File: resolvex-backend/app/utils/helpers.py
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)
