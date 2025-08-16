'use client';
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { loginWithGoogle, auth } from "../firebase";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cek status login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-cyan-600 py-5 relative shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/sea.png" alt="Logo" className="w-10 h-10" />
          <span className="text-white text-2xl font-bold">SegaSea</span>
        </div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex items-center space-x-8">
          <li><a href="/" className="text-gray-200 font-semibold hover:text-white transition">Home</a></li>
          <li><a href="/beach" className="text-gray-200 font-semibold hover:text-white transition">Beach</a></li>
          <li><a href="/location" className="text-gray-200 font-semibold hover:text-white transition">Location</a></li>
        </ul>

        {/* Login / Logout Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white font-medium">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-500 rounded text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="px-4 py-1 bg-white rounded text-cyan-600 font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          )}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-cyan-700 p-4 space-y-3 animate-fadeIn">
          <a href="/" className="block text-gray-200 font-semibold hover:text-white">Home</a>
          <a href="/beach" className="block text-gray-200 font-semibold hover:text-white">Beach</a>
          <a href="/location" className="block text-gray-200 font-semibold hover:text-white">Location</a>
          <hr className="border-gray-500" />
          {user ? (
            <>
              <span className="block text-white">{user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="w-full bg-white text-cyan-600 py-2 rounded hover:bg-gray-200 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
