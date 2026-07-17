# Student Registration System - Setup Guide

## Overview
This system allows students to scan a QR code and register through a web form. The data is saved to a PostgreSQL database.

## System Architecture
- **Frontend**: React (Vite) - Port 5173
- **Backend**: Django REST Framework - Port 8000
- **Database**: PostgreSQL

## Pages
1. **QR Display Page** (`http://localhost:5173/`) - Shows QR code to scan
2. **Registration Page** (`http://localhost:5173/register`) - Registration form

## Setup Instructions

### 1. Database Setup (PostgreSQL)

Make sure PostgreSQL is installed and running, then create a database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE hrm_db;

# Create a user (optional, or use existing postgres user)
CREATE USER hrm_user WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE hrm_db TO hrm_user;

# Exit
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file in Backend directory with:
DB_NAME=hrm_db
DB_USER=postgres (or your username)
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. QR Code Setup

The QR code image is located at `frontend/src/assets/QR.png`. 

**Important**: You need to generate a QR code that points to your registration URL:
- For development: `http://localhost:5173/register`
- For production: `https://your-domain.com/register`

To generate a QR code:
1. Go to any QR code generator (e.g., qr-code-generator.com)
2. Enter your registration URL
3. Download the QR code image
4. Replace `frontend/src/assets/QR.png` with your generated QR code

### 5. Test the System

1. Open browser and go to `http://localhost:5173`
2. You should see the QR display page
3. Scan the QR code with your phone camera
4. It should open the registration form at `http://localhost:5173/register`
5. Fill out the form and submit
6. Check PostgreSQL database to verify data was saved

## API Endpoint

**POST** `http://localhost:8000/api/candidates/register/`

Request Body (multipart/form-data):
- `full_name` (string, required)
- `email` (string, required, unique)
- `phone` (string, required)
- `course` (string, required)
- `cv` (file, optional)
- `profile_photo` (file, optional)

Response:
```json
{
    "message": "Registration successful!",
    "data": {
        "id": 1,
        "full_name": "John Doe",
        "email": "john@example.com",
        "phone": "+91 1234567890",
        "course": "web_development",
        "created_at": "2026-07-17T12:00:00Z"
    }
}
```

## Database Schema

Table: `candidates_candidate`
- `id` (Primary Key)
- `full_name` (VARCHAR 100)
- `email` (VARCHAR 100, Unique)
- `phone` (VARCHAR 20)
- `course` (VARCHAR 50)
- `cv` (File Field)
- `profile_photo` (Image Field)
- `created_at` (DateTime)
- `updated_at` (DateTime)

## Troubleshooting

1. **CORS Errors**: Make sure backend is running on port 8000 and frontend on 5173
2. **Database Connection Error**: Check PostgreSQL is running and credentials in .env are correct
3. **File Upload Not Working**: Ensure MEDIA_ROOT and MEDIA_URL are configured in settings.py
4. **QR Code Not Working**: Make sure QR code image contains the correct URL

## Next Steps

1. Configure email backend for sending confirmation emails
2. Add email verification
3. Create admin panel to view registered candidates
4. Add login/authentication system
5. Deploy to production