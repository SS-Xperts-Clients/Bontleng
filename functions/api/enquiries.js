const jsonHeaders = {
  'Content-Type': 'application/json'
};

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders
  });
}

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

function escapeHtml(value) {
  return String(value).replace(/[<>&]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char]);
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
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd">${label}</th><td style="padding:8px;border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return {
    text,
    html: `<h2>New Elim Website Enquiry</h2><table cellspacing="0" cellpadding="0">${htmlRows}</table>`
  };
}

function getEmailConfig(env) {
  const requiredEnv = ['CLOUDFLARE_ACCOUNT_ID', 'CLOUDFLARE_EMAIL_API_TOKEN', 'MAIL_FROM', 'MAIL_TO'];
  const missing = requiredEnv.filter((key) => !env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing Cloudflare email configuration: ${missing.join(', ')}`);
  }

  return {
    accountId: env.CLOUDFLARE_ACCOUNT_ID,
    apiToken: env.CLOUDFLARE_EMAIL_API_TOKEN,
    from: env.MAIL_FROM,
    to: env.MAIL_TO
  };
}

async function handlePost(context) {
  let body;

  try {
    body = await context.request.json();
  } catch (error) {
    return json(400, { error: 'Invalid request body.' });
  }

  const errors = validateEnquiry(body);

  if (errors.length > 0) {
    return json(400, { error: errors[0], errors });
  }

  try {
    const config = getEmailConfig(context.env);
    const email = buildEmail(body);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/email/sending/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: config.from,
          to: config.to,
          reply_to: body.email,
          subject: `Elim enquiry from ${body.fullName}`,
          text: email.text,
          html: email.html
        })
      }
    );

    if (!response.ok) {
      console.error('Cloudflare Email Service failed:', await response.text());
      return json(500, { error: 'The enquiry could not be sent right now.' });
    }

    return json(200, { ok: true });
  } catch (error) {
    console.error('Failed to send enquiry email:', error);
    return json(500, { error: 'The enquiry could not be sent right now.' });
  }
}

export async function onRequest(context) {
  if (context.request.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  return handlePost(context);
}

