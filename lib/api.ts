// Centralized API configuration with static environment variable
// This prevents hydration errors by avoiding dynamic window checks

// Use static environment variable - must be set in Vercel
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort("Request timeout");
    }, 10000);

    try {
      const response = await fetch(url, {
        ...options,
        method: "GET",
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          "Request timeout. Please ensure the backend is running on port 5000.",
        );
      }
      throw error;
    }
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort("Request timeout");
    }, 10000);

    try {
      const response = await fetch(url, {
        ...options,
        method: "POST",
        headers,
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          "Request timeout. Please ensure the backend is running on port 5000.",
        );
      }
      throw error;
    }
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort("Request timeout");
    }, 10000);

    try {
      const response = await fetch(url, {
        ...options,
        method: "PUT",
        headers,
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          "Request timeout. Please ensure the backend is running on port 5000.",
        );
      }
      throw error;
    }
  },

  delete: async (url: string, options?: RequestInit) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const headers: HeadersInit = {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort("Request timeout");
    }, 10000);

    try {
      const response = await fetch(url, {
        ...options,
        method: "DELETE",
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Request failed" }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(
          "Request timeout. Please ensure the backend is running on port 5000.",
        );
      }
      throw error;
    }
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

  // Get current user from localStorage
  getCurrentUser: () => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Get current user from token
  getUserFromToken: () => {
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

  // Check if user is admin (user ID 3 is admin)
  isAdmin: () => {
    const user = authHelpers.getCurrentUser();
    if (!user) return false;
    return user.id === 3 || user.email?.includes("admin");
  },
};

// Export base URL for use in components
export { API_BASE_URL };
export default API_ENDPOINTS;
