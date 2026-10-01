import type { NextApiRequest } from 'next';
import process from 'node:process';
import { NextResponse } from 'next/server';
import { uniqueBy } from '@/utils/array';
import { isHttpError } from '@/utils/http';
import { buildUrl } from '@/utils/url';

export async function GET(
  request: NextApiRequest,
) {
  try {
    const { searchParams } = new URL(request.url);

    const url = buildUrl(`${process.env.API_URL}/products`, {
      search: searchParams.get('search'),
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'),
    });

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
      {
        data: uniqueData,
        total: uniqueData.length,
      },
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
