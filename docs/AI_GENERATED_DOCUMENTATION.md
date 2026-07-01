# AI Generated Documentation

This project is a full-stack job board application built using React.js, FastAPI, and PostgreSQL.

## User Roles

- Candidate: browse jobs, view details, apply, track applications.
- Recruiter: create jobs, view applications, update candidate status.
- Admin: view platform analytics and manage overview data.

## Backend

FastAPI exposes REST endpoints under `/api`.
Swagger docs are available at `/docs`.

## Frontend

React + Vite provides a responsive single-page application.

## Database

PostgreSQL stores users, companies, jobs, and applications.
Seed data is automatically inserted during first backend startup.
