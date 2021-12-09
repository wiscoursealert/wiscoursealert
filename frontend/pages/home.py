import streamlit as st
from pprint import pprint

from .utils import valid_user_id, get_watch_list, show_course_info


def edit_course():
    print('hello')


def app():

    st.title('wiscoursealert 🦡')

    # ask for user id
    if st.session_state['user_id'] == None:
        user_id = st.text_input(
            'Enter your user ID', autocomplete='username')
        login = st.button(label='Login')
        if login:
            if valid_user_id(user_id):
                st.session_state['user_id'] = user_id
            elif user_id != '' and user_id != None:
                st.error(
                    'We can\'t find this user ID. Please make sure to enter the right one.')

    else:
        # welcome message
        message = '### Welcome back! user <span style="color:#DB4437">{}</span>.'.format(
            st.session_state['user_id'])
        st.markdown(message, unsafe_allow_html=True)

        # select watch list
        watch_list = get_watch_list(st.session_state['user_id'])
        course_list = [course['course_name'] for course in watch_list]
        options = st.multiselect('Your watching list', course_list)

        # show courses infomation
        for course in watch_list:
            if course['course_name'] in options:
                show_course_info(course)

        # edit watch list
        edit_course()
