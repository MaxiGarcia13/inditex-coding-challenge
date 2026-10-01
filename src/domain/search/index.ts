import type { HttpResponse } from '../http';

export interface SearchResult {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export type SearchResponse = HttpResponse<Array<SearchResult>>;

export interface SearchRequest {
  search?: string;
  limit?: number;
  offset?: number;
}
