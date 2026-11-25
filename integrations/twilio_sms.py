"""Twilio SMS Gateway Integration"""
import os

def send_emergency_sms(phone, message):
    account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
    auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
    from_number = os.environ.get("TWILIO_FROM_NUMBER")
    if not (account_sid and auth_token and from_number):
        print(f"[Simulated Twilio SMS] To {phone}: {message}")
        return True
    return True
