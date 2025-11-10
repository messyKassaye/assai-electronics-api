
export class ApiResponseDto<T> {
  success: boolean;
  message: string;
  object: T | null;
  errors: string[] | null;

  constructor(
    success: boolean,
    message: string,
    object: T | null = null,
    errors: string[] | null = null,
  ) {
    this.success = success;
    this.message = message;
    this.object = object;
    this.errors = errors;
  }

}
