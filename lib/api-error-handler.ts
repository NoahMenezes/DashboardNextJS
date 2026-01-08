// API Error Handler with user-friendly messages

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isNetworkError: boolean = false
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: unknown): string => {
  // Network/Connection errors
  if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
    if (typeof window !== "undefined") {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl || apiUrl.includes("localhost")) {
        return "⚠️ Backend server is not configured. The app is trying to connect to localhost, but the backend is not deployed. Please contact the administrator.";
      }
      return "❌ Cannot connect to the server. Please check your internet connection or try again later.";
    }
    return "Network error occurred";
  }

  // API Error responses
  if (error instanceof ApiError) {
    return error.message;
  }

  // Standard Error
  if (error instanceof Error) {
    // Check for common error messages
    if (error.message.includes("CORS")) {
      return "Server configuration error. Please contact the administrator.";
    }
    if (error.message.includes("Unauthorized") || error.message.includes("401")) {
      return "Your session has expired. Please log in again.";
    }
    if (error.message.includes("Forbidden") || error.message.includes("403")) {
      return "You don't have permission to perform this action.";
    }
    if (error.message.includes("Not Found") || error.message.includes("404")) {
      return "The requested resource was not found.";
    }
    return error.message;
  }

  // Unknown error
  return "An unexpected error occurred. Please try again.";
};

// Check if backend is configured
export const isBackendConfigured = (): boolean => {
  if (typeof window === "undefined") return true; // Skip check during SSR

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return !!(apiUrl && !apiUrl.includes("localhost"));
};

// Display backend configuration warning
export const getBackendWarning = (): string | null => {
  if (isBackendConfigured()) return null;

  return `
    🚨 CONFIGURATION REQUIRED 🚨

    The backend API URL is not configured for production.

    To fix this:
    1. Deploy your backend to Render, Railway, or similar service
    2. Set NEXT_PUBLIC_API_URL in Vercel environment variables
    3. Example: NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

    See QUICK_FIX_CHECKLIST.md for detailed instructions.
  `;
};

// Wrapper for fetch with better error handling
export const safeFetch = async (
  url: string,
  options?: RequestInit
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new ApiError(handleApiError(error), 0, true);
    }
    throw error;
  }
};
