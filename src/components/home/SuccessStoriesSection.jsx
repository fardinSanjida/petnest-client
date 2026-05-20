export default function SuccessStoriesSection() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="lg:order-2 overflow-hidden rounded-lg border border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=1000&q=80"
            alt="Happy dog sitting outdoors after adoption"
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
        <div className="lg:order-1">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Success Stories</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Small requests can become lifelong bonds.</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Milo found a quiet home in Mirpur, Nori became a child&apos;s reading buddy, and Bella now spends weekends walking
            beside the lake. Every approved request can become a story like theirs.
          </p>
        </div>
      </div>
    </section>
  );
}
