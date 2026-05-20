"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <ThemeProvider>
        <WishlistProvider>
          <AuthProvider>{children}</AuthProvider>
        </WishlistProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
