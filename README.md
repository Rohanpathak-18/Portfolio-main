# Rohan Pathak — Portfolio

A responsive React/Vite portfolio with static project data and a Web3Forms-powered contact form.

## Run locally

1. Install Node.js 20+.
2. From the repository root run `npm install`, then `npm run dev`.
3. Open the Vite URL (normally `http://localhost:5173`).

This portfolio runs entirely in the browser: projects, profile links, and skills are maintained in `client/src/data/portfolio.js`. The contact form submits directly to Web3Forms, so no portfolio API or database is required.

## Deploy to Vercel

Set the Vercel project root directory to `client`, use `npm run build` as the build command, and `dist` as the output directory. The contact form uses the Web3Forms access key configured in `client/src/components/ContactForm.jsx`.
