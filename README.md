# PrimeTrade Backend Developer Assignment
**Sneha Bhatia**

This project implements a secure and scalable REST API with authentication, role-based authorization, and a basic frontend UI for interacting with the APIs.

---

## Tech Stack
Backend:
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcrypt password hashing

Frontend:
- Vanilla HTML/CSS/JavaScript

---

## Features

### Authentication
- User Registration
- User Login
- Password hashing using bcrypt
- JWT token generation
- Protected routes using middleware

### Role Based Access Control
- Two roles: `user` and `admin`
- Users can manage their own tasks
- Admin can view all tasks

### Task Management (CRUD)
- Create Task
- View My Tasks
- Admin: View All Tasks
- Delete Task

### Security
- JWT authentication
- Password hashing
- Protected routes
- Authorization middleware

---

## API Versioning
All APIs are prefixed with:
/api/v1/

---

## API Endpoints

### Authentication
POST `/api/v1/auth/register` – Register user  
POST `/api/v1/auth/login` – Login user

### Tasks
POST `/api/v1/tasks` – Create task (protected)  
GET `/api/v1/tasks/my` – Get user tasks (protected)  
GET `/api/v1/tasks/all` – Admin only  
DELETE `/api/v1/tasks/:id` – Delete task

---

## Database Schema

### users table
| column | type |
|---|---|
id | SERIAL (PK)
name | VARCHAR
email | VARCHAR UNIQUE
password_hash | TEXT
role | VARCHAR (user/admin)

### tasks table
| column | type |
|---|---|
id | SERIAL (PK)
title | VARCHAR
description | TEXT
user_id | INT (FK)
created_at | TIMESTAMP

---

## Project Structure
backend/src
│
├── config (database connection)
├── controllers (business logic)
├── middleware (auth & role)
├── routes (API endpoints)
└── app.js (entry point)
---

## Frontend Flow
Register → Login → Dashboard → Task Manager

Flow explanation:
1. A new user registers an account.
2. Login generates a JWT token.
3. The token is stored in browser `localStorage`.
4. Protected routes are accessed using the `Authorization: Bearer <token>` header.

---

## Setup Instructions

### 1. Install dependencies
cd backend  
npm install


### 2. Configure environment
Create `.env` in backend:

PORT=5000  
DB_USER=postgres  
DB_PASSWORD=your_password  
DB_HOST=localhost  
DB_PORT=5432  
DB_NAME=primetrade  
JWT_SECRET=supersecretkey  


### 3. Create database
In PostgreSQL:

```sql
CREATE DATABASE primetrade;
```
->Create the users and tasks tables as described in the schema above.


### 4. Run server
npm run dev


### 5. Run frontend
Open:  
frontend/register.html

---

## Scalability Considerations

The application is designed with scalability in mind:

- Stateless JWT authentication allows multiple backend instances without session sharing
- Horizontal scaling behind a load balancer
- Redis caching for frequently accessed data (can be added for optimization)
- Separation of authentication into an independent service (microservice-ready architecture)
- Database read replicas for heavy read workloads
- Containerization using Docker for consistent deployment

---

## Testing

All APIs can be tested using the included Postman collection:
`postman_collection.json`



The collection contains requests for:
- User Registration
- User Login
- Creating Tasks
- Viewing User Tasks
- Admin Access to All Tasks

---

## Author

Sneha Bhatia
