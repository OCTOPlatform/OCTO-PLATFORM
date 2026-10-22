'use client';

import React from 'react';

export default function PartnerTermsPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#142740]">
      <div className="space-y-3 border-b border-[#E1E7EC] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
          KETENTUAN KEMITRAAN & KODE ETIK
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Ketentuan Program Partner OCTO</h1>
        <p className="text-xs text-[#586779]">
          Terakhir diperbarui: 18 Oktober 2026 • Pedoman Operasional Reseller & Agensi Resmi.
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <h3 className="text-base font-bold text-[#142740]">1. Kelayakan Menjadi Mitra</h3>
        <p>
          Program kemitraan OCTO terbuka bagi badan usaha, agensi pemasaran digital, konsultan bisnis, toko hardware POS,
          dan perorangan terverifikasi yang memiliki rekam jejak integritas bisnis yang baik.
        </p>

        <h3 className="text-base font-bold text-[#142740]">2. Perlindungan Merek & Pedoman Harga</h3>
        <p>
          Mitra dilarang menjual kartu fisik OCTO di bawah Harga Eceran Terendah (HET) resmi yang ditetapkan untuk menjaga
          persaingan sehat sesama mitra. Mitra wajib menggunakan logo dan materi promosi resmi OCTO tanpa modifikasi liar.
        </p>

        <h3 className="text-base font-bold text-[#142740]">3. Larangan Menjual Jasa Manipulasi Ulasan</h3>
        <p>
          Mitra dilarang keras menawarkan paket ulasan palsu, ulasan bayaran berkedok kartu OCTO, atau menjanjikan penghapusan
          ulasan buruk Google. Pelanggaran terhadap poin ini berakibat pemutusan hubungan kemitraan sepihak dan pencabutan
          lisensi resmi.
        </p>
      </div>
    </div>
  );
}
