//author: hiki
export default interface ApiResponse<TResponse> {
  isSuccessed: boolean;
  statusCode: number;
  message: string;
  resultObj?: TResponse;
}
