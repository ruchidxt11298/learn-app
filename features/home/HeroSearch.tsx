"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import { useDestinationCountries } from "@/hooks/queries/useDestinations";

export default function HeroSearch() {
  const router = useRouter();
  const { data: countries = [] } = useDestinationCountries();
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) params.set("country", country);
    if (date) params.set("date", date);
    if (travelers) params.set("travelers", travelers);
    router.push(`/destinations?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-4xl grid-cols-1 gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur sm:grid-cols-[1.2fr_1fr_0.8fr_auto] dark:bg-slate-800/95"
    >
      <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-600">
        <MapPin className="h-4 w-4 shrink-0 text-primary" />
        <span className="sr-only">Destination</span>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full bg-transparent text-sm text-text focus:outline-none dark:text-slate-100"
        >
          <option value="">Where to?</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-600">
        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
        <span className="sr-only">Travel date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-transparent text-sm text-text focus:outline-none dark:text-slate-100"
        />
      </label>

      <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-600">
        <Users className="h-4 w-4 shrink-0 text-primary" />
        <span className="sr-only">Travelers</span>
        <select
          value={travelers}
          onChange={(e) => setTravelers(e.target.value)}
          className="w-full bg-transparent text-sm text-text focus:outline-none dark:text-slate-100"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Traveler" : "Travelers"}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-dark"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
