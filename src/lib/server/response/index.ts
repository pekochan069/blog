// oxlint-disable-next-line anti-slop/no-unknown-parameters
export function apiError(header: string, error: unknown, body?: unknown) {
  return {
    error: JSON.stringify(
      {
        body: JSON.stringify(body),
        header: "header",
        message: error instanceof Error ? error.message : JSON.stringify(error),
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
