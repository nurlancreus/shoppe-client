// http-client.ts
export class HttpClient {
    private baseUrl: string;

    constructor(baseUrl: string = process.env.BASE_API_URL || '') {
        this.baseUrl = baseUrl;
    }

    // Generic method to handle fetch requests
    private async request<T>(
        url: string,
        method: string,
        body?: unknown,
        options?: RequestInit
    ): Promise<T> {
        const headers = {
            'Content-Type': 'application/json',
            ...(options?.headers || {}),
        };

        const response = await fetch(`${this.baseUrl}${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    // HTTP GET method
    public get<T>(url: string, options?: RequestInit): Promise<T> {
        console.log(`${this.baseUrl}${url}`, "BASEEEEE")
        return this.request<T>(url, 'GET', undefined, options);
    }

    // HTTP POST method
    public post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(url, 'POST', body, options);
    }

    // HTTP PUT method
    public put<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(url, 'PUT', body, options);
    }

    // HTTP DELETE method
    public delete<T>(url: string, options?: RequestInit): Promise<T> {
        return this.request<T>(url, 'DELETE', undefined, options);
    }
}
