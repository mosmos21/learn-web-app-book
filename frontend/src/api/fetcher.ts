const defaultRequestInit: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetcher = async <T>(input: RequestInfo, requestInit: RequestInit = {}): Promise<T> => {
  const res = await fetch(input, {
    ...defaultRequestInit,
    ...requestInit,
  });
  if (!res.ok) throw res;
  const body = await res.text();

  return JSON.parse(body || "{}") as unknown as T;
};
