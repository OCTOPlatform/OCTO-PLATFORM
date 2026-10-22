'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function NewsletterPage() {
  const { addLead } = useOcto();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [topics, setTopics] = useState<string[]>(['Produk & Fitur Baru', 'Studi Kasus & SOP']);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const availableTopics = [
    'Pembaruan Produk & Rilis Ekosistem',
    'Tips SEO Lokal & Optimasi Google Maps',
    'SOP Pelayanan Kasir & Kepuasan Tamu',
    'Studi Kasus Pertumbuhan Merchant',
  ];

  const toggleTopic = (t: string) => {
    if (topics.includes(t)) {
      setTopics(topics.filter((item) => item !== t));
    } else {
      setTopics([...topics, t]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Harap setujui persetujuan pengiriman email newsletter.');
      return;
    }

    addLead({
      fullName: name || 'Pembaca Newsletter',
      email,
      phone: '-',
      companyName: '-',
      companySize: '-',
      productInterest: 'general',
      formType: 'newsletter',
      message: `Topik dipilih: ${topics.join(', ')}`,
      consentGiven: true,
      utmSource: 'newsletter_landing_page',
    });

    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          OCTO DISPATCH & INSIGHTS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">
          Langganan Newsletter Berkala OCTO
        </h1>
        <p className="text-sm text-[#586779]">
          Dapatkan ringkasan strategi reputasi bisnis, update teknologi NFC, dan wawasan pertumbuhan UMKM langsung ke inbox Anda dua minggu sekali.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-8 sm:p-14 text-center max-w-md mx-auto space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-[#142740]">Terima Kasih Telah Berlangganan!</h3>
          <p className="text-xs text-[#586779]">
            Email konfirmasi telah dikirimkan ke <strong>{email}</strong>. Anda dapat mengubah preferensi topik atau berhenti berlangganan kapan saja melalui tautan di bagian bawah setiap email.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition inline-block"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-10 shadow-sm max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Nama Panggilan</label>
              <input
                type="text"
                placeholder="Contoh: Maya"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Alamat Email *</label>
              <input
                type="email"
                required
                placeholder="email@bisnisanda.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 block">Pilih Topik yang Menarik bagi Anda:</label>
              <div className="space-y-2">
                {availableTopics.map((top, idx) => {
                  const isChecked = topics.includes(top);
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                        isChecked
                          ? 'border-[#00AFC4] bg-[#E8F8FA] text-[#142740] font-semibold'
                          : 'border-[#E1E7EC] text-slate-600 hover:bg-[#FAFBFC]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTopic(top)}
                        className="rounded border-slate-300 text-[#00AFC4] focus:ring-[#00AFC4]"
                      />
                      <span>{top}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="n-consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#00AFC4] focus:ring-[#00AFC4]"
              />
              <label htmlFor="n-consent" className="text-[11px] text-[#586779]">
                Saya setuju menerima email berkala dari OCTO. Privasi terjaga, tanpa spam pihak ketiga.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 text-sm font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              Berlangganan Newsletter <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
