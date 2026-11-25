# AGEWELL — Senior Independence Portal

> **Helping seniors live independently, safely and confidently.**  
> Built strictly according to the **Senior Independence Portal Blueprint (PDF)** and designed with the **Senior Buddies** visual identity featuring interactive **3D design across all pages**.

---

## 🌟 Key Highlights & Blueprint Compliance

### 1. The 4 User Roles
| Role | Capabilities | Demo Account |
|---|---|---|
| **Senior** | Marks medicines taken, presses morning "I am OK", manages tasks & appointments, 3D SOS beacon, approves/revokes doctor & family access. | `senior@agewell.com` / `password123` |
| **Family** | Live senior check-in status, missed medicine alerts, "I am responding" button, resolve emergency workflow. | `family@agewell.com` / `password123` |
| **Doctor** | Views assigned seniors, compliance rate calculation, updates medicine instructions, clinical progress notes, books appointments. | `doctor@agewell.com` / `password123` |
| **Admin** | Manages user accounts (activate/deactivate), system statistics, emergency logs. **Strictly cannot view private medical records** (guaranteed in route logic & UI). | `admin@agewell.com` / `password123` |

### 2. Complete 14 SQLite Tables (Page 3 of Blueprint)
1. `users`: Name, email, phone, hashed password, role (`senior`, `family`, `doctor`, `admin`), active status.
2. `senior_profiles`: Senior details, check-in time (e.g. 09:00 AM), grace time for medicines (default 30 mins), blood group, address.
3. `family_links`: Senior-to-family links with `is_approved`, `can_view_medicines`, `can_view_notes`.
4. `doctor_assignments`: Doctor-to-senior links with `specialization`, `hospital`, `is_approved`.
5. `emergency_contacts`: Priority-ordered contact names and phones (Priority 1, 2, 3...) for automatic 2-minute escalation.
6. `health_records`: Medical history, clinical notes, lab results (doctor only & approved family).
7. `medicines`: Medicine name, dose, timings (24h comma-separated), instructions.
8. `medicine_logs`: Each dose status (`taken`, `skipped`, `missed`, `pending`), timestamp, notes.
9. `daily_tasks`: Routine wellness tasks, walk reminders, hydration checks.
10. `appointments`: Doctor visits and checkups with status (`scheduled`, `completed`, `cancelled`).
11. `daily_checkins`: Tracks daily "I am OK" check-in with status (`ok`, `missed`, `late`).
12. `emergency_alerts`: Every SOS alert: time, escalation step, responder, resolved timestamp, notes.
13. `notifications`: In-app & SMS alert logs with read status.
14. `audit_logs`: Audit trail of security, logins, permissions, and profile views.

### 3. Core Automation & Safety Rules (APScheduler)
- **Missed Medicine Reminders**: If a medicine is not marked taken within the senior's grace time (30 minutes), family is alerted automatically.
- **Daily "I am OK" Check**: If the senior does not press the button by their check-in time (09:00 AM), family receives an urgent notification and SMS.
- **2-Minute SOS Escalation**:
  1. Senior presses SOS button.
  2. Alert is saved and sent to Priority 1 contact, family, and doctor.
  3. If nobody replies within **2 minutes**, the scheduler automatically escalates to Priority 2, then Priority 3, and finally national **Emergency 112 Dispatch**.
  4. Responder taps **"I am responding"**.
  5. Incident is marked **Resolved**.
- **Call 112**: Emergency button always visible on all pages and header.

### 4. 3D Design & Senior Accessibility
- **Three.js 3D Visualizer Engine**:
  - Interactive 3D medical care capsule with orbital protection rings and vital particles on the hero page.
  - Pulsing 3D vitality sphere on the Senior Dashboard.
  - 3D emergency beacon on the SOS screen.
- **CSS 3D Dynamic Tilt Physics**:
  - Cards tilt with realistic 3D perspective and specular reflection on mouse movement.
  - Tactile 3D skeuomorphic buttons with press-depth extrusion.
  - Floating 3D "Senior Buddies Difference" ribbon badge.
- **Senior Accessibility**:
  - Large text and high-contrast styling.
  - High-visibility red 3D SOS beacon.
  - Voice Assistant: Reads reminders and medicine instructions aloud.
  - One-click demo login switcher.

---

## 🚀 Running the Project

```bash
# 1. Activate the Python virtual environment
source /home/ariprakash/Downloads/AGEWELL/venv/bin/activate

# 2. Run the Flask application
python /home/ariprakash/Downloads/AGEWELL/app.py
```

The application will start on **`http://localhost:5000`**.
