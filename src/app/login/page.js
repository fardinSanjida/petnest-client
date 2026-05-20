"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const router = useRouter();
  const { login, googleLogin } = useAuth();
  const { showToast } = useToast();
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const getRedirectTo = () => new URLSearchParams(window.location.search).get("redirect") || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await login(form.get("email"), form.get("password"));
      showToast("Welcome back");
      router.push(getRedirectTo());
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleGoogle = async () => {
    const nameInput = document.querySelector("[name='googleName']");
    const emailInput = document.querySelector("[name='googleEmail']");
    const email = emailInput?.value;
    if (!email) {
      showToast("Google email is required", "error");
      return;
    }
    try {
      await googleLogin({ name: nameInput?.value || email.split("@")[0], email, photoURL: "" });
      showToast("Google login successful");
      router.push(getRedirectTo());
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Login</h1>
        <label className="mt-5 block text-sm font-medium text-slate-700">
          Email
          <input required type="email" name="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <label className="mt-4 block text-sm font-medium text-slate-700">
          Password
          <input required type="password" name="password" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
        <button className="mt-6 w-full rounded-md bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800">
          Login
        </button>
        <button
          type="button"
          onClick={() => setShowGoogleForm((current) => !current)}
          className="mt-3 w-full rounded-md border border-slate-300 px-4 py-3 font-semibold text-slate-800 hover:bg-slate-50"
        >
          Continue with Google
        </button>
        {showGoogleForm ? (
          <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm text-slate-600">Demo Google login for assignment testing.</p>
            <div className="mt-3 grid gap-2">
              <input required name="googleName" placeholder="Google name" className="rounded-md border border-slate-300 px-3 py-2" />
              <input required type="email" name="googleEmail" placeholder="Google email" className="rounded-md border border-slate-300 px-3 py-2" />
              <button type="button" onClick={handleGoogle} className="rounded-md bg-slate-900 px-4 py-2 font-semibold text-white">Login with Google</button>
            </div>
          </div>
        ) : null}
        <p className="mt-5 text-center text-sm text-slate-600">
          New here? <Link className="font-semibold text-emerald-700" href="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
