export interface InternalResponseModel<T> {
  statusCode: number;
  message: string;
  body: T;
}
