# Rohan Pathak — Portfolio

A responsive MERN portfolio with a React/Vite client and an Express/Mongoose API arranged with MVC-style models, controllers, and routes.

## Run locally

1. Install Node.js 20+ and MongoDB (local or Atlas).
2. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
3. From the repository root run `npm install`, then `npm run dev`.
4. Open the client URL printed by Vite (normally `http://localhost:5173`). The API runs on port 5000.

The UI includes resume projects as editable starter content; update `client/src/data/portfolio.js` as your portfolio grows. The API also exposes projects and contact-message endpoints. MongoDB is optional for the page to render, but required for contact submissions and database-backed project reads.

## Portrait

Place your portrait at `client/public/images/rohan-portrait.jpg`. The hero includes a styled fallback until that file is present.

## API

- `GET /api/health`
- `GET /api/projects`
- `POST /api/contact` with `{ name, email, subject?, message }`
