import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-bold uppercase text-emerald-700">404</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Page not found</h1>
        <p className="mt-3 text-slate-600">This page may have moved, or the pet trail may simply be out of date.</p>
        <Link href="/" className="mt-6 inline-flex rounded-md bg-emerald-700 px-5 py-3 font-semibold text-white">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
