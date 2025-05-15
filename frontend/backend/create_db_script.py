import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

# SQL script to create tables
TABLES_SQL = """
CREATE TABLE IF NOT EXISTS users (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS videos (
    video_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    original_language VARCHAR(10) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW() NOT NULL,
    video_path TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL
);

CREATE TABLE IF NOT EXISTS audio (
    audio_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_id UUID REFERENCES videos(video_id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL,
    audio_path TEXT NOT NULL,
    duration FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS transcriptions (
    transcription_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    audio_id UUID REFERENCES audio(audio_id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL,
    text TEXT NOT NULL,
    word_timestamps JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS translations (
    translation_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transcription_id UUID REFERENCES transcriptions(transcription_id) ON DELETE CASCADE,
    source_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    translated_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS lip_sync_adjustments (
    sync_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_id UUID REFERENCES videos(video_id) ON DELETE CASCADE,
    source_language VARCHAR(10) NOT NULL,
    target_language VARCHAR(10) NOT NULL,
    shift_value FLOAT NOT NULL,
    sync_algorithm VARCHAR(50) NOT NULL DEFAULT 'DTW',
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS processed_videos (
    processed_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_id UUID REFERENCES videos(video_id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL,
    processed_video_path TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'completed' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS dubbings (
    dubbing_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_id UUID REFERENCES videos(video_id) ON DELETE CASCADE,
    target_language VARCHAR(10) NOT NULL,
    dubbing_status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    dubbing_audio_path TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
"""

def create_tables():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            port=os.getenv("DB_PORT", 5432)
        )
        cur = conn.cursor()
        cur.execute(TABLES_SQL)
        conn.commit()
        print("✅ Tables created successfully.")
    except Exception as e:
        print("❌ Error creating tables:", e)
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    create_tables()
