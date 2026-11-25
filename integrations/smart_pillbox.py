"""IoT Smart Medicine Box Integration Webhook"""
def handle_pillbox_event(device_id, compartment, opened_at):
    print(f"Device {device_id} compartment {compartment} opened at {opened_at}")
    return {"status": "recorded"}
