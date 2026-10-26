'use client';

import React from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import OctoTapDemo from '@/components/demos/OctoTapDemo';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { BRAND, INDUSTRIES } from '@/lib/constants';
import {
  Smartphone,
  BarChart3,
  Gift,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Lock,
  Users,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';

export default function HomePage() {
  const { products, resources } = useOcto();

  const getProductIcon = (slug: string) => {
    switch (slug) {
      case 'octo-tap':
        return <Smartphone className="w-6 h-6 text-[#00AFC4]" />;
      case 'octo-insights':
        return <BarChart3 className="w-6 h-6 text-indigo-500" />;
      case 'octo-loyalty':
        return <Gift className="w-6 h-6 text-amber-500" />;
      case 'octo-business':
        return <Building2 className="w-6 h-6 text-teal-600" />;
      case 'octo-crm':
        return <Users className="w-6 h-6 text-cyan-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#00AFC4]" />;
    }
  };

  const homeFaqs = [
    {
      question: 'Apa itu platform OCTO dan bagaimana produk-produknya saling terhubung?',
      answer: 'OCTO adalah ekosistem alat bisnis pintar yang menghubungkan interaksi fisik pelanggan (OCTO Tap), analitik performa ulasan (OCTO Insights), retensi program loyalitas (OCTO Loyalty), serta pusat komando multi-cabang (OCTO Business) dalam satu payung brand yang konsisten.',
    },
    {
      question: 'Bagaimana cara kerja kartu fisik OCTO Tap untuk Google Review?',
      answer: 'Kartu OCTO Tap dilengkapi chip NFC dan kode QR terkalibrasi. Saat disentuhkan ke ponsel pelanggan atau dipindai kameranya, browser ponsel otomatis langsung membuka halaman form ulasan resmi Google Business toko Anda tanpa harus mengetik manual.',
    },
    {
      question: 'Apakah OCTO Tap menjamin seluruh review pasti bintang 5?',
      answer: 'Tidak. Prinsip utama OCTO adalah "Proof over Hype". Kami mempermudah jalur teknis agar pelanggan yang puas dapat memberikan ulasan secara instan. Pelanggan tetap menilai dan mengirimkan ulasan secara sukarela dan independen di Google.',
    },
    {
      question: 'Apakah pelanggan harus mengunduh aplikasi untuk menggunakan kartu OCTO?',
      answer: 'Sama sekali tidak. Seluruh pengalaman dirancang tanpa aplikasi tambahan (zero app friction) memanfaatkan fitur bawaan browser dan sistem operasi iOS serta Android.',
    },
    {
      question: 'Bagaimana status ketersediaan masing-masing produk OCTO saat ini?',
      answer: 'OCTO Tap saat ini berstatus Tersedia secara komersial; OCTO Insights dalam status Akses Terbatas / Closed Beta; OCTO Loyalty dalam status Dalam Pengembangan; dan OCTO Business berstatus Segera Hadir. Status ini dikelola terpusat dan transparan.',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24">
        {/* Soft cyan gradient aura in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-gradient-to-b from-[#E8F8FA]/80 via-[#FAFBFC] to-transparent pointer-events-none -z-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E8F8FA] border border-cyan-200/80 px-4 py-1.5 rounded-full text-xs font-semibold text-[#142740] shadow-sm animate-in fade-in duration-300">
            <span className="w-2 h-2 rounded-full bg-[#00AFC4] animate-pulse" />
            <span className="text-[#00AFC4] font-bold">OCTO PLATFORM 2026</span>
            <span className="text-slate-400">|</span>
            <span>ONE PLATFORM. MANY POSSIBILITIES.</span>
          </div>

          {/* Main Display Headline */}
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#142740] tracking-tight leading-[1.12]">
              Alat Bisnis Pintar yang <span className="text-[#00AFC4]">Terhubung</span> untuk Pertumbuhan Nyata.
            </h1>
            <p className="text-lg sm:text-xl text-[#586779] max-w-2xl mx-auto font-normal leading-relaxed">
              Tingkatkan ulasan Google Maps, baca pola sentimen pelanggan, dan bangun loyalitas tanpa friksi
              melalui satu ekosistem terpadu.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/request-demo"
              className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Minta Demo & Konsultasi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#demo-section"
              className="w-full sm:w-auto px-7 py-3.5 text-base font-semibold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl shadow-sm transition"
            >
              Coba Demo Interaktif
            </Link>
          </div>

          {/* Trust Value Badges Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-[#586779]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00AFC4]" />
              <span>100% Dukungan Android & iPhone</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00AFC4]" />
              <span>Bebas Aplikasi Tambahan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00AFC4]" />
              <span>Kepatuhan Resmi Google Policy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & PRINCIPLES (PRD Section 2.3 - Proof over Hype) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-12 shadow-sm space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
              Prinsip Fondasi Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142740]">
              Proof Over Hype: Reputasi Sejati Dibangun dari Kualitas Layanan Nyata
            </h2>
            <p className="text-sm text-[#586779] leading-relaxed">
              Kami tidak menawarkan jalan pintas ulasan palsu atau janji omong kosong. OCTO fokus meruntuhkan
              hambatan teknologi agar pelanggan yang tulus puas dengan layanan Anda dapat memberikan apresiasi resmi
              dengan mudah.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-[#E1E7EC]">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#142740]">Akses 1 Detik</h3>
              <p className="text-xs text-[#586779]">
                Menghapus proses mencari nama toko secara manual yang sering membuat pelanggan batal memberi review.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#142740]">Privacy by Design</h3>
              <p className="text-xs text-[#586779]">
                Data pengunjung tidak disadap atau diperjualbelikan. Kepatuhan mutlak terhadap UU PDP dan GDPR.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#142740]">Transparansi Status</h3>
              <p className="text-xs text-[#586779]">
                Status produk selalu jelas: fitur yang masih dalam tahap beta atau konsep tidak diklaim sebagai live.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#E8F8FA] text-[#00AFC4] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#142740]">Terhubung & Skalabel</h3>
              <p className="text-xs text-[#586779]">
                Dari 1 meja kasir UMKM hingga ratusan cabang waralaba nasional, dikelola secara terpusat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT ECOSYSTEM GRID (PRD Section 3 & 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Lini Solusi Terpadu
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#142740] tracking-tight">
            Ekosistem Produk OCTO
          </h2>
          <p className="text-sm text-[#586779]">
            Setiap produk dirancang saling melengkapi untuk menjawab kebutuhan bisnis di setiap tahap pertumbuhan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-[#E1E7EC] p-8 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC] group-hover:border-[#00AFC4] transition">
                      {getProductIcon(prod.slug)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xl text-[#142740] group-hover:text-[#00AFC4] transition">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#586779] font-medium">{prod.tagline}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold border ${prod.statusBadgeColor}`}>
                    {prod.status}
                  </span>
                </div>

                <p className="text-sm text-[#586779] leading-relaxed">
                  {prod.shortDesc}
                </p>

                {/* Benefits Bullet points */}
                <div className="space-y-2 pt-2 border-t border-[#E1E7EC]">
                  {prod.keyBenefits.slice(0, 3).map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00AFC4] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E1E7EC] flex items-center justify-between">
                <Link
                  href={`/products/${prod.slug}#demo`}
                  className="text-xs font-bold text-[#142740] hover:text-[#00AFC4] flex items-center gap-1 transition"
                >
                  Coba Demo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={`/products/${prod.slug}`}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#142740] hover:bg-[#1E3A5F] rounded-lg transition"
                >
                  Pelajari Selengkapnya
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED INTERACTIVE DEMO (PRD Section 9.4 - OCTO Tap as Highlight) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" id="demo-section">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3 py-1 rounded-full border border-cyan-200">
            Demo Unggulan Langsung
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Rasakan Kemudahan Alur OCTO Tap Sekarang
          </h2>
          <p className="text-sm text-[#586779]">
            Uji coba simulasi dari sudut pandang pengunjung: sentuh kartu fisik NFC atau pindai QR untuk membuka
            form resmi Google Review dalam hitungan detik.
          </p>
        </div>

        <OctoTapDemo businessName="Kopi Rasa Bahagia (Demo Bisnis)" />
      </section>

      {/* 5. HOW IT WORKS (PRD Section 7) */}
      <section className="bg-[#F2F5F7] py-20 border-y border-[#E1E7EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
              Alur Penerapan Sederhana
            </span>
            <h2 className="text-3xl font-extrabold text-[#142740]">
              4 Langkah Cepat Menuju Pertumbuhan Reputasi Bisnis
            </h2>
            <p className="text-sm text-[#586779]">
              Tanpa setup rumit, kartu dapat langsung ditempatkan di meja kasir Anda dalam hitungan menit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Tentukan Kebutuhan & Desain',
                desc: 'Pilih model kartu standar OCTO atau cetak kustom dengan logo resmi bisnis Anda.',
              },
              {
                step: '02',
                title: 'Tempatkan di Meja Kasir',
                desc: 'Letakkan stand kartu fisik di area kasir atau meja makan tempat momen kepuasan terjadi.',
              },
              {
                step: '03',
                title: 'Ajak dengan SOP Santun',
                desc: 'Kasir mengajak tamu tersenyum untuk mengetuk smartphone 1 detik ke kartu saat pembayaran.',
              },
              {
                step: '04',
                title: 'Evaluasi & Berkembang',
                desc: 'Pantau ulasan baru di Google Maps dan kembangkan ke modul analitik serta loyalitas.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E1E7EC] space-y-3 relative">
                <span className="text-3xl font-black text-[#00AFC4]/30">{item.step}</span>
                <h3 className="font-bold text-base text-[#142740]">{item.title}</h3>
                <p className="text-xs text-[#586779] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRY SOLUTIONS (PRD Section 6 & 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
              Solusi Berdasarkan Industri
            </span>
            <h2 className="text-3xl font-extrabold text-[#142740]">
              Disesuaikan untuk Karakteristik Bisnis Anda
            </h2>
            <p className="text-sm text-[#586779]">
              Setiap industri memiliki pola interaksi tamu yang unik. Temukan use case yang paling sesuai.
            </p>
          </div>
          <Link
            href="/solutions"
            className="text-xs font-bold text-[#00AFC4] hover:underline flex items-center gap-1 shrink-0"
          >
            Lihat Seluruh Solusi Industri →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/solutions/${ind.slug}`}
              className="bg-white p-6 rounded-2xl border border-[#E1E7EC] hover:border-[#00AFC4] shadow-sm hover:shadow-md transition space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-[#142740] group-hover:text-[#00AFC4] transition">
                  {ind.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-[#586779] group-hover:text-[#00AFC4] group-hover:translate-x-1 transition" />
              </div>
              <p className="text-xs text-[#586779] line-clamp-2 leading-relaxed">
                {ind.description}
              </p>
              <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                {ind.stats}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. FEATURED RESOURCES (PRD Section 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
              Resource Center & Edukasi
            </span>
            <h2 className="text-3xl font-extrabold text-[#142740]">
              Wawasan & Panduan Praktis Pertumbuhan
            </h2>
          </div>
          <Link
            href="/resources"
            className="text-xs font-bold text-[#00AFC4] hover:underline flex items-center gap-1 shrink-0"
          >
            Buka Semua Artikel & Download →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.slice(0, 3).map((res) => (
            <Link
              key={res.id}
              href={`/resources/${res.slug}`}
              className="bg-white rounded-2xl border border-[#E1E7EC] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-2 py-0.5 rounded">
                    {res.category}
                  </span>
                  <span className="text-slate-400">{res.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-[#142740] group-hover:text-[#00AFC4] transition line-clamp-2">
                  {res.title}
                </h3>
                <p className="text-xs text-[#586779] line-clamp-3 leading-relaxed">
                  {res.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E1E7EC] flex items-center justify-between text-xs text-[#586779]">
                <span>{res.author.name}</span>
                <span className="font-semibold text-[#00AFC4] group-hover:underline">Baca Selengkapnya</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. PARTNER CALLOUT (PRD Section 5.1 & 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#142740] to-[#1E3A5F] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold text-[#00AFC4] uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/20">
              PROGRAM KEMITRAAN & RESELLER
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Kembangkan Bisnis Klien Anda Bersama Ekosistem OCTO
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Apakah Anda agensi digital marketing, konsultan F&B, atau distributor hardware POS?
              Dapatkan komisi menarik, materi pemasaran resmi, dan portal manajemen khusus mitra.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/partners/apply"
              className="px-6 py-3 text-xs font-bold text-[#142740] bg-[#00AFC4] hover:bg-cyan-300 rounded-xl shadow-md transition text-center"
            >
              Daftar Jadi Mitra Resmi
            </Link>
            <Link
              href="/partners"
              className="px-6 py-3 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition text-center"
            >
              Pelajari Program Kemitraan
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION (PRD Section 7) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Pertanyaan yang Sering Diajukan
          </span>
          <h2 className="text-3xl font-extrabold text-[#142740]">
            Tanya Jawab Seputar OCTO
          </h2>
        </div>

        <FaqAccordion items={homeFaqs} defaultOpenIndex={0} allowMultiple={true} />

        <div className="text-center pt-2">
          <Link
            href="/resources/faq"
            className="text-xs font-bold text-[#00AFC4] hover:underline"
          >
            Lihat Seluruh Pertanyaan di Pusat Bantuan FAQ →
          </Link>
        </div>
      </section>

      {/* 10. FINAL CTA (PRD Section 7) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-14 text-center space-y-6 shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
            Siap Membangun Reputasi Bintang 5?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#142740] tracking-tight">
            Mulai Transformasi Interaksi Pelanggan Toko Anda Hari Ini
          </h2>
          <p className="text-sm text-[#586779] max-w-xl mx-auto leading-relaxed">
            Pesan kartu OCTO Tap untuk kasir Anda atau jadwalkan sesi konsultasi gratis bersama spesialis produk kami.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/request-demo"
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-lg transition flex items-center justify-center gap-2"
            >
              Minta Demo & Penawaran
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/6285111357738?text=Halo%20tim%20OCTO,%20saya%20ingin%20konsultasi%20kartu%20review%20dan%20ekosistem%20OCTO`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] border border-[#E1E7EC] rounded-xl transition flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Chat WhatsApp Resmi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
