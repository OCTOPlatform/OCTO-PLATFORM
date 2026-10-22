'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Tag, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UpdatesPage() {
  const changelog = [
    {
      version: 'v2.0.0 (Ultimate Scope)',
      date: '18 Oktober 2026',
      badge: 'Major Release',
      title: 'Peluncuran Ekosistem OCTO Versi 2.0 & Simulasi Demo Interaktif',
      items: [
        'Peluncuran resmi sistem kartu fisik OCTO Tap dengan chip dual NFC & QR code industri.',
        'Pembukaan Closed Beta untuk modul analitik OCTO Insights dengan simulasi konversi ulasan.',
        'Pratinjau konsep alur digital stamp card pada OCTO Loyalty tanpa aplikasi tambahan.',
        'Arsitektur manajemen portal multi-cabang terpadu pada OCTO Business.',
        'Pembaruan Resource Center dengan materi SOP kasir dan checklist audit Google Business Profile.',
      ],
    },
    {
      version: 'v1.5.0',
      date: '15 September 2026',
      badge: 'Feature Update',
      title: 'Dukungan Kustom Cetak Logo & Material Akrilik Tahan Air',
      items: [
        'Pilihan cetak logo beresolusi tinggi dengan tinta UV anti-pudar untuk kartu fisik.',
        'Peningkatan sensitivitas chip NFC NTAG213 untuk respons sentuhan kurang dari 1 detik.',
        'Dashboard remote link switcher untuk memperbarui URL review tanpa ganti kartu.',
      ],
    },
    {
      version: 'v1.0.0',
      date: '1 Agustus 2026',
      badge: 'Initial Launch',
      title: 'Peluncuran Perdana OCTO Tap untuk UMKM Kuliner Jakarta',
      items: [
        'Pilot project di 25 coffee shop dan restoran di kawasan Senopati dan Kemang.',
        'Validasi kepatuhan pedoman ulasan resmi Google Business Profile.',
      ],
    },
  ];

  return (
    <div className="py-12 md:py-20 space-y-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          NEWSROOM & CHANGELOG
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">
          Pembaruan Produk & Rilis Ekosistem
        </h1>
        <p className="text-sm text-[#586779]">
          Ikuti perkembangan fitur terbaru, rilis hardware, dan pembaruan arsitektur platform OCTO.
        </p>
      </div>

      <div className="space-y-8">
        {changelog.map((entry, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-10 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E1E7EC] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-sm text-[#142740]">{entry.version}</span>
                <span className="text-[10px] bg-cyan-50 text-cyan-800 font-bold px-2.5 py-0.5 rounded-full border border-cyan-200">
                  {entry.badge}
                </span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {entry.date}
              </span>
            </div>

            <h3 className="font-extrabold text-xl text-[#142740]">{entry.title}</h3>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {entry.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
