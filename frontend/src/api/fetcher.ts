const defaultRequestInit: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
}

export const fetcher =
  <T>(customRequestInit: RequestInit = {}) =>
    (input: RequestInfo, requestInit: RequestInit = {}) =>
      fetch(input, {
        ...defaultRequestInit,
        ...requestInit,
        ...customRequestInit,
        headers: {
          ...defaultRequestInit.headers,
          ...requestInit.headers,
          ...customRequestInit.headers,
        },
      }).then((res) => {
        if (!res.ok) throw res;
        return res.text();
      }).then((text) => {
        if (text.length === 0) return;

        return JSON.parse(text)
      }).catch((err: unknown) => {
        throw err;
      });
