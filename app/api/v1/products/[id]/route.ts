import type { NextRequest } from 'next/server';
import type { ProductBase } from '@/domain/products';
import { NextResponse } from 'next/server';
import { mapProductDetailResponse } from '@/adapters/products';
import { getProductGateway } from '@/services/products/products.gateway.service';
import { isHttpError } from '@/utils/http';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<Pick<ProductBase, 'id'>> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 },
      );
    }

    const response = await getProductGateway(id);

    return NextResponse.json(
      mapProductDetailResponse(response),
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
