'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import OctoLogo from '../brand/OctoLogo';
import { useOcto } from '@/lib/store';
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Sparkles,
  Smartphone,
  BarChart3,
  Gift,
  Building,
  Users,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { products, currentRole } = useOcto();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [solutionDropdownOpen, setSolutionDropdownOpen] = useState(false);

  const getProductIcon = (slug: string) => {
    switch (slug) {
      case 'octo-tap':
        return <Smartphone className="w-5 h-5 text-[#00AFC4]" />;
      case 'octo-insights':
        return <BarChart3 className="w-5 h-5 text-indigo-500" />;
      case 'octo-loyalty':
        return <Gift className="w-5 h-5 text-amber-500" />;
      case 'octo-business':
        return <Building className="w-5 h-5 text-teal-600" />;
      case 'octo-crm':
        return <Users className="w-5 h-5 text-cyan-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#00AFC4]" />;
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E1E7EC] transition-all">
      {/* Top Banner - Subtle brand proof & admin quick switcher notice */}
      <div className="bg-[#142740] text-xs text-slate-300 py-1.5 px-4 text-center flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-white font-medium">OCTO Ecosystem 2026</span>
          <span className="text-slate-400">• ONE PLATFORM. MANY POSSIBILITIES.</span>
        </div>
        <div className="flex items-center justify-center w-full md:w-auto gap-4">
          <span className="text-slate-300">Smart business tools, connected.</span>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 bg-[#00AFC4]/20 hover:bg-[#00AFC4]/30 text-[#00AFC4] px-2 py-0.5 rounded text-[11px] font-semibold transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Portal CMS & CRM ({currentRole})
          </Link>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center py-2" onClick={() => setMobileMenuOpen(false)}>
          <OctoLogo showTagline size="md" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductDropdownOpen(true)}
            onMouseLeave={() => setProductDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold transition ${
                pathname.startsWith('/products')
                  ? 'text-[#00AFC4] bg-[#E8F8FA]'
                  : 'text-[#142740] hover:text-[#00AFC4] hover:bg-[#F2F5F7]'
              }`}
            >
              Produk
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>

            {productDropdownOpen && (
              <div className="absolute left-0 w-[420px] bg-white rounded-xl shadow-xl border border-[#E1E7EC] p-3 top-full mt-1 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#586779] border-b border-[#E1E7EC]">
                  Ekosistem Produk OCTO
                </div>
                {products.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.slug}`}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F2F5F7] transition group"
                    onClick={() => setProductDropdownOpen(false)}
                  >
                    <div className="p-2 rounded-md bg-[#FAFBFC] border border-[#E1E7EC] group-hover:border-[#00AFC4] group-hover:bg-[#E8F8FA] transition">
                      {getProductIcon(prod.slug)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#142740] group-hover:text-[#00AFC4] transition text-sm">
                          {prod.name}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${prod.statusBadgeColor}`}>
                          {prod.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#586779] line-clamp-1 mt-0.5">{prod.shortDesc}</p>
                    </div>
                  </Link>
                ))}
                <div className="pt-2 border-t border-[#E1E7EC] flex items-center justify-between px-2 text-xs">
                  <Link
                    href="/products"
                    className="text-[#00AFC4] font-semibold hover:underline flex items-center gap-1"
                    onClick={() => setProductDropdownOpen(false)}
                  >
                    Lihat Semua Produk & Perbandingan <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionDropdownOpen(true)}
            onMouseLeave={() => setSolutionDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold transition ${
                pathname.startsWith('/solutions')
                  ? 'text-[#00AFC4] bg-[#E8F8FA]'
                  : 'text-[#142740] hover:text-[#00AFC4] hover:bg-[#F2F5F7]'
              }`}
            >
              Solusi Industri
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>

            {solutionDropdownOpen && (
              <div className="absolute left-0 w-64 bg-white rounded-xl shadow-xl border border-[#E1E7EC] p-2 top-full mt-1 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/solutions"
                  className="px-3 py-2 text-xs font-bold text-[#00AFC4] hover:bg-[#E8F8FA] rounded-md transition"
                  onClick={() => setSolutionDropdownOpen(false)}
                >
                  Semua Solusi Industri
                </Link>
                <Link
                  href="/solutions/retail"
                  className="px-3 py-2 text-sm text-[#142740] hover:bg-[#F2F5F7] rounded-md transition font-medium"
                  onClick={() => setSolutionDropdownOpen(false)}
                >
                  Retail & Toko Modern
                </Link>
                <Link
                  href="/solutions/food-beverage"
                  className="px-3 py-2 text-sm text-[#142740] hover:bg-[#F2F5F7] rounded-md transition font-medium"
                  onClick={() => setSolutionDropdownOpen(false)}
                >
                  Kafe & Restoran (F&B)
                </Link>
                <Link
                  href="/solutions/beauty-wellness"
                  className="px-3 py-2 text-sm text-[#142740] hover:bg-[#F2F5F7] rounded-md transition font-medium"
                  onClick={() => setSolutionDropdownOpen(false)}
                >
                  Klinik Kecantikan & Spa
                </Link>
                <Link
                  href="/solutions/healthcare"
                  className="px-3 py-2 text-sm text-[#142740] hover:bg-[#F2F5F7] rounded-md transition font-medium"
                  onClick={() => setSolutionDropdownOpen(false)}
                >
                  Kesehatan & Faskes
                </Link>
                <Link
                  href="/solutions/multi-location"
                  className="px-3 py-2 text-sm text-[#142740] hover:bg-[#F2F5F7] rounded-md transition font-medium"
                  onClick={() => setSolutionDropdownOpen(false)}
                >
                  Bisnis Multi-Cabang
                </Link>
              </div>
            )}
          </div>

          {/* Resources */}
          <Link
            href="/resources"
            className={`px-3 py-2 rounded-md text-sm font-semibold transition ${
              isActive('/resources') || pathname.startsWith('/resources')
                ? 'text-[#00AFC4] bg-[#E8F8FA]'
                : 'text-[#142740] hover:text-[#00AFC4] hover:bg-[#F2F5F7]'
            }`}
          >
            Resource Center
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`px-3 py-2 rounded-md text-sm font-semibold transition ${
              isActive('/about')
                ? 'text-[#00AFC4] bg-[#E8F8FA]'
                : 'text-[#142740] hover:text-[#00AFC4] hover:bg-[#F2F5F7]'
            }`}
          >
            Tentang OCTO
          </Link>

          {/* Partners */}
          <Link
            href="/partners"
            className={`px-3 py-2 rounded-md text-sm font-semibold transition ${
              isActive('/partners')
                ? 'text-[#00AFC4] bg-[#E8F8FA]'
                : 'text-[#142740] hover:text-[#00AFC4] hover:bg-[#F2F5F7]'
            }`}
          >
            Mitra
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`px-3 py-2 rounded-md text-sm font-semibold transition ${
              isActive('/contact')
                ? 'text-[#00AFC4] bg-[#E8F8FA]'
                : 'text-[#142740] hover:text-[#00AFC4] hover:bg-[#F2F5F7]'
            }`}
          >
            Kontak
          </Link>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/search"
            aria-label="Pencarian"
            className="p-2 text-[#586779] hover:text-[#142740] hover:bg-[#F2F5F7] rounded-full transition"
          >
            <Search className="w-5 h-5" />
          </Link>

          <Link
            href="/products/octo-tap#demo"
            className="px-4 py-2 text-sm font-semibold text-[#142740] bg-[#F2F5F7] hover:bg-[#E1E7EC] border border-[#E1E7EC] rounded-lg transition"
          >
            Coba Demo
          </Link>

          <Link
            href="/request-demo"
            className="px-4 py-2 text-sm font-semibold text-white bg-[#00AFC4] hover:bg-[#0098AB] shadow-sm hover:shadow rounded-lg transition flex items-center gap-1.5"
          >
            Minta Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <Link
            href="/search"
            aria-label="Cari"
            className="p-2 text-[#586779] hover:bg-[#F2F5F7] rounded-lg"
          >
            <Search className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#142740] hover:bg-[#F2F5F7] rounded-lg focus:outline-none"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E1E7EC] bg-white px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div>
            <div className="text-xs font-bold uppercase text-[#586779] px-2 mb-2">Lini Produk OCTO</div>
            <div className="space-y-1">
              {products.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F2F5F7]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2.5">
                    {getProductIcon(prod.slug)}
                    <span className="font-semibold text-sm text-[#142740]">{prod.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${prod.statusBadgeColor}`}>
                    {prod.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#E1E7EC]">
            <div className="text-xs font-bold uppercase text-[#586779] px-2 mb-2">Solusi & Navigasi</div>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link
                href="/solutions"
                className="p-2 rounded-md hover:bg-[#F2F5F7] text-[#142740]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Semua Solusi
              </Link>
              <Link
                href="/resources"
                className="p-2 rounded-md hover:bg-[#F2F5F7] text-[#142740]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resource Center
              </Link>
              <Link
                href="/about"
                className="p-2 rounded-md hover:bg-[#F2F5F7] text-[#142740]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tentang OCTO
              </Link>
              <Link
                href="/partners"
                className="p-2 rounded-md hover:bg-[#F2F5F7] text-[#142740]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Program Mitra
              </Link>
              <Link
                href="/contact"
                className="p-2 rounded-md hover:bg-[#F2F5F7] text-[#142740]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontak Kami
              </Link>
              <Link
                href="/admin"
                className="p-2 rounded-md bg-[#E8F8FA] text-[#00AFC4] font-semibold flex items-center gap-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShieldCheck className="w-4 h-4" /> Admin Portal
              </Link>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E1E7EC] flex flex-col gap-2">
            <Link
              href="/request-demo"
              className="w-full text-center py-2.5 font-bold text-white bg-[#00AFC4] rounded-lg shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Minta Demo Langsung
            </Link>
            <Link
              href="/products/octo-tap#demo"
              className="w-full text-center py-2.5 font-semibold text-[#142740] bg-[#F2F5F7] border border-[#E1E7EC] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Coba Demo Interaktif
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
