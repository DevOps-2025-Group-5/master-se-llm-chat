import streamlit as st
import requests
import boto3
from botocore.exceptions import NoCredentialsError

# AWS Cognito Configuration
COGNITO_USER_POOL_ID = "your-user-pool-id"
COGNITO_CLIENT_ID = "your-app-client-id"
BACKEND_API_URL = "https://your-backend-api.com/chat"

# Initialize Cognito client
client = boto3.client("cognito-idp", region_name="your-region")

def authenticate_user(username, password):
    try:
        response = client.initiate_auth(
            ClientId=COGNITO_CLIENT_ID,
            AuthFlow="USER_PASSWORD_AUTH",
            AuthParameters={
                "USERNAME": username,
                "PASSWORD": password
            }
        )
        return response["AuthenticationResult"]["IdToken"]
    except NoCredentialsError:
        st.error("AWS credentials not found. Check your configuration.")
        return None
    except Exception as e:
        st.error(f"Authentication failed: {e}")
        return None

# Streamlit UI
st.set_page_config(page_title="Student Chat App", layout="wide")
st.title("🎓 Student Data Chat App")

# User Authentication
if "token" not in st.session_state:
    st.session_state.token = None

if st.session_state.token:
    st.success("Logged in successfully!")
    st.sidebar.button("Logout", on_click=lambda: st.session_state.update({"token": None}))
else:
    st.sidebar.subheader("Login")
    username = st.sidebar.text_input("Username")
    password = st.sidebar.text_input("Password", type="password")
    if st.sidebar.button("Login"):
        token = authenticate_user(username, password)
        if token:
            st.session_state.token = token
            st.rerun()

# Chat Interface
if st.session_state.token:
    st.write("Ask questions about student data:")
    user_input = st.text_input("Enter your question")
    if st.button("Ask") and user_input:
        headers = {"Authorization": f"Bearer {st.session_state.token}"}
        response = requests.post(BACKEND_API_URL, json={"question": user_input}, headers=headers)
        if response.status_code == 200:
            st.write("💡 Answer:", response.json().get("answer", "No response received"))
        else:
            st.error("Error retrieving response. Try again.")
