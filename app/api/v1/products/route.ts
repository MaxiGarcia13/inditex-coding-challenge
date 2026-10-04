import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { mapProductSummariesResponse } from '@/adapters/products';
import { getProductsGateway } from '@/services/products/products.gateway.service';
import { isHttpError } from '@/utils/http';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const response = await getProductsGateway({
      search: searchParams.get('search'),
      limit: Number(searchParams.get('limit')) ?? 10,
      offset: Number(searchParams.get('offset')) ?? 0,
    });

    return NextResponse.json(
      mapProductSummariesResponse(response),
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
