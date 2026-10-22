'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { Download, FileText, CheckCircle2 } from 'lucide-react';

export default function DownloadsPage() {
  const { resources } = useOcto();
  const downloads = resources.filter((r) => r.category === 'Materi Unduhan' || r.downloadUrl);

  return (
    <div className="py-12 md:py-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          MATERI UNDUHAN & CHECKLIST
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">Materi Gratis Siap Pakai</h1>
        <p className="text-sm text-[#586779]">
          Unduh dokumen SOP kasir, checklist optimasi profil Google Bisnis, dan materi panduan operasional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {downloads.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl border border-[#E1E7EC] p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-[#142740]">{res.title}</h3>
              <p className="text-xs text-[#586779] leading-relaxed">{res.summary}</p>
              <div className="text-[11px] font-semibold text-slate-500">
                Format: Dokumen PDF • Ukuran: {res.downloadSize || '1.0 MB'}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E7EC] flex items-center justify-between gap-4">
              <Link
                href={`/resources/${res.slug}`}
                className="text-xs font-bold text-slate-600 hover:text-[#142740]"
              >
                Pratinjau Dokumen
              </Link>
              <button
                onClick={() => alert(`Mengunduh file: ${res.title}. Simpan di perangkat Anda.`)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-sm transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Unduh PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
