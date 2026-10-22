'use client';

import React from 'react';
import Link from 'next/link';
import { INDUSTRIES } from '@/lib/constants';
import {
  ShoppingBag,
  UtensilsCrossed,
  Sparkles,
  HeartPulse,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function SolutionsHubPage() {
  const getIndustryIcon = (slug: string) => {
    switch (slug) {
      case 'retail':
        return <ShoppingBag className="w-6 h-6 text-[#00AFC4]" />;
      case 'food-beverage':
        return <UtensilsCrossed className="w-6 h-6 text-amber-500" />;
      case 'beauty-wellness':
        return <Sparkles className="w-6 h-6 text-pink-500" />;
      case 'healthcare':
        return <HeartPulse className="w-6 h-6 text-emerald-500" />;
      case 'multi-location':
        return <Building2 className="w-6 h-6 text-indigo-500" />;
      default:
        return <Building2 className="w-6 h-6 text-[#00AFC4]" />;
    }
  };

  return (
    <div className="py-12 md:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3.5 py-1.5 rounded-full border border-cyan-200">
          SOLUSI BERBASIS INDUSTRI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#142740] tracking-tight">
          Dirancang Sesuai Karakteristik Interaksi Tamu Anda
        </h1>
        <p className="text-base text-[#586779] leading-relaxed">
          Pola interaksi pelanggan kafe berbeda dengan klinik kecantikan atau toko retail.
          Pelajari bagaimana OCTO disesuaikan untuk memaksimalkan kepuasan dan ulasan di bidang industri Anda.
        </p>
      </div>

      {/* Grid of Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INDUSTRIES.map((ind) => (
          <div
            key={ind.slug}
            className="bg-white rounded-3xl border border-[#E1E7EC] p-8 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="p-3 w-12 h-12 rounded-xl bg-[#FAFBFC] border border-[#E1E7EC] flex items-center justify-center group-hover:border-[#00AFC4] transition">
                {getIndustryIcon(ind.slug)}
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#142740] group-hover:text-[#00AFC4] transition">
                  {ind.name}
                </h3>
                <p className="text-xs font-semibold text-[#00AFC4] mt-0.5">{ind.tagline}</p>
              </div>

              <p className="text-xs sm:text-sm text-[#586779] leading-relaxed">
                {ind.description}
              </p>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 font-semibold">
                {ind.stats}
              </div>

              <div className="space-y-2 pt-2 border-t border-[#E1E7EC] text-xs">
                <span className="font-bold text-[#142740] block">Tantangan Khas:</span>
                <p className="text-[#586779]">{ind.challenges}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E1E7EC]">
              <Link
                href={`/solutions/${ind.slug}`}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#142740] hover:bg-[#1E3A5F] rounded-xl transition flex items-center justify-center gap-1.5"
              >
                Pelajari Solusi {ind.name} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
