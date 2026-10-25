'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { useOcto } from '@/lib/store';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export default function ContactPage() {
  const { addLead } = useOcto();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consentGiven: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consentGiven) {
      alert('Harap setujui persetujuan privasi.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage(null);

      // Konfigurasi endpoint & workspace ID dari Environment Variables
      const crmApiUrl = process.env.NEXT_PUBLIC_CRM_API_URL || 'http://localhost:8080/api/v1';
      const crmWorkspaceId = process.env.NEXT_PUBLIC_CRM_WORKSPACE_ID || '0c700000-0000-0000-0000-000000000000';

      // 1. Kirim prospek secara atomik ke backend OCTO-CRM via Inbound Lead Intake API
      const payload = {
        full_name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        company_name: '-',
        product_interest: formData.subject.trim() || 'General Inquiry',
        form_type: 'Website Contact Form',
        message: `Subjek: ${formData.subject}\nPesan: ${formData.message}`,
        consent_given: true,
        utm_source: 'octo_web_contact',
        utm_campaign: 'website_inbound',
      };

      try {
        const response = await fetch(`${crmApiUrl}/workspaces/${crmWorkspaceId}/integrations/lead-intake`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          console.warn('OCTO-CRM intake API responded with non-200 status:', errData);
        }
      } catch (networkErr) {
        console.warn('Gagal menghubungi backend OCTO-CRM (offline / network error), tetap mencatat ke local store:', networkErr);
      }

      // 2. Simpan juga ke local store OCTO-WEB agar audit lead & demo web tetap sinkron
      addLead({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        companyName: '-',
        companySize: '-',
        productInterest: formData.subject || 'general',
        formType: 'contact',
        message: `Subjek: ${formData.subject}\nPesan: ${formData.message}`,
        consentGiven: true,
        utmSource: 'contact_page',
      });

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi kendala saat mengirimkan pesan. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          KANAL KOMUNIKASI RESMI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">Hubungi Tim OCTO</h1>
        <p className="text-sm text-[#586779]">
          Apakah Anda memiliki pertanyaan seputar kartu fisik, penawaran harga kemitraan, atau bantuan teknis?
          Kami siap membantu bisnis Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-extrabold text-xl text-[#142740]">Kantor Operasional</h3>

            <div className="space-y-4 text-xs text-[#586779]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#142740] block">Alamat Fisik:</strong>
                  <span>{BRAND.officeAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#142740] block">Telepon Kantor:</strong>
                  <span>{BRAND.officialPhone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#142740] block">Email Kontak:</strong>
                  <div className="space-y-0.5 mt-0.5">
                    <p className="flex items-center gap-1.5 flex-wrap">
                      <a href={`mailto:${BRAND.officialEmail}`} className="text-[#00AFC4] hover:underline font-medium">
                        {BRAND.officialEmail}
                      </a>
                      <span className="text-[10px] bg-cyan-50 text-[#00AFC4] px-1.5 py-0.2 rounded border border-cyan-200">
                        Aktif Sementara
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="line-through">{BRAND.domainEmail}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded border border-slate-200">
                        Sedang Tidak Aktif
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#142740] block">Jam Layanan Operasional:</strong>
                  <span>{BRAND.operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E7EC]">
              <a
                href={`https://wa.me/6281295099738?text=Halo%20tim%20OCTO,%20saya%20ingin%20bertanya%20mengenai%20produk%20OCTO`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare className="w-4 h-4" /> Chat WhatsApp Resmi
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#142740]">Pesan Berhasil Terkirim!</h3>
              <p className="text-xs sm:text-sm text-[#586779] max-w-sm mx-auto">
                Terima kasih atas pesan Anda. Customer service kami akan membalas ke email{' '}
                <strong>{formData.email}</strong> dalam hari kerja yang sama.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition inline-block"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="font-extrabold text-xl text-[#142740]">Kirimkan Pesan Anda</h3>

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
                    placeholder="08..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Alamat Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@anda.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Subjek Keperluan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pertanyaan Pemesanan Kartu Kustom"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Pesan / Pertanyaan Anda *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan pertanyaan atau kebutuhan Anda secara jelas di sini..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="ct-consent"
                  required
                  checked={formData.consentGiven}
                  onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-[#00AFC4] focus:ring-[#00AFC4]"
                />
                <label htmlFor="ct-consent" className="text-[11px] text-[#586779]">
                  Saya menyetujui pemrosesan data di atas demi membalas pertanyaan saya sesuai Kebijakan Privasi OCTO.
                </label>
              </div>

              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirimkan Pesan ke CRM...</span>
                  </>
                ) : (
                  <>
                    <span>Kirimkan Pesan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
