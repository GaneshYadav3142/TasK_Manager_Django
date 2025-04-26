import { useEffect } from "react";

export default function Homepage() {
  useEffect(() => { 
    localStorage.clear()
  }, []); 
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Container for Content */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Welcome to Task Manager 🎉
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          A simple and efficient way to manage your tasks. Create, update, and track your tasks seamlessly, all in one place!
        </p>

        {/* Button Container */}
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Login
          </a>
          <a
            href="/register"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
