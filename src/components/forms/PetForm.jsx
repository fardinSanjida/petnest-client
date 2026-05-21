"use client";

import { useMemo, useState } from "react";

const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];
const genderOptions = ["Male", "Female", "Unknown"];

export default function PetForm({ initial = {}, ownerEmail = "", onSubmit, submitLabel = "Save Pet" }) {
  const [form, setForm] = useState({
    petName: initial.petName || initial.name || "",
    species: initial.species || "",
    breed: initial.breed || "",
    age: (initial.age ?? "")?.toString(),
    gender: initial.gender || "",
    imageUrl: initial.imageUrl || initial.image || "",
    healthStatus: initial.healthStatus || "",
    vaccinationStatus: initial.vaccinationStatus || "",
    location: initial.location || "",
    adoptionFee: (initial.adoptionFee ?? "")?.toString(),
    description: initial.description || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({
      petName: form.petName.trim(),
      species: form.species,
      breed: form.breed.trim(),
      age: Number(form.age),
      gender: form.gender,
      imageUrl: form.imageUrl.trim(),
      healthStatus: form.healthStatus.trim(),
      vaccinationStatus: form.vaccinationStatus.trim(),
      location: form.location.trim(),
      adoptionFee: Number(form.adoptionFee),
      description: form.description.trim(),
      ownerEmail,
    });
  };

  const canSubmit = useMemo(() => {
    return (
      form.petName.trim() &&
      form.species &&
      form.breed.trim() &&
      form.age.trim() &&
      form.gender &&
      form.imageUrl.trim() &&
      form.location.trim() &&
      form.adoptionFee.trim() &&
      form.description.trim()
    );
  }, [form]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Pet Name
          <input
            required
            name="petName"
            value={form.petName}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Species
          <select
            required
            name="species"
            value={form.species}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          >
            <option value="">Select species</option>
            {speciesOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Breed
          <input
            required
            name="breed"
            value={form.breed}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Age
          <input
            required
            type="number"
            min="0"
            name="age"
            value={form.age}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Gender
          <select
            required
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          >
            <option value="">Select gender</option>
            {genderOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Image URL
          <input
            required
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Health Status
          <input
            required
            name="healthStatus"
            value={form.healthStatus}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Vaccination Status
          <input
            required
            name="vaccinationStatus"
            value={form.vaccinationStatus}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Location
        <input
          required
          name="location"
          value={form.location}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Adoption Fee
          <input
            required
            type="number"
            min="0"
            name="adoptionFee"
            value={form.adoptionFee}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Owner Email
          <input
            readOnly
            name="ownerEmail"
            value={ownerEmail}
            className="mt-1 w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-slate-600"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Description
        <textarea
          required
          name="description"
          rows="5"
          value={form.description}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2"
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-full justify-center rounded-md bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {submitLabel}
      </button>
    </form>
  );
}
