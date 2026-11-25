import sqlite3
from datetime import datetime, date, timedelta
from werkzeug.security import generate_password_hash
from models import DB_PATH, init_db

def seed():
    init_db()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Check if already seeded
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] > 0:
        print("Database already seeded.")
        conn.close()
        return

    pwd_hash = generate_password_hash("password123")
    today_str = date.today().strftime('%Y-%m-%d')
    yesterday_str = (date.today() - timedelta(days=1)).strftime('%Y-%m-%d')
    tomorrow_str = (date.today() + timedelta(days=1)).strftime('%Y-%m-%d')

    # 1. Users
    users_data = [
        # id, name, email, phone, role
        (1, "Eleanor Vance", "senior@agewell.com", "+1 (210) 555-0101", pwd_hash, "senior"),
        (2, "Sarah Vance", "family@agewell.com", "+1 (210) 555-0199", pwd_hash, "family"),
        (3, "Dr. Marcus Reed", "doctor@agewell.com", "+1 (210) 555-0388", pwd_hash, "doctor"),
        (4, "Admin Arthur", "admin@agewell.com", "+1 (210) 555-0999", pwd_hash, "admin"),
        # Additional users for realistic dashboard
        (5, "Michael Vance", "michael@agewell.com", "+1 (210) 555-0245", pwd_hash, "family"),
        (6, "Robert Sterling", "robert@agewell.com", "+1 (210) 555-0144", pwd_hash, "senior"),
        (7, "Dr. Elena Gomez", "dr.gomez@agewell.com", "+1 (210) 555-0722", pwd_hash, "doctor"),
    ]
    cursor.executemany(
        "INSERT INTO users (id, name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, ?, ?)",
        users_data
    )

    # 2. Senior Profiles
    senior_profiles = [
        (1, "09:00", 30, "A+", "Hypertension, Mild Type 2 Diabetes. Allergic to Penicillin.", "742 Evergreen Terrace, San Antonio, TX", "1948-06-14"),
        (6, "08:30", 45, "O+", "Pacemaker installed 2022. Mobility assistance cane.", "320 Oak Ridge Lane, San Antonio, TX", "1945-11-20")
    ]
    cursor.executemany(
        "INSERT INTO senior_profiles (user_id, check_in_time, grace_time_minutes, blood_group, emergency_notes, address, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?)",
        senior_profiles
    )

    # 3. Family Links (Approval First)
    family_links = [
        (1, 2, "Daughter", 1, 1, 1), # Eleanor & Sarah (Approved)
        (1, 5, "Son", 1, 1, 1),       # Eleanor & Michael (Approved)
        (6, 2, "Niece", 0, 1, 1)      # Robert & Sarah (Pending approval to demonstrate feature)
    ]
    cursor.executemany(
        "INSERT INTO family_links (senior_id, family_user_id, relation, is_approved, can_view_medicines, can_view_notes) VALUES (?, ?, ?, ?, ?, ?)",
        family_links
    )

    # 4. Doctor Assignments
    doctor_assignments = [
        (1, 3, "Cardiology & Geriatrics", "San Antonio Memorial Health", 1), # Approved
        (1, 7, "Neurology", "Metropolitan Neurological Clinic", 0),          # Pending approval demo
        (6, 3, "Cardiology", "San Antonio Memorial Health", 1)               # Approved
    ]
    cursor.executemany(
        "INSERT INTO doctor_assignments (senior_id, doctor_user_id, specialization, hospital, is_approved) VALUES (?, ?, ?, ?, ?)",
        doctor_assignments
    )

    # 5. Emergency Contacts (in priority order for SOS escalation)
    emergency_contacts = [
        (1, "Sarah Vance (Daughter)", "+1 (210) 555-0199", "Primary Caregiver / Daughter", 1),
        (1, "Michael Vance (Son)", "+1 (210) 555-0245", "Son", 2),
        (1, "Dr. Marcus Reed", "+1 (210) 555-0388", "Attending Physician", 3),
        (1, "San Antonio Senior Care Response", "+1 (210) 555-0911", "Community Responder", 4),
        (6, "Sarah Vance", "+1 (210) 555-0199", "Niece", 1),
        (6, "Local Emergency Dispatch", "112", "Emergency Services", 2)
    ]
    cursor.executemany(
        "INSERT INTO emergency_contacts (senior_id, name, phone, relation, priority_order) VALUES (?, ?, ?, ?, ?)",
        emergency_contacts
    )

    # 6. Health Records (visible to Doctor & allowed Family, HIDDEN from Admin)
    health_records = [
        (1, 3, "Cardiovascular Annual Assessment", "clinical_note", "Patient blood pressure stable at 128/82. Regular morning medication compliance is vital. Continue daily walking for 15 minutes."),
        (1, 3, "HbA1c & Lipid Panel Review", "lab_result", "HbA1c steady at 6.4%. Good glycemic control observed. Continue Metformin 500mg twice daily."),
        (1, 3, "Routine Mobility & Balance Check", "clinical_note", "Gait steady, reflex normal. Advised to stay hydrated and keep hydration tracker active.")
    ]
    cursor.executemany(
        "INSERT INTO health_records (senior_id, doctor_user_id, title, record_type, description) VALUES (?, ?, ?, ?, ?)",
        health_records
    )

    # 7. Medicines
    medicines = [
        (1, "Lisinopril", "10mg (1 Tablet)", "08:00", "Take every morning with a full glass of water. For blood pressure.", 3),
        (1, "Metformin", "500mg (1 Tablet)", "08:30, 20:00", "Take with meals to prevent stomach discomfort.", 3),
        (1, "Vitamin D3", "1000 IU (1 Capsule)", "12:30", "Take after lunch. Supports bone density and immunity.", 3),
        (1, "Atorvastatin", "20mg (1 Tablet)", "21:00", "Take before bedtime with water for cholesterol.", 3),
        (6, "Amlodipine", "5mg (1 Tablet)", "09:00", "Take once daily in morning for blood pressure.", 3)
    ]
    cursor.executemany(
        "INSERT INTO medicines (senior_id, name, dose, timings, instructions, prescribing_doctor_id) VALUES (?, ?, ?, ?, ?, ?)",
        medicines
    )

    # 8. Medicine Logs (Today & Yesterday)
    med_logs = [
        # Yesterday
        (1, 1, yesterday_str, "08:00", f"{yesterday_str} 08:05:00", "taken", "Taken after oatmeal"),
        (2, 1, yesterday_str, "08:30", f"{yesterday_str} 08:35:00", "taken", "Taken with breakfast"),
        (3, 1, yesterday_str, "12:30", f"{yesterday_str} 12:40:00", "taken", "Taken with lunch"),
        (4, 1, yesterday_str, "21:00", f"{yesterday_str} 21:05:00", "taken", "Bedtime dose"),
        # Today: 08:00 Lisinopril taken, 08:30 Metformin taken, 12:30 Vitamin D3 pending, 20:00 Metformin pending, 21:00 Atorvastatin pending
        (1, 1, today_str, "08:00", f"{today_str} 08:12:00", "taken", "Marked taken by Eleanor"),
        (2, 1, today_str, "08:30", f"{today_str} 08:32:00", "taken", "Taken on time"),
        (3, 1, today_str, "12:30", None, "pending", None),
        (2, 1, today_str, "20:00", None, "pending", None),
        (4, 1, today_str, "21:00", None, "pending", None),
    ]
    cursor.executemany(
        "INSERT INTO medicine_logs (medicine_id, senior_id, scheduled_date, scheduled_time, logged_at, status, note) VALUES (?, ?, ?, ?, ?, ?, ?)",
        med_logs
    )

    # 9. Daily Tasks
    tasks = [
        (1, "Morning Walk in Garden", "Gentle 15-minute walk around the lawn", "07:30", 1, today_str),
        (1, "Blood Pressure Check", "Use Omron cuff and record systolic/diastolic", "09:30", 1, today_str),
        (1, "Afternoon Hydration (2 Glasses)", "Water or herbal chamomile tea", "15:00", 0, today_str),
        (1, "Evening Breathing Exercises", "Deep breathing exercises recommended by Dr. Reed", "19:00", 0, today_str)
    ]
    cursor.executemany(
        "INSERT INTO daily_tasks (senior_id, title, description, time, is_completed, due_date) VALUES (?, ?, ?, ?, ?, ?)",
        tasks
    )

    # 10. Appointments
    appointments = [
        (1, 3, "Dr. Marcus Reed", "Quarterly Cardiac Review", tomorrow_str, "10:30 AM", "San Antonio Memorial Health, Suite 402", "Routine checkup, bring latest BP log", "scheduled"),
        (1, 7, "Dr. Elena Gomez", "Annual Cognitive & Wellness Check", (date.today() + timedelta(days=14)).strftime('%Y-%m-%d'), "02:00 PM", "Metropolitan Health, Bldg B", "Neurology consultation", "scheduled"),
        (1, 3, "Dr. Marcus Reed", "Post-Medication Adjustment Follow-up", (date.today() - timedelta(days=30)).strftime('%Y-%m-%d'), "11:00 AM", "San Antonio Memorial Health", "Dosage adjusted from 5mg to 10mg", "completed")
    ]
    cursor.executemany(
        "INSERT INTO appointments (senior_id, doctor_user_id, doctor_name, title, appointment_date, appointment_time, location, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        appointments
    )

    # 11. Daily Check-ins ("I am OK")
    checkins = [
        (1, (date.today() - timedelta(days=2)).strftime('%Y-%m-%d'), "08:15 AM", "ok", "Feeling energized and rested"),
        (1, yesterday_str, "08:45 AM", "ok", "Great morning"),
        (1, today_str, "08:50 AM", "ok", "Pressed 'I am OK' button successfully")
    ]
    cursor.executemany(
        "INSERT INTO daily_checkins (senior_id, checkin_date, checkin_time, status, note) VALUES (?, ?, ?, ?, ?)",
        checkins
    )

    # 12. Emergency Alerts (SOS History)
    alerts = [
        (1, (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d %H:%M:%S'), 1, 2, 
         (datetime.now() - timedelta(days=5, minutes=-2)).strftime('%Y-%m-%d %H:%M:%S'),
         (datetime.now() - timedelta(days=5, minutes=-15)).strftime('%Y-%m-%d %H:%M:%S'),
         "resolved", "Dizziness after morning walk. Daughter arrived; Eleanor drank water and rested. BP was normal.", 29.4241, -98.4936)
    ]
    cursor.executemany(
        "INSERT INTO emergency_alerts (senior_id, triggered_at, contact_escalation_step, responded_by_user_id, responded_at, resolved_at, status, notes, location_lat, location_lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        alerts
    )

    # 13. Notifications
    notifications = [
        (2, "info", "Daily Check-in Complete", "Eleanor Vance pressed 'I am OK' today at 08:50 AM.", "both", 1),
        (2, "info", "Morning Medicines Taken", "Eleanor took Lisinopril and Metformin on schedule.", "in-app", 1),
        (3, "info", "Patient Check-in Update", "Eleanor Vance has maintained 98% 30-day compliance.", "in-app", 0),
        (1, "approval_request", "New Doctor Assignment Request", "Dr. Elena Gomez requested access to your medical profile.", "in-app", 0)
    ]
    cursor.executemany(
        "INSERT INTO notifications (user_id, type, title, message, channel, is_read) VALUES (?, ?, ?, ?, ?, ?)",
        notifications
    )

    # 14. Audit Logs
    audit = [
        (1, "LOGIN", "user", 1, "Eleanor Vance logged into Senior Independence Portal", "127.0.0.1"),
        (2, "VIEW_PROFILE", "senior_profile", 1, "Sarah Vance viewed Eleanor Vance's status", "127.0.0.1"),
        (3, "UPDATE_MEDICINE", "medicines", 1, "Dr. Marcus Reed confirmed Lisinopril dosage", "127.0.0.1"),
        (4, "SYSTEM_INIT", "system", 0, "Initial database deployment and security check", "127.0.0.1")
    ]
    cursor.executemany(
        "INSERT INTO audit_logs (actor_user_id, action, target_type, target_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
        audit
    )

    conn.commit()
    conn.close()
    print("Database successfully initialized and seeded with 14 tables and test data!")

if __name__ == "__main__":
    seed()
