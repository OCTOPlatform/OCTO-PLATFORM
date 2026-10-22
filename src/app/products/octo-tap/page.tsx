'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import OctoTapDemo from '@/components/demos/OctoTapDemo';
import FaqAccordion from '@/components/ui/FaqAccordion';
import {
  Smartphone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  QrCode,
  Layers,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';

export default function OctoTapPage() {
  const { products } = useOcto();
  const product = products.find((p) => p.slug === 'octo-tap') || products[0];

  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO SECTION */}
      <section className="space-y-8 text-center max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3 py-1 rounded-full border border-cyan-200">
            PRODUK HARDWARE INTERAKTIF
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-bold border ${product.statusBadgeColor}`}>
            Status: {product.status}
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#142740] tracking-tight">
            {product.name}
          </h1>
          <p className="text-xl sm:text-2xl text-[#00AFC4] font-bold">
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
            Coba Demo Interaktif Sekarang
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/request-demo?product=octo-tap"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition"
          >
            Pesan Kartu Fisik Toko
          </Link>
        </div>

        {/* Target Audience Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[#586779] font-medium mr-1">Cocok untuk:</span>
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

      {/* 2. PROBLEMS & EXPECTED OUTCOMES (PRD Section 9.2) */}
      <section className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Mengapa Solusi Ini Dibutuhkan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            Masalah Nyata di Meja Kasir & Hasil yang Diharapkan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#E1E7EC]">
          {/* Problems */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Hambatan Bisnis Saat Ini
            </h3>
            <div className="space-y-3">
              {product.keyProblems.map((prob, idx) => (
                <div key={idx} className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100 text-xs text-rose-950 leading-relaxed">
                  {prob}
                </div>
              ))}
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Hasil yang Dicapai Bersama OCTO Tap
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

      {/* 3. INTERACTIVE DEMO (PRD Section 9.4) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3 py-1 rounded-full border border-cyan-200">
            {product.demoTitle}
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Uji Coba Alur Tap NFC & Scan QR
          </h2>
          <p className="text-xs sm:text-sm text-[#586779]">
            {product.demoSubtitle}
          </p>
        </div>

        <OctoTapDemo businessName="Kopi Rasa Bahagia (Toko Simulasi)" />
      </section>

      {/* 4. PHYSICAL SPECS & FEATURES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Spesifikasi Hardware
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Kualitas Industri yang Tahan Bertahun-tahun
          </h2>
          <p className="text-xs text-[#586779]">
            Dirancang khusus untuk lingkungan meja kasir dan restoran yang padat aktivitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features.map((feat, fIdx) => (
            <div key={fIdx} className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                {fIdx === 0 && <Smartphone className="w-5 h-5" />}
                {fIdx === 1 && <Layers className="w-5 h-5" />}
                {fIdx === 2 && <Sparkles className="w-5 h-5" />}
                {fIdx === 3 && <QrCode className="w-5 h-5" />}
              </div>
              <h3 className="font-bold text-sm text-[#142740]">{feat.title}</h3>
              <p className="text-xs text-[#586779] leading-relaxed">{feat.description}</p>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block">
                {feat.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. USE CASES */}
      <section className="bg-[#F2F5F7] p-8 sm:p-12 rounded-3xl border border-[#E1E7EC] space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Penerapan Lapangan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            Skenario Nyata Penggunaan OCTO Tap
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.useCases.map((uc, uIdx) => (
            <div key={uIdx} className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-4">
              <span className="text-xs font-bold text-[#00AFC4] uppercase tracking-wider block">
                {uc.industry}
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Skenario Titik Sentuh:</span>
                <p className="text-xs text-slate-800 font-medium">{uc.scenario}</p>
              </div>
              <div className="space-y-1 pt-2 border-t border-[#E1E7EC]">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Dampak Positif:</span>
                <p className="text-xs text-[#586779]">{uc.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ KHUSUS PRODUK */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Pertanyaan Khusus Produk
          </span>
          <h2 className="text-2xl font-extrabold text-[#142740]">
            FAQ Seputar OCTO Tap
          </h2>
        </div>

        <FaqAccordion items={product.faqs} defaultOpenIndex={0} allowMultiple={true} />
      </section>

      {/* 7. CROSS LINK TO OTHER OCTO PRODUCTS (PRD Section 9.2) */}
      <section className="pt-8 border-t border-[#E1E7EC] space-y-6">
        <h3 className="font-bold text-lg text-[#142740]">Produk Terkait dalam Ekosistem OCTO:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/products/octo-insights"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-indigo-600 block">OCTO Insights (Beta)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Pantau Data Interaksi Kartu Lintas Cabang →
            </h4>
            <p className="text-xs text-[#586779]">
              Hubungkan kartu OCTO Tap ke dashboard analitik untuk melihat jam sibuk dan tingkat konversi review.
            </p>
          </Link>

          <Link
            href="/products/octo-loyalty"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-amber-600 block">OCTO Loyalty (Dev)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Kombinasikan Ulasan dengan Digital Stamp →
            </h4>
            <p className="text-xs text-[#586779]">
              Beri apresiasi voucher atau stempel digital saat pelanggan kembali berbelanja.
            </p>
          </Link>

          <Link
            href="/products/octo-business"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-teal-600 block">OCTO Business (Soon)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Kelola Kartu di Puluhan Cabang Terpusat →
            </h4>
            <p className="text-xs text-[#586779]">
              Ubah link tujuan ulasan seluruh cabang secara serentak tanpa mencetak ulang kartu fisik.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
