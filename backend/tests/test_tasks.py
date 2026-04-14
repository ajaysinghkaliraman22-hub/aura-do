import pytest
from fastapi.testclient import TestClient
from main import app
from datetime import datetime, timedelta

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_task():
    response = client.post("/tasks/", json={"title": "Test Task"})
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert "id" in data
    assert data["priority"] == "Low" # No deadline = Low
    assert len(data["sub_tasks"]) > 0 # Mock LLM should create subtasks

def test_create_task_with_deadline_high_priority():
    deadline = (datetime.now() + timedelta(hours=10)).isoformat()
    response = client.post("/tasks/", json={"title": "Urgent Task", "deadline": deadline})
    assert response.status_code == 200
    data = response.json()
    assert data["priority"] == "High"

def test_get_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_task():
    # Setup
    create_response = client.post("/tasks/", json={"title": "Task to Update"})
    task_id = create_response.json()["id"]

    # Update
    update_response = client.put(f"/tasks/{task_id}", json={"completed": True})
    assert update_response.status_code == 200
    assert update_response.json()["completed"] == True

def test_delete_task():
    # Setup
    create_response = client.post("/tasks/", json={"title": "Task to Delete"})
    task_id = create_response.json()["id"]

    # Delete
    delete_response = client.delete(f"/tasks/{task_id}")
    assert delete_response.status_code == 200

    # Verify
    get_response = client.get(f"/tasks/{task_id}")
    assert get_response.status_code == 404
