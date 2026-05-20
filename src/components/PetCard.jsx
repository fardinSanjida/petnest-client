 "use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

export default function PetCard({ pet }) {
  const petName = pet.petName || pet.name;
  const petImage = pet.imageUrl || pet.image;
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(pet._id);

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] bg-slate-100">
        <img src={petImage} alt={petName} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-950">{petName}</h3>
            <p className="text-sm text-slate-600">
              {pet.species} · {pet.breed}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              pet.status === "adopted" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {pet.status || "available"}
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-600">{pet.location}</p>
        <p className="mt-1 font-semibold text-slate-900">Fee: ${pet.adoptionFee}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/pets/${pet._id}`}
            className="inline-flex justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={() => toggleWishlist(pet)}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
          >
            {saved ? "Saved" : "Wishlist"}
          </button>
        </div>
      </div>
    </article>
  );
}
