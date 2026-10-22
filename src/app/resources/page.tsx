'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { ResourceCategory } from '@/lib/types';
import {
  BookOpen,
  Search,
  Tag,
  ArrowRight,
  Download,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function ResourceCenterPage() {
  const { resources } = useOcto();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Artikel', 'Panduan', 'Studi Kasus', 'Materi Unduhan', 'FAQ'];

  const filteredResources = resources.filter((res) => {
    const matchesCategory =
      selectedCategory === 'Semua' || res.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 md:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          RESOURCE CENTER & PUSAT EDUKASI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740] tracking-tight">
          Panduan, Riset, dan Strategi Reputasi Bisnis
        </h1>
        <p className="text-base text-[#586779] leading-relaxed">
          Koleksi artikel mendalam, skrip SOP kasir, dokumen checklist audit Google Business Profile,
          dan studi kasus pertumbuhan nyata untuk mengembangkan usaha Anda.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari artikel, kata kunci (misal: SOP kasir, NFC, Google Maps, studi kasus)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#E1E7EC] rounded-2xl text-sm focus:outline-none focus:border-[#00AFC4] shadow-sm text-[#142740]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-[#142740] text-white shadow-sm'
                  : 'bg-white border border-[#E1E7EC] text-[#586779] hover:bg-[#F2F5F7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-7 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-2.5 py-1 rounded-lg">
                  {res.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {res.readTime}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-[#142740] group-hover:text-[#00AFC4] transition line-clamp-2">
                {res.title}
              </h3>

              <p className="text-xs text-[#586779] line-clamp-3 leading-relaxed">
                {res.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {res.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] bg-[#F2F5F7] text-slate-600 px-2 py-0.5 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E7EC] flex items-center justify-between text-xs">
              <div className="text-[#586779]">
                <span className="font-medium">{res.author.name}</span>
              </div>
              <Link
                href={`/resources/${res.slug}`}
                className="font-bold text-[#00AFC4] group-hover:underline flex items-center gap-1"
              >
                Baca Lengkap <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E1E7EC] space-y-3">
          <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
          <h4 className="font-bold text-base text-[#142740]">Tidak Ada Konten yang Cocok</h4>
          <p className="text-xs text-[#586779] max-w-sm mx-auto">
            Coba ubah kata kunci pencarian Anda atau pilih kategori &quot;Semua&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-bold text-[#00AFC4] hover:underline"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}
