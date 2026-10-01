import type { NextApiRequest, NextApiResponse } from 'next';
import type { SearchRequest, SearchResponse } from '@/domain/search';
import process from 'node:process';
import { buildUrl } from '@/utils/url';

export default async function handler(
  req: NextApiRequest & { query: SearchRequest },
  res: NextApiResponse<SearchResponse>,
) {
  const { search, limit, offset } = req.query;

  const url = buildUrl(`${process.env.API_URL}/products`, { search, limit, offset });

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY!,
    },
    body: JSON.stringify({ search, limit, offset }),
  });

  res.status(response.status).json({ data: await response.json() });
}
