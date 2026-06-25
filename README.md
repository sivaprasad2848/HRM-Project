# HRM Recruitment Management System

A comprehensive Recruitment Management Platform built using Django REST Framework, React, and PostgreSQL.

The system helps organizations streamline their recruitment process by managing companies, HR teams, job vacancies, candidate applications, assessments, interviews, and hiring workflows from a centralized platform.

---

## Overview

The HRM Recruitment Management System is designed to automate the complete hiring lifecycle.

The platform supports:

- Company Management
- HR Management
- Candidate Registration
- Resume Upload
- AI Skill Matching
- Job Applications
- MCQ Assessments
- Machine Tests
- Interview Scheduling
- Recruitment Analytics

The application follows a role-based architecture where Admins, HRs, and Candidates have separate dashboards and permissions.

---

## Features

### Admin

- Manage Companies
- Manage HR Users
- View System Reports
- Monitor Recruitment Activities
- Dashboard Analytics

### HR

- Create Job Vacancies
- Review Candidate Profiles
- Manage Applications
- Schedule Assessments
- Conduct Interviews
- Approve or Reject Candidates

### Candidate

- QR Based Registration
- Profile Management
- Resume Upload
- AI Based Job Recommendations
- Apply for Jobs
- Attend Assessments
- Track Application Status

### Resume Processing

- Resume Upload
- Skill Extraction
- Experience Extraction
- Education Extraction
- AI Job Matching

### Assessment Module

#### MCQ Test

- Timed Assessments
- Auto Evaluation
- Score Calculation
- Result Publishing

#### Machine Test

- Coding Challenges
- Submission Tracking
- Evaluation Workflow

### Interview Management

- Interview Scheduling
- Interview Feedback
- Candidate Evaluation
- Final Selection Process

### Notifications

- Email Notifications
- Application Updates
- Assessment Reminders
- Interview Alerts

### Reports & Analytics

- Candidate Reports
- Job Reports
- Recruitment Analytics
- Hiring Statistics

---

## Tech Stack

### Backend

- Python 3.13
- Django
- Django REST Framework
- JWT Authentication
- PostgreSQL

### Frontend

- React
- Vite
- Axios
- React Router DOM
- React Hook Form

### Database

- PostgreSQL

### DevOps

- GitHub
- GitHub Actions
- Nginx
- Gunicorn

---

## Project Structure

```text
HRM-Project/

├── Backend/
│
│   ├── apps/
│   │
│   ├── accounts/
│   ├── companies/
│   ├── candidates/
│   ├── jobs/
│   ├── applications/
│   ├── assessments/
│   ├── interviews/
│   ├── notifications/
│   ├── reports/
│
│
│   ├── config/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── Frontend/
│
│   ├── public/
│   ├── src/
│   │
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── modules/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   └── utils/
│
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-org/hrm-project.git
```

### Navigate to Project

```bash
cd HRM-Project
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd Backend
```

Create Virtual Environment:

```bash
python -m venv venv
```

Activate Environment:

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Create .env file:

```env
DEBUG=True

SECRET_KEY=your-secret-key

DB_NAME=hrm_db
DB_USER=postgres
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432
```

Run Migrations:

```bash
python manage.py migrate
```

Create Super User:

```bash
python manage.py createsuperuser
```

Start Backend Server:

```bash
python manage.py runserver
```

Backend URL:

```text
http://127.0.0.1:8000/
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd Frontend
```

Install Packages:

```bash
npm install
```

Create .env file:

```env
VITE_API_URL=http://127.0.0.1:8000/api/
```

Run Frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173/
```

---

## User Roles

| Role | Responsibilities |
|--------|----------------|
| Admin | Company & HR Management |
| HR | Job Posting & Recruitment |
| Candidate | Job Applications & Assessments |

---

## Recruitment Workflow

```text
Admin
  ↓
Create Company
  ↓
Assign HR
  ↓
HR Creates Job
  ↓
Candidate Registration
  ↓
Resume Upload
  ↓
AI Skill Matching
  ↓
Apply Job
  ↓
HR Review
  ↓
MCQ Test
  ↓
Machine Test
  ↓
Interview
  ↓
Selection
```

---

## Branching Strategy

### Main Branch

```text
main
```

Production Ready Code

### Development Branch

```text
development
```

Integration Branch

### Feature Branches

```text
feature/accounts
feature/jobs
feature/applications
feature/interviews
feature/assessments
```

---

## Git Workflow

```text
feature/*
     ↓
Pull Request
     ↓
development
     ↓
Testing
     ↓
main
```

---

## CI/CD

This project uses GitHub Actions for Continuous Integration and Continuous Deployment.

Pipeline Includes:

- Dependency Installation
- Code Quality Checks
- Backend Testing
- Frontend Build
- Deployment

---

## Contributors

Cyber Square Technologies

Software Development Team

Internship & Live Project Training Program

---

## License

This project is developed for educational, training, and enterprise recruitment management purposes.