import streamlit as st

from .utils import valid_user_id, get_watch_list, show_course_info


def catalog_name_mapping(x):
    if x == None:
        return 'Select course'
    return st.session_state['course_map'][x]['catalog_name']


def course_name_mapping(x):
    return st.session_state['course_map'][x]['course_name']


def edit_course():
    st.subheader('Edit your watch list')
    course_id_list = list(st.session_state['course_map'].keys())
    course_id = st.selectbox(
        'Course search',
        options=[None] + course_id_list,
        format_func=catalog_name_mapping)


def app():

    st.title('wiscoursealert 🦡')

    # ask for user id
    if st.session_state['user_id'] == None:
        with st.form(key='user_id_form'):
            user_id = st.text_input(
                'Enter your user ID', autocomplete='username')
            st.form_submit_button(label='Login')
        if valid_user_id(user_id):
            st.session_state['user_id'] = user_id
            st.experimental_rerun()
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
        course_list = [course['course_id'] for course in watch_list]
        selected_courses = st.multiselect(
            'Your watching list', course_list, default=st.session_state['selected_courses'], format_func=course_name_mapping)
        if selected_courses != st.session_state['selected_courses']:
            st.session_state['selected_courses'] = selected_courses
            st.experimental_rerun()

        # show courses infomation
        for course in watch_list:
            if course['course_id'] in selected_courses:
                show_course_info(course)

        # edit watch list
        edit_course()
