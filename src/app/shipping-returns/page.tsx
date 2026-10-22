'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ShieldCheck, RotateCcw, Clock } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#142740]">
      <div className="space-y-3 border-b border-[#E1E7EC] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
          KEBIJAKAN HARDWARE & FISIK
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Pengiriman, Garansi & Kebijakan Retur</h1>
        <p className="text-xs text-[#586779]">
          Terakhir diperbarui: 18 Oktober 2026 • Kebijakan resmi kartu fisik OCTO Tap.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <h3 className="text-base font-bold text-[#142740] flex items-center gap-2">
          <Package className="w-5 h-5 text-[#00AFC4]" /> 1. Pengiriman & Waktu Produksi
        </h3>
        <p>
          * <strong>Kartu Standar OCTO:</strong> Dikirim dalam 1–2 hari kerja setelah pembayaran terkonfirmasi.
          <br />
          * <strong>Kartu Kustom Logo Bisnis:</strong> Memerlukan proses pencetakan UV high-precision dan Quality Control
          selama 3–5 hari kerja sebelum dikirimkan melalui jasa ekspedisi kilat terpercaya.
        </p>

        <h3 className="text-base font-bold text-[#142740] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#00AFC4]" /> 2. Garansi Chip NFC (1 Tahun Penuh)
        </h3>
        <p>
          Setiap kartu OCTO Tap dilindungi oleh <strong>Garansi Fungsional Chip NFC selama 12 bulan</strong> sejak tanggal
          penerimaan barang. Apabila chip NFC gagal memancarkan sinyal atau tidak terbaca smartphone dalam penggunaan normal,
          kami akan mengganti unit kartu baru secara gratis.
        </p>

        <h3 className="text-base font-bold text-[#142740] flex items-center gap-2">
          <RotateCcw className="w-5 h-5 text-[#00AFC4]" /> 3. Prosedur Klaim Retur
        </h3>
        <p>
          Apabila paket diterima dalam keadaan rusak fisik akibat pengiriman (patah atau retak), laporkan dalam waktu
          3x24 jam sejak paket tiba dengan melampirkan video unboxing ke WhatsApp Customer Care OCTO di{' '}
          <a href="https://wa.me/6281295099738" className="text-[#00AFC4] font-bold underline">
            +62 812 9509 9738
          </a>
          . Unit pengganti akan segera diproses tanpa biaya tambahan.
        </p>
      </div>
    </div>
  );
}
