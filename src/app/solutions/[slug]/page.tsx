'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { INDUSTRIES } from '@/lib/constants';
import { useOcto } from '@/lib/store';
import OctoTapDemo from '@/components/demos/OctoTapDemo';
import {
  ShoppingBag,
  UtensilsCrossed,
  Sparkles,
  HeartPulse,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

function IndustrySolutionContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const { products } = useOcto();

  const industry = INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) {
    return notFound();
  }

  const getIndustryIcon = () => {
    switch (industry.slug) {
      case 'retail':
        return <ShoppingBag className="w-8 h-8 text-[#00AFC4]" />;
      case 'food-beverage':
        return <UtensilsCrossed className="w-8 h-8 text-amber-500" />;
      case 'beauty-wellness':
        return <Sparkles className="w-8 h-8 text-pink-500" />;
      case 'healthcare':
        return <HeartPulse className="w-8 h-8 text-emerald-500" />;
      case 'multi-location':
        return <Building2 className="w-8 h-8 text-indigo-500" />;
      default:
        return <Building2 className="w-8 h-8 text-[#00AFC4]" />;
    }
  };

  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#E8F8FA] border border-cyan-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#00AFC4]">
          SOLUSI SPESIFIK INDUSTRI
        </div>

        <div className="w-16 h-16 mx-auto rounded-2xl bg-white border border-[#E1E7EC] shadow-sm flex items-center justify-center">
          {getIndustryIcon()}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#142740] tracking-tight">
            Solusi OCTO untuk {industry.name}
          </h1>
          <p className="text-xl sm:text-2xl text-[#00AFC4] font-bold">
            {industry.tagline}
          </p>
          <p className="text-sm sm:text-base text-[#586779] leading-relaxed max-w-2xl mx-auto">
            {industry.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/request-demo"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            Minta Penawaran Paket {industry.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#demo"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition"
          >
            Lihat Alur Interaksi Kasir
          </Link>
        </div>
      </section>

      {/* 2. CHALLENGES & TAILORED SOLUTION */}
      <section className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Analisis Lapangan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            Tantangan Khas {industry.name} & Jawaban OCTO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#E1E7EC]">
          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
            <h3 className="font-bold text-sm text-rose-950 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-700" />
              Tantangan Operasional
            </h3>
            <p className="text-xs text-rose-900 leading-relaxed">
              {industry.challenges}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
            <h3 className="font-bold text-sm text-emerald-950 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Pendekatan Solusi OCTO
            </h3>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {industry.solutions}
            </p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE EXPERIENCE IN THIS INDUSTRY */}
      <section className="space-y-6" id="demo">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Simulasi Interaksi
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Alur Sentuh 1 Detik di Gerai Anda
          </h2>
          <p className="text-xs text-[#586779]">
            Lihat bagaimana pelanggan Anda merespons kartu fisik ini saat proses transaksi selesai.
          </p>
        </div>

        <OctoTapDemo businessName={`${industry.name} (Simulasi Gerai)`} />
      </section>

      {/* 4. RECOMMENDED PRODUCTS FOR THIS INDUSTRY */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Rekomendasi Paket
          </span>
          <h2 className="text-2xl font-extrabold text-[#142740]">
            Produk OCTO yang Paling Relevan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products
            .filter((p) => industry.targetProducts.includes(p.slug))
            .map((prod) => (
              <div
                key={prod.id}
                className="bg-white p-6 rounded-2xl border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#142740]">{prod.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${prod.statusBadgeColor}`}>
                    {prod.status}
                  </span>
                </div>
                <p className="text-xs text-[#586779] leading-relaxed">{prod.shortDesc}</p>
                <Link
                  href={`/products/${prod.slug}`}
                  className="text-xs font-bold text-[#00AFC4] hover:underline flex items-center gap-1"
                >
                  Pelajari Fitur {prod.name} →
                </Link>
              </div>
            ))}
        </div>
      </section>

      {/* Back to all solutions */}
      <div className="text-center pt-4">
        <Link
          href="/solutions"
          className="text-xs font-semibold text-[#586779] hover:text-[#142740] transition"
        >
          ← Kembali ke Semua Solusi Industri
        </Link>
      </div>
    </div>
  );
}

export default function IndustrySolutionPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-400">Memuat halaman solusi...</div>}>
      <IndustrySolutionContent />
    </Suspense>
  );
}
