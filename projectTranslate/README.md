# Project Translate

A Django-based web application that integrates with LM Studio for text processing and MongoDB for data storage.

## Project Overview

This project is a web application built with Django that provides text processing capabilities through LM Studio integration and uses MongoDB as its database backend. The application features a frontend interface for user interaction and an API endpoint for text processing.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.8 or higher
- MongoDB
- LM Studio (for local LLM processing)
- uv (Python package manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd projectTranslate
```

2. Create and activate a virtual environment:
```bash
uv init .
source .venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install required packages using uv:
```bash
uv sync
```

4. Set up MongoDB:
   - Install MongoDB on your system
   - Start MongoDB service
   - The application is configured to connect to MongoDB on localhost:27017 by default

5. Set up LM Studio:
   - Install and run LM Studio
   - Configure your preferred language model
   - Note the API endpoint provided by LM Studio (typically http://localhost:1234/v1/chat/completions)

## Configuration

1. Database Configuration:
   - The project is configured to use MongoDB through djongo
   - Default settings are in `projectTranslate/settings.py`
   - Modify the DATABASES configuration if you need to change MongoDB connection details

2. LM Studio Configuration:
   - Update the LM Studio API endpoint in your views.py file
   - Configure the correct model parameters for your use case

## Running the Application

1. Start MongoDB:
```bash
mongod
```

2. Start LM Studio and load your preferred model

3. Run Django development server:
```bash
python manage.py runserver
```

4. Access the application at `http://localhost:8000`

## API Endpoints

- `POST /register_log/`: Endpoint for text processing and logging
  - Accepts JSON data with 'user_input' field
  - Returns success/error response

## Project Structure

```
projectTranslate/
├── apps/
│   └── frontend/
│       ├── static/
│       ├── templates/
│       ├── models.py
│       ├── views.py
│       └── serializer.py
├── projectTranslate/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── staticfiles/
├── manage.py
└── README.md
```

## Development

- The frontend application is located in `apps/frontend/`
- Static files are served from `apps/frontend/static/`
- Templates are located in `apps/frontend/templates/`
- Database models and serializers are in the frontend app
