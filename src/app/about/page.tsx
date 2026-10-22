'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          TENTANG PLATFORM OCTO
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#142740] tracking-tight">
          Menghubungkan Alat Bisnis Pintar untuk Masa Depan Ritel & Jasa
        </h1>
        <p className="text-base sm:text-lg text-[#586779] leading-relaxed max-w-3xl mx-auto">
          OCTO lahir dari pengamatan sederhana: ribuan pelaku usaha memberikan layanan luar biasa setiap hari,
          namun kehilangan ulasan berharga di Google Maps hanya karena proses pencarian manual yang merepotkan pelanggan.
        </p>
      </section>

      {/* 2. VISION & MISSION */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-10 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#142740]">Visi Kami</h2>
          <p className="text-sm text-[#586779] leading-relaxed">
            Menjadi rumah digital bagi ekosistem alat bisnis modern—satu identitas brand tepercaya dengan beragam
            solusi cerdas yang terhubung dan dapat berkembang seiring pertumbuhan bisnis.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-10 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#142740]">Misi Kami</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
              <span>Menghilangkan friksi teknologi antara pelanggan puas dan reputasi digital bisnis.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
              <span>Menjunjung tinggi etika ulasan asli &quot;Proof over Hype&quot; tanpa bot atau ulasan manipulatif.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
              <span>Menyediakan platform manajemen terpusat yang tangguh dari 1 cabang hingga jaringan waralaba.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES (PRD Section 2.3) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Prinsip Produk Kami
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Pedoman Mutlak Pengembangan OCTO
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAFBFC] p-6 rounded-2xl border border-[#E1E7EC] space-y-3">
            <h3 className="font-bold text-base text-[#142740]">Brand-First, Product-Clear</h3>
            <p className="text-xs text-[#586779] leading-relaxed">
              OCTO konsisten sebagai master brand; setiap produk memiliki positioning yang tajam tanpa klaim kabur.
            </p>
          </div>

          <div className="bg-[#FAFBFC] p-6 rounded-2xl border border-[#E1E7EC] space-y-3">
            <h3 className="font-bold text-base text-[#142740]">Proof Over Hype</h3>
            <p className="text-xs text-[#586779] leading-relaxed">
              Ulasan harus nyata dan sah dari pelanggan sesungguhnya. Kami menolak manipulasi atau jalan pintas reputasi semu.
            </p>
          </div>

          <div className="bg-[#FAFBFC] p-6 rounded-2xl border border-[#E1E7EC] space-y-3">
            <h3 className="font-bold text-base text-[#142740]">Privacy by Design</h3>
            <p className="text-xs text-[#586779] leading-relaxed">
              Kami mengumpulkan data minimum dan menjelaskan pemakaiannya secara transparan sesuai UU Perlindungan Data Pribadi.
            </p>
          </div>
        </div>
      </section>

      {/* 4. OFFICE & LEGAL IDENTITY */}
      <section className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-12 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Identitas Resmi Entitas
          </span>
          <h2 className="text-2xl font-extrabold text-[#142740]">
            PT Platform Bisnis Terhubung (OCTO)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="space-y-1.5">
            <span className="font-bold text-[#142740] block">Alamat Kantor:</span>
            <p className="text-[#586779]">{BRAND.officeAddress}</p>
          </div>
          <div className="space-y-1.5">
            <span className="font-bold text-[#142740] block">Kanal Kontak:</span>
            <p className="text-[#586779]">
              Email:{' '}
              <a href={`mailto:${BRAND.officialEmail}`} className="text-[#00AFC4] hover:underline font-medium">
                {BRAND.officialEmail}
              </a>{' '}
              <span className="text-[10px] text-slate-400">({BRAND.domainEmail} nonaktif sementara)</span>
            </p>
            <p className="text-[#586779]">Telepon: {BRAND.officialPhone} • WhatsApp: {BRAND.officialWhatsApp}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E1E7EC] flex items-center gap-3">
          <Link
            href="/contact"
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition"
          >
            Hubungi Kantor Kami
          </Link>
          <Link
            href="/privacy"
            className="px-6 py-2.5 text-xs font-semibold text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] rounded-xl transition"
          >
            Kebijakan Privasi & Legal
          </Link>
        </div>
      </section>
    </div>
  );
}
