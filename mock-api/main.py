from flask import Flask, jsonify, request, abort
import requests
import json

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

api_url = "https://public.enroll.wisc.edu/api"
mock_status = {}


@app.route('/')
def main():
    return jsonify(['mock wisc enrollment api', 'by wiscoursealert'])


# Return search results
@app.route('/search/v1', methods=['POST'])
def get_search_results():
    response = requests.post(
        api_url + '/search/v1',
        json=request.json
    )
    return jsonify(json.loads(response.content))


# Return sections
@app.route('/search/v1/enrollmentPackages/<term_code>/<subject_code>/<course_id>')
def get_sections(term_code, subject_code, course_id):
    response = requests.get(
        api_url +
        f'/search/v1/enrollmentPackages/{term_code}/{subject_code}/{course_id}'
    )
    sections = json.loads(response.content)
    for section in sections:
        section_ref = '{}.{}.{}.{}'.format(
            term_code, subject_code, course_id, section['id'])
        if section_ref in mock_status:
            section['packageEnrollmentStatus']['status'] = mock_status[section_ref]
    return jsonify(sections)


# Change section status in mock wisc enrollment api
@app.route('/update_status', methods=['POST'])
def update_mock_status():
    content = request.json
    term_code = content['termCode']
    subject_code = content['subjectCode']
    course_id = content['courseId']
    section_id = content['sectionId']
    status = content['status']
    if status not in ['OPEN', 'WAITLISTED', 'CLOSED']:
        abort(400)
    section_ref = '{}.{}.{}.{}'.format(
        term_code, subject_code, course_id, section_id)
    mock_status[section_ref] = status
    return jsonify(mock_status)


# Check mock status
@app.route('/get_status')
def get_mock_status():
    return jsonify(mock_status)


# Clear all mock status
@app.route('/clear_status')
def clear_mock_status():
    mock_status = {}
    return jsonify(mock_status)
