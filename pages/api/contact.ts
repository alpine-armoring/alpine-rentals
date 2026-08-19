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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  try {
    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/emails`,
      {
        method: 'POST',
        headers: strapiHeaders(),
        body: JSON.stringify(req.body),
      }
    );
    const strapiData = await strapiRes.json();
    res.status(strapiRes.status).json(strapiData);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
}
