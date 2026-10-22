'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOcto } from '@/lib/store';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

function PartnerApplyContent() {
  const searchParams = useSearchParams();
  const initialTier = searchParams.get('tier') || 'reseller';
  const { addLead } = useOcto();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    partnerType: initialTier === 'agency' ? 'Agensi Digital' : initialTier === 'integrator' ? 'Integrator POS' : 'Reseller Hardware',
    city: '',
    message: '',
    consentGiven: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentGiven) {
      alert('Harap setujui syarat & ketentuan kemitraan.');
      return;
    }

    addLead({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      companySize: 'Mitra Calon',
      productInterest: 'partner',
      formType: 'partner-apply',
      partnerType: formData.partnerType,
      location: formData.city,
      message: `${formData.message} (Tipe Mitra: ${formData.partnerType}, Wilayah: ${formData.city})`,
      consentGiven: true,
      utmSource: 'partner_application_form',
      utmCampaign: 'partner_onboarding_2026',
    });

    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          FORMULIR KEMITRAAN RESMI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">
          Pengajuan Menjadi Partner OCTO
        </h1>
        <p className="text-sm text-[#586779]">
          Bergabunglah dengan jaringan mitra berlisensi resmi OCTO di seluruh Indonesia.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-14 text-center max-w-xl mx-auto space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-[#142740]">Aplikasi Kemitraan Diterima!</h3>
          <p className="text-xs sm:text-sm text-[#586779]">
            Tim Partner Ecosystem OCTO akan meninjau profil usaha Anda dan mengirimkan paket onboarding serta
            katalog harga grosir resmi ke email <strong>{formData.email}</strong>.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/partners"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition"
            >
              Kembali ke Info Kemitraan
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tipe Kemitraan yang Dipilih *</label>
              <select
                value={formData.partnerType}
                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
              >
                <option value="Reseller Hardware">Reseller Hardware Kartu OCTO Tap</option>
                <option value="Agensi Digital">Agensi Pemasaran Digital & Konsultan SEO</option>
                <option value="Integrator POS">Integrator Sistem Kasir / Software POS</option>
                <option value="Distributor Regional">Distributor Regional Eksklusif</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Penanggung Jawab *</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nomor Telepon / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="08..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Email Resmi Bisnis *</label>
                <input
                  type="email"
                  required
                  placeholder="partner@perusahaan.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Nama Perusahaan / Agensi *</label>
                <input
                  type="text"
                  required
                  placeholder="PT / CV / Brand Anda"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Kota / Wilayah Cakupan Operasional *</label>
              <input
                type="text"
                required
                placeholder="Contoh: Surabaya, Sidoarjo, dan sekitarnya"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Profil Singkat Klien & Target Distribusi</label>
              <textarea
                rows={3}
                placeholder="Jelaskan berapa banyak merchant/toko yang saat ini Anda kelola..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
              />
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="p-consent"
                required
                checked={formData.consentGiven}
                onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                className="mt-0.5 rounded border-slate-300 text-[#00AFC4] focus:ring-[#00AFC4]"
              />
              <label htmlFor="p-consent" className="text-[11px] text-[#586779]">
                Saya menyatakan informasi di atas benar dan menyetujui Ketentuan Kemitraan serta Kebijakan Privasi OCTO.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              Kirim Formulir Pengajuan Mitra <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function PartnerApplyPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Memuat formulir kemitraan...</div>}>
      <PartnerApplyContent />
    </Suspense>
  );
}
