
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-amber-500"
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

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Page not found</h2>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 text-sm font-medium rounded-md bg-amber-500 hover:bg-amber-600 text-white transition-colors"
          >
            Go back
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
          >
            Return home
          </button>
        </div>

      </div>
    </div>
  )
}

export default NotFound