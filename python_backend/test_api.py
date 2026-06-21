import requests
import json

# Test chat endpoint
response = requests.post(
    "http://localhost:8000/chat",
    json={
        "message": "I feel anxious and stressed today",
        "user_id": "test_user",
        "voice_input": False
    }
)

print("Status Code:", response.status_code)
print("Response:")
print(json.dumps(response.json(), indent=2))