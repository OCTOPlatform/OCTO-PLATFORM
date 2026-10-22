'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 md:py-32 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#E8F8FA] text-[#00AFC4] mx-auto flex items-center justify-center font-black text-3xl shadow-sm">
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[#142740]">Halaman Tidak Ditemukan</h1>
        <p className="text-sm text-[#586779] leading-relaxed">
          Tautan yang Anda tuju mungkin telah dipindahkan, diganti namanya, atau sedang dalam pembaruan sistem.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow transition flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Ke Beranda OCTO
        </Link>
        <Link
          href="/search"
          className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" /> Cari Halaman
        </Link>
      </div>
    </div>
  );
}
