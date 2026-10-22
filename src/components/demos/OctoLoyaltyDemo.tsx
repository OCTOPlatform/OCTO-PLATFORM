'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import {
  Gift,
  Coffee,
  CheckCircle,
  Sparkles,
  QrCode,
  Users,
  Store,
  ArrowRight,
  Info,
  RotateCcw,
  Tag,
  ShieldAlert,
} from 'lucide-react';

interface OctoLoyaltyDemoProps {
  className?: string;
}

export default function OctoLoyaltyDemo({ className = '' }: OctoLoyaltyDemoProps) {
  const { trackEvent } = useOcto();
  const [viewMode, setViewMode] = useState<'customer' | 'merchant'>('customer');
  const [stampsCount, setStampsCount] = useState<number>(8);
  const [voucherRedeemed, setVoucherRedeemed] = useState<boolean>(false);
  const [showRedeemModal, setShowRedeemModal] = useState<boolean>(false);

  const maxStamps = 10;

  const handleAddStamp = () => {
    if (stampsCount < maxStamps) {
      const next = stampsCount + 1;
      setStampsCount(next);
      trackEvent('product_demo_step_complete', {
        productSlug: 'octo-loyalty',
        demoType: 'interaktif',
        label: `Stamp Ditambahkan: ${next}/${maxStamps}`,
      });
    }
  };

  const handleRedeemVoucher = () => {
    setShowRedeemModal(true);
    setVoucherRedeemed(true);
    trackEvent('product_demo_complete', {
      productSlug: 'octo-loyalty',
      demoType: 'interaktif',
      label: 'Voucher Reward Diklaim (Simulasi)',
    });
  };

  const handleReset = () => {
    setStampsCount(8);
    setVoucherRedeemed(false);
    setShowRedeemModal(false);
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#E1E7EC] shadow-xl overflow-hidden ${className}`} id="demo">
      {/* Header */}
      <div className="bg-[#142740] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E3A5F]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Demo Interaktif: OCTO Loyalty
              <span className="text-[10px] bg-amber-900 text-amber-300 px-2 py-0.5 rounded border border-amber-700">
                Konsep & Simulasi Aman
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Pengalaman stamp card digital tanpa instal aplikasi & dashboard kelola reward toko
            </p>
          </div>
        </div>

        {/* Dual Perspective Switcher */}
        <div className="flex items-center gap-1.5 bg-[#0D1B2D] p-1 rounded-xl border border-[#1E3A5F]">
          <button
            onClick={() => {
              setViewMode('customer');
              trackEvent('product_demo_step_complete', {
                productSlug: 'octo-loyalty',
                label: 'Switch View: Customer',
              });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'customer'
                ? 'bg-[#00AFC4] text-[#142740]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Sudut Pandang Pelanggan
          </button>
          <button
            onClick={() => {
              setViewMode('merchant');
              trackEvent('product_demo_step_complete', {
                productSlug: 'octo-loyalty',
                label: 'Switch View: Merchant',
              });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'merchant'
                ? 'bg-[#00AFC4] text-[#142740]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" /> Sudut Pandang Bisnis
          </button>
        </div>
      </div>

      <div className="p-6 md:p-10">
        {/* CUSTOMER PERSPECTIVE */}
        {viewMode === 'customer' && (
          <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Tampilan Paspor Loyalitas Digital di Smartphone Pelanggan
              </span>
              <h4 className="text-xl font-bold text-[#142740]">
                Kartu Stempel Kunjungan Interaktif
              </h4>
              <p className="text-xs text-[#586779]">
                Tersimpan langsung di browser smartphone pelanggan tanpa membebani memori dengan aplikasi tambahan.
              </p>
            </div>

            {/* Mobile Wallet Style Card */}
            <div className="bg-gradient-to-br from-[#142740] via-[#1E3A5F] to-[#0D1B2D] text-white p-6 rounded-2xl shadow-xl border border-slate-700 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold text-xs">
                    ☕
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Kopi Rasa Bahagia</h5>
                    <p className="text-[10px] text-cyan-300">Member ID: #OCTO-LOYAL-8821</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-500/30">
                  Gold Tier
                </span>
              </div>

              {/* Stamp Grid (10 slots) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-medium text-slate-300">Progres Kunjungan:</span>
                  <span className="font-bold text-amber-400">
                    {stampsCount} dari {maxStamps} Stempel Terkumpul
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {Array.from({ length: maxStamps }).map((_, idx) => {
                    const isCollected = idx < stampsCount;
                    const isRewardSlot = idx === maxStamps - 1;

                    return (
                      <div
                        key={idx}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center text-center transition-all ${
                          isCollected
                            ? 'bg-amber-400 text-[#142740] shadow-md scale-105'
                            : isRewardSlot
                            ? 'bg-amber-400/20 border-2 border-dashed border-amber-400 text-amber-300'
                            : 'bg-white/10 border border-white/20 text-slate-400'
                        }`}
                      >
                        {isCollected ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-[9px] font-black mt-0.5">#{idx + 1}</span>
                          </>
                        ) : isRewardSlot ? (
                          <>
                            <Gift className="w-5 h-5 animate-bounce" />
                            <span className="text-[9px] font-bold mt-0.5">GRATIS</span>
                          </>
                        ) : (
                          <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Summary & Reward Claim */}
              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Reward Berikutnya:</span>
                  <span className="text-xs font-bold text-amber-300">
                    {stampsCount >= maxStamps ? 'Siap Ditukar: 1 Kopi Susu Gratis!' : `Kurang ${maxStamps - stampsCount} stempel lagi`}
                  </span>
                </div>

                {stampsCount >= maxStamps ? (
                  <button
                    onClick={handleRedeemVoucher}
                    className="px-4 py-2 text-xs font-bold text-[#142740] bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition animate-pulse"
                  >
                    Tukar Sekarang!
                  </button>
                ) : (
                  <button
                    onClick={handleAddStamp}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-lg transition flex items-center gap-1.5"
                  >
                    + Simulasi Stamp Kasir
                  </button>
                )}
              </div>
            </div>

            {/* Test Actions */}
            <div className="flex items-center justify-between text-xs text-[#586779]">
              <button
                onClick={handleReset}
                className="hover:text-[#142740] flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Progres Stempel
              </button>
              <span>Aksi demo ini bersifat simulasi aman.</span>
            </div>
          </div>
        )}

        {/* MERCHANT PERSPECTIVE */}
        {viewMode === 'merchant' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Dashboard Manajemen Program Loyalitas
              </span>
              <h4 className="text-xl font-bold text-[#142740]">
                Ringkasan Retensi & Reward Aktif
              </h4>
              <p className="text-xs text-[#586779]">
                Pantau jumlah pelanggan yang kembali berkunjung dan efektivitas voucher reward Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC]">
                <span className="text-xs text-[#586779] block">Total Member Aktif</span>
                <span className="text-2xl font-black text-[#142740]">482 Tamu</span>
                <span className="text-[10px] text-emerald-600 block mt-1">+18% bulan ini</span>
              </div>
              <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC]">
                <span className="text-xs text-[#586779] block">Tingkat Penukaran Reward</span>
                <span className="text-2xl font-black text-[#142740]">74%</span>
                <span className="text-[10px] text-emerald-600 block mt-1">Partisipasi tinggi</span>
              </div>
              <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC]">
                <span className="text-xs text-[#586779] block">Kunjungan Berulang</span>
                <span className="text-2xl font-black text-[#142740]">3.4x / bln</span>
                <span className="text-[10px] text-indigo-600 block mt-1">Rata-rata frekuensi</span>
              </div>
            </div>

            {/* Campaign Rules Preview */}
            <div className="p-5 bg-white rounded-xl border border-[#E1E7EC] space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#142740]">
                Program Reward Aktif Toko:
              </h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAFBFC] border border-[#E1E7EC]">
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-[#142740]">10 Stempel: Gratis 1 Kopi Pilihan</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                    Aktif
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAFBFC] border border-[#E1E7EC]">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    <span className="font-semibold text-[#142740]">Voucher Ulang Tahun: Diskon 25%</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer per PRD */}
        <div className="mt-8 p-3.5 rounded-lg bg-[#F2F5F7] border border-[#E1E7EC] flex items-start gap-2.5 text-xs text-[#586779]">
          <Info className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
          <span>
            <strong>Status Produk:</strong> OCTO Loyalty saat ini berstatus <em>Dalam Pengembangan</em>.
            Seluruh data di atas merupakan simulasi konsep untuk menunjukkan kemudahan alur stempel tanpa aplikasi tambahan.
          </span>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E1E7EC]">
          <span className="text-xs text-[#586779]">
            Tertarik merancang program loyalitas untuk bisnis Anda?
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/consultation?product=octo-loyalty"
              className="px-5 py-2.5 text-xs font-bold text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] border border-[#E1E7EC] rounded-lg transition"
            >
              Rancang Program Loyalitas
            </Link>
            <Link
              href="/request-demo?product=octo-loyalty"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              Minta Info Peluncuran <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Redeem Voucher Modal Simulation */}
      {showRedeemModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#E1E7EC]">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#142740]">Voucher Siap Ditukarkan!</h4>
              <p className="text-xs text-[#586779] mt-1">
                Tunjukkan kode voucher QR ini kepada staf kasir di meja pembayaran:
              </p>
            </div>

            {/* Fake QR voucher */}
            <div className="w-36 h-36 mx-auto bg-slate-50 border-2 border-slate-300 rounded-xl p-2 flex flex-col items-center justify-center">
              <QrCode className="w-24 h-24 text-slate-800" />
              <span className="font-mono text-[10px] text-slate-500 mt-1">VCH-FREECOFFEE-882</span>
            </div>

            <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
              Reward: <strong>1 Cangkir Kopi Susu Aren Gratis</strong>
              <br />
              (Berlaku 1x penukaran • Data Simulasi)
            </div>

            <button
              onClick={() => setShowRedeemModal(false)}
              className="w-full py-2.5 bg-[#142740] hover:bg-[#1E3A5F] text-white text-xs font-bold rounded-lg transition"
            >
              Tutup & Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
