# Rohan Pathak — Portfolio

A responsive React/Vite portfolio with GitHub activity and a Web3Forms-powered contact form.

## Run locally

1. Install Node.js 20+.
2. From the repository root run `npm install`, then `npm run dev`.
3. Open the Vite URL (normally `http://localhost:5173`).

Projects, profile links, and skills are maintained in `client/src/data/portfolio.js`. The GitHub activity dashboard uses a Vercel function to keep its GitHub token off the browser. For local development, create `client/.env.local` and set `GITHUB_TOKEN` to a GitHub personal access token with the `read:user` scope. Never use a `VITE_` prefix for this secret.

## Deploy to Vercel

Set the Vercel project root directory to `client`, use `npm run build` as the build command, and `dist` as the output directory. Add `GITHUB_TOKEN` to the Vercel project's server-side environment variables to include private contribution totals in the graph. The contact form uses the Web3Forms access key configured in `client/src/components/ContactForm.jsx`.
