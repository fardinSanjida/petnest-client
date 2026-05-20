"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useToast } from "@/context/ToastContext";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      showToast("Password needs 6 characters with uppercase and lowercase letters", "error");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Password and confirm password must match", "error");
      return;
    }

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      showToast("Registration successful. Please login.");
      router.push("/login");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Create Account</h1>
        {[
          ["name", "Name"],
          ["email", "Email", "email"],
          ["photoURL", "Photo URL", "url"],
          ["password", "Password", "password"],
          ["confirmPassword", "Confirm Password", "password"],
        ].map(([name, label, type = "text"]) => (
          <label key={name} className="mt-4 block text-sm font-medium text-slate-700">
            {label}
            <input required type={type} name={name} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" />
          </label>
        ))}
        <button className="mt-6 w-full rounded-md bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800">
          Register
        </button>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered? <Link className="font-semibold text-emerald-700" href="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
