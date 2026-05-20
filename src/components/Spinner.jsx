export default function Spinner({ label = "Loading" }) {
  return (
    <div className="grid min-h-[45vh] place-items-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />
        <p className="mt-3 text-sm font-medium text-slate-600">{label}...</p>
      </div>
    </div>
  );
}
