'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOcto } from '@/lib/store';
import { CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

function ConsultationContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get('product') || 'general';
  const { addLead } = useOcto();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '1-10 karyawan',
    consultationTopic: initialProduct,
    message: '',
    consentGiven: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentGiven) {
      alert('Harap setujui persetujuan privasi.');
      return;
    }

    addLead({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      companySize: formData.companySize,
      productInterest: formData.consultationTopic,
      formType: 'consultation',
      message: formData.message,
      consentGiven: true,
      utmSource: 'website_consultation',
      utmCampaign: 'octo_v2_launch',
    });

    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          KONSULTASI STRATEGI REPUTASI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">
          Konsultasi Kebutuhan Bisnis Anda
        </h1>
        <p className="text-sm text-[#586779]">
          Dapatkan rekomendasi penempatan kartu, estimasi kebutuhan perangkat, dan strategi ulasan lokal.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-14 text-center max-w-xl mx-auto space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-[#142740]">Permintaan Konsultasi Diterima</h3>
          <p className="text-xs sm:text-sm text-[#586779]">
            Konsultan solusi kami akan menghubungi Anda dalam 1 hari kerja untuk sesi pendahuluan.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="0812..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Bisnis *</label>
                <input
                  type="email"
                  required
                  placeholder="email@toko.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Toko / Perusahaan *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Usaha"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Fokus Topik Konsultasi</label>
              <select
                value={formData.consultationTopic}
                onChange={(e) => setFormData({ ...formData, consultationTopic: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
              >
                <option value="octo-tap">Pengadaan Kartu OCTO Tap & Cetak Custom Logo</option>
                <option value="octo-insights">Kebutuhan Analitik Performa Ulasan Cabang</option>
                <option value="octo-loyalty">Penerapan Program Loyalitas Tanpa Aplikasi</option>
                <option value="octo-business">Kendali Bisnis Multi-Cabang / Waralaba</option>
                <option value="octo-crm">Manajemen Hubungan Pelanggan & Pipeline Sales (OCTO CRM)</option>
                <option value="general">Konsultasi Umum Solusi Reputasi Digital</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Deskripsikan Kebutuhan atau Pertanyaan Anda</label>
              <textarea
                rows={3}
                required
                placeholder="Ceritakan kendala ulasan atau target bisnis Anda..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="c-consent"
                required
                checked={formData.consentGiven}
                onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-[#00AFC4] focus:ring-[#00AFC4]"
              />
              <label htmlFor="c-consent" className="text-[11px] text-[#586779]">
                Saya setuju dihubungi oleh tim OCTO untuk konsultasi ini sesuai Kebijakan Privasi yang berlaku.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              Kirim Permohonan Konsultasi <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Memuat formulir konsultasi...</div>}>
      <ConsultationContent />
    </Suspense>
  );
}
