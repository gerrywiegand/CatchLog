# CatchLog

CatchLog is a full-stack productivity application built with React and Flask that allows users to log and track their fishing catches. Users can authenticate, manage species, record catch data, and view their catch history with pagination.

## Demo
https://www.loom.com/share/17635d25f7ae4d71ba356157d2c45a2f

## Features

- User authentication with session-based login
- Create, view and manage catches and species database
- Track catch data including
  - Species
  - Weight
  - Length
  - Lure used (optional)
- Paginated catch istory
- Manage species ( add and view)
- Mobile friendly UI with large touch targets for wet and dirty hands
- Feedback on successful actions
- Protected routes (users can only access their data)

## Tech Stack

### Frontend

- React (Vite)
- React Router
- Material UI (MUI)
- Javascript

### Backend

- Flask
- Flask-SQL-Alchemy
- Flask-Migrate
- SQLite (plans for PostgreSQL)
- Session based authentication

## Setup and Installation

Plans to deploy in the near future

clone repo (https://github.com/gerrywiegand/CatchLog.git)

### Backend

Database will be blank by default. Run seed_species to populate generic fish species
** WARNING **
do not seed_species after you have begun using the app, it will delete all records

```bash
cd Back
pipenv install
pipenv shell
flask db upgrade
python seed_species.py
flask run
```

### Frontend

```bash
cd Front
cd CatchLog
npm install
npm run dev
```

## Authentication

- Users must signup or login to access the app (signup will also login)
- All API routes are protected via session authentication
- Users can only create, view, update or delete their own records (CRUD)

## API Overview

### Catches

- GET /catches (paginated)
- POST /catches
- PATCH /catches
- DELETE /catches

### Species

- GET /species
- POST /species

## Future improvements

- Edit and delete species
- External API call to auto-suggest species and populate data
- Location, weather, and lunar phase tracking
- Data analytics and charts on catch data (most successful lure, catch by species, etc.)
- External weather and location tracking
- Schema-based validation with marshmallow (in progress)

# Author

Gerry Wiegand
