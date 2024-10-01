export const formatCurrency = (
  amount: number,
  locale: string = "en-US",
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

type FetchOptions = {
  method?: string;
  body?: unknown;
  headers?: { [key: string]: string };
};

export const fetchData = async <T>(
  endpoint: string,
  options?: FetchOptions,
): Promise<T> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};
