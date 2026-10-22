'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import {
  ProductStatus,
  LeadStatus,
  AdminRole,
  DemoType,
  DemoStatus,
  ResourceCategory,
  ResourceStatus,
} from '@/lib/types';
import {
  ShieldCheck,
  Users,
  Layers,
  Inbox,
  FileText,
  Activity,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Plus,
  Edit,
  Eye,
  EyeOff,
  Trash2,
  MessageSquare,
  Sparkles,
  BarChart3,
  Calendar,
  AlertCircle,
  ExternalLink,
  Lock,
  LogOut,
  Mail,
  KeyRound,
} from 'lucide-react';

export default function AdminPortalPage() {
  const {
    products,
    updateProductStatus,
    updateProductDemo,
    leads,
    updateLeadStatus,
    assignLead,
    addLeadNote,
    exportLeadsCSV,
    resources,
    addResource,
    updateResource,
    auditLogs,
    logAuditAction,
    analyticsEvents,
    currentRole,
    setCurrentRole,
  } = useOcto();

  const [activeTab, setActiveTab] = useState<'leads' | 'products' | 'cms' | 'audit' | 'analytics'>('leads');

  // Internal Authentication Gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmittingAuth, setIsSubmittingAuth] = useState<boolean>(false);
  const [easterEggActive, setEasterEggActive] = useState<boolean>(false);

  useEffect(() => {
    try {
      const session = sessionStorage.getItem('octo_admin_session');
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed?.authenticated) {
          setIsAuthenticated(true);
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  // Easter Egg Listener: Ketik "elzein" di keyboard secara berurutan (hanya di luar kolom input)
  useEffect(() => {
    if (isAuthenticated) return;
    let keyBuffer = '';
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Abaikan jika sedang mengetik di kolom input atau textarea form
      const target = e.target as HTMLElement | null;
      const isInputField =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (isInputField) return;

      if (e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-20);
        if (keyBuffer.includes('elzein')) {
          setEasterEggActive(true);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isAuthenticated]);

  useEffect(() => {
    if (easterEggActive) {
      setTimeout(() => {
        const el = document.getElementById('octo-easter-egg-panel');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  }, [easterEggActive]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmittingAuth(true);

    const trimmedEmail = loginEmail.trim().toLowerCase();
    const trimmedPassword = loginPassword.trim();

    const validAdmins: Record<string, { role: AdminRole; pass: string }> = {
      'admin@octo.id': { role: 'Super Admin', pass: 'AdminOCTO2026!' },
      'egichandrapratama@gmail.com': { role: 'Super Admin', pass: 'AdminOCTO2026!' },
      'ops@octo.id': { role: 'Admin', pass: 'OpsOCTO2026!' },
      'sales@octo.id': { role: 'Sales/Lead Manager', pass: 'SalesOCTO2026!' },
      'editor@octo.id': { role: 'Editor/Approver', pass: 'EditorOCTO2026!' },
    };

    setTimeout(() => {
      const match = validAdmins[trimmedEmail];
      if (match && match.pass === trimmedPassword) {
        setIsAuthenticated(true);
        setCurrentRole(match.role);
        try {
          sessionStorage.setItem(
            'octo_admin_session',
            JSON.stringify({
              authenticated: true,
              email: trimmedEmail,
              role: match.role,
              loggedInAt: new Date().toISOString(),
            })
          );
        } catch {
          // ignore
        }
        logAuditAction('ADMIN_LOGIN', `Admin login berhasil dengan email ${trimmedEmail} (Peran: ${match.role})`);
      } else {
        setLoginError('Kredensial tidak valid. Akses ditolak hanya untuk personel internal berwenang.');
      }
      setIsSubmittingAuth(false);
    }, 400);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('octo_admin_session');
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setLoginEmail('');
    setLoginPassword('');
    logAuditAction('ADMIN_LOGOUT', `Sesi admin diakhiri`);
  };

  const handlePrefillDemo = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setLoginError(null);
  };

  // Leads filter & search state
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [leadProductFilter, setLeadProductFilter] = useState<string>('all');
  const [leadSearch, setLeadSearch] = useState<string>('');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState<string>('');

  // CMS state
  const [showNewResourceModal, setShowNewResourceModal] = useState<boolean>(false);
  const [newResourceData, setNewResourceData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    category: 'Artikel' as ResourceCategory,
    tags: 'Google Maps, SOP',
    status: 'Published' as ResourceStatus,
    authorName: 'Tim Redaksi OCTO',
    authorRole: 'Editorial Team',
    readTime: '4 menit baca',
    metaTitle: '',
    metaDescription: '',
  });

  // Permission checks
  const canEditConfig = currentRole === 'Super Admin' || currentRole === 'Admin';
  const canManageLeads = currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Sales/Lead Manager';
  const canPublishContent = currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Editor/Approver';
  const canExportLeads = currentRole === 'Super Admin' || currentRole === 'Admin' || currentRole === 'Sales/Lead Manager';

  // Leads filtering
  const filteredLeads = leads.filter((l) => {
    const matchStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const matchProduct = leadProductFilter === 'all' || l.productInterest === leadProductFilter;
    const matchQuery =
      leadSearch.trim() === '' ||
      l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.companyName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch);
    return matchStatus && matchProduct && matchQuery;
  });

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  const handleExportCSV = () => {
    if (!canExportLeads) {
      alert(`Peran "${currentRole}" tidak memiliki wewenang mengekspor data lead.`);
      return;
    }
    const csv = exportLeadsCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `octo_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResourceData.title || !newResourceData.summary) return;

    const slug = newResourceData.slug || newResourceData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    addResource({
      slug,
      title: newResourceData.title,
      summary: newResourceData.summary,
      content: newResourceData.content || newResourceData.summary,
      category: newResourceData.category,
      tags: newResourceData.tags.split(',').map((t) => t.trim()),
      author: {
        name: newResourceData.authorName,
        role: newResourceData.authorRole,
      },
      readTime: newResourceData.readTime,
      status: newResourceData.status,
      relatedSlugs: [],
      metaTitle: newResourceData.metaTitle || newResourceData.title,
      metaDescription: newResourceData.metaDescription || newResourceData.summary,
    });

    setShowNewResourceModal(false);
    setNewResourceData({
      title: '',
      slug: '',
      summary: '',
      content: '',
      category: 'Artikel',
      tags: 'Google Maps, SOP',
      status: 'Published',
      authorName: 'Tim Redaksi OCTO',
      authorRole: 'Editorial Team',
      readTime: '4 menit baca',
      metaTitle: '',
      metaDescription: '',
    });
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#0B132B] text-white flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-2 border-[#00AFC4] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-400 font-mono">Memeriksa otorisasi sesi admin...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#050C1A] text-white flex flex-col justify-center items-center p-4 sm:p-6 py-12 sm:py-16 relative overflow-y-auto">
        {/* Glow Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#0D1B2D]/90 backdrop-blur-xl border border-[#1E3A5F] rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00AFC4]/15 border border-[#00AFC4]/30 text-[#00AFC4] mb-1">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              OCTO Admin Portal
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Akses terbatas untuk pengelolaan konten CMS, status lini produk, dan tindak lanjut lead klien resmi.
            </p>
          </div>

          {/* Security Advisory */}
          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-[11px] text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Halaman ini bukan untuk umum. Seluruh riwayat percobaan akses dicatat secara terpusat dalam sistem audit internal.
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@octo.id"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#0B132B] border border-[#1E3A5F] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00AFC4] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi Otorisasi
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#0B132B] border border-[#1E3A5F] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00AFC4] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="w-full py-2.5 px-4 bg-[#00AFC4] hover:bg-cyan-300 active:bg-cyan-400 text-[#142740] font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmittingAuth ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#142740] border-t-transparent rounded-full animate-spin" />
                  <span>Mengautentikasi...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verifikasi & Masuk Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Easter Egg: Bantuan Akun Internal Terdaftar (Super Admin) via kata kunci "elzein" */}
          {easterEggActive && (
            <div id="octo-easter-egg-panel" className="pt-3 border-t border-cyan-500/30 text-[11px] text-slate-300 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>Easter Egg Terbuka: Kredensial Super Admin</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEasterEggActive(false)}
                  className="text-[10px] text-slate-400 hover:text-white transition cursor-pointer"
                  title="Sembunyikan"
                >
                  ✕ Sembunyikan
                </button>
              </div>

              <div className="p-3 bg-[#081726] rounded-xl border border-cyan-500/30 font-mono text-[10px] space-y-2.5 text-slate-300 shadow-xl">
                <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-sans font-bold flex items-center justify-between">
                  <span>Akun Internal Terdaftar (Super Admin)</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                    Keyword: elzein
                  </span>
                </div>

                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center justify-between gap-2 p-2 bg-[#0D1B2D] rounded-lg border border-[#1E3A5F]">
                    <div>
                      <div className="text-[9px] text-slate-400">Super Admin Utama</div>
                      <div className="text-[#00AFC4] font-semibold text-[11px] font-mono">admin@octo.id</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePrefillDemo('admin@octo.id', 'AdminOCTO2026!')}
                      className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-[10px] rounded-lg font-medium transition cursor-pointer"
                    >
                      Gunakan Akun
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2 bg-[#0D1B2D] rounded-lg border border-[#1E3A5F]">
                    <div>
                      <div className="text-[9px] text-slate-400">Super Admin Founder</div>
                      <div className="text-[#00AFC4] font-semibold text-[11px] font-mono">egichandrapratama@gmail.com</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePrefillDemo('egichandrapratama@gmail.com', 'AdminOCTO2026!')}
                      className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-[10px] rounded-lg font-medium transition cursor-pointer"
                    >
                      Gunakan Akun
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 border-t border-[#1E3A5F]/70 flex items-center justify-between font-sans">
                  <span>Password Otorisasi:</span>
                  <span className="text-cyan-300 font-mono font-bold tracking-wider">AdminOCTO2026!</span>
                </div>
              </div>
            </div>
          )}

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-[#00AFC4] transition inline-flex items-center gap-1.5"
            >
              ← Kembali ke Beranda Publik OCTO
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] pb-24 text-[#142740]">
      {/* Admin Top Header & Role Switcher */}
      <div className="bg-[#142740] text-white border-b border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00AFC4] text-[#142740] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wide flex items-center gap-2">
                OCTO Platform CMS & Lead CRM Hub
                <span className="text-[10px] bg-[#00AFC4]/20 text-[#00AFC4] px-2 py-0.5 rounded border border-[#00AFC4]/40 font-mono">
                  v2.0 Ultimate
                </span>
              </h1>
              <p className="text-xs text-slate-300">
                Pusat Kendali Pengelolaan Status Produk, Demo, Lead Masuk, dan Konten Publik
              </p>
            </div>
          </div>

          {/* Interactive Role Switcher & Logout Button */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 bg-[#0D1B2D] px-3 py-1.5 rounded-xl border border-[#1E3A5F]">
              <Users className="w-4 h-4 text-[#00AFC4]" />
              <span className="text-xs text-slate-300 font-medium">Peran:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
                className="text-xs font-bold text-[#00AFC4] bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="Super Admin">Super Admin (Akses Penuh)</option>
                <option value="Admin">Admin (Konten & Lead)</option>
                <option value="Editor/Approver">Editor/Approver (Review & Publish)</option>
                <option value="Author">Author (Hanya Tulis Draf)</option>
                <option value="Sales/Lead Manager">Sales/Lead Manager (Khusus CRM)</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 hover:text-white rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              title="Keluar dari sesi admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'leads'
                ? 'border-[#00AFC4] text-[#00AFC4]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            Lead CRM ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#00AFC4] text-[#00AFC4]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Status Produk & Demo
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'cms'
                ? 'border-[#00AFC4] text-[#00AFC4]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Resource CMS ({resources.length})
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-[#00AFC4] text-[#00AFC4]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Audit Trail ({auditLogs.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'border-[#00AFC4] text-[#00AFC4]'
                : 'border-transparent text-slate-300 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            Analytics Event Stream ({analyticsEvents.length})
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* ======================================================== */}
        {/* TAB 1: LEAD CRM & PIPELINE */}
        {/* ======================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Action & Filter Bar */}
            <div className="bg-white p-5 rounded-2xl border border-[#E1E7EC] shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari nama, email, perusahaan..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 bg-[#FAFBFC] border border-[#E1E7EC] rounded-xl focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>

                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="text-xs p-2 bg-[#FAFBFC] border border-[#E1E7EC] rounded-xl text-slate-700"
                >
                  <option value="all">Semua Status</option>
                  <option value="Baru">Baru</option>
                  <option value="Dihubungi">Dihubungi</option>
                  <option value="Terkualifikasi">Terkualifikasi</option>
                  <option value="Demo Terjadwal">Demo Terjadwal</option>
                  <option value="Selesai">Selesai (Closed)</option>
                  <option value="Tidak Memenuhi">Tidak Memenuhi</option>
                </select>

                <select
                  value={leadProductFilter}
                  onChange={(e) => setLeadProductFilter(e.target.value)}
                  className="text-xs p-2 bg-[#FAFBFC] border border-[#E1E7EC] rounded-xl text-slate-700"
                >
                  <option value="all">Semua Produk</option>
                  <option value="octo-tap">OCTO Tap</option>
                  <option value="octo-insights">OCTO Insights</option>
                  <option value="octo-loyalty">OCTO Loyalty</option>
                  <option value="octo-business">OCTO Business</option>
                  <option value="octo-crm">OCTO CRM</option>
                  <option value="partner">Partner Program</option>
                  <option value="general">Umum / Newsletter</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  disabled={!canExportLeads}
                  className="px-4 py-2 text-xs font-bold text-[#142740] bg-[#FAFBFC] hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition flex items-center gap-2 disabled:opacity-40"
                  title={!canExportLeads ? 'Hanya Super Admin, Admin, dan Sales Manager yang berhak ekspor' : ''}
                >
                  <Download className="w-3.5 h-3.5 text-[#00AFC4]" />
                  Ekspor CSV ({filteredLeads.length})
                </button>
              </div>
            </div>

            {/* Lead Table */}
            <div className="bg-white rounded-2xl border border-[#E1E7EC] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAFBFC] border-b border-[#E1E7EC] text-[#586779] font-bold">
                    <tr>
                      <th className="p-4">Lead ID & Tanggal</th>
                      <th className="p-4">Kontak & Perusahaan</th>
                      <th className="p-4">Minat Produk</th>
                      <th className="p-4">Status Pipeline</th>
                      <th className="p-4">Penanggung Jawab</th>
                      <th className="p-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E1E7EC]">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#FAFBFC] transition">
                        <td className="p-4">
                          <span className="font-mono font-bold text-[#142740] block">{lead.id}</span>
                          <span className="text-[10px] text-slate-400">
                            {lead.createdAt.split('T')[0]}
                          </span>
                        </td>
                        <td className="p-4 space-y-0.5">
                          <span className="font-bold text-[#142740] block">{lead.fullName}</span>
                          <span className="text-[11px] text-slate-500 block">
                            {lead.companyName !== '-' ? lead.companyName : lead.email}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">{lead.phone}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F8FA] text-[#00AFC4] px-2.5 py-1 rounded-md border border-cyan-100">
                            {lead.productInterest}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-1">
                            Form: {lead.formType}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            disabled={!canManageLeads}
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="text-xs font-bold p-1 rounded-md border border-slate-300 bg-white cursor-pointer focus:outline-none"
                          >
                            <option value="Baru">Baru</option>
                            <option value="Dihubungi">Dihubungi</option>
                            <option value="Terkualifikasi">Terkualifikasi</option>
                            <option value="Demo Terjadwal">Demo Terjadwal</option>
                            <option value="Selesai">Selesai (Closed)</option>
                            <option value="Tidak Memenuhi">Tidak Memenuhi</option>
                          </select>
                        </td>
                        <td className="p-4 text-slate-600">
                          {lead.assignedTo || 'Belum Ditugaskan'}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedLeadId(lead.id)}
                            className="px-3 py-1.5 text-[11px] font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-lg transition"
                          >
                            Detail & Catatan
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredLeads.length === 0 && (
                <div className="p-12 text-center text-xs text-slate-400 space-y-2">
                  <Inbox className="w-8 h-8 mx-auto text-slate-300" />
                  <p>Tidak ada lead yang sesuai dengan filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: PRODUCT STATUS & DEMO CONFIGURATION */}
        {/* ======================================================== */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="bg-[#E8F8FA] p-5 rounded-2xl border border-cyan-200 text-xs text-[#142740] space-y-1">
              <strong className="block font-bold">Pengelolaan Status Terpusat (PRD Section 3 & 9.8):</strong>
              <p className="text-[#586779]">
                Mengubah status produk di sini secara otomatis memperbarui label status di Seluruh Website (Navbar,
                Homepage, Halaman Detail Produk, dan Footer). Perubahan disimpan secara instan dan tercatat di Audit Log.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-[#E1E7EC] p-6 sm:p-8 shadow-sm space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                          ID: {prod.id} • /{prod.slug}
                        </span>
                        <h3 className="font-extrabold text-xl text-[#142740]">{prod.name}</h3>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold border ${prod.statusBadgeColor}`}>
                        {prod.status}
                      </span>
                    </div>

                    <p className="text-xs text-[#586779]">{prod.shortDesc}</p>

                    {/* Central Product Status Selector */}
                    <div className="space-y-1.5 pt-2 border-t border-[#E1E7EC]">
                      <label className="text-xs font-bold text-[#142740]">Ubah Status Ketersediaan:</label>
                      <select
                        disabled={!canEditConfig}
                        value={prod.status}
                        onChange={(e) => updateProductStatus(prod.slug, e.target.value as ProductStatus)}
                        className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                      >
                        <option value="Tersedia">Tersedia (Commercial Live)</option>
                        <option value="Akses Terbatas / Beta">Akses Terbatas / Beta</option>
                        <option value="Dalam Pengembangan">Dalam Pengembangan</option>
                        <option value="Segera Hadir">Segera Hadir</option>
                      </select>
                    </div>

                    {/* Demo Management (PRD Section 9.8) */}
                    <div className="space-y-2 pt-2 border-t border-[#E1E7EC] text-xs">
                      <span className="font-bold text-[#142740] block">Pengaturan Demo Produk:</span>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Tipe Demo:</label>
                          <select
                            disabled={!canEditConfig}
                            value={prod.demoType}
                            onChange={(e) =>
                              updateProductDemo(prod.slug, e.target.value as DemoType, prod.demoStatus)
                            }
                            className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                          >
                            <option value="interaktif">Interaktif</option>
                            <option value="video">Video Singkat</option>
                            <option value="screenshot">Screenshot Beranotasi</option>
                            <option value="konsep">Konsep Desain</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold block">Status Demo:</label>
                          <select
                            disabled={!canEditConfig}
                            value={prod.demoStatus}
                            onChange={(e) =>
                              updateProductDemo(prod.slug, prod.demoType, e.target.value as DemoStatus)
                            }
                            className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                          >
                            <option value="Published">Published</option>
                            <option value="Review">In Review</option>
                            <option value="Draft">Draft</option>
                            <option value="Temporarily Unavailable">Temporarily Unavailable</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400 pt-1">
                        Owner: {prod.demoOwner} • Terakhir ditinjau: {prod.demoLastReviewed}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E1E7EC] flex items-center justify-between text-xs">
                    <Link
                      href={`/products/${prod.slug}#demo`}
                      target="_blank"
                      className="text-[#00AFC4] font-bold hover:underline flex items-center gap-1"
                    >
                      Buka Demo di Tab Baru <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: RESOURCE CMS & CONTENT WORKFLOW */}
        {/* ======================================================== */}
        {activeTab === 'cms' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-[#142740]">Manajemen Resource & Publikasi</h3>
                <p className="text-xs text-[#586779]">
                  Atur alur publikasi konten: Draf → Review → Scheduled → Diterbitkan → Arsip.
                </p>
              </div>
              <button
                onClick={() => setShowNewResourceModal(true)}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Tulis Konten Baru
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E1E7EC] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBFC] border-b border-[#E1E7EC] text-[#586779] font-bold">
                  <tr>
                    <th className="p-4">Judul Konten & Kategori</th>
                    <th className="p-4">Penulis</th>
                    <th className="p-4">Status Alur</th>
                    <th className="p-4">Tanggal Rilis</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E7EC]">
                  {resources.map((res) => (
                    <tr key={res.id} className="hover:bg-[#FAFBFC]">
                      <td className="p-4 space-y-1">
                        <span className="font-bold text-sm text-[#142740] block">{res.title}</span>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="font-semibold text-[#00AFC4] bg-[#E8F8FA] px-2 py-0.5 rounded">
                            {res.category}
                          </span>
                          <span className="text-slate-400">/{res.slug}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-700">{res.author.name}</td>
                      <td className="p-4">
                        <select
                          disabled={!canPublishContent}
                          value={res.status}
                          onChange={(e) =>
                            updateResource(res.id, { status: e.target.value as ResourceStatus })
                          }
                          className="text-xs font-bold p-1 rounded border border-slate-300 bg-white"
                        >
                          <option value="Published">Published</option>
                          <option value="Review">In Review</option>
                          <option value="Draft">Draft</option>
                          <option value="Scheduled">Scheduled</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </td>
                      <td className="p-4 text-slate-500">{res.publishedAt}</td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/resources/${res.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 text-[11px] font-bold text-slate-700 bg-white border border-[#E1E7EC] hover:bg-[#F2F5F7] rounded-lg transition inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Pratinjau
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: AUDIT TRAIL LOGS */}
        {/* ======================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-[#142740]">Audit Trail Keamanan & Aktivitas</h3>
                <p className="text-xs text-[#586779]">
                  Pencatatan aktivitas sensitif (Login, Pengubahan Role, Update Status Produk, Ekspor Lead).
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E1E7EC] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBFC] border-b border-[#E1E7EC] text-[#586779] font-bold">
                  <tr>
                    <th className="p-4">Waktu (ISO)</th>
                    <th className="p-4">Aksi / Event</th>
                    <th className="p-4">Pengguna & Peran</th>
                    <th className="p-4">Rincian Perubahan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E7EC]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#FAFBFC]">
                      <td className="p-4 font-mono text-[11px] text-slate-400">
                        {log.timestamp.replace('T', ' ').substring(0, 19)}
                      </td>
                      <td className="p-4">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-[#142740] block">{log.actor}</span>
                        <span className="text-[10px] text-slate-400">{log.role}</span>
                      </td>
                      <td className="p-4 text-slate-700">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PRIVACY-SAFE ANALYTICS EVENT STREAM */}
        {/* ======================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-[#142740]">Real-Time Event Stream Demo & Konversi</h3>
                <p className="text-xs text-[#586779]">
                  Event tercatat anonim dari interaksi sentuhan demo dan pengiriman formulir.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E1E7EC] overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBFC] border-b border-[#E1E7EC] text-[#586779] font-bold">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Nama Event</th>
                    <th className="p-4">Produk Terkait</th>
                    <th className="p-4">Keterangan Label</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E7EC]">
                  {analyticsEvents.length > 0 ? (
                    analyticsEvents.map((ev) => (
                      <tr key={ev.id} className="hover:bg-[#FAFBFC]">
                        <td className="p-4 font-mono text-[11px] text-slate-400">
                          {ev.timestamp.replace('T', ' ').substring(0, 19)}
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-[11px] font-bold text-[#00AFC4]">
                            {ev.event}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-[#142740]">{ev.productSlug || '-'}</td>
                        <td className="p-4 text-slate-600">{ev.label || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-slate-400 text-xs">
                        Belum ada event tercatat. Coba buka demo interaktif OCTO Tap atau kirim form demo untuk melihat event muncul di sini!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* LEAD DETAIL & NOTE TIMELINE MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E1E7EC] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E1E7EC] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#00AFC4] uppercase">
                  LEAD ID: {selectedLead.id}
                </span>
                <h3 className="text-xl font-bold text-[#142740]">{selectedLead.fullName}</h3>
                <p className="text-xs text-[#586779]">{selectedLead.companyName} ({selectedLead.companySize})</p>
              </div>
              <button
                onClick={() => setSelectedLeadId(null)}
                className="text-slate-400 hover:text-[#142740] font-bold text-sm"
              >
                ✕ Tutup
              </button>
            </div>

            {/* Lead Meta Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAFBFC] p-4 rounded-xl border border-[#E1E7EC]">
              <div>
                <span className="text-slate-400 block">Email:</span>
                <span className="font-semibold text-[#142740]">{selectedLead.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">WhatsApp:</span>
                <span className="font-semibold text-[#142740]">{selectedLead.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Minat Produk:</span>
                <span className="font-bold text-[#00AFC4]">{selectedLead.productInterest}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Jadwal Diminta:</span>
                <span className="font-semibold text-[#142740]">{selectedLead.preferredDate || 'Segera'}</span>
              </div>
            </div>

            {/* Message */}
            {selectedLead.message && (
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <span className="font-bold text-slate-700 block">Pesan Permintaan Klien:</span>
                <p className="text-slate-600">{selectedLead.message}</p>
              </div>
            )}

            {/* Assignment & Status Change */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tugaskan ke Staf:</label>
                <select
                  disabled={!canManageLeads}
                  value={selectedLead.assignedTo || ''}
                  onChange={(e) => assignLead(selectedLead.id, e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Belum Ditugaskan">Pilih Staf...</option>
                  <option value="Sarah Widjaja (Senior Sales)">Sarah Widjaja (Senior Sales)</option>
                  <option value="Andi Saputra (Account Executive)">Andi Saputra (Account Executive)</option>
                  <option value="Budi Hartono (Partnership Lead)">Budi Hartono (Partnership Lead)</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Status Pipeline:</label>
                <select
                  disabled={!canManageLeads}
                  value={selectedLead.status}
                  onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Baru">Baru</option>
                  <option value="Dihubungi">Dihubungi</option>
                  <option value="Terkualifikasi">Terkualifikasi</option>
                  <option value="Demo Terjadwal">Demo Terjadwal</option>
                  <option value="Selesai">Selesai (Closed)</option>
                  <option value="Tidak Memenuhi">Tidak Memenuhi</option>
                </select>
              </div>
            </div>

            {/* Internal Notes Timeline */}
            <div className="space-y-3 pt-2 border-t border-[#E1E7EC]">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#142740]">
                Catatan Internal Follow-up ({selectedLead.notes.length}):
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedLead.notes.map((n) => (
                  <div key={n.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 border border-slate-200">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-bold text-slate-700">{n.author}</span>
                      <span>{n.createdAt.replace('T', ' ').substring(0, 16)}</span>
                    </div>
                    <p className="text-slate-800">{n.text}</p>
                  </div>
                ))}
                {selectedLead.notes.length === 0 && (
                  <p className="text-xs text-slate-400 italic">Belum ada catatan tindak lanjut.</p>
                )}
              </div>

              {/* Add Note Input */}
              {canManageLeads && (
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Tuliskan catatan hasil telepon atau progres follow-up..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00AFC4]"
                  />
                  <button
                    onClick={() => {
                      if (newNoteText.trim()) {
                        addLeadNote(selectedLead.id, newNoteText.trim(), currentRole);
                        setNewNoteText('');
                      }
                    }}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#142740] hover:bg-[#1E3A5F] rounded-xl transition"
                  >
                    Simpan Catatan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NEW RESOURCE MODAL */}
      {showNewResourceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#E1E7EC] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E1E7EC] pb-3">
              <h3 className="text-lg font-bold text-[#142740]">Tulis Konten / Artikel Baru</h3>
              <button
                onClick={() => setShowNewResourceModal(false)}
                className="text-slate-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateResource} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Judul Konten *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 5 Kesalahan Kasir Saat Meminta Review Google"
                  value={newResourceData.title}
                  onChange={(e) => setNewResourceData({ ...newResourceData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori</label>
                  <select
                    value={newResourceData.category}
                    onChange={(e) =>
                      setNewResourceData({
                        ...newResourceData,
                        category: e.target.value as ResourceCategory,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Artikel">Artikel</option>
                    <option value="Panduan">Panduan</option>
                    <option value="Studi Kasus">Studi Kasus</option>
                    <option value="Materi Unduhan">Materi Unduhan</option>
                    <option value="FAQ">FAQ</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Status Alur</label>
                  <select
                    value={newResourceData.status}
                    onChange={(e) =>
                      setNewResourceData({
                        ...newResourceData,
                        status: e.target.value as ResourceStatus,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  >
                    <option value="Published">Diterbitkan (Published)</option>
                    <option value="Review">Dalam Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Ringkasan Eksekutif *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan 1-2 kalimat untuk preview card..."
                  value={newResourceData.summary}
                  onChange={(e) => setNewResourceData({ ...newResourceData, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Isi Konten Lengkap</label>
                <textarea
                  rows={4}
                  placeholder="Teks isi artikel..."
                  value={newResourceData.content}
                  onChange={(e) => setNewResourceData({ ...newResourceData, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Tags (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={newResourceData.tags}
                  onChange={(e) => setNewResourceData({ ...newResourceData, tags: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewResourceModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00AFC4] text-white font-bold hover:bg-[#0098AB]"
                >
                  Simpan Konten
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
