'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import {
  BarChart3,
  Calendar,
  MapPin,
  TrendingUp,
  Star,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

interface OctoInsightsDemoProps {
  className?: string;
}

export default function OctoInsightsDemo({ className = '' }: OctoInsightsDemoProps) {
  const { trackEvent } = useOcto();
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'senopati' | 'kemang' | 'bsd'>('all');

  const handleFilterChange = (range: '7d' | '30d' | '90d', branch: 'all' | 'senopati' | 'kemang' | 'bsd') => {
    setDateRange(range);
    setSelectedBranch(branch);
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-insights',
      demoType: 'interaktif',
      label: `Filter: Range=${range}, Branch=${branch}`,
    });
  };

  // Dynamic simulated metrics based on filters
  const getMetrics = () => {
    let multiplier = 1;
    if (dateRange === '7d') multiplier = 0.25;
    if (dateRange === '90d') multiplier = 2.8;

    let branchFactor = 1;
    if (selectedBranch === 'senopati') branchFactor = 0.45;
    if (selectedBranch === 'kemang') branchFactor = 0.35;
    if (selectedBranch === 'bsd') branchFactor = 0.2;

    const baseTaps = Math.round(1240 * multiplier * branchFactor);
    const baseReviews = Math.round(412 * multiplier * branchFactor);
    const conversion = Math.round((baseReviews / baseTaps) * 100);

    return {
      taps: baseTaps,
      reviews: baseReviews,
      conversionRate: `${conversion}%`,
      avgRating: selectedBranch === 'bsd' ? '4.7' : '4.9',
      peakHour: selectedBranch === 'kemang' ? '18:00 – 21:00' : '12:00 – 14:00',
    };
  };

  const metrics = getMetrics();

  return (
    <div className={`bg-white rounded-2xl border border-[#E1E7EC] shadow-xl overflow-hidden ${className}`} id="demo">
      {/* Header */}
      <div className="bg-[#142740] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E3A5F]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00AFC4]/20 rounded-lg text-[#00AFC4]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Demo Interaktif: OCTO Insights
              <span className="text-[10px] bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700">
                Data Simulasi
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Analisis konversi tap kartu menjadi ulasan resmi Google dan sentimen pelanggan
            </p>
          </div>
        </div>

        <button
          onClick={() => handleFilterChange('30d', 'all')}
          className="text-xs px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#2A4D77] rounded text-slate-200 transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filter
        </button>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-[#F2F5F7] px-6 py-3.5 border-b border-[#E1E7EC] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Date Filter */}
          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[#E1E7EC]">
            <Calendar className="w-4 h-4 text-[#586779]" />
            <span className="font-semibold text-[#142740]">Rentang:</span>
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleFilterChange(r, selectedBranch)}
                className={`px-2 py-0.5 rounded font-medium transition ${
                  dateRange === r ? 'bg-[#00AFC4] text-white' : 'text-[#586779] hover:bg-slate-100'
                }`}
              >
                {r === '7d' ? '7 Hari' : r === '30d' ? '30 Hari' : '90 Hari'}
              </button>
            ))}
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[#E1E7EC]">
            <MapPin className="w-4 h-4 text-[#586779]" />
            <span className="font-semibold text-[#142740]">Lokasi Cabang:</span>
            <select
              value={selectedBranch}
              onChange={(e) =>
                handleFilterChange(dateRange, e.target.value as 'all' | 'senopati' | 'kemang' | 'bsd')
              }
              aria-label="Pilih Lokasi Cabang"
              className="text-xs font-semibold text-[#142740] bg-transparent border-none focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Cabang (3 Lokasi)</option>
              <option value="senopati">Cabang Senopati, Jaksel</option>
              <option value="kemang">Cabang Kemang, Jaksel</option>
              <option value="bsd">Cabang BSD City, Tangerang</option>
            </select>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#586779] bg-white px-2 py-1 rounded border border-[#E1E7EC]">
          Sumber: Google Business API (Simulasi Terpantau)
        </span>
      </div>

      {/* KPI Cards */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC] space-y-1">
            <span className="text-xs text-[#586779] flex items-center justify-between">
              Total Interaksi Kartu
              <SmartphoneIcon className="w-4 h-4 text-[#00AFC4]" />
            </span>
            <div className="text-2xl font-black text-[#142740]">{metrics.taps.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% dibanding periode lalu
            </div>
          </div>

          <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC] space-y-1">
            <span className="text-xs text-[#586779] flex items-center justify-between">
              Ulasan Baru Diterbitkan
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </span>
            <div className="text-2xl font-black text-[#142740]">{metrics.reviews.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Rasio Konversi {metrics.conversionRate}
            </div>
          </div>

          <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC] space-y-1">
            <span className="text-xs text-[#586779] flex items-center justify-between">
              Rating Rata-Rata
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </span>
            <div className="text-2xl font-black text-[#142740]">{metrics.avgRating} ★</div>
            <div className="text-[11px] text-slate-500 font-medium">
              Dari total 840+ ulasan terverifikasi
            </div>
          </div>

          <div className="p-4 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC] space-y-1">
            <span className="text-xs text-[#586779] flex items-center justify-between">
              Jam Paling Efektif
              <Clock className="w-4 h-4 text-indigo-500" />
            </span>
            <div className="text-lg font-bold text-[#142740] truncate">{metrics.peakHour}</div>
            <div className="text-[11px] text-indigo-600 font-medium">
              Respon ulasan tertinggi staf kasir
            </div>
          </div>
        </div>

        {/* Dynamic Simulated Chart & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Trend Chart */}
          <div className="lg:col-span-2 p-5 bg-[#FAFBFC] rounded-xl border border-[#E1E7EC] space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-[#142740]">Tren Interaksi Tap vs Ulasan Masuk</h4>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded bg-[#00AFC4]" /> Tap Kartu
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded bg-[#142740]" /> Ulasan Terbit
                </span>
              </div>
            </div>

            {/* Simulated Chart Bars */}
            <div className="h-48 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-slate-200">
              {[
                { label: 'Sen', tap: 65, rev: 40 },
                { label: 'Sel', tap: 55, rev: 35 },
                { label: 'Rab', tap: 70, rev: 48 },
                { label: 'Kam', tap: 80, rev: 52 },
                { label: 'Jum', tap: 95, rev: 75 },
                { label: 'Sab', tap: 100, rev: 85 },
                { label: 'Min', tap: 90, rev: 70 },
              ].map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Tap Bar */}
                    <div
                      style={{ height: `${day.tap}%` }}
                      className="w-3.5 bg-[#00AFC4] rounded-t group-hover:bg-[#0098AB] transition-all"
                      title={`Tap: ${day.tap}`}
                    />
                    {/* Review Bar */}
                    <div
                      style={{ height: `${day.rev}%` }}
                      className="w-3.5 bg-[#142740] rounded-t group-hover:bg-[#1E3A5F] transition-all"
                      title={`Review: ${day.rev}`}
                    />
                  </div>
                  <span className="text-[10px] text-[#586779] font-medium mt-1">{day.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#586779] text-center italic">
              Grafik visual di atas menunjukkan peningkatan ulasan paling tinggi terjadi di akhir pekan (Jumat-Minggu).
            </p>
          </div>

          {/* Actionable Insight Box */}
          <div className="p-5 bg-gradient-to-br from-[#E8F8FA] to-white rounded-xl border border-cyan-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00AFC4] uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Insight Otomatis Terdeteksi
              </div>
              <h5 className="font-bold text-sm text-[#142740] leading-snug">
                Peluang Optimalisasi Jam Kasir
              </h5>
              <p className="text-xs text-[#586779] leading-relaxed">
                Data simulasi menunjukkan konversi ulasan mencapai <strong>42%</strong> pada jam makan siang (12:00 – 14:00)
                ketika kartu OCTO Tap diletakkan langsung di hadapan tamu saat proses pembayaran.
              </p>
              <div className="p-3 bg-white/80 rounded-lg border border-cyan-100 text-xs text-[#142740] space-y-1">
                <span className="font-semibold block">Rekomendasi Tindakan:</span>
                <p className="text-[11px] text-[#586779]">
                  Berikan brief 3 menit pada shift siang agar kasir proaktif menyapa dan mengarahkan tamu ke kartu.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-cyan-100">
              <span className="text-[10px] text-[#586779] block">
                Model: Rule-based heuristics (Bukan AI halusinatif)
              </span>
            </div>
          </div>
        </div>

        {/* PRD Compliance Disclaimer */}
        <div className="p-3.5 rounded-lg bg-[#F2F5F7] border border-[#E1E7EC] flex items-start gap-2.5 text-xs text-[#586779]">
          <Info className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
          <span>
            <strong>Keterbatasan Data Contoh:</strong> Demo OCTO Insights menggunakan dataset simulasi terkalibrasi.
            Fitur sedang dalam tahap <em>Akses Terbatas / Beta</em> dan diintegrasikan bertahap dengan akun Google
            Business Profile merchant resmi.
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E1E7EC]">
          <div className="text-xs text-[#586779]">
            Ingin melihat data analitik untuk jaringan cabang Anda?
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/consultation?product=octo-insights"
              className="px-5 py-2.5 text-xs font-bold text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] border border-[#E1E7EC] rounded-lg transition"
            >
              Diskusikan Kebutuhan Analitik
            </Link>
            <Link
              href="/request-demo?product=octo-insights"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              Minta Akses Beta Insights <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmartphoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
