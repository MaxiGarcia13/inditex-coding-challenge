import type { HttpResponse } from '../http';
import type { ProductSummary } from './products';

export type ProductsResponse = HttpResponse<Array<ProductSummary>> & { total: number };

export interface ProductsRequest {
  search?: string;
  limit?: number;
  offset?: number;
}
