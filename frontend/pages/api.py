import requests
import json

api_endpoint = 'http://localhost:3000/api/'


def get_user(user_id):
    response = requests.get(
        api_endpoint + 'users',
        data=json.dumps({"user_id": user_id}),
        headers={'Content-Type': 'application/json'}
    )
    return json.loads(response.text)


def get_sections(subject_id, course_id):
    response = requests.post(
        api_endpoint + 'lister/sections',
        data=json.dumps({"subject_id": subject_id, "course_id": course_id}),
        headers={'Content-Type': 'application/json'}
    )
    return json.loads(response.text)
