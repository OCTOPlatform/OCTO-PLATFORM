'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import {
  Building2,
  MapPin,
  Smartphone,
  BarChart3,
  Gift,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
  Info,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';

interface OctoBusinessDemoProps {
  className?: string;
}

export default function OctoBusinessDemo({ className = '' }: OctoBusinessDemoProps) {
  const { trackEvent } = useOcto();
  const [selectedBranch, setSelectedBranch] = useState<'senopati' | 'kemang' | 'bsd'>('senopati');
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'cards'>('overview');

  const branches = {
    senopati: {
      name: 'Cabang Utama Senopati',
      city: 'Jakarta Selatan',
      cardsActive: 4,
      googleRating: '4.9 ★ (342 ulasan)',
      manager: 'Bambang Irawan',
      modules: {
        tap: { status: 'Tersedia & Aktif', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
        insights: { status: 'Beta Terhubung', color: 'text-cyan-800 bg-cyan-50 border-cyan-200' },
        loyalty: { status: 'Dalam Pengembangan', color: 'text-amber-800 bg-amber-50 border-amber-200' },
      },
    },
    kemang: {
      name: 'Cabang Kemang Raya',
      city: 'Jakarta Selatan',
      cardsActive: 2,
      googleRating: '4.8 ★ (188 ulasan)',
      manager: 'Siti Rahmawati',
      modules: {
        tap: { status: 'Tersedia & Aktif', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
        insights: { status: 'Beta Terhubung', color: 'text-cyan-800 bg-cyan-50 border-cyan-200' },
        loyalty: { status: 'Belum Terintegrasi', color: 'text-slate-600 bg-slate-100 border-slate-200' },
      },
    },
    bsd: {
      name: 'Cabang BSD Green Office',
      city: 'Tangerang Selatan',
      cardsActive: 3,
      googleRating: '4.7 ★ (95 ulasan)',
      manager: 'Kevin Tanujaya',
      modules: {
        tap: { status: 'Tersedia & Aktif', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
        insights: { status: 'Direncanakan', color: 'text-indigo-800 bg-indigo-50 border-indigo-200' },
        loyalty: { status: 'Belum Terintegrasi', color: 'text-slate-600 bg-slate-100 border-slate-200' },
      },
    },
  };

  const current = branches[selectedBranch];

  const handleBranchSelect = (b: 'senopati' | 'kemang' | 'bsd') => {
    setSelectedBranch(b);
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-business',
      demoType: 'interaktif',
      label: `Switch Branch to ${b}`,
    });
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#E1E7EC] shadow-xl overflow-hidden ${className}`} id="demo">
      {/* Header */}
      <div className="bg-[#142740] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E3A5F]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Demo Interaktif: Portal Sentral OCTO Business
              <span className="text-[10px] bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700">
                Konsep Multi-Cabang
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Satu login pusat untuk mengelola kartu fisik, tautan Google Maps, dan modul lintas cabang
            </p>
          </div>
        </div>

        {/* Branch Switcher */}
        <div className="flex items-center gap-2 bg-[#0D1B2D] px-3 py-1.5 rounded-xl border border-[#1E3A5F]">
          <MapPin className="w-4 h-4 text-[#00AFC4]" />
          <span className="text-xs text-slate-300 font-medium">Beralih Cabang:</span>
          {(['senopati', 'kemang', 'bsd'] as const).map((b) => (
            <button
              key={b}
              onClick={() => handleBranchSelect(b)}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition ${
                selectedBranch === b
                  ? 'bg-[#00AFC4] text-[#142740]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {b.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="bg-[#F2F5F7] px-6 border-b border-[#E1E7EC] flex items-center gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 border-b-2 transition ${
            activeTab === 'overview'
              ? 'border-[#00AFC4] text-[#00AFC4]'
              : 'border-transparent text-[#586779] hover:text-[#142740]'
          }`}
        >
          Ringkasan Cabang Aktif
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`py-3 border-b-2 transition ${
            activeTab === 'modules'
              ? 'border-[#00AFC4] text-[#00AFC4]'
              : 'border-transparent text-[#586779] hover:text-[#142740]'
          }`}
        >
          Keterhubungan Modul OCTO
        </button>
        <button
          onClick={() => setActiveTab('cards')}
          className={`py-3 border-b-2 transition ${
            activeTab === 'cards'
              ? 'border-[#00AFC4] text-[#00AFC4]'
              : 'border-transparent text-[#586779] hover:text-[#142740]'
          }`}
        >
          Inventaris Kartu Fisik
        </button>
      </div>

      {/* Main Tab View */}
      <div className="p-6 md:p-8 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAFBFC] border border-[#E1E7EC]">
              <div>
                <span className="text-[11px] font-bold text-[#00AFC4] uppercase tracking-wider">
                  Data Lokasi Aktif Terpilih:
                </span>
                <h4 className="text-xl font-bold text-[#142740] mt-0.5">{current.name}</h4>
                <p className="text-xs text-[#586779]">
                  {current.city} • Penanggung Jawab Toko: <span className="font-semibold">{current.manager}</span>
                </p>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-xs text-[#586779] block">Rating Google Terkini</span>
                <span className="text-base font-bold text-amber-600">{current.googleRating}</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-[#E1E7EC] bg-white">
                <span className="text-xs text-[#586779] block">Kartu Terpasang</span>
                <span className="text-2xl font-bold text-[#142740]">{current.cardsActive} Unit</span>
                <span className="text-[11px] text-emerald-600 block mt-1">Semua beroperasi normal</span>
              </div>
              <div className="p-4 rounded-xl border border-[#E1E7EC] bg-white">
                <span className="text-xs text-[#586779] block">Tautan Google Target</span>
                <span className="text-xs font-mono font-semibold text-[#142740] block truncate mt-1">
                  g.page/r/octo-demo-{selectedBranch}
                </span>
                <span className="text-[11px] text-cyan-700 block mt-1">Dikelola sentral</span>
              </div>
              <div className="p-4 rounded-xl border border-[#E1E7EC] bg-white">
                <span className="text-xs text-[#586779] block">Izin Akses Staf Cabang</span>
                <span className="text-base font-bold text-[#142740]">Read-Only</span>
                <span className="text-[11px] text-slate-500 block mt-1">Mencegah ubah link ilegal</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="text-xs text-[#586779]">
              Status Keterhubungan Modul Produk OCTO pada <strong>{current.name}</strong>:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* OCTO Tap Module */}
              <div className="p-4 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-[#00AFC4]" />
                    <span className="font-bold text-sm text-[#142740]">OCTO Tap</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${current.modules.tap.color}`}>
                    {current.modules.tap.status}
                  </span>
                </div>
                <p className="text-xs text-[#586779]">
                  Kartu fisik NFC & QR aktif di meja kasir mengarahkan pelanggan ke Google Review cabang ini.
                </p>
              </div>

              {/* OCTO Insights Module */}
              <div className="p-4 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-indigo-500" />
                    <span className="font-bold text-sm text-[#142740]">OCTO Insights</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${current.modules.insights.color}`}>
                    {current.modules.insights.status}
                  </span>
                </div>
                <p className="text-xs text-[#586779]">
                  Menghubungkan data interaksi tap kartu dengan tren ulasan dan jam puncak kasir.
                </p>
              </div>

              {/* OCTO Loyalty Module */}
              <div className="p-4 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-amber-500" />
                    <span className="font-bold text-sm text-[#142740]">OCTO Loyalty</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${current.modules.loyalty.color}`}>
                    {current.modules.loyalty.status}
                  </span>
                </div>
                <p className="text-xs text-[#586779]">
                  Program stamp card digital pelanggan lintas cabang (dalam tahap persiapan).
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs text-[#586779]">
              <span>Daftar Kartu Fisik Aktif pada {current.name}:</span>
              <span className="font-semibold text-emerald-600">Semua Chip NTAG213 Terverifikasi</span>
            </div>

            <div className="border border-[#E1E7EC] rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#FAFBFC] border-b border-[#E1E7EC] text-[#586779] font-bold">
                  <tr>
                    <th className="p-3">Device Serial ID</th>
                    <th className="p-3">Penempatan</th>
                    <th className="p-3">Tipe Hardware</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E7EC]">
                  {Array.from({ length: current.cardsActive }).map((_, i) => (
                    <tr key={i} className="hover:bg-[#FAFBFC]">
                      <td className="p-3 font-mono font-semibold text-[#142740]">
                        OCTO-{selectedBranch.toUpperCase()}-00{i + 1}
                      </td>
                      <td className="p-3 text-slate-700">
                        {i === 0 ? 'Meja Kasir 1' : i === 1 ? 'Meja Kasir 2' : `Meja Tamu #${i + 4}`}
                      </td>
                      <td className="p-3 text-slate-600">Stand Akrilik Tebal (Dual NFC/QR)</td>
                      <td className="p-3">
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                          Aktif Normal
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PRD Disclaimer */}
        <div className="p-3.5 rounded-lg bg-[#F2F5F7] border border-[#E1E7EC] flex items-start gap-2.5 text-xs text-[#586779]">
          <Info className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
          <span>
            <strong>Simulasi Portal:</strong> Fitur OCTO Business berstatus <em>Segera Hadir</em>.
            Modul di atas menunjukkan arsitektur kendali sentral yang sedang dibangun untuk bisnis multi-lokasi.
            Aksi berbahaya seperti menghapus cabang atau transaksi riil dinonaktifkan pada mode demo ini.
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E1E7EC]">
          <span className="text-xs text-[#586779]">
            Memiliki lebih dari 3 cabang atau jaringan waralaba?
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/consultation?product=octo-business"
              className="px-5 py-2.5 text-xs font-bold text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] border border-[#E1E7EC] rounded-lg transition"
            >
              Diskusikan Kebutuhan Multi-Cabang
            </Link>
            <Link
              href="/request-demo?product=octo-business"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              Jadwalkan Konsultasi Solusi <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
