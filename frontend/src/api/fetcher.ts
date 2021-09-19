const defaultRequestInit: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetcher =
  <T>(customRequestInit: RequestInit = {}) =>
  (input: RequestInfo, requestInit: RequestInit = {}): Promise<T> =>
    fetch(input, {
      ...defaultRequestInit,
      ...requestInit,
      ...customRequestInit,
      headers: {
        ...defaultRequestInit.headers,
        ...requestInit.headers,
        ...customRequestInit.headers,
      },
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.text();
      })
      .then((text) => {
        return JSON.parse(text || "{}") as unknown as T;
      })
      .catch((err: unknown) => {
        throw err;
      });
