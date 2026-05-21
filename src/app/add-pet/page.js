"use client";

import { useRouter } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import PetForm from "@/components/forms/PetForm";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { apiFetch } from "@/lib/api";

export default function AddPetPage() {
  return (
    <PrivateRoute>
      <AddPetPageContent />
    </PrivateRoute>
  );
}

function AddPetPageContent() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await apiFetch("/pets", { method: "POST", body: JSON.stringify(data) });
      showToast("Pet added successfully");
      router.push("/my-listings");
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-950">Add Pet</h1>
        <p className="mt-2 text-slate-600">Create a new pet listing for adoption.</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <PetForm ownerEmail={user?.email || ""} onSubmit={handleSubmit} submitLabel="Add Pet" />
      </div>
    </main>
  );
}
