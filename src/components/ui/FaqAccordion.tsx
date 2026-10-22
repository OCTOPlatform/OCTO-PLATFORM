'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
  accentColor?: string; // hex or tailwind class
  iconColor?: string;
}

export default function FaqAccordion({
  items,
  defaultOpenIndex = 0,
  allowMultiple = true,
  accentColor = '#00AFC4',
  iconColor = '#00AFC4',
}: FaqAccordionProps) {
  // Store open state as a set of indices or single index
  const [openIndices, setOpenIndices] = useState<number[]>(() => {
    if (defaultOpenIndex !== null && defaultOpenIndex !== undefined && defaultOpenIndex >= 0) {
      return [defaultOpenIndex];
    }
    return [];
  });

  const toggleItem = (idx: number) => {
    setOpenIndices((prev) => {
      const isOpen = prev.includes(idx);
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== idx) : [...prev, idx];
      } else {
        return isOpen ? [] : [idx];
      }
    });
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        const itemKey = item.id || `faq-${idx}`;

        return (
          <div
            key={itemKey}
            className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
              isOpen
                ? 'border-[#00AFC4]/40 ring-1 ring-[#00AFC4]/20 shadow-md'
                : 'border-[#E1E7EC] hover:border-slate-300 hover:shadow'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${idx}`}
              className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#142740] flex items-center justify-between gap-4 hover:bg-[#FAFBFC] transition-colors cursor-pointer group select-none"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="p-1 rounded-lg bg-[#E8F8FA] text-[#00AFC4] shrink-0 mt-0.5 sm:mt-0">
                  <HelpCircle className="w-4 h-4" />
                </span>
                <div>
                  {item.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {item.category}
                    </span>
                  )}
                  <span className="group-hover:text-[#00AFC4] transition-colors">
                    {item.question}
                  </span>
                </div>
              </div>

              {/* Explicit, stylized clickable arrow button */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border cursor-pointer ${
                  isOpen
                    ? 'bg-[#00AFC4] text-white border-[#00AFC4] shadow-sm rotate-180'
                    : 'bg-[#F2F5F7] text-slate-500 border-slate-200 group-hover:bg-[#E8F8FA] group-hover:text-[#00AFC4] group-hover:border-cyan-300 group-hover:scale-105'
                }`}
                aria-label={isOpen ? 'Tutup jawaban' : 'Buka jawaban'}
              >
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </div>
            </button>

            {/* Smooth transition container for answer */}
            <div
              id={`faq-answer-${idx}`}
              role="region"
              aria-labelledby={`faq-question-${idx}`}
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#586779] leading-relaxed border-t border-[#E1E7EC]/60 pl-12">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
