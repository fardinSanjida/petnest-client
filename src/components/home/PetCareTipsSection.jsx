export default function PetCareTipsSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1000&q=80"
            alt="Person caring for a calm pet at home"
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Pet Care Tips</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Prepare the home before pickup day.</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Keep vet records, plan daily play time, introduce new food slowly, and give every pet a calm corner of their own.
            A little preparation makes the first week easier for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}
