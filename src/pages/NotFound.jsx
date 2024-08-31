import {Link} from "react-router-dom"
export default function NotFound() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="text-center bg-blue-300 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-blue-900">404</h1>
          <p className="text-xl text-blue-700 mt-4">Oops! Page not found.</p>
          <p className="text-gray-600 mt-2">The page you're looking for might have been moved or deleted.</p>
          <Link to="/" className="inline-block">
        <button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
          Move to Homepage
        </button>
      </Link>
        </div>
      </div>
    );
  }
  