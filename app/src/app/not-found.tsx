import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f5f2] text-gray-800">
        <h1 className="text-8xl font-bold text-black">404</h1>
        <p className="text-2xl mt-4">Oops! The page you are looking for does not exist.</p>
        <div className="mt-6">
          <Link href="/" className="px-6 py-3 text-lg font-semibold text-white bg-black rounded-lg shadow-lg inline-block">
            Go Home 🏠
          </Link>
        </div>
      </div>
    );
  }