'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import { Search, Sparkles, ArrowRight, BookOpen, Smartphone, Building2 } from 'lucide-react';

export default function GlobalSearchPage() {
  const { products, resources } = useOcto();
  const [query, setQuery] = useState('');

  const q = query.toLowerCase().trim();

  const matchedProducts = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      )
    : [];

  const matchedResources = q
    ? resources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          PENCARIAN GLOBAL TERPADU
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740]">
          Cari di Seluruh Ekosistem OCTO
        </h1>
        <p className="text-sm text-[#586779]">
          Ketik kata kunci untuk menemukan produk, panduan implementasi, artikel, atau spesifikasi teknis.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          autoFocus
          placeholder="Cari produk (OCTO Tap, Insights), topik (SOP kasir, Google Maps), atau panduan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#E1E7EC] focus:border-[#00AFC4] rounded-2xl text-base shadow-sm text-[#142740] focus:outline-none"
        />
      </div>

      {/* Search Results */}
      {query.trim() === '' ? (
        <div className="p-8 bg-[#FAFBFC] rounded-3xl border border-[#E1E7EC] space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Pencarian Populer:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['OCTO Tap', 'SOP Kasir', 'Google Maps Bintang 5', 'OCTO Insights', 'Reseller', 'Garansi NFC'].map(
              (tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#E1E7EC] hover:border-[#00AFC4] hover:text-[#00AFC4] transition text-slate-700 shadow-2xs"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#00AFC4]">
                Produk Ditemukan ({matchedProducts.length}):
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] shadow-sm transition space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
                        {p.name}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${p.statusBadgeColor}`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#586779] line-clamp-2">{p.shortDesc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Matched Resources */}
          {matchedResources.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#00AFC4]">
                Artikel & Resource ({matchedResources.length}):
              </h3>
              <div className="space-y-3">
                {matchedResources.map((r) => (
                  <Link
                    key={r.id}
                    href={`/resources/${r.slug}`}
                    className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] shadow-sm transition flex items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#00AFC4] bg-[#E8F8FA] px-2 py-0.5 rounded">
                          {r.category}
                        </span>
                        <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition">
                          {r.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#586779] line-clamp-1">{r.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00AFC4] group-hover:translate-x-1 transition shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchedProducts.length === 0 && matchedResources.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E1E7EC] space-y-3">
              <Search className="w-12 h-12 mx-auto text-slate-300" />
              <h4 className="font-bold text-base text-[#142740]">
                Tidak Ada Hasil untuk &quot;{query}&quot;
              </h4>
              <p className="text-xs text-[#586779] max-w-sm mx-auto">
                Coba gunakan kata kunci yang lebih umum seperti <em>Tap</em>, <em>NFC</em>, <em>Review</em>, atau{' '}
                <em>SOP</em>.
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-4 py-2 text-xs font-bold text-[#00AFC4] hover:underline"
              >
                Bersihkan Pencarian
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
