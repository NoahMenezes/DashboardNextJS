"use client";

import { useEffect, useState } from "react";

export function BackendWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Check if we're in production and API URL is not set
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isProduction =
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1";

    // Show warning if in production and no API URL is set (or it's localhost)
    if (isProduction && (!apiUrl || apiUrl.includes("localhost"))) {
      setShowWarning(true);
    }
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="max-w-2xl rounded-lg border-2 border-yellow-500 bg-yellow-50 p-6 shadow-2xl dark:bg-yellow-950">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
              🚨 Backend Not Configured
            </h3>
            <div className="mt-3 space-y-3 text-sm text-yellow-900 dark:text-yellow-100">
              <p className="font-semibold">
                This application cannot connect to the backend server.
              </p>

              <div className="rounded bg-yellow-100 p-3 dark:bg-yellow-900">
                <p className="font-semibold">Current Issue:</p>
                <p className="mt-1">
                  The app is trying to connect to{" "}
                  <code className="font-mono font-bold">localhost:5000</code>{" "}
                  which doesn't exist in production.
                </p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <p className="font-semibold">To fix this:</p>
                <ol className="ml-4 mt-2 list-decimal space-y-1.5">
                  <li>
                    Deploy the backend folder to Render, Railway, or similar
                    service
                  </li>
                  <li>
                    Add <code className="font-mono">NEXT_PUBLIC_API_URL</code>{" "}
                    environment variable in Vercel Settings
                  </li>
                  <li>
                    Example value:{" "}
                    <code className="font-mono">
                      https://your-backend.onrender.com
                    </code>
                  </li>
                  <li>Redeploy the frontend application in Vercel</li>
                </ol>
              </div>

              <div className="mt-4 rounded bg-yellow-200 p-3 dark:bg-yellow-800">
                <p className="text-xs font-semibold">
                  📚 Detailed Instructions:
                </p>
                <p className="mt-1 text-xs">
                  See <strong>QUICK_FIX_CHECKLIST.md</strong> in the repository
                  for step-by-step deployment instructions.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowWarning(false)}
              className="mt-4 rounded bg-yellow-600 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-800"
            >
              Dismiss (errors will continue)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
