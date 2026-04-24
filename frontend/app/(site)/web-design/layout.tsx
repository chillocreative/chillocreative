import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reka Website Profesional | Chillo Creative — Web Design Malaysia',
  description:
    'Website berprestasi tinggi untuk bisnes Malaysia. Direka untuk convert, laju seperti kilat, dan dibina untuk pasaran tempatan. Tempah audit percuma hari ini.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    title: 'Website Yang Datangkan Pelanggan | Chillo Creative',
    description:
      'Kami reka dan bina website berprestasi tinggi untuk bisnes Malaysia. Tempah audit website percuma.',
    type: 'website',
    locale: 'ms_MY',
  },
};

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return <div lang="ms">{children}</div>;
}
