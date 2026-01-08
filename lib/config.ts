// API Configuration for environment-based URLs

// Determine the API base URL based on environment
export const getApiUrl = () => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // In production, use the deployed backend URL
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      // Use environment variable if available, otherwise fallback to relative URL
      return process.env.NEXT_PUBLIC_API_URL || '/api';
    }
  }

  // In development or SSR, use localhost
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

export const API_BASE_URL = getApiUrl();

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
  USER_BLOGS_BY_USER: (userId: number | string) => `${API_BASE_URL}/user-blogs/user/${userId}`,
  MY_BLOGS: `${API_BASE_URL}/user-blogs/my-blogs`,
};

// Helper function to get full API URL
export const getFullApiUrl = (endpoint: string) => {
  if (endpoint.startsWith('http')) {
    return endpoint;
  }
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};
