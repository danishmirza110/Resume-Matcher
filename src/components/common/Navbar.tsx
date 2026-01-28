'use client';

import { useAuth } from '@/app/contexts/AuthContext';
import { optimizeResume } from '@/services/apiService';
import { useGoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = token ? [...navItems, { label: 'Profile', href: '/profile' }] : navItems;

  const isActive = (href: string) => pathname === href;

  const handleSignIn = () => {
    // 1. URL-encode the redirect URI (required by Google)
    const redirectUri = encodeURIComponent('http://localhost:3001/auth/callback');

    // 2. Your Google OAuth Client ID
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    // 3. Prepare the Google Auth URL
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&prompt=consent`;

    // 4. Redirect the browser to Google's login page
    window.location.href = googleAuthUrl;
  };

  const handleLogOut = ()=>{
    toast.success("Logged out successfully")
    logout();
  }

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          Match My Resume
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`font-medium transition ${isActive(href)
                ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                : 'text-gray-600 hover:text-black'
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Sign In */}
        {token ? (<button onClick={() => handleLogOut()} className="hidden lg:block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
          Log out
        </button>)
          :
          (<button onClick={() => handleSignIn()} className="hidden lg:block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
            Sign In
          </button>)
        }


        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-700 text-3xl"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Overlay and Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-down Menu */}
          <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 transform translate-y-0 animate-slide-down">
            <div className="p-8 relative">
              {/* Close Button */}
              <button
                className="text-gray-600 text-2xl absolute top-4 right-6"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>

              {/* Mobile Navigation */}
              <nav className="flex flex-col items-center space-y-6 mt-12">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`text-xl font-semibold transition ${isActive(href)
                      ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                      : 'text-gray-700 hover:text-black'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                ))}

                {/* Mobile Sign In */}
                {token ? (
                  <button onClick={() => logout()} className="lg:hidden bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                    Log out
                  </button>
                ) : (
                  <button onClick={() => handleSignIn()} className="lg:hidden bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                    Sign In
                  </button>
                )}

              </nav>
            </div>
          </div>
        </>
      )}

      {/* Slide Down Animation */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </header>
  );
}
