import type { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { mapProductSummariesResponse } from '@/adapters/products';
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

    const uniqueData = uniqueBy(response, 'id');

    return NextResponse.json(
      mapProductSummariesResponse({
        data: uniqueData,
        total: uniqueData.length,
      }),
      { status: 200 },
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
