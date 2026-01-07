// Centralized API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth endpoints
  login: `${API_BASE_URL}/api/login`,
  signup: `${API_BASE_URL}/api/signup`,
  googleAuth: `${API_BASE_URL}/api/auth/google`,
  me: `${API_BASE_URL}/api/me`,

  // User endpoints
  users: `${API_BASE_URL}/api/users`,

  // Blog endpoints
  blogs: `${API_BASE_URL}/api/blogs`,
  blogById: (id: string) => `${API_BASE_URL}/api/blogs/${id}`,
} as const;

// API utility functions
export const apiClient = {
  get: async (url: string, options?: RequestInit) => {
    const token = localStorage.getItem("token");
    const headers = {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
    options?: RequestInit,
  ): Promise<T> => {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
  },

  delete: async (url: string, options?: RequestInit) => {
    const token = localStorage.getItem("token");
    const headers = {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(url, {
      ...options,
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Request failed" }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  },
};

// Auth helper functions
export const authHelpers = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  isAuthenticated: () => !!localStorage.getItem("token"),
};

export default API_ENDPOINTS;
