import streamlit as st
from .api import get_course_search, get_user, get_sections
import json
from pprint import pprint


def initialize():
    if 'initialized' in st.session_state:
        return
    st.session_state['initialized'] = True
    st.session_state['user_id'] = None
    st.session_state['selected_courses'] = None
    st.session_state['course_map'] = json.load(
        open('data/course_map_fall21.json', 'r'))
    print('application initialized!')


def subscribe_email(email):
    return 555


def valid_user_id(user_id):
    if user_id == '' or user_id == None:
        return False
    user = get_user(user_id)
    if 'user_id' in user:
        return True
    return False


def get_watch_list(user_id):
    if not valid_user_id(user_id):
        return None
    user = get_user(user_id)
    return user['subscribed']


def show_course_info(course):

    course_id = course['course_id'].split('.')[0]
    if course_id in st.session_state['course_map']:
        st.subheader(st.session_state['course_map'][course_id])
        st.caption(course['course_name'])
    else:
        st.subheader(course['course_name'])

    sections = get_sections(course['subject_id'], course['course_id'])

    section_id_info = {}
    for section in sections:
        section_id_info[section['section_id']] = section

    section_list = []
    for section in course['sections']:
        info = section_id_info[section['section_id']]
        if 'lecture_name' in info:
            section_list.append((info['status'], 'Lecture {} Discussion {}'.format(
                info['lecture_name'], info['discussion_name'])))
        else:
            section_list.append(
                (info['status'], 'Section {}'.format(info['section_id'])))
    section_list = sorted(section_list)

    result = ''
    for status, section_text in section_list:
        if status == 'OPEN':
            result += '- <span style="font-family:calibri; color:Green; font-size:18px">Open</span> '
        elif status == 'WAITLISTED':
            result += '- <span style="font-family:calibri; color:Orange; font-size:18px">Wait listed</span> '
        elif status == 'CLOSED':
            result += '- <span style="font-family:calibri; color:Red; font-size:18px">Closed</span> '
        result += section_text + '\n'
    result += '---'

    st.markdown(result, unsafe_allow_html=True)
