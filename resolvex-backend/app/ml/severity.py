from datetime import datetime

def compute_severity(complaint):
    serious_keywords = ["electric", "fire", "broken", "security", "bad", "difficult", "danger", "urgent"]

    # Convert created_at string to datetime if needed
    created_at = complaint.get("created_at")
    if isinstance(created_at, str):
        try:
            created_at = datetime.fromisoformat(created_at)
        except ValueError:
            # fallback if format is not ISO (e.g. Mongo auto-formatted strings)
            created_at = datetime.strptime(created_at, "%Y-%m-%dT%H:%M:%S.%f")

    days_pending = (datetime.utcnow() - created_at).days

    # Combine subject + description for analysis
    text = f"{complaint.get('complaint_subject', '')} {complaint.get('description', '')}".lower()

    score = 0
    if any(word in text for word in serious_keywords):
        score += 2
    if days_pending >= 3:
        score += 2
    elif days_pending == 2:
        score += 1
    if complaint.get("priority") == "high":
        score += 2

    return {
        "severity_score": score,
        "days_pending": days_pending,
        "highlight": score >= 3
    }
