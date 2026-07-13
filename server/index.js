import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const app = express();
const port = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
    })
  );
}

app.use(express.json({ limit: '80kb' }));

function required(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateEnquiry(body) {
  const errors = [];

  if (!required(body.fullName)) errors.push('Full name is required.');
  if (!required(body.email)) errors.push('Email address is required.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email || '')) {
    errors.push('A valid email address is required.');
  }
  if (!required(body.phone)) errors.push('Phone number is required.');
  if (!required(body.roomType)) errors.push('Room type is required.');
  if (!required(body.message)) errors.push('Message is required.');
  if (body.consent !== true) errors.push('Consent is required.');

  return errors;
}

function createTransporter() {
  const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'];
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing email configuration: ${missing.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function buildEmail(body) {
  const submitted = [
    ['Full name', body.fullName],
    ['Email', body.email],
    ['Phone', body.phone],
    ['Academic institution', body.institution || 'Not supplied'],
    ['Room type', body.roomType],
    ['Intended move-in date', body.moveInDate || 'Not supplied'],
    ['Message', body.message]
  ];

  const text = submitted.map(([label, value]) => `${label}: ${value}`).join('\n');
  const htmlRows = submitted
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd">${label}</th><td style="padding:8px;border-bottom:1px solid #ddd">${String(
          value
        ).replace(/[<>&]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char])}</td></tr>`
    )
    .join('');

  return {
    text,
    html: `<h2>New Pendula Website Enquiry</h2><table cellspacing="0" cellpadding="0">${htmlRows}</table>`
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/enquiries', async (req, res) => {
  const errors = validateEnquiry(req.body || {});

  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0], errors });
  }

  try {
    const transporter = createTransporter();
    const email = buildEmail(req.body);

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: req.body.email,
      subject: `Pendula enquiry from ${req.body.fullName}`,
      text: email.text,
      html: email.html
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    return res.status(500).json({ error: 'The enquiry could not be sent right now.' });
  }
});

if (isProduction) {
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Pendula app listening on port ${port}`);
});
