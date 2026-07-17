# Database Migration Guide

## Error: "relation 'candidates_candidate' does not exist"

This error occurs because the database tables haven't been created yet. Follow these steps to fix it:

## Step 1: Activate Virtual Environment

```bash
cd Backend

# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

## Step 2: Ensure PostgreSQL is Running

Make sure PostgreSQL service is running on your system.

## Step 3: Configure Environment Variables

Create or update the `.env` file in the Backend directory with your PostgreSQL credentials:

```env
DB_NAME=hrm_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

## Step 4: Run Migrations

```bash
# Create migration files
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

## Step 5: Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

Follow the prompts to create an admin user.

## Step 6: Start the Server

```bash
python manage.py runserver
```

## Verification

After running migrations, the `candidates_candidate` table will be created in your PostgreSQL database, and the registration form will work correctly.

## Troubleshooting

If you get "database does not exist" error:
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE hrm_db;

# Exit
\q
```

Then run migrations again.