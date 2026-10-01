export interface HttpResponse<T> {
  data: T;
}

export interface HttpError {
  error: string;
  message?: string;
  status?: number;
}
