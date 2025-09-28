// app/routes/unauthorized.tsx
import { Link } from "@remix-run/react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen  flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {/* Icon (Lock) */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Title & Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          403 - Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page. Contact your administrator
          if you believe this is a mistake.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>
          
        </div>
      </div>
    </div>
  );
}