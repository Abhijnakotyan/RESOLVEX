def summarize_feedback(feedback_list):
    total = len(feedback_list)
    positives = sum(1 for f in feedback_list if f.get("sentiment") == "positive")
    negatives = sum(1 for f in feedback_list if f.get("sentiment") == "negative")
    return f"{positives} positive, {negatives} negative feedbacks out of {total} received."