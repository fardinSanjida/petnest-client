"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import DashboardTabs from "@/components/DashboardTabs";
import { useToast } from "@/context/ToastContext";
import { apiFetch, formatDate } from "@/lib/api";

export default function MyRequestsPage() {
  return (
    <PrivateRoute>
      <MyRequestsContent />
    </PrivateRoute>
  );
}

function MyRequestsContent() {
  const { showToast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = (withLoading = false) => {
    if (withLoading) setLoading(true);
    apiFetch("/requests/mine")
      .then(setRequests)
      .catch((error) => showToast(error.message, "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    apiFetch("/requests/mine")
      .then(setRequests)
      .catch((error) => showToast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  const cancelRequest = async (request) => {
    try {
      await apiFetch(`/requests/${request._id}`, { method: "DELETE" });
      showToast("Request cancelled");
      loadRequests();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  if (loading) return <Spinner label="Loading requests" />;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <DashboardTabs />
      <h1 className="text-3xl font-bold text-slate-950">My Requests</h1>
      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-5 gap-4 border-b border-slate-200 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
          <span>Pet Name</span>
          <span>Request Date</span>
          <span>Pickup Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        {requests.map((request) => (
          <div key={request._id} className="grid grid-cols-1 gap-3 border-b border-slate-100 px-4 py-4 text-sm last:border-b-0 md:grid-cols-5 md:items-center">
            <span className="font-semibold text-slate-950">{request.petName}</span>
            <span>{formatDate(request.createdAt)}</span>
            <span>{formatDate(request.pickupDate)}</span>
            <span className="capitalize">{request.status}</span>
            <span className="flex gap-2">
              <Link href={`/pets/${request.petId}`} className="rounded-md border border-slate-300 px-3 py-2 font-semibold">View</Link>
              <button onClick={() => cancelRequest(request)} className="rounded-md bg-red-600 px-3 py-2 font-semibold text-white">Cancel</button>
            </span>
          </div>
        ))}
        {!requests.length ? <p className="p-6 text-center text-slate-600">You have not submitted any requests yet.</p> : null}
      </div>
    </main>
  );
}
