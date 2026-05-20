"use client";

import Link from "next/link";
import PetCard from "@/components/PetCard";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">Wishlist</h1>
      <p className="mt-2 text-slate-600">Pets you saved while browsing.</p>

      {wishlist.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">No pets saved yet.</p>
          <Link href="/all-pets" className="mt-4 inline-flex rounded-md bg-emerald-700 px-5 py-3 font-semibold text-white">
            Browse Pets
          </Link>
        </div>
      )}
    </main>
  );
}
