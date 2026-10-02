import type { NextApiRequest } from 'next';
import type { Product } from '@/domain';
import process from 'node:process';
import { NextResponse } from 'next/server';
import { isHttpError } from '@/utils/http';

export async function GET(
  request: NextApiRequest,
  { params }: { params: Promise<Pick<Product, 'id'>> },
) {
  try {
    const { id } = await params;

    const response = await fetch(`${process.env.API_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY!,
      },
    });

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
