"use client";

import { createContext, useContext, useMemo, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("petnest-wishlist") || "[]");
  });

  const value = useMemo(
    () => ({
      wishlist,
      isSaved(id) {
        return wishlist.some((pet) => pet._id === id);
      },
      toggleWishlist(pet) {
        setWishlist((current) => {
          const exists = current.some((item) => item._id === pet._id);
          const nextWishlist = exists ? current.filter((item) => item._id !== pet._id) : [...current, pet];
          localStorage.setItem("petnest-wishlist", JSON.stringify(nextWishlist));
          return nextWishlist;
        });
      },
    }),
    [wishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
}
