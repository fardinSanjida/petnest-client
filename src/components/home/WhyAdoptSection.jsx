export default function WhyAdoptSection() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=1000&q=80"
            alt="Adopted dog resting with its family"
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Why Adopt Pets</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Give a pet a safer, kinder home.</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Adoption gives an animal a second chance and gives your family a loyal companion with a story worth caring about.
            It also helps shelters create space for more pets who need urgent support.
          </p>
        </div>
      </div>
    </section>
  );
}
