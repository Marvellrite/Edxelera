// API Configuration and utilities
export const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export interface ApiSuccessResponse<T = any> {
  success: true;
  message?: string;
  data?: T;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP Error: ${response.status}`);
  }

  return response.json();
};

// Fetch with common configuration
export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  return handleApiResponse(response);
};
