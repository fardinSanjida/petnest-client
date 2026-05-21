"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/lib/api";

export default function PetDetailsPage() {
  return (
    <PrivateRoute>
      <PetDetailsContent />
    </PrivateRoute>
  );
}

function PetDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ pickupDate: "", message: "" });

  useEffect(() => {
    if (!id) return;
    apiFetch(`/pets/${id}`)
      .then(setPet)
      .catch((error) => showToast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [id, showToast]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!pet) return;

    setSubmitting(true);
    try {
      await apiFetch("/requests", {
        method: "POST",
        body: JSON.stringify({ petId: pet._id, pickupDate: form.pickupDate, message: form.message }),
      });
      showToast("Adoption request submitted");
      router.push("/my-requests");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner label="Loading pet details" />;
  if (!pet) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">Pet not found.</p>
          <Link href="/all-pets" className="mt-4 inline-flex rounded-md bg-emerald-700 px-4 py-2 text-white">
            Back to pets
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">{pet.petName || pet.name}</h1>
          <p className="mt-2 text-slate-600">View full profile and submit your adoption request.</p>
        </div>
        <Link href="/all-pets" className="rounded-md bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200">
          Back to all pets
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative h-96 w-full overflow-hidden rounded-xl bg-slate-100">
            <Image
              src={pet.imageUrl || pet.image}
              alt={pet.petName || pet.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Species" value={pet.species} />
              <Detail label="Breed" value={pet.breed} />
              <Detail label="Age" value={`${pet.age} year${pet.age === 1 ? "" : "s"}`} />
              <Detail label="Gender" value={pet.gender} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Detail label="Location" value={pet.location} />
              <Detail label="Adoption Fee" value={`$${pet.adoptionFee}`} />
              <Detail label="Health" value={pet.healthStatus} />
              <Detail label="Vaccination" value={pet.vaccinationStatus} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">About this pet</h2>
              <p className="mt-2 text-slate-600">{pet.description}</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 space-y-3">
            <h2 className="text-2xl font-bold text-slate-950">Adoption Request</h2>
            <p className="text-sm text-slate-600">Submit your request for pickup and add a note for the owner.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Pet Name
              <input readOnly value={pet.petName || pet.name} className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-slate-600" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Your Name
              <input readOnly value={user?.name || ""} className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-slate-600" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Your Email
              <input readOnly value={user?.email || ""} className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-slate-600" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Pickup Date
              <input required type="date" name="pickupDate" value={form.pickupDate} onChange={handleChange} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Message
              <textarea name="message" rows="4" value={form.message} onChange={handleChange} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2" />
            </label>
            <button
              type="submit"
              disabled={submitting || !form.pickupDate}
              className="inline-flex w-full justify-center rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {submitting ? "Sending request..." : "Adopt Now"}
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Request status</p>
            <p className="mt-2">Requests are sent in pending status. Owners can approve or reject requests from the dashboard.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value || "Not specified"}</p>
    </div>
  );
}
