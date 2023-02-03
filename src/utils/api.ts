export type FailedResponse = {
  data?: never;
  error: string;
};
export type SuccessfullResponse<T> = {
  data: T;
  error?: never;
};
export type ApiResponse<T> = SuccessfullResponse<T> | FailedResponse;

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
