"""Secure Clinical File Attachment Validator"""
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg"}
def is_valid_attachment(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
