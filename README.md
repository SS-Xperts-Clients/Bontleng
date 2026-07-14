# Bontleng Student accommodation

React + Express website for Bontleng Student accommodation.

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Fill in the SMTP values in `.env`.

Run the frontend and backend during development:

```bash
npm run dev
```

Frontend:

- `http://localhost:5173`

Backend:

- `http://localhost:3000`
- `GET /api/health`
- `POST /api/enquiries`

## Netlify Deployment

This project is ready to deploy on Netlify.

Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

The `netlify.toml` file configures:

- `/api/enquiries` -> Netlify Function for enquiry emails
- `/api/health` -> Netlify Function health check
- `/*` -> `/index.html` for React routes like `/rooms`, `/tour`, and `/contact`

Set these environment variables in Netlify under Site configuration > Environment variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO`

Optional variables:

- `SMTP_SECURE`
- `MAIL_FROM`

## Express Production

Build the React app:

```bash
npm run build
```

Start the Express app:

```bash
npm start
```

In Express production, Express serves the compiled React app from `dist/` and handles `/api/enquiries`.

## Email

SMTP credentials must stay server-side in `.env` or hosting environment variables.

Required variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO`

Optional variables:

- `PORT`
- `NODE_ENV`
- `CLIENT_ORIGIN`
- `SMTP_SECURE`
- `MAIL_FROM`

## Content Updates

Update visible site content in:

- `src/data/site.js`

Replace these placeholders before launch:

- `site.email`
- `site.phone`
- `site.address`
- Room image URLs
- Room pricing if prices should be shown

The enquiry form sends to `/api/enquiries`. On Netlify, that route is rewritten to a Netlify Function. In local Express development, it is handled by `server/index.js`.
