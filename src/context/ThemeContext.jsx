"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = typeof window !== "undefined" ? localStorage.getItem("petnest-theme") : null;
    const initialTheme = storedTheme === "dark" ? "dark" : "light";
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme() {
        setTheme((current) => {
          const nextTheme = current === "dark" ? "light" : "dark";
          localStorage.setItem("petnest-theme", nextTheme);
          document.documentElement.classList.toggle("dark", nextTheme === "dark");
          return nextTheme;
        });
      },
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
