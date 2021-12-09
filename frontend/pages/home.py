import streamlit as st
from .utils import valid_user_id, get_watch_list


def app():

    st.title('wiscoursealert 🦡')

    user_id = st.session_state['user_id']

    # change user id
    with st.form(key='form_user_id'):
        user_id = st.text_input(
            'Enter your user ID', autocomplete='username')
        login = st.form_submit_button(label='Login')

    if valid_user_id(user_id):
        st.session_state['user_id'] = user_id

    elif user_id != '' and user_id != None:
        st.error(
            'We can\'t find this user ID. Please make sure to enter the right one.')

    if st.session_state['user_id'] != None:
        st.header('Your watching list')
        watch_list = get_watch_list(st.session_state['user_id'])
