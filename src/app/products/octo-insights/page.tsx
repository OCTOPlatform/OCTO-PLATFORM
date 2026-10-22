'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import OctoInsightsDemo from '@/components/demos/OctoInsightsDemo';
import FaqAccordion from '@/components/ui/FaqAccordion';
import {
  BarChart3,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  MapPin,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export default function OctoInsightsPage() {
  const { products } = useOcto();
  const product = products.find((p) => p.slug === 'octo-insights') || products[1];

  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO SECTION */}
      <section className="space-y-8 text-center max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            PRODUK ANALITIK & PELAPORAN
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-bold border ${product.statusBadgeColor}`}>
            Status: {product.status}
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#142740] tracking-tight">
            {product.name}
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-600 font-bold">
            {product.tagline}
          </p>
          <p className="text-sm sm:text-base text-[#586779] leading-relaxed max-w-3xl mx-auto">
            {product.fullDesc}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="#demo"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            Lihat Demo Analitik
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/request-demo?product=octo-insights"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition"
          >
            Daftar Akses Terbatas (Closed Beta)
          </Link>
        </div>

        {/* Target Audience Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[#586779] font-medium mr-1">Dirancang untuk:</span>
          {product.targetAudience.map((aud, i) => (
            <span
              key={i}
              className="text-xs bg-[#F2F5F7] text-slate-700 px-3 py-1 rounded-full border border-[#E1E7EC]"
            >
              {aud}
            </span>
          ))}
        </div>
      </section>

      {/* 2. PROBLEMS & OUTCOMES */}
      <section className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Konteks Bisnis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            Tantangan Membaca Reputasi Offline & Solusi Analitik
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#E1E7EC]">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Masalah yang Sering Dihadapi
            </h3>
            <div className="space-y-3">
              {product.keyProblems.map((prob, idx) => (
                <div key={idx} className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100 text-xs text-rose-950 leading-relaxed">
                  {prob}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Solusi Berbasis Data Nyata
            </h3>
            <div className="space-y-3">
              {product.keyBenefits.map((ben, idx) => (
                <div key={idx} className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs text-emerald-950 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE DEMO (PRD Section 9.5) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            {product.demoTitle}
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Eksplorasi Metrik Interaktif
          </h2>
          <p className="text-xs sm:text-sm text-[#586779]">
            {product.demoSubtitle}
          </p>
        </div>

        <OctoInsightsDemo />
      </section>

      {/* 4. FEATURES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Fitur Utama
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Melihat Pola Layanan dari Sudut Pandang Data
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features.map((feat, fIdx) => (
            <div key={fIdx} className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#142740]">{feat.title}</h3>
              <p className="text-xs text-[#586779] leading-relaxed">{feat.description}</p>
              <span className="text-[10px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200 inline-block">
                Status: {feat.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. USE CASES */}
      <section className="bg-[#F2F5F7] p-8 sm:p-12 rounded-3xl border border-[#E1E7EC] space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Skenario Nyata
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            Penerapan Insights untuk Evaluasi Tim Cabang
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {product.useCases.map((uc, uIdx) => (
            <div key={uIdx} className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
                {uc.industry}
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Skenario Operasional:</span>
                <p className="text-xs text-slate-800 font-medium">{uc.scenario}</p>
              </div>
              <div className="space-y-1 pt-2 border-t border-[#E1E7EC]">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Dampak Pengambilan Keputusan:</span>
                <p className="text-xs text-[#586779]">{uc.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Pertanyaan Khusus Produk
          </span>
          <h2 className="text-2xl font-extrabold text-[#142740]">
            FAQ Seputar OCTO Insights
          </h2>
        </div>

        <FaqAccordion items={product.faqs} defaultOpenIndex={0} allowMultiple={true} />
      </section>

      {/* 7. CROSS LINKS */}
      <section className="pt-8 border-t border-[#E1E7EC] space-y-6">
        <h3 className="font-bold text-lg text-[#142740]">Integrasi Lini Produk Lain:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/products/octo-tap"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-[#00AFC4] block">OCTO Tap (Tersedia)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Koleksi Data Interaksi dari Kartu Fisik →
            </h4>
            <p className="text-xs text-[#586779]">
              Dapatkan data tap riil langsung dari kartu fisik di meja kasir toko Anda.
            </p>
          </Link>

          <Link
            href="/products/octo-business"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-teal-600 block">OCTO Business (Soon)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Manajemen Hak Akses & Multi-Cabang Sentral →
            </h4>
            <p className="text-xs text-[#586779]">
              Batasi akses laporan data ulasan berdasarkan wilayah kerja store manager.
            </p>
          </Link>

          <Link
            href="/products/octo-loyalty"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-amber-600 block">OCTO Loyalty (Dev)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Korelasikan Review dengan Pembelian Berulang →
            </h4>
            <p className="text-xs text-[#586779]">
              Ketahui apakah pelanggan yang puas cenderung datang kembali lebih sering.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
