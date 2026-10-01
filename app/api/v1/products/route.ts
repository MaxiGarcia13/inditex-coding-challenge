import type { NextApiRequest } from 'next';
import type { ProductsRequest } from '@/domain/products';
import process from 'node:process';
import { NextResponse } from 'next/server';
import { uniqueBy } from '@/utils/array';
import { isHttpError } from '@/utils/http';
import { buildUrl } from '@/utils/url';

export async function GET(
  req: NextApiRequest & { query?: ProductsRequest },
) {
  try {
    const { search, limit, offset } = req.query ?? {};

    const url = buildUrl(`${process.env.API_URL}/products`, { search, limit, offset });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY!,
      },
    });
    const data = await response.json();

    const uniqueData = uniqueBy(data, 'id');

    return NextResponse.json(
      { data: uniqueData },
      { status: response.status },
    );
  } catch (error) {
    if (isHttpError(error)) {
      return NextResponse.json(
        error,
        { status: error.status },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
