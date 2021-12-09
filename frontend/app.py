import streamlit as st
from pages import subscribe, home, utils
from PIL import Image

st.set_page_config(layout='wide', page_title='Wiscoursealert',
                   page_icon=Image.open('images/badger.png'))

PAGES = {
    'Home': home,
    'Subscribe': subscribe
}


def main():

    st.sidebar.title('Navigation')
    selection = st.sidebar.radio("Go to", list(PAGES.keys()))

    st.sidebar.title('Contribute')
    st.sidebar.info(
        "This an open source project and you are very welcome to contribute your awesome "
        "comments, questions, resources and apps as "
        "[issues](https://github.com/Top34051/wiscoursealert/issues) of or "
        "[pull requests](https://github.com/Top34051/wiscoursealert/pulls) "
        "to the [source code](https://github.com/Top34051/wiscoursealert). "
    )

    st.sidebar.title("About")
    st.sidebar.info(
        """
        This app is maintained by Top Burapacheep, Robin Deeboonchai, and Rattee Jarusirawong.
        """
    )

    PAGES[selection].app()


if __name__ == '__main__':
    utils.initialize()
    main()
