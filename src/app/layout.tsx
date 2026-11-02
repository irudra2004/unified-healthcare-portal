import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sanjeevani Care - Unified Hospital Management & OPD Appointment Portal',
  description: 'National unified public and private hospital discovery, doctor roster scheduling, OPD token booking, and health scheme portal for India.',
  keywords: 'Government Hospital OPD, Private Hospital Booking, AIIMS OPD appointment, Ayushman Bharat PMJAY, Find Doctor India, Emergency 108 ambulance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <LanguageProvider>
          <AccessibilityProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </AccessibilityProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
