'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOcto } from '@/lib/store';
import {
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Smartphone,
  BarChart3,
  Gift,
  Building2,
  Clock,
  ArrowRight,
} from 'lucide-react';

function RequestDemoContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get('product') || 'octo-tap';
  const { addLead, products } = useOcto();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '1-10 karyawan',
    productInterest: initialProduct,
    preferredDate: '',
    preferredTime: '10:00 WIB',
    message: '',
    consentGiven: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, productInterest: initialProduct }));
    }
  }, [initialProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentGiven) {
      alert('Harap setujui kebijakan privasi sebelum mengirim permohonan demo.');
      return;
    }

    const leadId = addLead({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      companySize: formData.companySize,
      productInterest: formData.productInterest,
      formType: 'request-demo',
      message: `${formData.message} (Waktu preferensi: ${formData.preferredDate} jam ${formData.preferredTime})`,
      preferredDate: formData.preferredDate,
      consentGiven: true,
      utmSource: 'website_request_demo',
      utmCampaign: 'octo_v2_launch',
    });

    setCreatedLeadId(leadId);
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          JADWALKAN DEMO TERPANDU
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">
          Minta Demo Eksklusif Platform OCTO
        </h1>
        <p className="text-sm text-[#586779]">
          Diskusikan kebutuhan spesifik gerai Anda bersama konsultan produk kami dalam sesi 20 menit tanpa komitmen.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#142740]">Permohonan Demo Berhasil Dikirim!</h3>
            <p className="text-xs sm:text-sm text-[#586779] max-w-md mx-auto">
              Terima kasih, <strong>{formData.fullName}</strong>. Tim spesialis OCTO akan menghubungi Anda melalui
              WhatsApp atau email dalam waktu maksimal 1x24 jam kerja untuk mengonfirmasi jadwal video call.
            </p>
            <div className="pt-2 text-xs font-mono text-[#00AFC4] font-semibold">
              Nomor Registrasi Lead: {createdLeadId}
            </div>
          </div>

          <div className="p-4 bg-[#FAFBFC] rounded-2xl border border-[#E1E7EC] text-xs text-left space-y-1.5">
            <span className="font-bold text-[#142740] block">Rincian Pengajuan Anda:</span>
            <p className="text-[#586779]">Bisnis: {formData.companyName} ({formData.companySize})</p>
            <p className="text-[#586779]">Produk Minat: {formData.productInterest.toUpperCase()}</p>
            <p className="text-[#586779]">Jadwal Preferensi: {formData.preferredDate || 'Segera'} jam {formData.preferredTime}</p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition"
            >
              Kembali ke Beranda
            </Link>
            <Link
              href="/admin"
              className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] border border-[#E1E7EC] rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#00AFC4]" /> Lihat di Lead CRM Admin
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Interest Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#142740] uppercase tracking-wider block">
                  Pilih Produk yang Ingin Dipelajari:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {products.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setFormData({ ...formData, productInterest: p.slug })}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                        formData.productInterest === p.slug
                          ? 'border-[#00AFC4] bg-[#E8F8FA] text-[#00AFC4]'
                          : 'border-[#E1E7EC] bg-[#FAFBFC] text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Pratama"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
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
                    placeholder="nama@perusahaan.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nama Toko / Usaha *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kafe Rasa Nusantara"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
              </div>

              {/* Company Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Jumlah Cabang / Karyawan</label>
                <select
                  value={formData.companySize}
                  onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                >
                  <option value="1 cabang (1-10 karyawan)">1 cabang (1–10 staf)</option>
                  <option value="2-5 cabang (11-50 karyawan)">2–5 cabang (11–50 staf)</option>
                  <option value="6-20 cabang (51-200 karyawan)">6–20 cabang (Multi-lokasi)</option>
                  <option value="20+ cabang (Enterprise/Franchise)">20+ cabang (Jaringan Besar)</option>
                </select>
              </div>

              {/* Date & Time Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00AFC4]" /> Tanggal Preferensi Demo
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00AFC4]" /> Waktu Pilihan
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  >
                    <option value="10:00 WIB">Pagi (10:00 WIB)</option>
                    <option value="11:30 WIB">Siang (11:30 WIB)</option>
                    <option value="14:00 WIB">Siang (14:00 WIB)</option>
                    <option value="16:00 WIB">Sore (16:00 WIB)</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Catatan Khusus / Kebutuhan Tambahan (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Misal: Ingin mencetak logo kafe pada kartu atau integrasi cabang BSD..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consentGiven}
                  onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-[#00AFC4] focus:ring-[#00AFC4]"
                />
                <label htmlFor="consent" className="text-[11px] text-[#586779] leading-tight">
                  Saya menyetujui bahwa data ini akan digunakan secara sah oleh OCTO semata-mata untuk menghubungi saya
                  terkait penjadwalan demo produk sesuai{' '}
                  <Link href="/privacy" className="text-[#00AFC4] underline font-semibold">
                    Kebijakan Privasi
                  </Link>
                  . Kami tidak pernah membagikan kontak Anda ke pihak ketiga.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                Kirim Permohonan Jadwal Demo <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="space-y-6">
            <div className="bg-[#142740] text-white p-6 rounded-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
                Apa yang Akan Anda Dapatkan?
              </span>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                  <span>Sesi privat 20 menit live walkthrough platform OCTO.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                  <span>Audit singkat visibilitas Google Business Profile toko Anda saat ini.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                  <span>Sampel kartu fisik uji coba atau simulasi cetak logo gratis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                  <span>Estimasi penawaran harga transparan tanpa biaya tersembunyi.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E1E7EC] space-y-3 text-xs text-[#586779]">
              <span className="font-bold text-[#142740] block">Butuh Jawaban Cepat Sekarang?</span>
              <p>Tim dukungan kami siap melayani pertanyaan Anda via WhatsApp langsung:</p>
              <a
                href="https://wa.me/6281295099738"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-emerald-600 hover:underline"
              >
                +62 812 9509 9738 (WhatsApp Bisnis) →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RequestDemoPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Memuat formulir demo...</div>}>
      <RequestDemoContent />
    </Suspense>
  );
}
