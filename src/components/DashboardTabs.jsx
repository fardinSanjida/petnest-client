"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "My Listings", href: "/my-listings" },
  { label: "My Requests", href: "/my-requests" },
];

export default function DashboardTabs() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex flex-wrap gap-3 rounded-full bg-slate-100 px-3 py-2 shadow-sm">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-emerald-700 text-white shadow"
                : "text-slate-700 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
