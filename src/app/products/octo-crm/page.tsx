'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import OctoCrmDemo from '@/components/demos/OctoCrmDemo';
import FaqAccordion from '@/components/ui/FaqAccordion';
import {
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Kanban,
  CalendarCheck,
  BarChart3,
  FileSpreadsheet,
  HelpCircle,
  AlertCircle,
  Repeat,
  Lock,
  Smartphone,
  Gift,
  Zap,
} from 'lucide-react';

export default function OctoCrmPage() {
  const { products } = useOcto();
  const product = products.find((p) => p.slug === 'octo-crm') || {
    id: 'prod-crm',
    slug: 'octo-crm',
    name: 'OCTO CRM',
    tagline: 'Know Your Customers. Grow Your Relationships.',
    shortDesc:
      'Workspace hubungan pelanggan berbasis SaaS untuk merapikan database prospek, mengelola visual pipeline penjualan, dan memastikan follow-up tidak terlewat.',
    fullDesc:
      'OCTO CRM membantu bisnis merapikan data pelanggan, mengelola peluang penjualan secara transparan melalui visual Kanban pipeline, dan memastikan tidak ada tindak lanjut penting yang terlewat—tanpa harus memulai dengan sistem yang rumit. Terhubung langsung dengan kartu interaktif OCTO Tap, analitik OCTO Insights, dan program OCTO Loyalty untuk ekosistem pertumbuhan terpadu.',
    status: 'Akses Terbatas / Beta',
    statusBadgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    targetAudience: [
      'UMKM dengan Repeat Order',
      'Bisnis Jasa Lokal & F&B Independen',
      'Tim Sales B2B Kecil',
      'Freelancer & Solopreneur',
      'Retail & Multi-Cabang',
    ],
    keyProblems: [
      'Data prospek dan pelanggan tercecer di WhatsApp pribadi, spreadsheet, dan catatan manual karyawan.',
      'Follow-up terlupakan karena tidak ada jadwal tugas terpusat, menyebabkan peluang penjualan hilang.',
      'Status prospek tidak jelas sehingga pemilik bisnis kesulitan memantau kinerja dan konversi tim sales.',
      'Riwayat interaksi hilang saat pergantian karyawan karena ketergantungan pada catatan chat individu.',
    ],
    keyBenefits: [
      'Centralized Contact Database: satukan seluruh kontak, lead source, tag, dan riwayat interaksi dalam satu tempat.',
      'Visual Sales Pipeline: pantau alur peluang dari New, Contacted, Qualified, Proposal, hingga Won/Lost secara transparan.',
      'Task & Reminder Harian: halaman Today menyajikan daftar follow-up jatuh tempo agar tidak ada prospek terlantar.',
      'Dukungan Ekosistem Terpadu: integrasikan prospek dari pemindaian kartu OCTO Tap ke alur penjualan CRM.',
    ],
    features: [
      {
        title: 'Manajemen Kontak & Perusahaan Terpusat',
        description: 'Simpan profil pelanggan lengkap, nomor kontak ternormalisasi, riwayat timeline, catatan interaksi, dan deteksi kandidat duplikasi.',
        status: 'Beta' as const,
      },
      {
        title: 'Visual Kanban Sales Pipeline & Deals',
        description: 'Lacak nilai peluang penjualan (deal value), tanggal closing, probabilitas, dan alasan lost untuk evaluasi proses.',
        status: 'Beta' as const,
      },
      {
        title: 'Task, Pengingat Harian & Follow-up (Today)',
        description: 'Notifikasi tugas jatuh tempo, status overdue otomatis, dan pembagian penanggung jawab (owner) per kontak.',
        status: 'Beta' as const,
      },
      {
        title: 'Import/Export CSV dengan Preview & Validasi',
        description: 'Pindahkan database dari Excel/Spreadsheet secara aman dengan pengecekan kolom, tanpa data lock-in.',
        status: 'Beta' as const,
      },
      {
        title: 'Dashboard Metrik & Laporan Konversi',
        description: 'Analisis nilai open pipeline, tingkat konversi antar tahap, dan performa sumber prospek (lead source).',
        status: 'Beta' as const,
      },
      {
        title: 'Isolasi Data Tenant & Sesuai UU PDP',
        description: 'Perlindungan data bisnis berbasis workspace_id, audit log tindakan penting, dan kontrol akses berbasis role.',
        status: 'Beta' as const,
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Buat Workspace & Pilih Template Pipeline',
        description: 'Daftarkan akun bisnis Anda, atur zona waktu, dan gunakan template pipeline yang sesuai dengan proses penjualan Anda.',
      },
      {
        step: 2,
        title: 'Import Kontak atau Kumpulkan Prospek Baru',
        description: 'Unggah database dari spreadsheet via CSV atau hubungkan form pendaftaran dari kartu OCTO Tap.',
      },
      {
        step: 3,
        title: 'Kelola Prospek di Visual Pipeline & Jadwalkan Tugas',
        description: 'Geser status deal seiring berjalannya negosiasi dan pasang jadwal follow-up harian di tab Today.',
      },
      {
        step: 4,
        title: 'Tutup Penjualan & Bangun Hubungan Berkelanjutan',
        description: 'Tandai deal yang berhasil ditutup (Won), catat interaksi purna jual, dan identifikasi peluang repeat order.',
      },
    ],
    useCases: [
      {
        industry: 'Bisnis Jasa Desain & Agensi Kreatif',
        scenario: 'Mengelola puluhan inquiry klien dari WhatsApp dan formulir web dengan jadwal meeting dan penawaran proposal.',
        outcome: 'Tidak ada follow-up proposal yang terlewat; waktu penutupan deal menjadi 40% lebih cepat.',
      },
      {
        industry: 'Supplier Bahan Baku F&B & Distributor B2B',
        scenario: 'Tim sales mencatat pesanan rutin restoran dan mengatur jadwal kunjungan bulanan ke outlet pelanggan.',
        outcome: 'Riwayat harga dan preferensi pelanggan tetap aman di sistem meski terjadi pergantian sales representative.',
      },
      {
        industry: 'Klinik & Salon Perawatan Kecantikan',
        scenario: 'Menghubungkan data pengunjung dari formulir registrasi OCTO Tap untuk follow-up jadwal treatment lanjutan.',
        outcome: 'Peningkatan repeat treatment dari pelanggan baru sebesar 35% dalam 60 hari.',
      },
    ],
    faqs: [
      {
        question: 'Apakah OCTO CRM membaca chat WhatsApp pribadi karyawan secara otomatis?',
        answer: 'Tidak. Sesuai prinsip "Privacy by Design" dan batas etika privasi, OCTO CRM tidak menyadap atau membaca WhatsApp pribadi secara ilegal. Staf mencatat ringkasan interaksi secara sadar, atau menggunakan integrasi WhatsApp Business API resmi.',
      },
      {
        question: 'Apakah data kontak saya bisa dikunci sehingga tidak bisa dipindahkan?',
        answer: 'Sama sekali tidak. Prinsip "Data Ownership" OCTO menjamin Anda dapat mengekspor seluruh database kontak dan deal ke format CSV kapan saja tanpa dipersulit.',
      },
      {
        question: 'Bagaimana OCTO CRM terhubung dengan kartu review OCTO Tap?',
        answer: 'Pengunjung yang memindai kartu OCTO Tap dapat diarahkan ke halaman pendaftaran loyalitas atau form konsultasi. Data yang diberikan secara sukarela oleh pengunjung dapat langsung masuk sebagai prospek baru di OCTO CRM.',
      },
      {
        question: 'Berapa batas kontak yang bisa disimpan di OCTO CRM?',
        answer: 'Paket Free menyediakan kapasitas yang cukup untuk pemula, sedangkan paket Starter dan Growth memberikan batas kontak yang sangat leluasa tanpa biaya tersembunyi.',
      },
      {
        question: 'Apakah OCTO CRM cocok untuk bisnis dengan satu orang (solopreneur)?',
        answer: 'Sangat cocok. OCTO CRM dirancang dengan prinsip "Simple to start, scalable to grow". Anda dapat menggunakannya sendiri tanpa beban konfigurasi yang rumit, lalu mengundang tim saat bisnis berkembang.',
      },
    ],
    demoType: 'interaktif' as const,
    demoStatus: 'Published' as const,
    demoTitle: 'Simulasi Interaktif Workspace OCTO CRM',
    demoSubtitle: 'Eksplorasi visual Kanban pipeline, profil timeline pelanggan, daftar tugas harian (Today), dan dashboard konversi penjualan dengan data sintetis.',
    demoLastReviewed: '2026-10-18',
    demoOwner: 'Tim Produk CRM & Pertumbuhan Hubungan',
    relatedProductSlugs: ['octo-tap', 'octo-insights', 'octo-loyalty', 'octo-business'],
  };

  return (
    <div className="py-12 md:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO SECTION */}
      <section className="space-y-8 text-center max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            WORKSPACE HUBUNGAN PELANGGAN
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
            Coba Demo Interaktif Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/consultation?product=octo-crm"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition"
          >
            Konsultasi Setup & Migrasi
          </Link>
        </div>

        {/* Target Audience */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[#586779] font-medium mr-1">Dirancang khusus untuk:</span>
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Tantangan Pengelolaan Pelanggan
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            Mengapa Spreadsheet & Chat Manual Menghambat Penjualan
          </h2>
          <p className="text-xs text-[#586779]">
            Ketika volume kontak bertambah, mengandalkan ingatan karyawan dan chat WhatsApp pribadi berisiko
            menghilangkan calon pembeli berharga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#E1E7EC]">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Masalah Nyata Operasional
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
              <CheckCircle2 className="w-4 h-4" /> Solusi & Nilai OCTO CRM
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

      {/* 3. INTERACTIVE PRODUCT DEMO */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
            {product.demoTitle}
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Simulasi Pipeline, Jadwal Tugas & Profil Interaksi
          </h2>
          <p className="text-xs sm:text-sm text-[#586779]">
            {product.demoSubtitle}
          </p>
        </div>

        <OctoCrmDemo />
      </section>

      {/* 4. CORE FEATURES & CAPABILITIES */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Kemampuan Inti Produk
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Sistem Sederhana yang Tumbuh Bersama Bisnis Anda
          </h2>
          <p className="text-xs text-[#586779]">
            Prinsip &quot;Action over Administration&quot;: Mengarahkan pengguna langsung ke tindakan berikutnya tanpa kerumitan form yang membingungkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feat, fIdx) => (
            <div key={fIdx} className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-3 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#00AFC4] flex items-center justify-center font-bold">
                {fIdx === 0 && <Users className="w-5 h-5" />}
                {fIdx === 1 && <Kanban className="w-5 h-5" />}
                {fIdx === 2 && <CalendarCheck className="w-5 h-5" />}
                {fIdx === 3 && <FileSpreadsheet className="w-5 h-5" />}
                {fIdx === 4 && <BarChart3 className="w-5 h-5" />}
                {fIdx === 5 && <ShieldCheck className="w-5 h-5" />}
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

      {/* 5. ECOSYSTEM INTEGRATION FLOW */}
      <section className="bg-[#142740] text-white p-8 sm:p-12 rounded-3xl space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            EKOSISTEM TERHUBUNG (ONE PLATFORM. MANY POSSIBILITIES.)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Bagaimana OCTO CRM Terhubung dengan Produk Lain
          </h2>
          <p className="text-xs text-slate-300">
            OCTO CRM tidak berdiri sendiri. Setiap sentuhan pelanggan di dunia nyata dapat mengalirkan data bernilai ke alur penjualan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-[#00AFC4]">
              <Smartphone className="w-5 h-5" />
              <span className="font-bold text-xs uppercase tracking-wider">OCTO Tap</span>
            </div>
            <h4 className="font-bold text-sm text-white">Lead Capture di Kasir</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pengunjung kasir memindai kartu ulasan dan dapat sukarela mendaftar program keanggotaan atau inquiry.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Users className="w-5 h-5" />
              <span className="font-bold text-xs uppercase tracking-wider">OCTO CRM</span>
            </div>
            <h4 className="font-bold text-sm text-white">Pengelolaan & Follow-Up</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Data prospek langsung masuk ke kolom New Pipeline dan memicu reminder follow-up tim penjualan secara rapi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Gift className="w-5 h-5" />
              <span className="font-bold text-xs uppercase tracking-wider">OCTO Loyalty</span>
            </div>
            <h4 className="font-bold text-sm text-white">Peluang Repeat Order</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Riwayat stempel digital dan voucher loyalitas sinkron dengan profil kontak untuk kampanye purna jual tepat sasaran.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-teal-400">
              <Building2 className="w-5 h-5" />
              <span className="font-bold text-xs uppercase tracking-wider">OCTO Business</span>
            </div>
            <h4 className="font-bold text-sm text-white">Kendali Multi-Cabang</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Head office dapat mengawasi pipeline prospek lintas cabang Senopati, Kemang, dan BSD dalam satu login SSO.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PRICING & TIERS (PRD Section 4.3) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Struktur Paket yang Diusulkan
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Pilihan Fleksibel Sesuai Skala Bisnis
          </h2>
          <p className="text-xs text-[#586779]">
            Prinsip Monetisasi Jujur: Tanpa data lock-in, batasan jelas, dan kemudahan ekspor database kapan saja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free Tier */}
          <div className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Free / Solopreneur</span>
              <div className="text-2xl font-black text-[#142740]">Rp 0</div>
              <p className="text-xs text-[#586779]">Untuk perorangan atau bisnis baru yang ingin merapikan kontak pertama.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-[#E1E7EC]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Contact Management dasar</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> 1 Sales Pipeline terbatas</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Task & Reminder harian</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Import & Export CSV</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> 1 Pengguna (User)</li>
              </ul>
            </div>
            <Link
              href="/request-demo?product=octo-crm"
              className="w-full py-2.5 text-center text-xs font-bold text-[#142740] bg-[#FAFBFC] hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition"
            >
              Coba Paket Free
            </Link>
          </div>

          {/* Starter Tier */}
          <div className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">Starter</span>
              <div className="text-2xl font-black text-[#142740]">Paket Tim Kecil</div>
              <p className="text-xs text-[#586779]">Cocok untuk bisnis jasa atau UMKM dengan staf penjualan 2–3 orang.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-[#E1E7EC]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Semua fitur Free</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Pipeline penjualan lengkap</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Custom fields dasar</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Dashboard metrik dasar</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Hingga 3 Anggota Tim</li>
              </ul>
            </div>
            <Link
              href="/request-demo?product=octo-crm"
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition"
            >
              Pilih Starter
            </Link>
          </div>

          {/* Growth Tier */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#00AFC4] space-y-5 flex flex-col justify-between relative shadow-md">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00AFC4] text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
              Paling Populer
            </div>
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">Growth</span>
              <div className="text-2xl font-black text-[#142740]">Paket Ekspansi</div>
              <p className="text-xs text-[#586779]">Untuk tim penjualan aktif yang membutuhkan multi-pipeline dan automasi.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-[#E1E7EC]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Multi-Pipeline terpisah</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Automasi rule sederhana</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Segmentasi & tag lanjutan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Granular permissions & role</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4]" /> Hingga 10 Anggota Tim</li>
              </ul>
            </div>
            <Link
              href="/request-demo?product=octo-crm"
              className="w-full py-2.5 text-center text-xs font-bold text-white bg-[#142740] hover:bg-[#1E3A5F] rounded-xl transition"
            >
              Minta Demo Growth
            </Link>
          </div>

          {/* Business / Enterprise Tier */}
          <div className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Business / Cabang</span>
              <div className="text-2xl font-black text-[#142740]">Multi-Workspace</div>
              <p className="text-xs text-[#586779]">Dukungan multi-lokasi, integrasi API khusus, dan audit log enterprise.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-3 border-t border-[#E1E7EC]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Multi-Cabang & Workspace</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Single Sign-On (SSO)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Webhook & API Kustom</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Dedicated SLA & Onboarding</li>
              </ul>
            </div>
            <Link
              href="/consultation?product=octo-crm"
              className="w-full py-2.5 text-center text-xs font-bold text-[#142740] bg-[#FAFBFC] hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition"
            >
              Konsultasi Enterprise
            </Link>
          </div>
        </div>
      </section>

      {/* 7. USE CASES */}
      <section className="bg-[#F2F5F7] p-8 sm:p-12 rounded-3xl border border-[#E1E7EC] space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Studi Skenario Nyata
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
            Bagaimana Berbagai Industri Memanfaatkan OCTO CRM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.useCases.map((uc, uIdx) => (
            <div key={uIdx} className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-4">
              <span className="text-xs font-bold text-[#00AFC4] uppercase tracking-wider block">
                {uc.industry}
              </span>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Skenario Operasional:</span>
                <p className="text-xs text-slate-800 font-medium">{uc.scenario}</p>
              </div>
              <div className="space-y-1 pt-2 border-t border-[#E1E7EC]">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Hasil Nyata:</span>
                <p className="text-xs text-[#586779]">{uc.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Tanya Jawab Seputar Produk
          </span>
          <h2 className="text-2xl font-extrabold text-[#142740]">
            FAQ Khusus OCTO CRM
          </h2>
        </div>

        <FaqAccordion items={product.faqs} defaultOpenIndex={0} allowMultiple={true} />
      </section>

      {/* 9. CROSS LINKS */}
      <section className="pt-8 border-t border-[#E1E7EC] space-y-6">
        <h3 className="font-bold text-lg text-[#142740]">Jelajahi Produk Terhubung Lainnya:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/products/octo-tap"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-[#00AFC4] block">OCTO Tap (Tersedia)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Kartu Interaktif Google Review →
            </h4>
            <p className="text-xs text-[#586779]">
              Sentuhan 1 detik di meja kasir untuk mendongkrak reputasi review bisnis Anda.
            </p>
          </Link>

          <Link
            href="/products/octo-insights"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-indigo-600 block">OCTO Insights (Beta)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Analitik Konversi & Sentimen Ulasan →
            </h4>
            <p className="text-xs text-[#586779]">
              Visualisasi tren interaksi ulasan, heatmap jam aktif, dan komparasi cabang.
            </p>
          </Link>

          <Link
            href="/products/octo-business"
            className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
          >
            <span className="text-xs font-bold text-teal-600 block">OCTO Business (Soon)</span>
            <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
              Pusat Kendali Ekosistem Multi-Cabang →
            </h4>
            <p className="text-xs text-[#586779]">
              Atur izin akses manajer cabang dan kendalikan inventaris perangkat secara sentral.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
