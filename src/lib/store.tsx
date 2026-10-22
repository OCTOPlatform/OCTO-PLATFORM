'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductItem,
  ProductStatus,
  Lead,
  LeadStatus,
  ResourceItem,
  AuditLog,
  AnalyticsEvent,
  AdminRole,
  CookiePreferences,
  DemoType,
  DemoStatus,
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_RESOURCES,
  INITIAL_LEADS,
  INITIAL_AUDIT_LOGS,
} from './constants';

interface OctoContextType {
  products: ProductItem[];
  updateProductStatus: (slug: string, newStatus: ProductStatus) => void;
  updateProductDemo: (
    slug: string,
    demoType: DemoType,
    demoStatus: DemoStatus
  ) => void;

  leads: Lead[];
  addLead: (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'notes'>) => string;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  assignLead: (leadId: string, assignee: string) => void;
  addLeadNote: (leadId: string, noteText: string, author: string) => void;
  exportLeadsCSV: () => string;

  resources: ResourceItem[];
  addResource: (res: Omit<ResourceItem, 'id' | 'publishedAt' | 'updatedAt'>) => void;
  updateResource: (id: string, updates: Partial<ResourceItem>) => void;

  auditLogs: AuditLog[];
  logAuditAction: (action: string, details: string) => void;

  analyticsEvents: AnalyticsEvent[];
  trackEvent: (event: string, meta?: { productSlug?: string; demoType?: string; label?: string }) => void;

  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;

  cookiePrefs: CookiePreferences;
  setCookiePrefs: (prefs: Partial<CookiePreferences>) => void;
  acceptAllCookies: () => void;
  rejectNonEssentialCookies: () => void;
}

const OctoContext = createContext<OctoContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'octo_products_v2',
  LEADS: 'octo_leads_v2',
  RESOURCES: 'octo_resources_v2',
  AUDIT: 'octo_audit_v2',
  ANALYTICS: 'octo_analytics_v2',
  ROLE: 'octo_admin_role_v2',
  COOKIES: 'octo_cookies_pref_v2',
};

export function OctoProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [resources, setResources] = useState<ResourceItem[]>(INITIAL_RESOURCES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const [currentRole, setCurrentRoleState] = useState<AdminRole>('Super Admin');
  const [cookiePrefs, setCookiePrefsState] = useState<CookiePreferences>({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
    saved: false,
  });

  // Load from LocalStorage once on client mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        const existingSlugs = new Set(parsed.map((p: ProductItem) => p.slug));
        const missing = INITIAL_PRODUCTS.filter((p) => !existingSlugs.has(p.slug));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          setProducts(merged);
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(merged));
        } else {
          setProducts(parsed);
        }
      }

      const savedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);
      if (savedLeads) {
        const parsedLeads = JSON.parse(savedLeads);
        const existingIds = new Set(parsedLeads.map((l: Lead) => l.id));
        const missingLeads = INITIAL_LEADS.filter((l) => !existingIds.has(l.id));
        if (missingLeads.length > 0) {
          const mergedLeads = [...parsedLeads, ...missingLeads];
          setLeads(mergedLeads);
          localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(mergedLeads));
        } else {
          setLeads(parsedLeads);
        }
      }

      const savedRes = localStorage.getItem(STORAGE_KEYS.RESOURCES);
      if (savedRes) setResources(JSON.parse(savedRes));

      const savedAudit = localStorage.getItem(STORAGE_KEYS.AUDIT);
      if (savedAudit) setAuditLogs(JSON.parse(savedAudit));

      const savedAnalytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      if (savedAnalytics) setAnalyticsEvents(JSON.parse(savedAnalytics));

      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (savedRole) setCurrentRoleState(savedRole as AdminRole);

      const savedCookies = localStorage.getItem(STORAGE_KEYS.COOKIES);
      if (savedCookies) setCookiePrefsState(JSON.parse(savedCookies));
    } catch {
      // LocalStorage access fallback (SSR/safe mode)
    }
  }, []);

  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // ignored
    }
  };

  const logAuditAction = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action,
      actor: currentRole === 'Super Admin' ? 'superadmin@octo.id' : `${currentRole.toLowerCase().replace(/[^a-z]/g, '')}@octo.id`,
      role: currentRole,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: '127.0.0.1 (Internal Admin)',
    };
    const updated = [newLog, ...auditLogs];
    setAuditLogs(updated);
    saveToStorage(STORAGE_KEYS.AUDIT, updated);
  };

  const trackEvent = (event: string, meta?: { productSlug?: string; demoType?: string; label?: string }) => {
    // Only track if analytics consent given or essential
    if (cookiePrefs.saved && !cookiePrefs.analytics && event.startsWith('product_')) {
      return;
    }
    const newEv: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      event,
      productSlug: meta?.productSlug,
      demoType: meta?.demoType,
      label: meta?.label,
      timestamp: new Date().toISOString(),
    };
    const updated = [newEv, ...analyticsEvents].slice(0, 100); // keep recent 100
    setAnalyticsEvents(updated);
    saveToStorage(STORAGE_KEYS.ANALYTICS, updated);
  };

  const updateProductStatus = (slug: string, newStatus: ProductStatus) => {
    const updated = products.map((p) => {
      if (p.slug === slug) {
        let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
        if (newStatus === 'Tersedia') badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        else if (newStatus === 'Akses Terbatas / Beta') badgeColor = 'bg-cyan-50 text-cyan-800 border-cyan-200';
        else if (newStatus === 'Dalam Pengembangan') badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
        else if (newStatus === 'Segera Hadir') badgeColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';

        return { ...p, status: newStatus, statusBadgeColor: badgeColor };
      }
      return p;
    });
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
    logAuditAction('PRODUCT_STATUS_UPDATE', `Mengubah status produk ${slug} menjadi "${newStatus}"`);
  };

  const updateProductDemo = (slug: string, demoType: DemoType, demoStatus: DemoStatus) => {
    const updated = products.map((p) => {
      if (p.slug === slug) {
        return {
          ...p,
          demoType,
          demoStatus,
          demoLastReviewed: new Date().toISOString().split('T')[0],
        };
      }
      return p;
    });
    setProducts(updated);
    saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
    logAuditAction('PRODUCT_DEMO_CONFIG_UPDATE', `Mengubah konfigurasi demo ${slug}: Tipe=${demoType}, Status=${demoStatus}`);
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'notes'>): string => {
    const id = `lead-${Date.now().toString().slice(-6)}`;
    const now = new Date().toISOString();
    const newLead: Lead = {
      ...leadData,
      id,
      status: 'Baru',
      notes: [],
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
    trackEvent('form_submit_success', {
      productSlug: leadData.productInterest,
      label: `Form ${leadData.formType}`,
    });
    logAuditAction('NEW_LEAD_SUBMITTED', `Lead baru diterima dari ${leadData.fullName} (${leadData.companyName || 'Individu'}) untuk ${leadData.productInterest}`);
    return id;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status, updatedAt: new Date().toISOString() } : l));
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
    logAuditAction('LEAD_STATUS_CHANGED', `Mengubah status lead ${leadId} menjadi "${status}"`);
  };

  const assignLead = (leadId: string, assignee: string) => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, assignedTo: assignee, updatedAt: new Date().toISOString() } : l));
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
    logAuditAction('LEAD_ASSIGNED', `Menugaskan lead ${leadId} kepada ${assignee}`);
  };

  const addLeadNote = (leadId: string, noteText: string, author: string) => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        const newNote = {
          id: `note-${Date.now()}`,
          author,
          text: noteText,
          createdAt: new Date().toISOString(),
        };
        return {
          ...l,
          notes: [...l.notes, newNote],
          updatedAt: new Date().toISOString(),
        };
      }
      return l;
    });
    setLeads(updated);
    saveToStorage(STORAGE_KEYS.LEADS, updated);
    logAuditAction('LEAD_NOTE_ADDED', `Menambahkan catatan pada lead ${leadId}`);
  };

  const exportLeadsCSV = (): string => {
    // Audit export
    logAuditAction('LEADS_EXPORT_CSV', `Mengekspor ${leads.length} data lead ke CSV`);

    const headers = ['ID', 'Nama Lengkap', 'Email', 'Telepon', 'Perusahaan', 'Ukuran', 'Minat Produk', 'Status', 'Ditugaskan', 'Tipe Form', 'Waktu Masuk'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName.replace(/"/g, '""')}"`,
      l.email,
      `'${l.phone}`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      l.companySize,
      l.productInterest,
      l.status,
      l.assignedTo || 'Belum Ditugaskan',
      l.formType,
      l.createdAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    return csvContent;
  };

  const addResource = (res: Omit<ResourceItem, 'id' | 'publishedAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newRes: ResourceItem = {
      ...res,
      id: `res-${Date.now()}`,
      publishedAt: now.split('T')[0],
      updatedAt: now.split('T')[0],
    };
    const updated = [newRes, ...resources];
    setResources(updated);
    saveToStorage(STORAGE_KEYS.RESOURCES, updated);
    logAuditAction('RESOURCE_CREATED', `Membuat konten baru: "${res.title}"`);
  };

  const updateResource = (id: string, updates: Partial<ResourceItem>) => {
    const updated = resources.map((r) =>
      r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : r
    );
    setResources(updated);
    saveToStorage(STORAGE_KEYS.RESOURCES, updated);
    logAuditAction('RESOURCE_UPDATED', `Memperbarui konten ID ${id}`);
  };

  const setCurrentRole = (role: AdminRole) => {
    setCurrentRoleState(role);
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
    } catch {
      // ignore
    }
    logAuditAction('ROLE_SWITCH', `Beralih peran admin ke ${role}`);
  };

  const setCookiePrefs = (prefs: Partial<CookiePreferences>) => {
    const updated = { ...cookiePrefs, saved: true, ...prefs };
    setCookiePrefsState(updated);
    saveToStorage(STORAGE_KEYS.COOKIES, updated);
  };

  const acceptAllCookies = () => {
    const updated: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      saved: true,
    };
    setCookiePrefsState(updated);
    saveToStorage(STORAGE_KEYS.COOKIES, updated);
  };

  const rejectNonEssentialCookies = () => {
    const updated: CookiePreferences = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      saved: true,
    };
    setCookiePrefsState(updated);
    saveToStorage(STORAGE_KEYS.COOKIES, updated);
  };

  return (
    <OctoContext.Provider
      value={{
        products,
        updateProductStatus,
        updateProductDemo,
        leads,
        addLead,
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
        trackEvent,
        currentRole,
        setCurrentRole,
        cookiePrefs,
        setCookiePrefs,
        acceptAllCookies,
        rejectNonEssentialCookies,
      }}
    >
      {children}
    </OctoContext.Provider>
  );
}

export function useOcto() {
  const context = useContext(OctoContext);
  if (!context) {
    throw new Error('useOcto must be used within an OctoProvider');
  }
  return context;
}
