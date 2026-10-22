'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { Cookie, Shield, Check, X, Settings2 } from 'lucide-react';

export default function CookieConsent() {
  const { cookiePrefs, setCookiePrefs, acceptAllCookies, rejectNonEssentialCookies } = useOcto();
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [customPrefs, setCustomPrefs] = useState({
    functional: cookiePrefs.functional,
    analytics: cookiePrefs.analytics,
    marketing: cookiePrefs.marketing,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCustomPrefs({
      functional: cookiePrefs.functional,
      analytics: cookiePrefs.analytics,
      marketing: cookiePrefs.marketing,
    });
  }, [cookiePrefs.functional, cookiePrefs.analytics, cookiePrefs.marketing]);

  // Do not render before client mount to prevent SSR hydration mismatches
  if (!mounted) {
    return null;
  }

  // If already consented and preferences saved, do not show banner unless settings toggled
  if (cookiePrefs.saved && !showSettings) {
    return null;
  }

  const handleSaveCustom = () => {
    setCookiePrefs({
      functional: customPrefs.functional,
      analytics: customPrefs.analytics,
      marketing: customPrefs.marketing,
      saved: true,
    });
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowSettings(false);
  };

  const handleRejectNonEssential = () => {
    rejectNonEssentialCookies();
    setShowSettings(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed bottom-0 inset-x-0 z-[100] max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-[#142740] border-t border-[#1E3A5F] text-white shadow-2xl pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-[#00AFC4] shrink-0" />
              <h4 id="cookie-title" className="font-bold text-sm tracking-wide text-white">
                Transparansi Privasi & Penggunaan Cookie
              </h4>
            </div>
            <p id="cookie-desc" className="text-xs text-slate-300 leading-relaxed">
              Kami menggunakan cookie esensial agar platform dapat berfungsi optimal, serta cookie analitik untuk memahami
              interaksi demo produk demi peningkatan layanan. Kami tidak pernah menjual data pribadi Anda. Anda berhak
              memilih cookie mana yang Anda setujui sesuai{' '}
              <Link href="/cookies" className="text-[#00AFC4] hover:underline font-semibold">
                Kebijakan Cookie
              </Link>{' '}
              dan{' '}
              <Link href="/privacy" className="text-[#00AFC4] hover:underline font-semibold">
                Kebijakan Privasi
              </Link>{' '}
              kami.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0 sm:justify-end">
            <button
              type="button"
              onClick={() => setShowSettings((prev) => !prev)}
              className="cursor-pointer select-none touch-manipulation px-3.5 py-2.5 sm:py-2 text-xs font-semibold text-slate-200 bg-[#0D1B2D] hover:bg-[#1E3A5F] active:bg-[#25456f] border border-[#1E3A5F] rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Settings2 className="w-4 h-4 text-[#00AFC4]" />
              Atur Pilihan
            </button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="cursor-pointer select-none touch-manipulation px-3.5 py-2.5 sm:py-2 text-xs font-semibold text-slate-200 hover:text-white bg-transparent hover:bg-white/10 active:bg-white/15 border border-slate-600 rounded-lg transition-colors flex items-center justify-center"
            >
              Hanya Esensial
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="col-span-2 sm:col-span-1 cursor-pointer select-none touch-manipulation px-4 py-2.5 sm:py-2 text-xs font-bold text-[#142740] bg-[#00AFC4] hover:bg-cyan-300 active:bg-cyan-400 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Setujui Semua
            </button>
          </div>
        </div>

        {/* Modal / Accordion for Custom Cookie Settings */}
        {showSettings && (
          <div className="mt-6 pt-6 border-t border-[#1E3A5F] max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00AFC4]" /> Konfigurasi Kategori Cookie
              </span>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="cursor-pointer select-none touch-manipulation text-slate-400 hover:text-white text-xs flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" /> Tutup
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Esensial */}
              <div className="p-3.5 bg-[#0D1B2D] border border-[#1E3A5F] rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100">Cookie Esensial</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
                    Wajib Aktif
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Dibutuhkan untuk keamanan sesi, CSRF protection, dan fungsi navigasi dasar platform.
                </p>
              </div>

              {/* Analitik */}
              <label
                htmlFor="cookie-analytics"
                className="p-3.5 bg-[#0D1B2D] border border-[#1E3A5F] hover:border-cyan-500/40 rounded-lg space-y-2 cursor-pointer transition-colors block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100">Cookie Analitik</span>
                  <input
                    id="cookie-analytics"
                    type="checkbox"
                    checked={customPrefs.analytics}
                    onChange={(e) => setCustomPrefs({ ...customPrefs, analytics: e.target.checked })}
                    className="cursor-pointer rounded border-slate-600 text-[#00AFC4] focus:ring-[#00AFC4] w-4 h-4"
                  />
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Membantu kami menghitung statistik interaksi demo dan halaman tanpa merekam identitas pribadi.
                </p>
              </label>

              {/* Fungsional & Preferensi */}
              <label
                htmlFor="cookie-functional"
                className="p-3.5 bg-[#0D1B2D] border border-[#1E3A5F] hover:border-cyan-500/40 rounded-lg space-y-2 cursor-pointer transition-colors block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100">Fungsional & Fitur</span>
                  <input
                    id="cookie-functional"
                    type="checkbox"
                    checked={customPrefs.functional}
                    onChange={(e) => setCustomPrefs({ ...customPrefs, functional: e.target.checked })}
                    className="cursor-pointer rounded border-slate-600 text-[#00AFC4] focus:ring-[#00AFC4] w-4 h-4"
                  />
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Menyimpan preferensi interaktif seperti status demo dan pengaturan filter cabang tersimpan.
                </p>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] text-slate-400">
                Pilihan Anda dapat diubah kapan saja melalui menu di footer situs.
              </span>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto cursor-pointer select-none touch-manipulation px-5 py-2 text-xs font-bold bg-[#00AFC4] text-[#142740] rounded-lg hover:bg-cyan-300 active:bg-cyan-400 transition-colors text-center"
              >
                Simpan Preferensi Terpilih
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
