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

// dateHelper.ts
export function formatDate(date: Date): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the parsedDate is valid
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  const now = new Date();
  const timeDifference = now.getTime() - parsedDate.getTime();
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(hoursDifference / 24);
  const monthsDifference = Math.floor(daysDifference / 30);
  
  // Format options for date if more than a month ago
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  
  // If the date is less than one month ago
  if (monthsDifference === 0) {
    if (daysDifference === 0) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else {
      return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    }
  } 
  
  // If the date is more than one month ago
  return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
}


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

  console.log(url);

  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-cache",
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};


