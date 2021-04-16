import requests

def get_course_list(selectedTerm):
	url = 'https://public.enroll.wisc.edu/api/search/v1/'
	payload = {
		"filters": [],
		"page": 1,
		"pageSize": 20,
		"queryString": "*",
		"selectedTerm": selectedTerm,
		"sortOrder": "SCORE"
	}
	res = requests.post(url, json = payload)
	return res.json()

if __name__ == '__main__':
	_ = get_course_list(selectedTerm='1214')
