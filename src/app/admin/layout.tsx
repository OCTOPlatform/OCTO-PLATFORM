import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Internal Admin Portal | OCTO Platform',
  description: 'Portal manajemen internal dan konfigurasi konten OCTO Platform.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
