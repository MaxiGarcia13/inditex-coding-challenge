import type { NextApiRequest } from 'next';
import type { ProductBase } from '@/domain/products';
import process from 'node:process';
import { NextResponse } from 'next/server';
import { getProductsGateway } from '@/services/products/products.gateway.service';
import { isHttpError } from '@/utils/http';

export async function GET(
  _: NextApiRequest,
  { params }: { params: Promise<Pick<ProductBase, 'id'>> },
) {
  try {
    const { id } = await params;

    const response = await getProductsGateway({ id });
    const data = await response.json();

    return NextResponse.json(
      data,
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
