'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Percent,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap,
} from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          EKOSISTEM KEMITRAAN & RESELLER
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#142740] tracking-tight">
          Tumbuh Bersama Ekosistem OCTO
        </h1>
        <p className="text-base sm:text-lg text-[#586779] leading-relaxed max-w-2xl mx-auto">
          Bantu klien Anda membangun reputasi bisnis terpercaya di Google Maps sambil menciptakan sumber pendapatan
          baru yang berulang bagi agensi atau bisnis distribusi Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/partners/apply"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            Daftar Menjadi Mitra Resmi
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/6281295099738?text=Halo%20tim%20OCTO,%20saya%20tertarik%20dengan%20program%20reseller%20mitra%20OCTO"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition"
          >
            Hubungi Tim Partnership
          </a>
        </div>
      </section>

      {/* 2. PARTNERSHIP TIERS & BENEFITS */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Model Kolaborasi
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Kategori Kemitraan yang Tersedia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#142740]">Reseller Perangkat Fisik</h3>
                <p className="text-xs font-semibold text-[#00AFC4] mt-0.5">Distributor & Toko POS</p>
              </div>
              <p className="text-xs text-[#586779] leading-relaxed">
                Beli kartu fisik OCTO Tap dengan harga grosir bertingkat dan jual kembali ke merchant kafe, restoran,
                dan toko lokal dengan margin yang menguntungkan.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-[#E1E7EC]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Diskon grosir hingga 40%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Materi display etalase gratis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Garansi ganti unit chip cacat
                </li>
              </ul>
            </div>
            <Link
              href="/partners/apply?tier=reseller"
              className="w-full py-2.5 text-xs font-bold text-center text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] rounded-xl transition"
            >
              Pilih Paket Reseller
            </Link>
          </div>

          <div className="bg-white rounded-3xl border-2 border-[#00AFC4] p-8 shadow-md space-y-5 flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00AFC4] text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-sm">
              Paling Populer
            </span>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#142740]">Agensi Digital Marketing</h3>
                <p className="text-xs font-semibold text-[#00AFC4] mt-0.5">Agency & Konsultan Bisnis</p>
              </div>
              <p className="text-xs text-[#586779] leading-relaxed">
                Gabungkan paket optimasi Google Business Profile dan SEO lokal Anda dengan implementasi fisik OCTO Tap
                untuk hasil ulasan yang langsung terbukti pada klien.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-[#E1E7EC]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Komisi referensi berkelanjutan
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Kustom logo branding klien
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Dedicated partner support manager
                </li>
              </ul>
            </div>
            <Link
              href="/partners/apply?tier=agency"
              className="w-full py-2.5 text-xs font-bold text-center text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition shadow"
            >
              Daftar Partner Agensi
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#142740]">Integrator Solusi & POS</h3>
                <p className="text-xs font-semibold text-[#00AFC4] mt-0.5">Software House & Vendor Kasir</p>
              </div>
              <p className="text-xs text-[#586779] leading-relaxed">
                Jadikan titik transaksi kasir POS Anda semakin bernilai tambah dengan menyertakan kartu review Google
                dan loyalty pass OCTO dalam bundel penawaran sistem kasir.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-[#E1E7EC]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Akses API integrasi awal
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Co-marketing & webinar bersama
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Solusi white-label enterprise
                </li>
              </ul>
            </div>
            <Link
              href="/partners/apply?tier=integrator"
              className="w-full py-2.5 text-xs font-bold text-center text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] rounded-xl transition"
            >
              Pilih Paket Integrator
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PARTNER PROCESS */}
      <section className="bg-[#F2F5F7] p-8 sm:p-12 rounded-3xl border border-[#E1E7EC] space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Alur Pendaftaran Singkat
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            3 Langkah Memulai Kemitraan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-2 text-center">
            <span className="text-2xl font-black text-[#00AFC4]">1</span>
            <h4 className="font-bold text-sm text-[#142740]">Isi Formulir Aplikasi</h4>
            <p className="text-xs text-[#586779]">
              Lengkapi identitas badan usaha dan estimasi kebutuhan kuantitas kartu mitra.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-2 text-center">
            <span className="text-2xl font-black text-[#00AFC4]">2</span>
            <h4 className="font-bold text-sm text-[#142740]">Review & Kesepakatan</h4>
            <p className="text-xs text-[#586779]">
              Tim partnership OCTO memvalidasi data dan mengirimkan MoU kemitraan resmi.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-2 text-center">
            <span className="text-2xl font-black text-[#00AFC4]">3</span>
            <h4 className="font-bold text-sm text-[#142740]">Terima Kit & Mulai Jual</h4>
            <p className="text-xs text-[#586779]">
              Dapatkan sample pack, materi promosi, dan akses pemesanan grosir instan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
