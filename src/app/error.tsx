'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console
    console.error('OCTO Platform Error Boundary:', error);
  }, [error]);

  return (
    <div className="py-20 md:py-32 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center font-bold shadow-sm">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[#142740]">Terjadi Kendala Teknis</h1>
        <p className="text-sm text-[#586779] leading-relaxed">
          Sistem kami mengalami kesalahan sementara saat memuat data. Silakan coba muat ulang halaman.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#142740] hover:bg-[#1E3A5F] rounded-xl shadow transition flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Coba Muat Ulang
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 text-xs font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Ke Beranda
        </Link>
      </div>
    </div>
  );
}
