export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
