'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useOcto } from '@/lib/store';
import PhysicalCardMockup from '@/components/cards/PhysicalCardMockup';
import {
  Smartphone,
  QrCode,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  CheckCircle,
  ExternalLink,
  Layers,
  ArrowRight,
  Info,
} from 'lucide-react';

interface OctoTapDemoProps {
  businessName?: string;
  className?: string;
}

export default function OctoTapDemo({
  businessName = 'Kopi Rasa Bahagia (Simulasi)',
  className = '',
}: OctoTapDemoProps) {
  const { trackEvent } = useOcto();
  const [step, setStep] = useState<number>(1);
  const [interactionMethod, setInteractionMethod] = useState<'nfc' | 'qr' | null>(null);
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [reviewTextInput, setReviewTextInput] = useState<string>(
    'Tempat kopi favorit di Senopati! Kopinya mantap, staf baristanya ramah banget. Pasti bakal balik lagi ke sini.'
  );
  const [showFallback, setShowFallback] = useState<boolean>(false);

  const totalSteps = 4;

  const handleStartInteraction = (method: 'nfc' | 'qr') => {
    setInteractionMethod(method);
    setStep(2);
    trackEvent('product_demo_start', {
      productSlug: 'octo-tap',
      demoType: 'interaktif',
      label: `Metode ${method.toUpperCase()}`,
    });

    // Auto transition to step 3 after simulation animation
    setTimeout(() => {
      setStep(3);
      trackEvent('product_demo_step_complete', {
        productSlug: 'octo-tap',
        demoType: 'interaktif',
        label: 'Step 3 - Review Destination Opened',
      });
    }, 1800);
  };

  const handleCompleteDemo = () => {
    setStep(4);
    trackEvent('product_demo_complete', {
      productSlug: 'octo-tap',
      demoType: 'interaktif',
      label: 'Demo Alur Selesai',
    });
  };

  const handleReset = () => {
    setStep(1);
    setInteractionMethod(null);
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#E1E7EC] shadow-xl overflow-hidden ${className}`} id="demo">
      {/* Demo Header Bar with status & controls */}
      <div className="bg-[#142740] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A5F]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00AFC4] animate-ping" />
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Demo Interaktif: Kartu Fisik OCTO Tap
            </h3>
            <p className="text-[11px] text-slate-300">
              Simulasi alur sentuh NFC atau pindai QR menuju halaman Google Review
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fallback View Switcher */}
          <button
            onClick={() => {
              setShowFallback(!showFallback);
              trackEvent('product_demo_fallback_view', { productSlug: 'octo-tap' });
            }}
            className="text-xs px-2.5 py-1 bg-[#1E3A5F] hover:bg-[#2A4D77] rounded text-slate-200 transition flex items-center gap-1.5"
            title="Beralih ke mode diagram statis bila ada kendala interaksi"
          >
            <Layers className="w-3.5 h-3.5 text-[#00AFC4]" />
            {showFallback ? 'Buka Mode Interaktif' : 'Mode Fallback (Diagram)'}
          </button>

          <button
            onClick={handleReset}
            className="text-xs px-2.5 py-1 bg-[#0D1B2D] hover:bg-black rounded text-slate-300 transition flex items-center gap-1"
            title="Mulai Ulang Demo"
          >
            <RotateCcw className="w-3 h-3" />
            Mulai Ulang
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-[#F2F5F7] px-6 py-2.5 border-b border-[#E1E7EC] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-medium text-[#142740]">
          <span>Langkah {step} dari {totalSteps}:</span>
          <span className="font-bold text-[#00AFC4]">
            {step === 1 && 'Pilih Metode Interaksi (NFC / QR)'}
            {step === 2 && 'Simulasi Transisi Sinyal Digital'}
            {step === 3 && 'Tampilan Halaman Google Review'}
            {step === 4 && 'Ringkasan & Validasi Alur'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === step
                  ? 'bg-[#00AFC4] scale-125'
                  : i < step
                  ? 'bg-[#142740]'
                  : 'bg-[#E1E7EC]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fallback View Mode */}
      {showFallback ? (
        <div className="p-8 bg-[#FAFBFC] space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <h4 className="text-lg font-bold text-[#142740]">Diagram Alur Kerja Kartu OCTO Tap</h4>
            <p className="text-xs text-[#586779]">
              Mode Fallback menyediakan representasi langkah demi langkah tanpa simulasi animasi:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-4">
            <div className="bg-white p-5 rounded-xl border border-[#E1E7EC] text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-[#E8F8FA] rounded-full flex items-center justify-center text-[#00AFC4]">
                <Smartphone className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-sm text-[#142740]">1. Sentuh / Scan</h5>
              <p className="text-xs text-[#586779]">
                Kartu fisik diletakkan di kasir. Pelanggan mendekatkan smartphone (NFC) atau memindai kode QR.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#E1E7EC] text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-[#E8F8FA] rounded-full flex items-center justify-center text-[#00AFC4]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h5 className="font-bold text-sm text-[#142740]">2. Pengalihan Instan</h5>
              <p className="text-xs text-[#586779]">
                Chip NTAG213 mengarahkan browser pelanggan langsung ke URL resmi Google Review bisnis tanpa aplikasi tambahan.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#E1E7EC] text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-[#E8F8FA] rounded-full flex items-center justify-center text-[#00AFC4]">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <h5 className="font-bold text-sm text-[#142740]">3. Ulasan Mandiri</h5>
              <p className="text-xs text-[#586779]">
                Pelanggan memberi bintang dan opini secara sukarela di Google. Reputasi naik secara alami dan jujur.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setShowFallback(false)}
              className="px-5 py-2.5 bg-[#00AFC4] text-white text-xs font-bold rounded-lg hover:bg-[#0098AB] transition"
            >
              Kembali ke Simulasi Interaktif
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Step Content */
        <div className="p-6 md:p-10">
          {/* STEP 1: Card Mockup & Choice */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-200">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#00AFC4] uppercase tracking-wider bg-[#E8F8FA] px-3 py-1 rounded-full border border-cyan-200">
                  Langkah 1: Simulasi Titik Sentuh Pelanggan
                </span>
                <h4 className="text-xl md:text-2xl font-bold text-[#142740]">
                  Pilih Cara Pelanggan Berinteraksi dengan Kartu
                </h4>
                <p className="text-sm text-[#586779] max-w-lg mx-auto">
                  Berikut tampilan visual kartu fisik berstandar industri. Kartu pasif ini diletakkan di kasir atau meja
                  pelanggan.
                </p>
              </div>

              {/* Physical Card Mockup - 100x100mm Acrylic Stand Aligned with OCTO-TAP */}
              <div className="flex flex-col items-center">
                <PhysicalCardMockup
                  businessName={businessName}
                  cardCode="OCTO-TAP-DEMO-01"
                  redirectUrl="https://octo.id/t/kopi-bahagia"
                  showThemeSwitcher={true}
                  interactiveFlip={true}
                />
              </div>

              {/* Action Buttons to test Tap or QR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <button
                  onClick={() => handleStartInteraction('nfc')}
                  className="p-4 rounded-xl border-2 border-[#00AFC4] bg-[#E8F8FA] hover:bg-cyan-100/70 transition text-left flex items-center gap-3.5 group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#00AFC4] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-[#142740]">Simulasi Tap NFC</h6>
                    <p className="text-xs text-[#586779]">
                      Sentuhkan smartphone (Simulasi browser)
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handleStartInteraction('qr')}
                  className="p-4 rounded-xl border-2 border-[#142740] bg-[#FAFBFC] hover:bg-[#F2F5F7] transition text-left flex items-center gap-3.5 group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#142740] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-[#142740]">Simulasi Scan QR</h6>
                    <p className="text-xs text-[#586779]">
                      Pindai dengan kamera ponsel
                    </p>
                  </div>
                </button>
              </div>

              {/* Honest Disclaimer Required by PRD */}
              <div className="p-3.5 rounded-lg bg-[#F2F5F7] border border-[#E1E7EC] flex items-start gap-2.5 text-xs text-[#586779]">
                <Info className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                <span>
                  <strong>Catatan Transparansi:</strong> Di lingkungan browser web, aksi sentuh fisik NFC disimulasikan
                  melalui tombol di atas. Kartu fisik OCTO yang sebenarnya menggunakan chip NTAG213 yang otomatis terbaca
                  ponsel pelanggan saat disentuhkan langsung.
                </span>
              </div>
            </div>
          )}

          {/* STEP 2: Transition Animation */}
          {step === 2 && (
            <div className="py-12 max-w-md mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#00AFC4]/20 animate-ping" />
                <div className="w-20 h-20 rounded-full bg-[#00AFC4] text-white flex items-center justify-center shadow-lg relative z-10">
                  {interactionMethod === 'nfc' ? (
                    <Smartphone className="w-10 h-10 animate-bounce" />
                  ) : (
                    <QrCode className="w-10 h-10 animate-spin" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-[#142740]">
                  {interactionMethod === 'nfc'
                    ? 'Mendeteksi Chip NFC Kartu OCTO...'
                    : 'Memindai Kode QR Presisi Tinggi...'}
                </h4>
                <p className="text-xs text-[#586779]">
                  Mengalihkan smartphone secara instan ke form resmi Google Review milik{' '}
                  <span className="font-semibold text-[#142740]">{businessName}</span>...
                </p>
              </div>

              <div className="w-48 mx-auto bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00AFC4] h-full w-full animate-pulse" />
              </div>
            </div>
          )}

          {/* STEP 3: Google Review Destination Page Simulation */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Tautan Berhasil Dibuka Dalam 1 Detik
                </span>
                <h4 className="text-xl font-bold text-[#142740]">
                  Form Ulasan Google Bisnis Terbuka Otomatis
                </h4>
                <p className="text-xs text-[#586779]">
                  Pelanggan tidak perlu lagi mengetik nama toko di Google Maps. Form ulasan langsung siap diisi.
                </p>
              </div>

              {/* Realistic Google Review Dialog Simulation Mockup */}
              <div className="bg-white rounded-xl border border-slate-300 shadow-md p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-sm">
                      G
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">{businessName}</h5>
                      <p className="text-xs text-slate-500">Google Business Profile • Profil Terverifikasi</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded">
                    Simulasi UI Google
                  </span>
                </div>

                {/* Star rating selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Beri Nilai Tempat Ini:</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRatingInput(s)}
                        className="p-1 hover:scale-125 transition transform focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            s <= ratingInput
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-amber-600">
                      {ratingInput}.0 Bintang
                    </span>
                  </div>
                </div>

                {/* Review Text Mockup */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">Bagikan Pengalaman Anda:</label>
                  <textarea
                    rows={3}
                    value={reviewTextInput}
                    onChange={(e) => setReviewTextInput(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:border-[#00AFC4] text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500">
                    Posting sebagai: <span className="font-semibold text-slate-700">Pelanggan Google (Akun Pengguna)</span>
                  </div>
                  <button
                    onClick={handleCompleteDemo}
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition flex items-center gap-1.5"
                  >
                    Kirim Ulasan (Simulasi) <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* STRICT PRD REQUIREMENT: Proof over hype disclaimer */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  Pemberitahuan Kepatuhan Resmi Google Review
                </div>
                <p className="leading-relaxed">
                  Pelanggan tetap menulis dan mengirimkan ulasan secara sukarela dari akun Google pribadi mereka.
                  OCTO Tap mempermudah pembukaan tautan form ulasan dalam 1 detik; OCTO tidak menjamin, membuat ulasan palsu,
                  atau memanipulasi algoritma ulasan Google apa pun.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: Completion Summary & Call to Action */}
          {step === 4 && (
            <div className="max-w-xl mx-auto space-y-6 text-center animate-in fade-in duration-200">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-[#142740]">
                  Alur Selesai: Mudah, Cepat, dan Alami!
                </h4>
                <p className="text-sm text-[#586779]">
                  Dengan memangkas 4 tahapan rumit pencarian manual, pelanggan Anda yang puas akan dengan senang hati
                  memberikan ulasan Google dalam sekejap.
                </p>
              </div>

              {/* Summary Flow Box */}
              <div className="p-4 rounded-xl bg-[#F2F5F7] border border-[#E1E7EC] text-left text-xs space-y-2">
                <span className="font-bold text-[#142740] block">Ringkasan Alur OCTO Tap:</span>
                <div className="flex items-center justify-between text-[#586779] font-medium py-1">
                  <span>1. Kartu Fisik di Kasir</span>
                  <span>→</span>
                  <span>2. Tap NFC / Scan QR</span>
                  <span>→</span>
                  <span>3. Google Review Terbuka</span>
                  <span>→</span>
                  <span className="text-emerald-700 font-bold">4. Ulasan Terbit</span>
                </div>
              </div>

              {/* Conversion Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/request-demo?product=octo-tap"
                  className="w-full sm:w-auto px-6 py-3 font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  Pesan OCTO Tap Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-3 font-semibold text-[#142740] bg-white border border-[#E1E7EC] hover:bg-[#F2F5F7] rounded-xl transition"
                >
                  Coba Ulang Demo
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Navigation Controls */}
      <div className="bg-[#FAFBFC] px-6 py-3.5 border-t border-[#E1E7EC] flex items-center justify-between text-xs text-[#586779]">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1 || showFallback}
          className="px-3 py-1.5 rounded-lg border border-[#E1E7EC] hover:bg-[#F2F5F7] disabled:opacity-40 disabled:pointer-events-none transition flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="hidden sm:block text-[11px]">
          Demo interaktif terpandu OCTO • Menggunakan data simulasi
        </div>

        {step < totalSteps && !showFallback && (
          <button
            onClick={() => setStep(Math.min(totalSteps, step + 1))}
            className="px-4 py-1.5 rounded-lg bg-[#142740] hover:bg-[#1E3A5F] text-white font-medium transition flex items-center gap-1"
          >
            Lanjut <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
