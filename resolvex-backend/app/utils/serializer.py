from bson import ObjectId
from datetime import datetime

def serialize_doc(doc):
    """
    Recursively converts ObjectId and datetime fields to str for JSON serialization.
    """
    for key, value in doc.items():
        if isinstance(value, ObjectId):
            doc[key] = str(value)
        elif isinstance(value, datetime):
            doc[key] = value.isoformat()  # or value.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(value, dict):
            doc[key] = serialize_doc(value)
        elif isinstance(value, list):
            doc[key] = [serialize_doc(item) if isinstance(item, dict) else item for item in value]
    return doc
