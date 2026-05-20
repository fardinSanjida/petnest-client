"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PetCard from "@/components/PetCard";
import Spinner from "@/components/Spinner";
import PetCareTipsSection from "@/components/home/PetCareTipsSection";
import ShelterSupportSection from "@/components/home/ShelterSupportSection";
import SimpleAdoptionSection from "@/components/home/SimpleAdoptionSection";
import SuccessStoriesSection from "@/components/home/SuccessStoriesSection";
import WhyAdoptSection from "@/components/home/WhyAdoptSection";
import { apiFetch } from "@/lib/api";

export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/pets?featured=true&status=available")
      .then(setPets)
      .catch(() => setPets([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Adopt with care</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Find a pet who feels like home.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600">
              Browse dogs, cats, birds, rabbits and more from local owners and shelters. Send a request, set a pickup date, and follow the adoption status from your account.
            </p>
            <Link
              href="/all-pets"
              className="mt-7 inline-flex rounded-md bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800"
            >
              Adopt Now
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=80"
              alt="Happy adopted pets with people"
              className="h-[360px] w-full object-cover md:h-[440px]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">Featured Pets</h2>
            <p className="mt-2 text-slate-600">A few friendly faces waiting for their next family.</p>
          </div>
          <Link href="/all-pets" className="hidden text-sm font-semibold text-emerald-700 sm:inline">
            See all pets
          </Link>
        </div>
        {loading ? (
          <Spinner label="Finding pets" />
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </section>

      <WhyAdoptSection />
      <SuccessStoriesSection />
      <PetCareTipsSection />
      <ShelterSupportSection />
      <SimpleAdoptionSection />
    </main>
  );
}
