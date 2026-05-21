"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import PetForm from "@/components/forms/PetForm";
import DashboardTabs from "@/components/DashboardTabs";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { apiFetch, formatDate } from "@/lib/api";

export default function MyListingsPage() {
  return (
    <PrivateRoute>
      <MyListingsContent />
    </PrivateRoute>
  );
}

function MyListingsContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPet, setEditingPet] = useState(null);
  const [requestPet, setRequestPet] = useState(null);
  const [deletePet, setDeletePet] = useState(null);

  const loadPets = (withLoading = false) => {
    if (withLoading) setLoading(true);
    apiFetch("/owners/pets")
      .then(setPets)
      .catch((error) => showToast(error.message, "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    apiFetch("/owners/pets")
      .then(setPets)
      .catch((error) => showToast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  const stats = useMemo(
    () => ({
      total: pets.length,
      available: pets.filter((pet) => pet.status !== "adopted").length,
      adopted: pets.filter((pet) => pet.status === "adopted").length,
    }),
    [pets]
  );

  const handleDelete = async (pet) => {
    try {
      await apiFetch(`/pets/${pet._id}`, { method: "DELETE" });
      showToast("Pet deleted");
      setDeletePet(null);
      loadPets();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await apiFetch(`/pets/${editingPet._id}`, { method: "PATCH", body: JSON.stringify(data) });
      showToast("Pet updated");
      setEditingPet(null);
      loadPets();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  if (loading) return <Spinner label="Loading your listings" />;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <DashboardTabs />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">My Listings</h1>
          <p className="mt-2 text-slate-600">Manage pets you added for adoption.</p>
        </div>
        <Link href="/add-pet" className="rounded-md bg-emerald-700 px-4 py-2 font-semibold text-white">Add Pet</Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Total Listings" value={stats.total} />
        <Stat label="Available" value={stats.available} />
        <Stat label="Adopted" value={stats.adopted} />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {pets.map((pet) => (
          <article key={pet._id} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[180px_1fr]">
            <img src={pet.imageUrl || pet.image} alt={pet.petName || pet.name} className="h-44 w-full rounded-md object-cover" />
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">{pet.petName || pet.name}</h2>
                  <p className="text-sm text-slate-600">${pet.adoptionFee} · {pet.status}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={() => setRequestPet(pet)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">Requests</button>
                <button onClick={() => setEditingPet(pet)} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">Edit</button>
                <Link href={`/pets/${pet._id}`} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold">View</Link>
                <button onClick={() => setDeletePet(pet)} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white">Delete</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {editingPet ? (
        <Modal title={`Update ${editingPet.petName || editingPet.name}`} onClose={() => setEditingPet(null)}>
          <PetForm initial={editingPet} ownerEmail={user.email} onSubmit={handleUpdate} submitLabel="Update Pet" />
        </Modal>
      ) : null}

      {requestPet ? <RequestsModal pet={requestPet} onClose={() => { setRequestPet(null); loadPets(); }} /> : null}
      {deletePet ? (
        <Modal title="Delete Pet" onClose={() => setDeletePet(null)}>
          <p className="text-slate-700">Are you sure you want to delete {deletePet.petName || deletePet.name}? This will also remove its adoption requests.</p>
          <div className="mt-5 flex gap-3">
            <button onClick={() => handleDelete(deletePet)} className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white">Delete</button>
            <button onClick={() => setDeletePet(null)} className="rounded-md border border-slate-300 px-4 py-2 font-semibold">Cancel</button>
          </div>
        </Modal>
      ) : null}
    </main>
  );
}

function RequestsModal({ pet, onClose }) {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = () => {
    apiFetch(`/requests/pet/${pet._id}`)
      .then(setRequests)
      .catch((error) => showToast(error.message, "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    apiFetch(`/requests/pet/${pet._id}`)
      .then(setRequests)
      .catch((error) => showToast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [pet._id, showToast]);

  const handleStatus = async (request, status) => {
    try {
      await apiFetch(`/requests/${request._id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      showToast(`Request ${status}`);
      loadRequests();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <Modal title={`Requests for ${pet.petName || pet.name}`} onClose={onClose}>
      {loading ? <Spinner label="Loading requests" /> : requests.length ? (
        <div className="space-y-3">
          {requests.map((request) => (
            <div key={request._id} className="rounded-md border border-slate-200 p-4">
              <p className="font-semibold text-slate-950">{request.userName}</p>
              <p className="text-sm text-slate-600">{request.userEmail}</p>
              <p className="mt-2 text-sm text-slate-600">Pickup: {formatDate(request.pickupDate)}</p>
              <p className="mt-1 text-sm font-semibold capitalize text-slate-900">{request.status}</p>
              {request.status === "pending" ? (
                <div className="mt-3 flex gap-2">
                  <button onClick={() => handleStatus(request, "approved")} className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white">Approve</button>
                  <button onClick={() => handleStatus(request, "rejected")} className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white">Reject</button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : <p className="text-slate-600">No requests yet.</p>}
    </Modal>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/50 p-4">
      <section className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
          <button onClick={onClose} className="rounded-md border border-slate-300 px-3 py-1 text-sm font-semibold">Close</button>
        </div>
        {children}
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <p className="mt-2 text-3xl font-black text-slate-950">{value}</p>
    </div>
  );
}
