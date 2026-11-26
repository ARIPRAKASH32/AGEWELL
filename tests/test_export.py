import pytest

def test_export_medications_csv(client):
    """Test exporting senior medication logs as CSV."""
    # Login as senior
    client.post('/login', data={'email': 'senior@agewell.com', 'password': 'password123'})
    response = client.get('/senior/export/medications')
    assert response.status_code == 200
    assert response.headers.get('Content-Type') == 'text/csv; charset=utf-8'
    assert b'Date,Scheduled Time,Medicine Name,Dosage,Adherence Status' in response.data
