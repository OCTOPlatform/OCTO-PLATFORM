'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { Clock, ArrowRight } from 'lucide-react';

export default function ArticlesPage() {
  const { resources } = useOcto();
  const articles = resources.filter((r) => r.category === 'Artikel');

  return (
    <div className="py-12 md:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          ARTIKEL & WAWASAN BISNIS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">Artikel Edukasi</h1>
        <p className="text-sm text-[#586779]">
          Riset dan strategi mendalam mengenai algoritma pencarian lokal, psikologi ulasan, dan tren reputasi 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((res) => (
          <Link
            key={res.id}
            href={`/resources/${res.slug}`}
            className="bg-white rounded-3xl border border-[#E1E7EC] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-[#00AFC4] font-bold">ARTIKEL</span>
                <span>{res.readTime}</span>
              </div>
              <h3 className="font-extrabold text-lg text-[#142740] group-hover:text-[#00AFC4] transition">
                {res.title}
              </h3>
              <p className="text-xs text-[#586779] line-clamp-3">{res.summary}</p>
            </div>

            <div className="pt-3 border-t border-[#E1E7EC] flex items-center justify-between text-xs text-[#00AFC4] font-semibold">
              <span>Baca Artikel</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
