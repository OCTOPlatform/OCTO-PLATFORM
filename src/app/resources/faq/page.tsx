'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { Search, ArrowRight } from 'lucide-react';
import FaqAccordion from '@/components/ui/FaqAccordion';

export default function FAQKnowledgeBasePage() {
  const { products } = useOcto();
  const [search, setSearch] = useState('');

  // Aggregate all FAQs from products and global
  const allFaqs = [
    ...products.flatMap((p) =>
      p.faqs.map((f, i) => ({
        id: `${p.slug}-${i}`,
        productName: p.name,
        question: f.question,
        answer: f.answer,
      }))
    ),
    {
      id: 'gen-1',
      productName: 'Umum & Legalitas',
      question: 'Apakah penggunaan kartu tap NFC untuk review melanggar aturan Google?',
      answer:
        'Tidak sama sekali. Google melarang ulasan palsu, pembelian ulasan, dan manipulasi ulasan. Kartu OCTO Tap murni mengarahkan pelanggan ke form resmi Google Review akun Anda. Pelanggan menulis ulasan secara sukarela.',
    },
    {
      id: 'gen-2',
      productName: 'Umum & Legalitas',
      question: 'Bagaimana keamanan data pelanggan saat menyentuh kartu?',
      answer:
        'Sangat aman. Kartu OCTO adalah passive NFC tag yang hanya memancarkan URL tujuan. Kartu tidak dapat mengambil kontak, foto, atau file dari ponsel pelanggan.',
    },
    {
      id: 'gen-3',
      productName: 'Pengiriman & Garansi',
      question: 'Berapa lama estimasi pengiriman kartu fisik?',
      answer:
        'Untuk kartu standar OCTO dikirim dalam 1–2 hari kerja. Untuk kartu kustom dengan cetak logo bisnis memakan waktu 3–5 hari kerja proses produksi dan QC sebelum dikirim via kurir kilat.',
    },
  ];

  const filteredFaqs = allFaqs.filter(
    (f) =>
      search.trim() === '' ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 md:py-20 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          KNOWLEDGE BASE & FAQ
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">Pusat Bantuan & Tanya Jawab</h1>
        <p className="text-sm text-[#586779]">
          Cari jawaban teknis seputar kartu fisik, kompatibilitas perangkat, analitik, dan legalitas ekosistem OCTO.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Ketik pertanyaan atau kata kunci (contoh: NFC, baterai, garansi, Google)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E1E7EC] rounded-2xl text-sm focus:outline-none focus:border-[#00AFC4] shadow-sm text-[#142740]"
        />
      </div>

      {/* Accordion FAQ list */}
      <FaqAccordion
        items={filteredFaqs.map((faq) => ({
          id: faq.id,
          question: faq.question,
          answer: faq.answer,
          category: faq.productName,
        }))}
        defaultOpenIndex={search.trim() ? null : 0}
        allowMultiple={true}
      />

      {filteredFaqs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-[#E1E7EC] text-xs text-[#586779]">
          Tidak ditemukan jawaban yang cocok. Hubungi customer support kami melalui{' '}
          <Link href="/contact" className="text-[#00AFC4] font-bold hover:underline">
            Halaman Kontak
          </Link>
          .
        </div>
      )}
    </div>
  );
}
