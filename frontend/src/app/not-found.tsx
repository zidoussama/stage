export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      {/* 404 Number */}
      <h1 className="text-9xl font-bold text-gray-200">404</h1>

      {/* Illustration or Icon */}
      <div className="relative -mt-16">
        <span className="text-6xl">🤔</span>
      </div>

      {/* Message */}
      <h2 className="mt-6 text-2xl font-semibold">Oops! Page not found</h2>
      <p className="mt-2 text-gray-500 text-center">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Back button */}
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Back Home
      </a>
    </div>
  );
}
