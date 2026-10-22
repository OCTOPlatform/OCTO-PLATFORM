'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OctoLogo from '../brand/OctoLogo';
import { BRAND } from '@/lib/constants';
import { useOcto } from '@/lib/store';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function Footer() {
  const { addLead, setCookiePrefs } = useOcto();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    addLead({
      fullName: 'Pelanggan Newsletter',
      email: newsletterEmail,
      phone: '-',
      companyName: '-',
      companySize: '-',
      productInterest: 'general',
      formType: 'newsletter',
      consentGiven: true,
      message: 'Berlangganan newsletter pembaruan produk dan insight bisnis OCTO.',
    });

    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#142740] text-slate-300 border-t border-[#1E3A5F] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1E3A5F]">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <OctoLogo variant="light" showTagline size="lg" />
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {BRAND.tagline}
              <br />
              {BRAND.description}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
                Dapatkan Update & Insight Bisnis
              </span>
              {subscribed ? (
                <div className="mt-2 p-3 bg-emerald-900/40 border border-emerald-500/30 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Terima kasih! Anda telah terdaftar untuk menerima pembaruan berkala dari OCTO.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="mt-2 flex max-w-sm gap-2">
                  <input
                    type="email"
                    required
                    placeholder="nama@bisnisanda.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-[#0D1B2D] border border-[#1E3A5F] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-[#00AFC4]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-semibold text-[#142740] bg-[#00AFC4] hover:bg-cyan-300 rounded-lg transition shrink-0 flex items-center gap-1"
                  >
                    Ikuti <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-slate-400 mt-1.5">
                Kami menghormati privasi Anda. Tidak ada spam, berhenti berlangganan kapan saja.
              </p>
            </div>
          </div>

          {/* Ekosistem Produk */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Lini Produk</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/octo-tap" className="hover:text-[#00AFC4] transition flex items-center gap-1.5">
                  OCTO Tap <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800">Live</span>
                </Link>
              </li>
              <li>
                <Link href="/products/octo-insights" className="hover:text-[#00AFC4] transition flex items-center gap-1.5">
                  OCTO Insights <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800">Beta</span>
                </Link>
              </li>
              <li>
                <Link href="/products/octo-loyalty" className="hover:text-[#00AFC4] transition flex items-center gap-1.5">
                  OCTO Loyalty <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800">Dev</span>
                </Link>
              </li>
              <li>
                <Link href="/products/octo-business" className="hover:text-[#00AFC4] transition flex items-center gap-1.5">
                  OCTO Business <span className="text-[10px] text-indigo-400 bg-indigo-950/60 px-1.5 py-0.2 rounded border border-indigo-800">Soon</span>
                </Link>
              </li>
              <li>
                <Link href="/products/octo-crm" className="hover:text-[#00AFC4] transition flex items-center gap-1.5">
                  OCTO CRM <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800">Beta</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-xs text-[#00AFC4] hover:underline pt-1 inline-block">
                  Katalog & Perbandingan Lengkap →
                </Link>
              </li>
            </ul>
          </div>

          {/* Solusi Industri & Resource */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Solusi & Edukasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/solutions/retail" className="hover:text-[#00AFC4] transition">
                  Retail & Toko Modern
                </Link>
              </li>
              <li>
                <Link href="/solutions/food-beverage" className="hover:text-[#00AFC4] transition">
                  Kafe & Restoran (F&B)
                </Link>
              </li>
              <li>
                <Link href="/solutions/beauty-wellness" className="hover:text-[#00AFC4] transition">
                  Klinik Kecantikan & Spa
                </Link>
              </li>
              <li>
                <Link href="/solutions/healthcare" className="hover:text-[#00AFC4] transition">
                  Kesehatan & Faskes
                </Link>
              </li>
              <li>
                <Link href="/resources/articles" className="hover:text-[#00AFC4] transition">
                  Artikel & Wawasan
                </Link>
              </li>
              <li>
                <Link href="/resources/guides" className="hover:text-[#00AFC4] transition">
                  Panduan SOP Kasir
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="hover:text-[#00AFC4] transition">
                  Knowledge Base FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Perusahaan & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#00AFC4] transition">
                  Tentang OCTO
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-[#00AFC4] transition">
                  Program Kemitraan
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-[#00AFC4] transition">
                  Berita & Pembaruan
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#00AFC4] transition">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#00AFC4] transition">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-[#00AFC4] transition">
                  Garansi & Retur Kartu
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setCookiePrefs({ saved: false })}
                  className="cursor-pointer text-left text-xs text-slate-400 hover:text-white transition underline"
                >
                  Pengaturan Preferensi Cookie
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info Strip */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 border-b border-[#1E3A5F]">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
            <span>{BRAND.officeAddress}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
            <div>
              <p>
                Telepon:{' '}
                <a
                  href={`tel:${BRAND.officialPhone.replace(/\s+/g, '')}`}
                  className="hover:text-[#00AFC4] transition"
                >
                  {BRAND.officialPhone}
                </a>
              </p>
              <p>
                WhatsApp:{' '}
                <a
                  href={`https://wa.me/${BRAND.officialWhatsApp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00AFC4] transition"
                >
                  {BRAND.officialWhatsApp}
                </a>
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>Jam Layanan: {BRAND.operatingHours}</p>
              <div className="pt-0.5 space-y-1">
                <p className="flex items-center gap-1.5 flex-wrap">
                  <span>Email:</span>
                  <a
                    href={`mailto:${BRAND.officialEmail}`}
                    className="text-[#00AFC4] hover:underline font-medium"
                  >
                    {BRAND.officialEmail}
                  </a>
                  <span className="text-[10px] bg-cyan-950/80 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-800">
                    Aktif Sementara
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                  <span className="line-through">{BRAND.domainEmail}</span>
                  <span className="text-[10px] bg-slate-800/80 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                    Sedang Tidak Aktif
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 PT Platform Bisnis Terhubung (OCTO). Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-200 transition">
              Privasi
            </Link>
            <Link href="/terms" className="hover:text-slate-200 transition">
              Ketentuan Layanan
            </Link>
            <Link href="/cookies" className="hover:text-slate-200 transition">
              Cookie
            </Link>
            <Link href="/admin" className="text-[#00AFC4] hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
