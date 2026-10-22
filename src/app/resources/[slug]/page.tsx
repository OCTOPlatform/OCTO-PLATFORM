'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useOcto } from '@/lib/store';
import {
  Clock,
  User,
  Calendar,
  ArrowLeft,
  Share2,
  Download,
  CheckCircle2,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

function ResourceDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const { resources } = useOcto();

  const resource = resources.find((r) => r.slug === slug);

  if (!resource) {
    return notFound();
  }

  const related = resources
    .filter(
      (r) =>
        resource.relatedSlugs?.includes(r.slug) ||
        (r.id !== resource.id && r.category === resource.category)
    )
    .slice(0, 2);

  return (
    <article className="py-12 md:py-20 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#586779]">
        <Link href="/" className="hover:text-[#142740]">
          Beranda
        </Link>
        <span>/</span>
        <Link href="/resources" className="hover:text-[#142740]">
          Resource Center
        </Link>
        <span>/</span>
        <span className="text-[#00AFC4] font-semibold">{resource.category}</span>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-[#E1E7EC] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4] bg-[#E8F8FA] px-3 py-1 rounded-full border border-cyan-200">
            {resource.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {resource.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#142740] tracking-tight leading-tight">
          {resource.title}
        </h1>

        <p className="text-base text-[#586779] leading-relaxed font-normal">
          {resource.summary}
        </p>

        {/* Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-[#586779]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#142740] text-white flex items-center justify-center font-bold text-xs">
              {resource.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[#142740]">{resource.author.name}</p>
              <p className="text-[11px] text-slate-400">{resource.author.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Diterbitkan {resource.publishedAt}
            </span>
          </div>
        </div>
      </div>

      {/* Download Box if Resource is a Download/Checklist */}
      {resource.downloadUrl && (
        <div className="p-6 bg-[#E8F8FA] rounded-2xl border border-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
              Dokumen Unduhan Siap Pakai
            </span>
            <h4 className="font-bold text-sm text-[#142740]">
              Unduh Versi Lengkap Dokumen (PDF)
            </h4>
            <p className="text-xs text-[#586779]">
              Ukuran file: {resource.downloadSize || '1.0 MB'} • Akses gratis tanpa biaya
            </p>
          </div>
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert(`Mengunduh dokumen: ${resource.title}. File tersimpan.`);
            }}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow transition flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" /> Unduh Dokumen Sekarang
          </a>
        </div>
      )}

      {/* Main Body Content with typography formatting */}
      <div className="prose prose-slate max-w-none text-[#142740] leading-relaxed text-sm sm:text-base space-y-6">
        {resource.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl sm:text-2xl font-bold text-[#142740] pt-4">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                {paragraph.split('\n').map((line, lIdx) => (
                  <li key={lIdx}>{line.replace(/^[-*]\s+/, '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {paragraph.trim()}
            </p>
          );
        })}
      </div>

      {/* Tags Strip */}
      <div className="pt-6 border-t border-[#E1E7EC] flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 mr-2">Topik Terkait:</span>
        {resource.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs bg-[#F2F5F7] text-slate-700 px-3 py-1 rounded-lg border border-[#E1E7EC]"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Resources */}
      {related.length > 0 && (
        <div className="pt-10 border-t border-[#E1E7EC] space-y-6">
          <h3 className="font-extrabold text-xl text-[#142740]">Artikel & Panduan Terkait:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/resources/${rel.slug}`}
                className="p-5 rounded-2xl bg-white border border-[#E1E7EC] hover:border-[#00AFC4] transition space-y-2 group"
              >
                <span className="text-xs font-bold text-[#00AFC4] uppercase tracking-wider block">
                  {rel.category}
                </span>
                <h4 className="font-bold text-sm text-[#142740] group-hover:text-[#00AFC4] transition line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#586779] line-clamp-2">{rel.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      <div className="pt-6">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#142740] hover:text-[#00AFC4] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Resource Center
        </Link>
      </div>
    </article>
  );
}

export default function ResourceDetailPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-400">Memuat artikel...</div>}>
      <ResourceDetailContent />
    </Suspense>
  );
}
