"use client";

import { useEffect, useMemo, useState } from "react";
import PetCard from "@/components/PetCard";
import Spinner from "@/components/Spinner";
import { apiFetch } from "@/lib/api";

export default function AllPetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "", species: "", sort: "newest" });

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("petName", filters.search);
    if (filters.species) params.set("species", filters.species);
    params.set("sort", filters.sort);
    return params.toString();
  }, [filters]);

  useEffect(() => {
    apiFetch(`/pets?${query}`)
      .then(setPets)
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-950">All Pets</h1>
      <div className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-3">
        <input
          placeholder="Search by pet name"
          className="rounded-md border border-slate-300 px-3 py-2"
          value={filters.search}
          onChange={(e) => setFilters((current) => ({ ...current, search: e.target.value }))}
        />
        <select
          className="rounded-md border border-slate-300 px-3 py-2"
          value={filters.species}
          onChange={(e) => setFilters((current) => ({ ...current, species: e.target.value }))}
        >
          <option value="">All species</option>
          {["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"].map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select
          className="rounded-md border border-slate-300 px-3 py-2"
          value={filters.sort}
          onChange={(e) => setFilters((current) => ({ ...current, sort: e.target.value }))}
        >
          <option value="newest">Newest first</option>
          <option value="feeLow">Lowest fee</option>
          <option value="feeHigh">Highest fee</option>
          <option value="ageLow">Youngest first</option>
        </select>
      </div>

      {loading ? (
        <Spinner label="Loading pets" />
      ) : pets.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => <PetCard key={pet._id} pet={pet} />)}
        </div>
      ) : (
        <p className="mt-10 rounded-lg bg-white p-6 text-center text-slate-600">No pets matched your search.</p>
      )}
    </main>
  );
}
