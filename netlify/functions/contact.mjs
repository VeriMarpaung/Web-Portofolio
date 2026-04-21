function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return response(405, { error: 'Method not allowed.' });
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const name = String(payload.name || '').trim();
    const email = String(payload.email || '').trim();
    const message = String(payload.message || '').trim();
    const website = String(payload.website || '').trim();

    // Honeypot field: if bots fill this, ignore silently.
    if (website) {
      return response(200, { ok: true });
    }

    if (!name || name.length < 2 || name.length > 80) {
      return response(400, { error: 'Name must be between 2 and 80 characters.' });
    }

    if (!isValidEmail(email)) {
      return response(400, { error: 'Please provide a valid email address.' });
    }

    if (!message || message.length < 10 || message.length > 5000) {
      return response(400, { error: 'Message must be between 10 and 5000 characters.' });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    if (!resendApiKey || !toEmail) {
      return response(500, { error: 'Email service is not configured yet.' });
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${resendApiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] New message from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          '',
          'Message:',
          message,
        ].join('\n'),
      }),
    });

    if (!resendResponse.ok) {
      const errBody = await resendResponse.text();
      return response(502, {
        error: 'Failed to send message through email provider.',
        details: errBody.slice(0, 240),
      });
    }

    return response(200, { ok: true });
  } catch {
    return response(500, { error: 'Unexpected error while processing your message.' });
  }
}
