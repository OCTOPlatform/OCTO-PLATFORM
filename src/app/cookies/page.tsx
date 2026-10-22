'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { Cookie, Settings2 } from 'lucide-react';

export default function CookiesPolicyPage() {
  const { setCookiePrefs } = useOcto();

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#142740]">
      <div className="space-y-3 border-b border-[#E1E7EC] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
          KEBIJAKAN COOKIE & TRACKING
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Kebijakan Penggunaan Cookie</h1>
        <p className="text-xs text-[#586779]">
          Terakhir diperbarui: 18 Oktober 2026 • Transparansi penuh tanpa pola manipulatif (zero dark-patterns).
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <p>
          Website OCTO menggunakan cookie dan teknologi penyimpanan lokal (Local Storage) untuk mengoptimalkan pengalaman
          penjelajahan Anda, menjaga keamanan sesi, dan memahami bagaimana demo interaktif digunakan tanpa mengidentifikasi
          identitas pribadi Anda.
        </p>

        <h3 className="text-base font-bold text-[#142740]">Kategori Cookie yang Digunakan:</h3>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[#E1E7EC] bg-white space-y-1.5">
            <span className="font-bold text-xs text-[#142740] block">1. Cookie Esensial (Selalu Aktif)</span>
            <p className="text-xs text-[#586779]">
              Dibutuhkan agar situs dapat berjalan dengan aman, termasuk proteksi token keamanan formulir dan preferensi cookie Anda.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E1E7EC] bg-white space-y-1.5">
            <span className="font-bold text-xs text-[#142740] block">2. Cookie Analitik (Opsional)</span>
            <p className="text-xs text-[#586779]">
              Mengukur jumlah pengunjung dan langkah penyelesaian demo produk (misal: <em>product_demo_step_complete</em>)
              secara agregat dan anonim.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E1E7EC] bg-white space-y-1.5">
            <span className="font-bold text-xs text-[#142740] block">3. Cookie Fungsional (Opsional)</span>
            <p className="text-xs text-[#586779]">
              Mengingat cabang atau filter simulasi yang terakhir kali Anda pilih di demo agar tidak reset saat berpindah halaman.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#E8F8FA] border border-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-[#142740]">Kelola Preferensi Cookie Anda</h4>
            <p className="text-xs text-[#586779]">
              Anda dapat mengubah izin cookie analitik atau fungsional kapan saja.
            </p>
          </div>
          <button
            onClick={() => setCookiePrefs({ saved: false })}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition flex items-center gap-2 shrink-0"
          >
            <Settings2 className="w-4 h-4" /> Buka Pengaturan Cookie
          </button>
        </div>
      </div>
    </div>
  );
}
