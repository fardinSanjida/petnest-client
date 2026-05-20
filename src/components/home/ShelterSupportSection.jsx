export default function ShelterSupportSection() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="lg:order-2 overflow-hidden rounded-lg border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=1000&q=80"
            alt="Shelter volunteer spending time with a rescued pet"
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
        <div className="lg:order-1">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Shelter Support</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Owners and shelters stay in control.</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Pet owners can list pets, update details, review adoption requests, and choose the family that best fits each
            animal&apos;s needs. The process stays simple and organized.
          </p>
        </div>
      </div>
    </section>
  );
}
