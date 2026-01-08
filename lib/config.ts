// API Configuration for environment-based URLs

// Use static environment variable to prevent hydration issues
// NEXT_PUBLIC_API_URL should be set in Vercel environment variables
// For local development, it defaults to http://localhost:5000/api
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,

  // Blog endpoints
  BLOGS: `${API_BASE_URL}/blogs`,
  BLOG_BY_ID: (id: number | string) => `${API_BASE_URL}/blogs/${id}`,

  // User blog endpoints
  USER_BLOGS: `${API_BASE_URL}/user-blogs`,
  USER_BLOG_BY_ID: (id: number | string) => `${API_BASE_URL}/user-blogs/${id}`,
  USER_BLOGS_BY_USER: (userId: number | string) =>
    `${API_BASE_URL}/user-blogs/user/${userId}`,
  MY_BLOGS: `${API_BASE_URL}/user-blogs/my-blogs`,
};

// Helper function to get full API URL
export const getFullApiUrl = (endpoint: string) => {
  if (endpoint.startsWith("http")) {
    return endpoint;
  }
  return `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};
