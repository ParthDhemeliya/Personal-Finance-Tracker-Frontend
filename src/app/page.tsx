import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Personal Finance Tracker
      </h1>
      <p className="mb-8 text-lg text-gray-700">
        Track your income, expenses, and savings goals.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
