import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { getProductsGateway } from '@/services/products/products.gateway.service';
import { uniqueBy } from '@/utils/array';
import { isHttpError } from '@/utils/http';

export async function GET(
  request: NextApiRequest,
) {
  try {
    const { searchParams } = new URL(request.url);

    const response = await getProductsGateway({
      search: searchParams.get('search'),
      limit: Number(searchParams.get('limit')),
      offset: Number(searchParams.get('offset')),
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
