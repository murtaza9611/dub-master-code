"""
This module contains utility functions for interacting with the Dub Master PostgreSQL database.
Includes functions for users, videos, transcriptions, translations, dubbings, and payments.
"""

import psycopg2
import os
from psycopg2.extras import DictCursor
from dotenv import load_dotenv
from create_db_script import TABLES_SQL

#       Setting Up Database

#       Defining Connection Parameters
load_dotenv()
conn_params = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'port': int(os.getenv('DB_PORT'))
}

#       Establishing Database Connection

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=os.getenv("DB_PORT")
    )


#       Execute Query Function

def execute_query(conn, query, data = None):
    cursor = conn.cursor(cursor_factory = DictCursor)
    try:
        if data:
            cursor.execute(query, data)
        else:
            cursor.execute(query)
        conn.commit()
    except Exception as e:
        print("Query did not work", e)
        conn.rollback()
    finally:
        cursor.close()



#       Data Fetching Query Function

def fetch_query(conn, query, data = None):
    cursor = conn.cursor()
    try:
        if data:
            cursor.execute(query, data)
        else:
            cursor.execute(query)
        
        result = cursor.fetchall()
        return result
    except Exception as e:
        print("Query did not work", e)
        conn.rollback()
        return None
    finally:
        cursor.close()




# Function to connect to the database and create tables
def create_tables():
    conn = get_db_connection()
    if conn:
        try:
            execute_query(conn, TABLES_SQL)
            print("✅ Tables created successfully!")
        except Exception as e:
            print(f"Error creating tables: {e}")
        finally:
            conn.close()
    else:
        print("Database connection failed!")

# create_tables()

#-------------------------------------------
#               USER TABLE
#-------------------------------------------


# Insert User
def insert_user(conn, name, email, password):
    query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s) RETURNING user_id;"
    return execute_query(conn, query, (name, email, password))

# Fetch User by ID
def get_user_by_id(conn, user_id):
    query = "SELECT * FROM users WHERE user_id = %s;"
    return fetch_query(conn, query, (user_id,))

# Update User Email
def update_user_email(conn, user_id, new_email):
    query = "UPDATE users SET email = %s WHERE user_id = %s;"
    execute_query(conn, query, (new_email, user_id))

# Delete User
def delete_user(conn, user_id):
    query = "DELETE FROM users WHERE user_id = %s;"
    execute_query(conn, query, (user_id,))



#-------------------------------------------
#              VIDEOS TABLE
#-------------------------------------------


# Insert Video
def insert_video(conn, user_id, title, original_language, target_language, status="pending"):
    query = "INSERT INTO videos (user_id, title, original_language, target_language, status) VALUES (%s, %s, %s, %s, %s) RETURNING video_id;"
    return execute_query(conn, query, (user_id, title, original_language, target_language, status))

# Fetch Video by ID
def get_video_by_id(conn, video_id):
    query = "SELECT * FROM videos WHERE video_id = %s;"
    return fetch_query(conn, query, (video_id,))

# Update Video Status
def update_video_status(conn, video_id, status):
    query = "UPDATE videos SET status = %s WHERE video_id = %s;"
    execute_query(conn, query, (status, video_id))

# Delete Video
def delete_video(conn, video_id):
    query = "DELETE FROM videos WHERE video_id = %s;"
    execute_query(conn, query, (video_id,))



#-------------------------------------------
#          TRANSCRIPTIONS TABLE
#-------------------------------------------


# Insert Transcription
def insert_transcription(conn, video_id, transcribed_text, language):
    query = "INSERT INTO transcriptions (video_id, transcribed_text, language) VALUES (%s, %s, %s) RETURNING transcription_id;"
    return execute_query(conn, query, (video_id, transcribed_text, language))

# Fetch Transcription by Video ID
def get_transcription_by_video_id(conn, video_id):
    query = "SELECT * FROM transcriptions WHERE video_id = %s;"
    return fetch_query(conn, query, (video_id,))

# Update Transcription Text
def update_transcription_text(conn, transcription_id, new_text):
    query = "UPDATE transcriptions SET transcribed_text = %s WHERE transcription_id = %s;"
    execute_query(conn, query, (new_text, transcription_id))

# Delete Transcription
def delete_transcription(conn, transcription_id):
    query = "DELETE FROM transcriptions WHERE transcription_id = %s;"
    execute_query(conn, query, (transcription_id,))



#-------------------------------------------
#           TRANSLATIONS TABLE
#-------------------------------------------


# Insert Translation
def insert_translation(conn, transcription_id, translated_text, source_language, target_language):
    query = "INSERT INTO translations (transcription_id, translated_text, source_language, target_language) VALUES (%s, %s, %s, %s) RETURNING translation_id;"
    return execute_query(conn, query, (transcription_id, translated_text, source_language, target_language))

# Fetch Translation by Transcription ID
def get_translation_by_transcription_id(conn, transcription_id):
    query = "SELECT * FROM translations WHERE transcription_id = %s;"
    return fetch_query(conn, query, (transcription_id,))

# Update Translated Text
def update_translated_text(conn, translation_id, new_text):
    query = "UPDATE translations SET translated_text = %s WHERE translation_id = %s;"
    execute_query(conn, query, (new_text, translation_id))

# Delete Translation
def delete_translation(conn, translation_id):
    query = "DELETE FROM translations WHERE translation_id = %s;"
    execute_query(conn, query, (translation_id,))



#-------------------------------------------
#             DUBBINGS TABLE
#-------------------------------------------


# Insert Dubbing
def insert_dubbing(conn, video_id, dubbing_url, status="in_progress"):
    query = "INSERT INTO dubbings (video_id, dubbing_url, status) VALUES (%s, %s, %s) RETURNING dubbing_id;"
    return execute_query(conn, query, (video_id, dubbing_url, status))

# Fetch Dubbing by Video ID
def get_dubbing_by_video_id(conn, video_id):
    query = "SELECT * FROM dubbings WHERE video_id = %s;"
    return fetch_query(conn, query, (video_id,))

# Update Dubbing Status
def update_dubbing_status(conn, dubbing_id, status):
    query = "UPDATE dubbings SET status = %s WHERE dubbing_id = %s;"
    execute_query(conn, query, (status, dubbing_id))

# Delete Dubbing
def delete_dubbing(conn, dubbing_id):
    query = "DELETE FROM dubbings WHERE dubbing_id = %s;"
    execute_query(conn, query, (dubbing_id,))



#-------------------------------------------
#             PAYMENTS TABLE
#-------------------------------------------


# Insert Payment
def insert_payment(conn, user_id, amount, status="pending"):
    query = "INSERT INTO payments (user_id, amount, status) VALUES (%s, %s, %s) RETURNING payment_id;"
    return execute_query(conn, query, (user_id, amount, status))

# Fetch Payments by User ID
def get_payments_by_user_id(conn, user_id):
    query = "SELECT * FROM payments WHERE user_id = %s;"
    return fetch_query(conn, query, (user_id,))

# Update Payment Status
def update_payment_status(conn, payment_id, status):
    query = "UPDATE payments SET status = %s WHERE payment_id = %s;"
    execute_query(conn, query, (status, payment_id))

# Delete Payment
def delete_payment(conn, payment_id):
    query = "DELETE FROM payments WHERE payment_id = %s;"
    execute_query(conn, query, (payment_id,))


#-------------------------------------------
#     AUTHENTICATION RELATED FUNCTIONS
#-------------------------------------------


# Fetch User by Email (for login)
def get_user_by_email(conn, email):
    query = "SELECT * FROM users WHERE email = %s;"
    return fetch_query(conn, query, (email,))

# Update User Password (for reset functionality)
def update_user_password(conn, user_id, new_password):
    query = "UPDATE users SET password = %s WHERE user_id = %s;"
    execute_query(conn, query, (new_password, user_id))


#-------------------------------------------
#            FETCHING VIDEOS
#-------------------------------------------


# Fetch all videos uploaded by a user
def get_videos_by_user(conn, user_id):
    query = "SELECT * FROM videos WHERE user_id = %s ORDER BY created_at DESC;"
    return fetch_query(conn, query, (user_id,))


#-------------------------------------------
#           FETCHING DUBBINGS
#-------------------------------------------


# Fetch all completed dubbings for a user
def get_completed_dubbings_by_user(conn, user_id):
    query = """
    SELECT d.* FROM dubbings d
    JOIN videos v ON d.video_id = v.video_id
    WHERE v.user_id = %s AND d.status = 'completed'
    ORDER BY d.created_at DESC;
    """
    return fetch_query(conn, query, (user_id,))


#-------------------------------------------
#       FETCHING LAST PAYMENT STATUS
#-------------------------------------------


# Fetch the latest payment status for a user
def get_latest_payment_status(conn, user_id):
    query = """
    SELECT status FROM payments 
    WHERE user_id = %s 
    ORDER BY created_at DESC LIMIT 1;
    """
    return fetch_query(conn, query, (user_id,))


#-------------------------------------------
#      GETTING TOTAL TRANSLATED VIDOES
#-------------------------------------------


# Get the total count of translated videos
def get_total_translated_videos(conn):
    query = "SELECT COUNT(*) FROM translations;"
    return fetch_query(conn, query)


#-------------------------------------------
#        GETTING DUBBING STATUS
#-------------------------------------------


# Count videos in each dubbing status
def get_dubbing_status_summary(conn):
    query = """
    SELECT status, COUNT(*) FROM dubbings
    GROUP BY status;
    """
    return fetch_query(conn, query)


#-------------------------------------------
#         FETCHING RECENT ACTIVITIES
#-------------------------------------------


# Fetch recent activities (last 5 actions)
def get_recent_activities(conn, user_id):
    query = """
    (SELECT 'Video Uploaded' AS action, title, created_at FROM videos WHERE user_id = %s)
    UNION
    (SELECT 'Translation Completed' AS action, translated_text, created_at FROM translations 
    JOIN transcriptions ON translations.transcription_id = transcriptions.transcription_id 
    JOIN videos ON transcriptions.video_id = videos.video_id WHERE videos.user_id = %s)
    UNION
    (SELECT 'Dubbing Completed' AS action, dubbing_url, created_at FROM dubbings 
    JOIN videos ON dubbings.video_id = videos.video_id WHERE videos.user_id = %s)
    ORDER BY created_at DESC LIMIT 5;
    """
    return fetch_query(conn, query, (user_id, user_id, user_id))


#-------------------------------------------
#         FETCHING PENDING VIDEOS
#-------------------------------------------


# Fetch videos that are waiting for dubbing
def get_pending_dubbing_videos(conn):
    query = """
    SELECT v.* FROM videos v
    LEFT JOIN dubbings d ON v.video_id = d.video_id
    WHERE d.video_id IS NULL OR d.status = 'pending'
    ORDER BY v.created_at DESC;
    """
    return fetch_query(conn, query)


#-------------------------------------------
#         FETCHING USER SUBSCRIPTON
#-------------------------------------------


# Fetch the current subscription plan of a user
def get_user_subscription(conn, user_id):
    query = """
    SELECT plan_name, start_date, end_date FROM subscriptions
    WHERE user_id = %s ORDER BY start_date DESC LIMIT 1;
    """
    return fetch_query(conn, query, (user_id,))


#-------------------------------------------
#         FETCHING PAYMENT HISTORY
#-------------------------------------------


# Fetch all payments of a user
def get_payment_history(conn, user_id):
    query = "SELECT amount, status, created_at FROM payments WHERE user_id = %s ORDER BY created_at DESC;"
    return fetch_query(conn, query, (user_id,))



