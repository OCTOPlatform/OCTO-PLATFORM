'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import {
  Smartphone,
  BarChart3,
  Gift,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function ProductsCatalogPage() {
  const { products } = useOcto();

  const getProductIcon = (slug: string) => {
    switch (slug) {
      case 'octo-tap':
        return <Smartphone className="w-8 h-8 text-[#00AFC4]" />;
      case 'octo-insights':
        return <BarChart3 className="w-8 h-8 text-indigo-500" />;
      case 'octo-loyalty':
        return <Gift className="w-8 h-8 text-amber-500" />;
      case 'octo-business':
        return <Building2 className="w-8 h-8 text-teal-600" />;
      case 'octo-crm':
        return <Users className="w-8 h-8 text-cyan-600" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#00AFC4]" />;
    }
  };

  return (
    <div className="py-12 md:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          KATALOG EKOSISTEM OCTO
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740] tracking-tight">
          Alat Bisnis Terhubung untuk Setiap Tahap Pertumbuhan
        </h1>
        <p className="text-base text-[#586779] leading-relaxed">
          Dari interaksi ulasan fisik di kasir toko hingga analitik lintas cabang, temukan produk yang tepat
          untuk memperkuat reputasi dan retensi pelanggan Anda.
        </p>
      </div>

      {/* Product List Cards */}
      <div className="space-y-12">
        {products.map((prod, idx) => (
          <div
            key={prod.id}
            className={`bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-12 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row items-center gap-10 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Visual Column / Card Simulation */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 rounded-2xl bg-[#FAFBFC] border border-[#E1E7EC] flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-white shadow-md border border-[#E1E7EC] flex items-center justify-center">
                {getProductIcon(prod.slug)}
              </div>
              <div className="space-y-1">
                <span className={`text-xs px-3 py-1 rounded-full font-bold border ${prod.statusBadgeColor}`}>
                  Status: {prod.status}
                </span>
                <h4 className="font-bold text-lg text-[#142740] pt-2">{prod.name}</h4>
                <p className="text-xs text-[#586779] max-w-xs">{prod.demoSubtitle}</p>
              </div>

              <div className="flex items-center gap-3 w-full max-w-xs">
                <Link
                  href={`/products/${prod.slug}#demo`}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-sm transition"
                >
                  Coba Demo Interaktif
                </Link>
                <Link
                  href={`/products/${prod.slug}`}
                  className="flex-1 py-2.5 text-xs font-bold text-[#142740] bg-white border border-[#E1E7EC] hover:bg-[#F2F5F7] rounded-xl transition"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>

            {/* Description Column */}
            <div className="w-full lg:w-1/2 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
                  {prod.slug.replace('-', ' ').toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
                  {prod.tagline}
                </h2>
              </div>

              <p className="text-sm text-[#586779] leading-relaxed">
                {prod.fullDesc}
              </p>

              {/* Target Audience Tags */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#142740]">Cocok Digunakan Oleh:</span>
                <div className="flex flex-wrap gap-2">
                  {prod.targetAudience.map((aud, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-xs bg-[#F2F5F7] text-slate-700 px-2.5 py-1 rounded-lg border border-[#E1E7EC]"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-2 pt-2 border-t border-[#E1E7EC]">
                <span className="text-xs font-bold text-[#142740]">Keunggulan Utama:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {prod.keyBenefits.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/products/${prod.slug}`}
                  className="text-xs font-bold text-[#00AFC4] hover:underline flex items-center gap-1"
                >
                  Buka Halaman Spesifikasi Lengkap {prod.name} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
