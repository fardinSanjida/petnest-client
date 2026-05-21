/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import Logo from "../asset/petnest.png";
import WhiteLogo from "../asset/pet_nest_white.png";


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-pets", label: "All Pets" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/my-requests", label: "My Requests" },
  { href: "/add-pet", label: "Add Pet" },
];

export default function AppNavber() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { user, logout } = useAuth();
  const isLoggedIn = Boolean(user);
  const { theme, toggleTheme } = useTheme();
  const logoSrc = theme === "dark" ? WhiteLogo : Logo;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-amber-50 bg-opacity-20
     shadow-sm backdrop-blur">
      <nav className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center shrink-0">
          <Link href="/" aria-label="PetNest home">
            <Image
              src={logoSrc}
              alt="PetNest Logo"
              className="h-12 w-36 object-contain"
            />
          </Link>
        </div>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-2 justify-end md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <span className="theme-light-label">Light</span>
            <span className="theme-dark-label">Dark</span>
          </button>
          {isLoggedIn ? (
            <div ref={profileMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((current) => !current)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name || "Profile"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
                <span className="max-w-32 truncate text-ellipsis whitespace-nowrap">{user?.name || "Profile"}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-lg">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-2 text-bold font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-emerald-900 px-8 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="text-xl leading-none">{isMenuOpen ? "x" : "="}</span>
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="mb-3 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <span className="theme-light-label">Light</span>
              <span className="theme-dark-label">Dark</span>
            </button>
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 text-sm font-semibold text-slate-800">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || "Profile"}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                  <span>{user?.name || "Profile"}</span>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-md bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
