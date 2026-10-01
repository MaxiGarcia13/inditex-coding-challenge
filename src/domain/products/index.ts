import type { HttpResponse } from '../http';

export interface Product {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export type ProductsResponse = HttpResponse<Array<Product>>;

export interface ProductsRequest {
  search?: string;
  limit?: number;
  offset?: number;
}
