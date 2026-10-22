export type ProductStatus = 'Tersedia' | 'Akses Terbatas / Beta' | 'Dalam Pengembangan' | 'Segera Hadir';

export type DemoType = 'interaktif' | 'video' | 'screenshot' | 'konsep';

export type DemoStatus = 'Published' | 'Review' | 'Draft' | 'Temporarily Unavailable' | 'Archived';

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  status: ProductStatus;
  statusBadgeColor: string;
  targetAudience: string[];
  keyProblems: string[];
  keyBenefits: string[];
  features: {
    title: string;
    description: string;
    status: 'Tersedia' | 'Beta' | 'Pengembangan';
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  useCases: {
    industry: string;
    scenario: string;
    outcome: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  demoType: DemoType;
  demoStatus: DemoStatus;
  demoTitle: string;
  demoSubtitle: string;
  demoLastReviewed: string;
  demoOwner: string;
  relatedProductSlugs: string[];
}

export type LeadStatus = 'Baru' | 'Dihubungi' | 'Terkualifikasi' | 'Demo Terjadwal' | 'Selesai' | 'Tidak Memenuhi';

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  companySize: string;
  productInterest: string; // 'octo-tap' | 'octo-insights' | 'octo-loyalty' | 'octo-business' | 'octo-crm' | 'partner' | 'general'
  formType: 'request-demo' | 'consultation' | 'contact' | 'partner-apply' | 'newsletter';
  message?: string;
  preferredDate?: string;
  partnerType?: string;
  location?: string;
  status: LeadStatus;
  assignedTo?: string;
  notes: {
    id: string;
    author: string;
    text: string;
    createdAt: string;
  }[];
  utmSource?: string;
  utmCampaign?: string;
  consentGiven: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ResourceCategory = 'Artikel' | 'Panduan' | 'Studi Kasus' | 'FAQ' | 'Materi Unduhan' | 'Pembaruan';

export type ResourceStatus = 'Draft' | 'Review' | 'Scheduled' | 'Published' | 'Archived';

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: ResourceCategory;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
  status: ResourceStatus;
  publishedAt: string;
  updatedAt: string;
  downloadUrl?: string;
  downloadSize?: string;
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export type AdminRole = 'Super Admin' | 'Admin' | 'Editor/Approver' | 'Author' | 'Sales/Lead Manager';

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  role: AdminRole;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface AnalyticsEvent {
  id: string;
  event: string; // 'product_view' | 'CTA_click' | 'product_demo_view' | 'product_demo_start' | 'product_demo_step_complete' | 'product_demo_complete' | 'form_submit_success'
  productSlug?: string;
  demoType?: string;
  label?: string;
  timestamp: string;
}

export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  saved: boolean;
}
