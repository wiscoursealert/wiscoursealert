import streamlit as st


def initialize():
    if 'initialized' in st.session_state:
        return
    st.session_state['initialized'] = True
    st.session_state['user_id'] = None
    print('streamlit initialized')


def subscribe_email(email):
    return 555


def valid_user_id(user_id):
    if user_id == '' or user_id == None:
        return False
    return True


def get_watch_list(user_id):
    pass
