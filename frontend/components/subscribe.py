import streamlit as st
import re
from .utils import subscribe_email

def is_valid_email(email):
  regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
  return re.fullmatch(regex, email)

def app():
  
  st.title('wiscoursealert 🦡')
  st.write('Let badger emails you when your sections are open')
  
  with st.form(key='email-input'):
    email = st.text_input(label='Enter your email', autocomplete='email')
    subscribe = st.form_submit_button(label='Subscribe')
  
  if subscribe:
    if email == '' or not is_valid_email(email):
      st.error('Registration error: Please enter valid email address')
    else:
      user_id = subscribe_email(email)
      st.success(
        '**Your registration is complete!**  \n\n'
        f'Your user ID is **{user_id}**. '
        'You can now edit your watching list using this user ID. Please keep it for the future use.'
      )
