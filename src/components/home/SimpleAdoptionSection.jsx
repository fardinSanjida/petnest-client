export default function SimpleAdoptionSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
            alt="Two friendly dogs ready for adoption"
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Simple Adoption</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Track every request clearly.</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Adoption requests stay organized with pickup dates, personal messages, and clear pending, approved, or rejected
            statuses. Families and owners both know what is happening next.
          </p>
        </div>
      </div>
    </section>
  );
}
