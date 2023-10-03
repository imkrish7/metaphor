export class ResponseDto<T = any> {
  success: boolean;
  data?: T;
}
