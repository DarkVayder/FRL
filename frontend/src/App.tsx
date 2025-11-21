import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-linear-to-b from-white to-gray-100 shadow-sm py-6 px-6 sm:px-10 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight text-center">
          Flex Living Reviews Dashboard
        </h1>
        <p className="text-gray-600 mt-2 sm:text-lg max-w-xl text-center">
          Monitor, approve, and manage all property reviews from one place.
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-10">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 px-6 sm:px-10 text-center text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} Flex Living. All rights reserved.
      </footer>
    </div>
  );
}
