from app.database.mongodb import feedback_collection
from app.ml_nlp.rank_generator import generate_department_rank


def calculate_ranking():
    feedbacks = list(feedback_collection.find())
    return {"ranking": generate_department_rank(feedbacks)}
