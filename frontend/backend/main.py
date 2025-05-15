from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db_utils import insert_user, get_user_by_email, get_db_connection
from passlib.context import CryptContext

app = FastAPI()

# CORS so frontend (React) can call API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize password context for hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Utility function to hash password
def hash_password(password: str):
    return pwd_context.hash(password)

# Utility function to verify password
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

@app.post("/register/")
def register_user(name: str = Form(...), email: str = Form(...), password: str = Form(...)):
    conn = get_db_connection()

    # Check if the user already exists
    existing_user = get_user_by_email(conn, email)
    if existing_user:
        conn.close()
        raise HTTPException(status_code=400, detail="User with this email already exists")

    # Hash the password before storing
    hashed_password = hash_password(password)
    user_id = insert_user(conn, name, email, hashed_password)
    conn.close()

    return {"status": "registered", "user_id": str(user_id)}

@app.post("/login/")
def login_user(email: str = Form(...), password: str = Form(...)):
    conn = get_db_connection()
    user_data = get_user_by_email(conn, email)
    conn.close()

    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    user = user_data[0]

    # Verify password
    if not verify_password(password, user[3]):  # Assuming user[3] is the hashed password
        raise HTTPException(status_code=400, detail="Invalid password")

    return {"status": "Login successful", "user_id": str(user[0])}
