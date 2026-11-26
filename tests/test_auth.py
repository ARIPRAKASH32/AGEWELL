import pytest

def test_login_page_renders(client):
    """Test that login page loads with HTTP 200 and displays AGEWELL branding."""
    response = client.get('/login')
    assert response.status_code == 200
    assert b'AGEWELL' in response.data
    assert b'Sign in to your AGEWELL Senior Independence dashboard' in response.data

def test_senior_login_success(client):
    """Test successful senior login redirects to senior dashboard."""
    response = client.post('/login', data={
        'email': 'senior@agewell.com',
        'password': 'password123'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'Daily "I am OK" Check-in' in response.data or b'Check-in' in response.data

def test_family_login_success(client):
    """Test successful family login redirects to family dashboard."""
    response = client.post('/login', data={
        'email': 'family@agewell.com',
        'password': 'password123'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'Family Dashboard' in response.data or b'My Seniors' in response.data

def test_doctor_login_success(client):
    """Test successful doctor login redirects to doctor hub."""
    response = client.post('/login', data={
        'email': 'doctor@agewell.com',
        'password': 'password123'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'Doctor Hub' in response.data or b'Patient Roster' in response.data

def test_admin_login_success(client):
    """Test successful admin login redirects to admin dashboard."""
    response = client.post('/login', data={
        'email': 'admin@agewell.com',
        'password': 'password123'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'System Control' in response.data or b'Admin' in response.data

def test_invalid_login_credentials(client):
    """Test login with wrong password displays error message."""
    response = client.post('/login', data={
        'email': 'senior@agewell.com',
        'password': 'wrongpassword'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'Invalid email or password' in response.data

def test_unauthenticated_protected_route_redirect(client):
    """Test that unauthenticated requests to protected routes redirect to login."""
    response = client.get('/senior/dashboard', follow_redirects=False)
    assert response.status_code == 302
    assert '/login' in response.headers.get('Location', '')

def test_logout_clears_session(client):
    """Test logout clears session and redirects to login."""
    client.post('/login', data={
        'email': 'senior@agewell.com',
        'password': 'password123'
    })
    response = client.get('/logout', follow_redirects=True)
    assert response.status_code == 200
    assert b'Sign In' in response.data or b'Welcome Back' in response.data
