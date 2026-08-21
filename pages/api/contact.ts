import type { NextApiRequest, NextApiResponse } from 'next';

// No-op until STRAPI_API_TOKEN is set — lets this ship ahead of the token existing.
function strapiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (process.env.STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }
  return headers;
}

// Only these reach Strapi — anything else in the request body is dropped rather than
// forwarded, since this route carries a privileged bearer token for every request that
// passes reCAPTCHA, whatever shape its payload happens to be.
const ALLOWED_EMAIL_FIELDS = [
  'name',
  'email',
  'mobileNumber',
  'phoneNumber',
  'company',
  'state',
  'message',
  'route',
  'date',
  'mileage',
  'driverNeeded',
  'fromDate',
  'toDate',
  'vehicleType',
  'vehicleModel',
  'domain',
  'trackingData',
];

function sanitizeEmailData(
  data: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of ALLOWED_EMAIL_FIELDS) {
    if (key in data) result[key] = data[key];
  }
  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { token, data } = req.body;

  if (!token) {
    // grecaptcha never loaded on the client (ad blocker, firewall) — see Form.tsx
    console.warn('[contact] empty reCAPTCHA token', { email: data?.email });
    res.status(400).json({
      error:
        'Verification could not load. Please disable ad blockers or privacy extensions and try again.',
    });
    return;
  }

  try {
    const verify = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${encodeURIComponent(token)}`,
      }
    );

    const verdict = await verify.json();
    const { success, score } = verdict;

    if (!success || score < 0.3) {
      console.warn('[contact] reCAPTCHA rejected', {
        success,
        score,
        errorCodes: verdict['error-codes'],
        email: data?.email,
      });
      res.status(400).json({
        error:
          'Verification failed. Please try again, or contact us directly by phone or email.',
      });
      return;
    }

    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/emails`,
      {
        method: 'POST',
        headers: strapiHeaders(),
        body: JSON.stringify({ data: sanitizeEmailData(data) }),
      }
    );
    const strapiData = await strapiRes.json();
    res.status(strapiRes.status).json(strapiData);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
