'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useOcto } from '@/lib/store';
import {
  Users,
  Kanban,
  CalendarCheck,
  BarChart3,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  Building2,
  Tag,
  Filter,
  Search,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Info,
  Check,
  X,
  FileSpreadsheet,
} from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  contactName: string;
  companyName: string;
  value: number;
  stage: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  leadSource: 'OCTO Tap NFC' | 'Formulir Web' | 'WhatsApp' | 'Referral Mitra' | 'Event UMKM';
  owner: string;
  nextTask: string;
  dueDate: string;
  probability: string;
  lostReason?: string;
}

interface TaskItem {
  id: string;
  title: string;
  contactName: string;
  companyName: string;
  dueDate: string;
  status: 'open' | 'completed';
  isOverdue?: boolean;
  priority: 'Tinggi' | 'Sedang' | 'Rendah';
}

interface ContactItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  source: string;
  tags: string[];
  owner: string;
  timeline: {
    id: string;
    date: string;
    type: 'tap' | 'whatsapp' | 'call' | 'proposal' | 'meeting' | 'note';
    title: string;
    description: string;
    actor: string;
  }[];
}

const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    title: 'Paket Custom 8 Unit Akrilik',
    contactName: 'Budi Santoso',
    companyName: 'Kopi Nusantara Group',
    value: 24500000,
    stage: 'new',
    leadSource: 'OCTO Tap NFC',
    owner: 'Sarah Widjaja',
    nextTask: 'Kirim preview mockup kartu & katalog harga',
    dueDate: 'Hari ini',
    probability: '20%',
  },
  {
    id: 'deal-2',
    title: 'Lisensi CRM + 2 Kartu Review Meja',
    contactName: 'drg. Melani Hartono',
    companyName: 'Dental Smile Clinic',
    value: 18000000,
    stage: 'contacted',
    leadSource: 'Formulir Web',
    owner: 'Andi Saputra',
    nextTask: 'Konfirmasi jadwal call demo Zoom',
    dueDate: 'Hari ini, 16:30',
    probability: '40%',
  },
  {
    id: 'deal-3',
    title: 'Pengadaan Kartu 3 Cabang Retail',
    contactName: 'Hendro Kusuma',
    companyName: 'PT Surya Abadi Retail',
    value: 45000000,
    stage: 'qualified',
    leadSource: 'WhatsApp',
    owner: 'Bambang Irawan',
    nextTask: 'Telepon follow-up konfirmasi spesifikasi multi-cabang',
    dueDate: 'Kemarin (Overdue)',
    probability: '60%',
  },
  {
    id: 'deal-4',
    title: 'Pilot Project Resto Kemang & BSD',
    contactName: 'Maya Puspita',
    companyName: 'Kulina Hospitality Group',
    value: 60000000,
    stage: 'proposal',
    leadSource: 'Referral Mitra',
    owner: 'Sarah Widjaja',
    nextTask: 'Review draft proposal dan SLA kartu',
    dueDate: 'Besok, 10:00',
    probability: '75%',
  },
  {
    id: 'deal-5',
    title: 'Annual SaaS CRM Workspace',
    contactName: 'Kevin Tanujaya',
    companyName: 'Aethel Wellness Center',
    value: 35000000,
    stage: 'negotiation',
    leadSource: 'Event UMKM',
    owner: 'Andi Saputra',
    nextTask: 'Negosiasi termin pembayaran lisensi tahunan',
    dueDate: '24 Okt 2026',
    probability: '90%',
  },
  {
    id: 'deal-6',
    title: 'Pengadaan 12 Kartu Tap Medika',
    contactName: 'dr. Farhan Malik',
    companyName: 'Klinik Medika Sejahtera',
    value: 38000000,
    stage: 'won',
    leadSource: 'OCTO Tap NFC',
    owner: 'Sarah Widjaja',
    nextTask: 'Selesai — Pengiriman fisik kartu sedang diproses',
    dueDate: 'Selesai',
    probability: '100%',
  },
  {
    id: 'deal-7',
    title: 'Paket Kartu Resto Senopati',
    contactName: 'Rian Ardiansyah',
    companyName: 'Dapoer Rasa Group',
    value: 34000000,
    stage: 'won',
    leadSource: 'Formulir Web',
    owner: 'Bambang Irawan',
    nextTask: 'Selesai — Akun aktif & training staf selesai',
    dueDate: 'Selesai',
    probability: '100%',
  },
  {
    id: 'deal-8',
    title: 'Integrasi POS Lokal Khusus',
    contactName: 'Alvin Chandra',
    companyName: 'Mega Kopi Box',
    value: 15000000,
    stage: 'lost',
    leadSource: 'WhatsApp',
    owner: 'Andi Saputra',
    nextTask: 'Lost: Klien mencari POS hardware spesifik yang belum didukung di MVP',
    dueDate: 'Ditutup',
    probability: '0%',
    lostReason: 'Fitur integrasi POS legacy di luar ruang lingkup MVP',
  },
];

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Telepon konfirmasi spesifikasi multi-cabang dengan Pak Hendro',
    contactName: 'Hendro Kusuma',
    companyName: 'PT Surya Abadi Retail',
    dueDate: 'Kemarin (17 Okt)',
    status: 'open',
    isOverdue: true,
    priority: 'Tinggi',
  },
  {
    id: 'task-2',
    title: 'Kirim preview mockup kartu custom logo ke Pak Budi',
    contactName: 'Budi Santoso',
    companyName: 'Kopi Nusantara Group',
    dueDate: 'Hari Ini, 14:00',
    status: 'open',
    isOverdue: false,
    priority: 'Tinggi',
  },
  {
    id: 'task-3',
    title: 'Demo online Zoom dengan tim Dental Smile Clinic',
    contactName: 'drg. Melani Hartono',
    companyName: 'Dental Smile Clinic',
    dueDate: 'Hari Ini, 16:30',
    status: 'open',
    isOverdue: false,
    priority: 'Sedang',
  },
  {
    id: 'task-4',
    title: 'Review proposal SLA dan pengadaan kartu Kulina Group',
    contactName: 'Maya Puspita',
    companyName: 'Kulina Hospitality Group',
    dueDate: 'Besok, 10:00',
    status: 'open',
    isOverdue: false,
    priority: 'Sedang',
  },
  {
    id: 'task-5',
    title: 'Kirim invoice & form onboarding fisik Klinik Medika Sejahtera',
    contactName: 'dr. Farhan Malik',
    companyName: 'Klinik Medika Sejahtera',
    dueDate: '22 Okt 2026',
    status: 'completed',
    isOverdue: false,
    priority: 'Rendah',
  },
];

const INITIAL_CONTACTS: ContactItem[] = [
  {
    id: 'c-1',
    name: 'Budi Santoso',
    company: 'Kopi Nusantara Group',
    phone: '0812-9876-5432',
    email: 'budi@kopinusantara.id',
    source: 'OCTO Tap NFC',
    tags: ['F&B', 'VIP', 'Repeat Order'],
    owner: 'Sarah Widjaja',
    timeline: [
      {
        id: 't-1',
        date: '18 Okt 2026, 09:15',
        type: 'tap',
        title: 'Pemindaian Kartu OCTO Tap',
        description: 'Pengunjung memindai kartu OCTO Tap di meja kasir Senopati dan sukarela mengisi kontak form kemitraan.',
        actor: 'Sistem Intake OCTO Tap',
      },
      {
        id: 't-2',
        date: '18 Okt 2026, 10:30',
        type: 'whatsapp',
        title: 'Pesan WhatsApp Terkirim',
        description: 'Sales mengirim salam pengantar dan katalog kartu akrilik resmi OCTO.',
        actor: 'Sarah Widjaja',
      },
      {
        id: 't-3',
        date: '18 Okt 2026, 11:20',
        type: 'note',
        title: 'Catatan Kualifikasi Prospek',
        description: 'Klien tertarik memesan 8 unit kartu kustom dengan logo kafe untuk 4 cabang di BSD & Bintaro.',
        actor: 'Sarah Widjaja',
      },
    ],
  },
  {
    id: 'c-2',
    name: 'drg. Melani Hartono',
    company: 'Dental Smile Clinic',
    phone: '0811-2233-4455',
    email: 'drg.melani@dentalsmile.co.id',
    source: 'Formulir Web',
    tags: ['Healthcare', 'Klinik', 'Hot Lead'],
    owner: 'Andi Saputra',
    timeline: [
      {
        id: 't-4',
        date: '17 Okt 2026, 14:00',
        type: 'meeting',
        title: 'Formulir Konsultasi Masuk',
        description: 'Klien mengisi form konsultasi dari website mencari solusi ulasan Google untuk 2 dokter aktif.',
        actor: 'Form Website',
      },
      {
        id: 't-5',
        date: '17 Okt 2026, 15:20',
        type: 'call',
        title: 'Panggilan Telepon Kualifikasi',
        description: 'Membahas SOP kasir meminta review pasien pasca-treatment. Sangat membutuhkan review positif di wilayah Puri.',
        actor: 'Andi Saputra',
      },
    ],
  },
  {
    id: 'c-3',
    name: 'Hendro Kusuma',
    company: 'PT Surya Abadi Retail',
    phone: '0813-7788-9900',
    email: 'hendro@suryaabadi-retail.com',
    source: 'WhatsApp',
    tags: ['Retail', 'Multi-Cabang'],
    owner: 'Bambang Irawan',
    timeline: [
      {
        id: 't-6',
        date: '16 Okt 2026, 16:00',
        type: 'whatsapp',
        title: 'Inbound WhatsApp Sales',
        description: 'Menanyakan ketersediaan manajemen kartu terpusat untuk 3 cabang toko di Jakarta dan Surabaya.',
        actor: 'Customer Service',
      },
      {
        id: 't-7',
        date: '17 Okt 2026, 10:00',
        type: 'proposal',
        title: 'Draft Penawaran Disiapkan',
        description: 'Mengirim draf estimasi biaya paket 25 kartu tap dan integrasi OCTO Business.',
        actor: 'Bambang Irawan',
      },
    ],
  },
];

const STAGES = [
  { key: 'new', label: 'Prospek Baru', badgeBg: 'bg-slate-100 text-slate-700 border-slate-200' },
  { key: 'contacted', label: 'Dihubungi', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'qualified', label: 'Terkualifikasi', badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
  { key: 'proposal', label: 'Proposal', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'negotiation', label: 'Negosiasi', badgeBg: 'bg-amber-50 text-amber-800 border-amber-200' },
  { key: 'won', label: 'Won (Closing)', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'lost', label: 'Lost (Batal)', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200' },
] as const;

export default function OctoCrmDemo({ className = '' }: { className?: string }) {
  const { trackEvent } = useOcto();
  const [activeTab, setActiveTab] = useState<'kanban' | 'tasks' | 'contacts' | 'reports'>('kanban');
  const [demoMode, setDemoMode] = useState<'interactive' | 'static'>('interactive');

  // Interactive state
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [contacts, setContacts] = useState<ContactItem[]>(INITIAL_CONTACTS);
  const [selectedContact, setSelectedContact] = useState<ContactItem>(INITIAL_CONTACTS[0]);
  const [contactSearch, setContactSearch] = useState('');

  // Modals state
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  // Form states
  const [newContactForm, setNewContactForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    source: 'OCTO Tap NFC',
    dealValue: '15000000',
    tag: 'UMKM',
  });

  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    contactName: INITIAL_CONTACTS[0].name,
    dueDate: 'Hari Ini',
    priority: 'Tinggi' as 'Tinggi' | 'Sedang' | 'Rendah',
  });

  const showNotification = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleResetDemo = () => {
    setDeals(INITIAL_DEALS);
    setTasks(INITIAL_TASKS);
    setContacts(INITIAL_CONTACTS);
    setSelectedContact(INITIAL_CONTACTS[0]);
    showNotification('Data demo berhasil di-reset ke kondisi awal sampel sintetis.');
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-crm',
      demoType: 'interaktif',
      label: 'Reset Demo Data',
    });
  };

  const moveDealStage = (dealId: string, direction: 'forward' | 'backward') => {
    const stageKeys = STAGES.map((s) => s.key);
    setDeals((prev) =>
      prev.map((deal) => {
        if (deal.id !== dealId) return deal;
        const currentIndex = stageKeys.indexOf(deal.stage);
        let nextIndex = currentIndex;
        if (direction === 'forward' && currentIndex < stageKeys.length - 2) {
          nextIndex = currentIndex + 1;
        } else if (direction === 'backward' && currentIndex > 0) {
          nextIndex = currentIndex - 1;
        }
        const updatedStage = stageKeys[nextIndex] as Deal['stage'];
        return { ...deal, stage: updatedStage };
      })
    );
    showNotification(`Status peluang berhasil diperbarui ke tahap berikutnya.`);
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-crm',
      demoType: 'interaktif',
      label: `Move Deal ${dealId} ${direction}`,
    });
  };

  const markDealWon = (dealId: string) => {
    setDeals((prev) =>
      prev.map((d) => (d.id === dealId ? { ...d, stage: 'won', probability: '100%' } : d))
    );
    showNotification('Selamat! Peluang penjualan berhasil ditandai sebagai Won.');
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-crm',
      demoType: 'interaktif',
      label: `Mark Deal Won: ${dealId}`,
    });
  };

  const markDealLost = (dealId: string) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? {
              ...d,
              stage: 'lost',
              probability: '0%',
              lostReason: 'Alasan: Anggaran belum disetujui untuk kuartal ini',
            }
          : d
      )
    );
    showNotification('Peluang ditandai sebagai Lost dengan catatan alasan evaluasi.');
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-crm',
      demoType: 'interaktif',
      label: `Mark Deal Lost: ${dealId}`,
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newStatus = t.status === 'open' ? 'completed' : 'open';
        return { ...t, status: newStatus };
      })
    );
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-crm',
      demoType: 'interaktif',
      label: `Toggle Task Status: ${taskId}`,
    });
  };

  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactForm.name || !newContactForm.company) return;

    const newContactId = `c-${Date.now()}`;
    const newContactObj: ContactItem = {
      id: newContactId,
      name: newContactForm.name,
      company: newContactForm.company,
      phone: newContactForm.phone || '0812-0000-0000',
      email: newContactForm.email || `${newContactForm.name.toLowerCase().replace(/\s+/g, '')}@contoh.id`,
      source: newContactForm.source,
      tags: [newContactForm.tag, 'Inbound Baru'],
      owner: 'Sarah Widjaja',
      timeline: [
        {
          id: `t-${Date.now()}`,
          date: 'Baru saja',
          type: 'tap',
          title: 'Kontak Baru Ditambahkan (Simulasi)',
          description: `Sumber prospek tercatat: ${newContactForm.source}. Siap untuk tahap kualifikasi.`,
          actor: 'Sistem CRM',
        },
      ],
    };

    const newDealObj: Deal = {
      id: `deal-${Date.now()}`,
      title: `Peluang Baru — ${newContactForm.company}`,
      contactName: newContactForm.name,
      companyName: newContactForm.company,
      value: parseInt(newContactForm.dealValue, 10) || 15000000,
      stage: 'new',
      leadSource: newContactForm.source as Deal['leadSource'],
      owner: 'Sarah Widjaja',
      nextTask: 'Jadwalkan panggilan follow-up pertama',
      dueDate: 'Hari Ini',
      probability: '20%',
    };

    setContacts([newContactObj, ...contacts]);
    setSelectedContact(newContactObj);
    setDeals([newDealObj, ...deals]);
    setShowAddContactModal(false);
    setNewContactForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      source: 'OCTO Tap NFC',
      dealValue: '15000000',
      tag: 'UMKM',
    });
    showNotification(`Kontak "${newContactObj.name}" dan peluang baru berhasil masuk ke pipeline!`);
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-crm',
      demoType: 'interaktif',
      label: 'Add Contact and Deal Simulation',
    });
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskForm.title) return;

    const selectedC = contacts.find((c) => c.name === newTaskForm.contactName) || contacts[0];
    const newTaskObj: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskForm.title,
      contactName: selectedC.name,
      companyName: selectedC.company,
      dueDate: newTaskForm.dueDate,
      status: 'open',
      isOverdue: false,
      priority: newTaskForm.priority,
    };

    setTasks([newTaskObj, ...tasks]);
    setShowAddTaskModal(false);
    setNewTaskForm({
      title: '',
      contactName: contacts[0].name,
      dueDate: 'Hari Ini',
      priority: 'Tinggi',
    });
    showNotification(`Tugas "${newTaskObj.title}" berhasil ditambahkan ke jadwal Today.`);
    trackEvent('product_demo_step_complete', {
      productSlug: 'octo-crm',
      demoType: 'interaktif',
      label: 'Add Task Simulation',
    });
  };

  // Metrics calculation
  const openDeals = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost');
  const wonDeals = deals.filter((d) => d.stage === 'won');
  const openPipelineValue = openDeals.reduce((acc, d) => acc + d.value, 0);
  const wonPipelineValue = wonDeals.reduce((acc, d) => acc + d.value, 0);
  const overdueTasksCount = tasks.filter((t) => t.status === 'open' && t.isOverdue).length;

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.company.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(contactSearch.toLowerCase()))
  );

  return (
    <div className={`bg-white rounded-3xl border border-[#E1E7EC] shadow-xl overflow-hidden ${className}`} id="demo">
      {/* Toast Alert */}
      {feedbackToast && (
        <div className="bg-[#142740] text-white text-xs px-4 py-2.5 flex items-center justify-between border-b border-[#00AFC4] animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0" />
            <span>{feedbackToast}</span>
          </div>
          <button onClick={() => setFeedbackToast(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-[#142740] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#1E3A5F]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00AFC4]/20 rounded-xl text-[#00AFC4] border border-[#00AFC4]/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-wide flex items-center gap-2">
              Demo Interaktif: Workspace OCTO CRM
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                Sintetis / Beta
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              Uji alur pengelolaan kontak, pipeline visual Kanban, dan pengingat tugas harian tanpa login.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fallback mode toggle */}
          <button
            onClick={() => setDemoMode(demoMode === 'interactive' ? 'static' : 'interactive')}
            className="px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-lg text-slate-200 border border-white/15 transition flex items-center gap-1.5"
            title="Beralih antara Simulasi Interaktif dan Diagram Statis"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#00AFC4]" />
            {demoMode === 'interactive' ? 'Lihat Diagram Alur' : 'Kembali ke Simulasi'}
          </button>

          <button
            onClick={handleResetDemo}
            className="px-3 py-1.5 text-xs font-semibold bg-[#00AFC4] hover:bg-[#0098AB] text-white rounded-lg transition flex items-center gap-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo
          </button>
        </div>
      </div>

      {/* Proof over Hype Notice */}
      <div className="bg-[#FAFBFC] px-6 py-2 border-b border-[#E1E7EC] flex items-center justify-between text-xs text-[#586779]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-[#142740]">Proof over Hype:</span>
          <span>Seluruh angka, kontak, dan deal di bawah ini adalah data simulasi sintetis untuk ilustrasi alur produk.</span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">Workspace ID: ws_demo_sintetis_01</span>
      </div>

      {demoMode === 'static' ? (
        /* STATIC DIAGRAM FALLBACK MODE (PRD Section 15.2 & Accessibility) */
        <div className="p-8 space-y-8 bg-[#FAFBFC]">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00AFC4]">
              DIAGRAM ARSITEKTUR & ALUR KERJA CRM
            </span>
            <h4 className="text-xl font-bold text-[#142740]">
              Bagaimana Data Mengalir di Dalam OCTO CRM
            </h4>
            <p className="text-xs text-[#586779] leading-relaxed">
              Bagan visual di bawah ini menjelaskan siklus interaksi mulai dari sentuhan fisik pelanggan di kasir
              hingga penutupan transaksi dan evaluasi repeat order di dashboard manajemen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-[#E1E7EC] shadow-sm space-y-3">
              <span className="text-xs font-bold text-[#00AFC4] bg-[#E8F8FA] px-2 py-0.5 rounded">Tahap 1</span>
              <h5 className="font-bold text-sm text-[#142740]">1. Inbound & Intake</h5>
              <p className="text-xs text-[#586779]">
                Pengunjung tap kartu <strong>OCTO Tap</strong> atau mengisi form web. Data kontak tersimpan dengan consent izin komunikasi.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#E1E7EC] shadow-sm space-y-3">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Tahap 2</span>
              <h5 className="font-bold text-sm text-[#142740]">2. Kualifikasi & Pipeline</h5>
              <p className="text-xs text-[#586779]">
                Peluang masuk ke kolom <strong>New</strong>, di-assign ke owner sales, dan dipindahkan sesuai progres negosiasi.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#E1E7EC] shadow-sm space-y-3">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Tahap 3</span>
              <h5 className="font-bold text-sm text-[#142740]">3. Tindak Lanjut Harian</h5>
              <p className="text-xs text-[#586779]">
                Halaman <strong>Today</strong> menampilkan pengingat WhatsApp, panggilan, dan tugas jatuh tempo agar tidak ada lead hilang.
              </p>
            </div>
            <div className="p-5 bg-white rounded-2xl border border-[#E1E7EC] shadow-sm space-y-3">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Tahap 4</span>
              <h5 className="font-bold text-sm text-[#142740]">4. Closing & Retention</h5>
              <p className="text-xs text-[#586779]">
                Deal ditandai <strong>Won</strong>. Terhubung ke <strong>OCTO Loyalty</strong> untuk program apresiasi dan repeat purchase.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E1E7EC] space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#142740]">
              Batasan Privasi & Keamanan (UU Pelindungan Data Pribadi)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#586779]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Tenant Isolation:</strong> Data tiap workspace terisolasi total; tidak ada pembocoran antar bisnis.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00AFC4] shrink-0 mt-0.5" />
                <span><strong>No Data Lock-in:</strong> Pemilik bisnis bebas mengunduh ekspor CSV kapan saja tanpa dipersulit.</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Honest Automation:</strong> Tanpa penyadapan chat pribadi; staf mencatat interaksi resmi secara sah.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE SIMULATION MODE */
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Quick Stats Metric Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAFBFC] border border-[#E1E7EC] space-y-1">
              <span className="text-[11px] font-bold uppercase text-[#586779] flex items-center justify-between">
                Open Pipeline
                <TrendingUp className="w-3.5 h-3.5 text-[#00AFC4]" />
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#142740]">
                Rp {openPipelineValue.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-slate-500">{openDeals.length} peluang aktif berjalan</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFBFC] border border-[#E1E7EC] space-y-1">
              <span className="text-[11px] font-bold uppercase text-emerald-700 flex items-center justify-between">
                Won (Closing)
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-700">
                Rp {wonPipelineValue.toLocaleString('id-ID')}
              </div>
              <p className="text-[11px] text-emerald-600">{wonDeals.length} transaksi berhasil ditutup</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFBFC] border border-[#E1E7EC] space-y-1">
              <span className="text-[11px] font-bold uppercase text-[#586779] flex items-center justify-between">
                Konversi Deal
                <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#142740]">
                28.5%
              </div>
              <p className="text-[11px] text-slate-500">Rasio prospek menjadi Won</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFBFC] border border-[#E1E7EC] space-y-1">
              <span className="text-[11px] font-bold uppercase text-rose-700 flex items-center justify-between">
                Tugas Overdue
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              </span>
              <div className="text-xl sm:text-2xl font-black text-rose-700">
                {overdueTasksCount} Tugas
              </div>
              <p className="text-[11px] text-rose-600">Perlu tindak lanjut segera</p>
            </div>
          </div>

          {/* Nav Tabs for Demo Modules */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E1E7EC] pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTab('kanban');
                  trackEvent('product_demo_step_complete', { productSlug: 'octo-crm', demoType: 'interaktif', label: 'Tab Kanban' });
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'kanban'
                    ? 'bg-[#142740] text-white shadow-sm'
                    : 'bg-[#FAFBFC] text-[#586779] hover:bg-[#F2F5F7]'
                }`}
              >
                <Kanban className="w-4 h-4 text-[#00AFC4]" />
                Visual Pipeline Kanban ({deals.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('tasks');
                  trackEvent('product_demo_step_complete', { productSlug: 'octo-crm', demoType: 'interaktif', label: 'Tab Today Tasks' });
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'tasks'
                    ? 'bg-[#142740] text-white shadow-sm'
                    : 'bg-[#FAFBFC] text-[#586779] hover:bg-[#F2F5F7]'
                }`}
              >
                <CalendarCheck className="w-4 h-4 text-emerald-400" />
                Tugas Hari Ini (Today) ({tasks.filter((t) => t.status === 'open').length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('contacts');
                  trackEvent('product_demo_step_complete', { productSlug: 'octo-crm', demoType: 'interaktif', label: 'Tab Contacts' });
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'contacts'
                    ? 'bg-[#142740] text-white shadow-sm'
                    : 'bg-[#FAFBFC] text-[#586779] hover:bg-[#F2F5F7]'
                }`}
              >
                <Users className="w-4 h-4 text-indigo-400" />
                Database Kontak & Timeline ({contacts.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('reports');
                  trackEvent('product_demo_step_complete', { productSlug: 'octo-crm', demoType: 'interaktif', label: 'Tab Reports' });
                }}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === 'reports'
                    ? 'bg-[#142740] text-white shadow-sm'
                    : 'bg-[#FAFBFC] text-[#586779] hover:bg-[#F2F5F7]'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-amber-400" />
                Laporan & Sumber Prospek
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddContactModal(true)}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl shadow-sm transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Simulasi Tambah Kontak
              </button>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="px-3.5 py-1.5 text-xs font-bold text-[#142740] bg-white hover:bg-[#FAFBFC] border border-[#E1E7EC] rounded-xl transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#00AFC4]" />
                Simulasi Tambah Task
              </button>
            </div>
          </div>

          {/* TAB 1: KANBAN PIPELINE */}
          {activeTab === 'kanban' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#586779]">
                <span>
                  Geser kartu peluang ke tahap berikutnya atau tandai Won/Lost untuk menyimulasikan siklus penjualan tim Anda.
                </span>
                <span className="italic">Urutan tahap: New → Contacted → Qualified → Proposal → Negotiation → Won / Lost</span>
              </div>

              {/* Kanban Scrollable Board */}
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-[1100px]">
                  {STAGES.map((col) => {
                    const colDeals = deals.filter((d) => d.stage === col.key);
                    const colTotal = colDeals.reduce((sum, d) => sum + d.value, 0);

                    return (
                      <div
                        key={col.key}
                        className="w-72 shrink-0 bg-[#FAFBFC] rounded-2xl border border-[#E1E7EC] p-3.5 flex flex-col justify-between"
                      >
                        {/* Column Header */}
                        <div className="space-y-1.5 pb-3 border-b border-[#E1E7EC]">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${col.badgeBg}`}>
                              {col.label}
                            </span>
                            <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              {colDeals.length}
                            </span>
                          </div>
                          <div className="text-[11px] font-semibold text-[#586779]">
                            Rp {colTotal.toLocaleString('id-ID')}
                          </div>
                        </div>

                        {/* Deals in Column */}
                        <div className="py-3 space-y-3 flex-1 min-h-[220px]">
                          {colDeals.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400">
                              Tidak ada deal di tahap ini
                            </div>
                          ) : (
                            colDeals.map((deal) => (
                              <div
                                key={deal.id}
                                className="bg-white rounded-xl border border-[#E1E7EC] p-3.5 shadow-xs hover:shadow-md transition space-y-2.5"
                              >
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-[#00AFC4] bg-[#E8F8FA] px-2 py-0.5 rounded">
                                      {deal.leadSource}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-500">
                                      {deal.probability}
                                    </span>
                                  </div>
                                  <h5 className="font-bold text-xs text-[#142740] leading-tight">
                                    {deal.title}
                                  </h5>
                                  <p className="text-[11px] text-[#586779] font-medium">
                                    {deal.contactName} • {deal.companyName}
                                  </p>
                                </div>

                                <div className="text-xs font-black text-[#142740]">
                                  Rp {deal.value.toLocaleString('id-ID')}
                                </div>

                                {/* Next Task preview */}
                                <div className="p-2 bg-[#FAFBFC] rounded-lg border border-slate-100 text-[10px] text-slate-600 flex items-start gap-1.5">
                                  <Clock className="w-3 h-3 text-[#00AFC4] shrink-0 mt-0.5" />
                                  <span className="line-clamp-2">
                                    <strong>Task:</strong> {deal.nextTask} ({deal.dueDate})
                                  </span>
                                </div>

                                {deal.lostReason && (
                                  <div className="p-2 bg-rose-50 rounded-lg text-[10px] text-rose-800">
                                    {deal.lostReason}
                                  </div>
                                )}

                                {/* Interactive Transition Controls */}
                                <div className="pt-2 border-t border-[#E1E7EC] flex items-center justify-between gap-1 text-[11px]">
                                  <button
                                    onClick={() => moveDealStage(deal.id, 'backward')}
                                    disabled={col.key === 'new' || col.key === 'won' || col.key === 'lost'}
                                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 transition"
                                    title="Mundur ke tahap sebelumnya"
                                  >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                  </button>

                                  {col.key !== 'won' && col.key !== 'lost' && (
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => markDealWon(deal.id)}
                                        className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200"
                                      >
                                        Won
                                      </button>
                                      <button
                                        onClick={() => markDealLost(deal.id)}
                                        className="px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[10px] font-bold border border-rose-200"
                                      >
                                        Lost
                                      </button>
                                    </div>
                                  )}

                                  <button
                                    onClick={() => moveDealStage(deal.id, 'forward')}
                                    disabled={col.key === 'negotiation' || col.key === 'won' || col.key === 'lost'}
                                    className="p-1 text-[#00AFC4] hover:text-[#0098AB] disabled:opacity-20 transition"
                                    title="Maju ke tahap berikutnya"
                                  >
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TODAY & TASKS */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#586779]">
                <div>
                  <h4 className="text-sm font-bold text-[#142740]">Daftar Tugas Harian Tim (Action over Administration)</h4>
                  <p>Fokuskan staf pada aktivitas dengan prioritas tertinggi untuk memastikan tidak ada prospek yang terlantar.</p>
                </div>
                <button
                  onClick={() => setShowAddTaskModal(true)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Buat Tugas Baru
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                      task.status === 'completed'
                        ? 'bg-[#FAFBFC] border-slate-200 opacity-60'
                        : task.isOverdue
                        ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                        : 'bg-white border-[#E1E7EC] hover:border-[#00AFC4] shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                          task.status === 'completed'
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 hover:border-[#00AFC4]'
                        }`}
                      >
                        {task.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold ${
                              task.status === 'completed' ? 'line-through text-slate-400' : 'text-[#142740]'
                            }`}
                          >
                            {task.title}
                          </span>
                          {task.isOverdue && task.status === 'open' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                              Terlambat
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#586779]">
                          Terkait: <strong className="text-slate-700">{task.contactName}</strong> ({task.companyName})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          task.priority === 'Tinggi'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : task.priority === 'Sedang'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CONTACTS & TIMELINE */}
          {activeTab === 'contacts' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact List */}
              <div className="space-y-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Cari kontak, perusahaan, atau tag..."
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        setSelectedContact(contact);
                        trackEvent('product_demo_step_complete', { productSlug: 'octo-crm', demoType: 'interaktif', label: `Select Contact ${contact.name}` });
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition space-y-1.5 ${
                        selectedContact.id === contact.id
                          ? 'border-[#00AFC4] bg-[#E8F8FA]'
                          : 'border-[#E1E7EC] bg-white hover:bg-[#FAFBFC]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs text-[#142740]">{contact.name}</h5>
                        <span className="text-[10px] text-slate-500 font-medium">{contact.source}</span>
                      </div>
                      <p className="text-[11px] text-[#586779]">{contact.company}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {contact.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Contact Profile & Interactive Timeline */}
              <div className="lg:col-span-2 bg-[#FAFBFC] rounded-2xl border border-[#E1E7EC] p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E7EC]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00AFC4]">
                      Profil Hubungan Pelanggan
                    </span>
                    <h4 className="text-xl font-black text-[#142740]">{selectedContact.name}</h4>
                    <p className="text-xs text-[#586779] flex items-center gap-2 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" /> {selectedContact.company} • Penanggung Jawab: {selectedContact.owner}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-3 py-1 bg-white rounded-lg border border-[#E1E7EC] text-slate-700 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-[#00AFC4]" /> {selectedContact.phone}
                    </span>
                    <span className="px-3 py-1 bg-white rounded-lg border border-[#E1E7EC] text-slate-700 flex items-center gap-1.5 font-medium">
                      <Mail className="w-3.5 h-3.5 text-indigo-500" /> {selectedContact.email}
                    </span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#142740]">
                      Riwayat Interaksi (Contact Timeline)
                    </h5>
                    <button
                      onClick={() => showNotification('Simulasi: Catatan interaksi baru telah direkam ke timeline pelanggan.')}
                      className="text-xs text-[#00AFC4] font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Catatan Interaksi
                    </button>
                  </div>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {selectedContact.timeline.map((event) => (
                      <div key={event.id} className="relative space-y-1">
                        <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#00AFC4] border-2 border-white ring-2 ring-cyan-100" />
                        <div className="flex items-center justify-between text-[11px]">
                          <strong className="text-[#142740]">{event.title}</strong>
                          <span className="text-slate-400">{event.date}</span>
                        </div>
                        <p className="text-xs text-[#586779] bg-white p-3 rounded-xl border border-[#E1E7EC]">
                          {event.description}
                        </p>
                        <span className="text-[10px] text-slate-400">Dicatat oleh: {event.actor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REPORTS & PIPELINE ANALYTICS */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="max-w-2xl space-y-1">
                <h4 className="text-sm font-bold text-[#142740]">Laporan Konversi & Analisis Saluran Prospek</h4>
                <p className="text-xs text-[#586779]">
                  Ketahui kanal mana yang paling berkontribusi terhadap prospek baru dan di mana bottleneck proses penjualan terjadi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lead Source Breakdown */}
                <div className="p-6 rounded-2xl bg-[#FAFBFC] border border-[#E1E7EC] space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#142740]">
                    Distribusi Sumber Prospek (Lead Sources)
                  </h5>
                  <div className="space-y-3">
                    {[
                      { source: 'OCTO Tap NFC (Kasir Toko Fisik)', pct: 42, count: 18, color: 'bg-[#00AFC4]' },
                      { source: 'Formulir Website & Landing Page', pct: 28, count: 12, color: 'bg-indigo-500' },
                      { source: 'Inbound WhatsApp Sales', pct: 18, count: 8, color: 'bg-emerald-500' },
                      { source: 'Referral Rekanan & Kemitraan', pct: 12, count: 5, color: 'bg-amber-500' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="font-semibold">{item.source}</span>
                          <span className="text-slate-500">{item.count} prospek ({item.pct}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pipeline Funnel Health */}
                <div className="p-6 rounded-2xl bg-[#FAFBFC] border border-[#E1E7EC] space-y-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#142740]">
                    Efektivitas Tahap Penjualan (Funnel Health)
                  </h5>
                  <div className="space-y-3 text-xs text-[#586779]">
                    <div className="p-3 bg-white rounded-xl border border-[#E1E7EC] flex items-center justify-between">
                      <div>
                        <strong className="text-[#142740] block">New → Qualified</strong>
                        <span>Rata-rata waktu: 1.8 hari kerja</span>
                      </div>
                      <span className="font-black text-[#00AFC4] text-sm">76% Lolos</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E1E7EC] flex items-center justify-between">
                      <div>
                        <strong className="text-[#142740] block">Proposal → Won</strong>
                        <span>Rata-rata waktu: 4.5 hari kerja</span>
                      </div>
                      <span className="font-black text-emerald-600 text-sm">54% Closing</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E1E7EC] flex items-center justify-between">
                      <div>
                        <strong className="text-[#142740] block">Lost Reasons Terbanyak</strong>
                        <span>Anggaran kuartal & fitur integrasi khusus</span>
                      </div>
                      <span className="font-black text-rose-600 text-sm">2 Deal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL: Tambah Kontak Baru (Simulasi) */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#E1E7EC]">
            <div className="flex items-center justify-between border-b border-[#E1E7EC] pb-3">
              <div>
                <h4 className="font-extrabold text-base text-[#142740]">Simulasi Tambah Kontak Baru</h4>
                <p className="text-xs text-[#586779]">Uji cara sistem merekam prospek dan menempatkannya ke pipeline.</p>
              </div>
              <button onClick={() => setShowAddContactModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Gita Prameswari"
                    value={newContactForm.name}
                    onChange={(e) => setNewContactForm({ ...newContactForm, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Perusahaan / Toko *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Gita Cake & Bakery"
                    value={newContactForm.company}
                    onChange={(e) => setNewContactForm({ ...newContactForm, company: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Nomor Telepon</label>
                  <input
                    type="text"
                    placeholder="0812-3456-7890"
                    value={newContactForm.phone}
                    onChange={(e) => setNewContactForm({ ...newContactForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email Bisnis</label>
                  <input
                    type="email"
                    placeholder="gita@gitacake.com"
                    value={newContactForm.email}
                    onChange={(e) => setNewContactForm({ ...newContactForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sumber Prospek (Lead Source)</label>
                  <select
                    value={newContactForm.source}
                    onChange={(e) => setNewContactForm({ ...newContactForm, source: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  >
                    <option value="OCTO Tap NFC">OCTO Tap NFC (Scan Kasir)</option>
                    <option value="Formulir Web">Formulir Web</option>
                    <option value="WhatsApp">Inbound WhatsApp</option>
                    <option value="Referral Mitra">Referral Rekanan</option>
                    <option value="Event UMKM">Event UMKM</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Estimasi Nilai Peluang (Rp)</label>
                  <input
                    type="number"
                    value={newContactForm.dealValue}
                    onChange={(e) => setNewContactForm({ ...newContactForm, dealValue: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition shadow-sm"
                >
                  Simpan Kontak & Peluang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Tambah Task / Reminder Baru */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#E1E7EC]">
            <div className="flex items-center justify-between border-b border-[#E1E7EC] pb-3">
              <div>
                <h4 className="font-extrabold text-base text-[#142740]">Simulasi Buat Tugas / Follow-Up</h4>
                <p className="text-xs text-[#586779]">Jadwalkan pengingat kerja untuk tim penjualan.</p>
              </div>
              <button onClick={() => setShowAddTaskModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTaskSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Judul Tindak Lanjut *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kirim draf kontrak revisi"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Hubungkan ke Kontak</label>
                <select
                  value={newTaskForm.contactName}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, contactName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                >
                  {contacts.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} — {c.company}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tenggat Waktu</label>
                  <select
                    value={newTaskForm.dueDate}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, dueDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  >
                    <option value="Hari Ini">Hari Ini</option>
                    <option value="Besok">Besok</option>
                    <option value="Minggu Depan">Minggu Depan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Prioritas</label>
                  <select
                    value={newTaskForm.priority}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, priority: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#E1E7EC] bg-[#FAFBFC] focus:bg-white focus:outline-none focus:border-[#00AFC4]"
                  >
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition shadow-sm"
                >
                  Tambahkan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer CTA in Demo Box */}
      <div className="bg-[#FAFBFC] px-6 sm:px-8 py-5 border-t border-[#E1E7EC] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#586779] text-center sm:text-left">
          Ingin berkonsultasi mengenai migrasi database dari spreadsheet ke OCTO CRM?
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/consultation?product=octo-crm"
            className="px-4 py-2 text-xs font-bold text-[#142740] bg-white hover:bg-[#F2F5F7] border border-[#E1E7EC] rounded-xl transition shadow-xs"
          >
            Konsultasi Setup CRM
          </Link>
          <Link
            href="/request-demo?product=octo-crm"
            className="px-5 py-2 text-xs font-bold text-white bg-[#00AFC4] hover:bg-[#0098AB] rounded-xl transition shadow-sm flex items-center gap-1.5"
          >
            Minta Demo Tim Sales <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
