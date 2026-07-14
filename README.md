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

## Production

Build the React app:

```bash
npm run build
```

Start the Express app:

```bash
npm start
```

In production, Express serves the compiled React app from `dist/` and handles `/api/enquiries`.

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

The enquiry form sends to the Express endpoint at `/api/enquiries`.
