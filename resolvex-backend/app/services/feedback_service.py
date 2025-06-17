from app.database.mongodb import feedback_collection
from app.schemas.feedback_schema import Feedback
from app.ml_nlp.sentiment_analysis import analyze_sentiment
from app.ml_nlp.feedback_summary import summarize_feedback


def save_feedback(data: Feedback):
    fb = data.dict()
    fb["sentiment"] = analyze_sentiment(data.comment)
    feedback_collection.insert_one(fb)
    return {"message": "Feedback saved"}


def get_department_summary(dept: str):
    feedbacks = list(feedback_collection.find({"department": dept}))
    summary = summarize_feedback(feedbacks)
    return {"summary": summary, "count": len(feedbacks)}