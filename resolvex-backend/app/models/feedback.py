from datetime import datetime

def feedback_model(feedback):
    return {
        "id": str(feedback["_id"]),
        "feedback_type": feedback["feedback_type"],
        "rating": feedback["rating"],
        "comment": feedback.get("comment", ""),
        "created_at": feedback["created_at"],
        "complaint_id": feedback.get("complaint_id"),
        "department_name": feedback.get("department_name"),
        "category": feedback.get("category", "")
    }
