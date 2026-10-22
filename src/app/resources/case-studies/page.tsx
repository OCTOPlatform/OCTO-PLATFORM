'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CaseStudiesPage() {
  const { resources } = useOcto();
  const caseStudies = resources.filter((r) => r.category === 'Studi Kasus');

  return (
    <div className="py-12 md:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          STUDI KASUS NYATA & TERUJI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">Studi Kasus</h1>
        <p className="text-sm text-[#586779]">
          Sesuai prinsip Proof over Hype: pelajari bagaimana brand lokal nyata mengimplementasikan OCTO
          dan melipatgandakan ulasan organik mereka.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((res) => (
          <Link
            key={res.id}
            href={`/resources/${res.slug}`}
            className="bg-white rounded-3xl border border-[#E1E7EC] p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                HASIL TERVERIFIKASI
              </span>
              <h3 className="font-extrabold text-2xl text-[#142740] group-hover:text-[#00AFC4] transition">
                {res.title}
              </h3>
              <p className="text-sm text-[#586779] leading-relaxed">{res.summary}</p>
            </div>

            <div className="pt-4 border-t border-[#E1E7EC] flex items-center justify-between text-xs text-[#00AFC4] font-bold">
              <span>Baca Studi Kasus Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
