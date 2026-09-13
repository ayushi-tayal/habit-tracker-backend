# Habit Tracker — Backend

REST API for a full-stack habit tracking application built with Node.js, Express, MongoDB and JWT.

## Features

- User registration
- User login
- JWT authentication
- Password hashing
- Password reset
- User profile management
- Core habit management
- Habit categories
- User-selected habits
- Daily habit logs
- Historical habit log retrieval
- Protected API routes

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## API Architecture

Angular Frontend
↓
HTTP Request
↓
Express Router
↓
Authentication Middleware
↓
Controller
↓
Mongoose
↓
MongoDB

## Authentication

Protected endpoints use JWT authentication.

Authorization header:

Bearer <token>

## Frontend

Angular frontend:
[habit-tracker-frontend](https://github.com/ayushi-tayal/habit-tracker-frontend)

## Environment Variables

