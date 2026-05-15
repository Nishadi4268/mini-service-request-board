"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("authToken")));
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChanged", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChanged", syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("authChanged"));
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-blue-100 transition-colors"
          >
            GlobalTNA
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-blue-100 transition-colors">
              Home
            </Link>
            <Link
              href="/jobs/new"
              className="hover:text-blue-100 transition-colors"
            >
              Post New Job
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hover:text-blue-100 transition-colors"
                type="button"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="hover:text-blue-100 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
