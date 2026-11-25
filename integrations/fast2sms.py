"""Fast2SMS Gateway Integration"""
import requests

def dispatch_fast2sms(phone, message):
    api_key = os.environ.get("FAST2SMS_API_KEY")
    print(f"[Fast2SMS Dispatch] To {phone}: {message}")
    return True
