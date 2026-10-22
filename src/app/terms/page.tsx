'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-[#142740]">
      <div className="space-y-3 border-b border-[#E1E7EC] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
          KETENTUAN HUKUM
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Syarat dan Ketentuan Penggunaan</h1>
        <p className="text-xs text-[#586779]">
          Terakhir diperbarui: 18 Oktober 2026 • PT Platform Bisnis Terhubung (OCTO).
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        <h3 className="text-base font-bold text-[#142740]">1. Penerimaan Ketentuan</h3>
        <p>
          Dengan mengakses situs web OCTO dan menggunakan layanan atau produk fisik kami, Anda menyetujui untuk terikat
          pada Syarat dan Ketentuan ini. Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, harap tidak
          melanjutkan penggunaan situs.
        </p>

        <h3 className="text-base font-bold text-[#142740]">2. Etika Ulasan & Kepatuhan Pihak Ketiga (Google)</h3>
        <p>
          OCTO Tap adalah sarana penghubung fisik-ke-digital yang mempermudah pembukaan tautan form Google Review resmi.
          Pengguna dilarang memanfaatkan produk OCTO untuk:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>Memaksa atau mengintimidasi konsumen dalam memberikan ulasan tertentu.</li>
          <li>Mengganti tautan resmi bisnis dengan tautan penipuan, malware, atau phishing.</li>
          <li>Mengklaim secara keliru bahwa OCTO memiliki wewenang untuk menghapus ulasan negatif di Google.</li>
        </ul>

        <h3 className="text-base font-bold text-[#142740]">3. Hak Kekayaan Intelektual</h3>
        <p>
          Seluruh merek dagang, logo, desain produk fisik, diagram, teks artikel, dan kode perangkat lunak adalah milik
          sah PT Platform Bisnis Terhubung (OCTO) dan dilindungi oleh undang-undang hak cipta Republik Indonesia.
        </p>

        <h3 className="text-base font-bold text-[#142740]">4. Pembatasan Tanggung Jawab</h3>
        <p>
          Layanan Google Business Profile dan Google Maps dioperasikan secara independen oleh Google LLC. OCTO tidak
          bertanggung jawab atas kebijakan moderasi, suspensi akun bisnis oleh pihak Google, atau algoritma pemeringkatan
          pencarian pihak ketiga.
        </p>
      </div>
    </div>
  );
}
