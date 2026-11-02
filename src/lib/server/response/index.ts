export function apiError(header: string, message: string | undefined, serializedBody?: string) {
  return {
    error: JSON.stringify(
      {
        body: serializedBody,
        header: "header",
        message,
      },
      undefined,
      2
    ),
    ok: false,
  } as const;
}

export function apiSuccess<T>(data: T) {
  return {
    data,
    ok: true,
  } as const;
}
