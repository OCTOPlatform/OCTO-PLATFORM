'use client';

import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#142740]">
      <div className="space-y-3 border-b border-[#E1E7EC] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
          DOKUMEN KEPATUHAN HUKUM
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Kebijakan Privasi Platform OCTO</h1>
        <p className="text-xs text-[#586779]">
          Terakhir diperbarui: 18 Oktober 2026 • Mengacu pada Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <p>
          Selamat datang di <strong>PT Platform Bisnis Terhubung (OCTO)</strong>. Kami berkomitmen melindungi
          privasi setiap pengunjung website, pemilik bisnis, dan pelanggan yang berinteraksi dengan ekosistem kami.
        </p>

        <h3 className="text-base font-bold text-[#142740] pt-2">1. Prinsip Pengumpulan Data Minimum</h3>
        <p>
          Sesuai prinsip <em>Privacy by Design</em>, website marketing OCTO hanya mengumpulkan data yang secara sadar
          Anda berikan melalui formulir (seperti nama, email, nomor WhatsApp, nama usaha) untuk keperluan merespons
          permintaan demo, konsultasi, pemesanan kartu, atau keikutsertaan kemitraan.
        </p>

        <h3 className="text-base font-bold text-[#142740] pt-2">2. Interaksi Kartu Fisik OCTO Tap</h3>
        <p>
          Kartu fisik OCTO Tap berfungsi sebagai <em>passive radio frequency tag</em> yang murni memancarkan tautan URL
          resmi Google Business Profile milik merchant. Kartu <strong>TIDAK</strong> mengakses, merekam, atau menyedot
          data pribadi seperti kontak telepon, galeri foto, atau informasi identitas dari smartphone pelanggan yang
          melakukan sentuhan tap NFC atau pemindaian QR code.
        </p>

        <h3 className="text-base font-bold text-[#142740] pt-2">3. Larangan Penjualan Data</h3>
        <p>
          OCTO tidak pernah dan tidak akan pernah menjual, menyewakan, atau memperdagangkan data lead dan data pribadi
          Anda kepada pihak ketiga untuk kepentingan iklan atau spam pihak luar.
        </p>

        <h3 className="text-base font-bold text-[#142740] pt-2">4. Hak Subjek Data</h3>
        <p>
          Berdasarkan UU PDP, Anda memiliki hak untuk mengakses data Anda yang tersimpan, meminta perbaikan, membatasi
          pemrosesan, atau meminta penghapusan penuh data Anda dari sistem CRM kami dengan mengirimkan email ke{' '}
          <a href={`mailto:${BRAND.officialEmail}`} className="text-[#00AFC4] underline font-semibold">
            {BRAND.officialEmail}
          </a>
          .
        </p>

        <h3 className="text-base font-bold text-[#142740] pt-2">5. Kontak Petugas Pelindungan Data (DPO)</h3>
        <p>
          Jika Anda memiliki pertanyaan mengenai tata kelola privasi kami, silakan hubungi:
          <br />
          <strong>Data Protection Officer (DPO) OCTO</strong>
          <br />
          Alamat: {BRAND.officeAddress}
          <br />
          Email: privacy@octo.id
        </p>
      </div>
    </div>
  );
}
