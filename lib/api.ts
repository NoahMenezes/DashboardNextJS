// Centralized API configuration
const getApiBaseUrl = () => {
  // Check if we're in the browser
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    // In production (not localhost)
    if (hostname !== "localhost" && hostname !== "127.0.0.1") {
      // Use environment variable or construct from current location
      return (
        process.env.NEXT_PUBLIC_API_URL ||
        `${window.location.protocol}//${hostname}:5000`
      );
    }
  }

  // In development or SSR
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
};

const API_BASE_URL = getApiBaseUrl();

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
  blogById: (id: string | number) => `${API_BASE_URL}/api/blogs/${id}`,

  // User blog endpoints
  userBlogs: `${API_BASE_URL}/api/user-blogs`,
  userBlogById: (id: string | number) => `${API_BASE_URL}/api/user-blogs/${id}`,
  userBlogsByUser: (userId: string | number) =>
    `${API_BASE_URL}/api/user-blogs/user/${userId}`,
  myBlogs: `${API_BASE_URL}/api/user-blogs/my-blogs`,
} as const;

// API utility functions
export const apiClient = {
  get: async (url: string, options?: RequestInit) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: HeadersInit = {
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
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: HeadersInit = {
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
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: HeadersInit = {
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
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: HeadersInit = {
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
  getToken: () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null,
  setToken: (token: string) =>
    typeof window !== "undefined" && localStorage.setItem("token", token),
  removeToken: () =>
    typeof window !== "undefined" && localStorage.removeItem("token"),
  isAuthenticated: () =>
    typeof window !== "undefined" && !!localStorage.getItem("token"),

  // Get current user from token
  getCurrentUser: () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authHelpers.getCurrentUser();
    if (!user) return false;
    return user.id === 3 || user.email?.includes("admin");
  },
};

// Export base URL for use in components
export const getApiUrl = getApiBaseUrl;
export { API_BASE_URL };

export default API_ENDPOINTS;
