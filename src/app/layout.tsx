import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AiChatWidget from '@/components/chat/AiChatWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bin Misal Travels | Licensed Saudi Arabia Expat & Travel Services',
  description:
    'Leading travel agency and expatriate corporate services in Saudi Arabia. Specializing in Umrah visas, flight ticketing, Passport Malumat, MISA investor licensing, and Qiwa labor transfers in Riyadh, Dammam, Madinah, and Jeddah.',
  keywords: [
    'Bin Misal Travels',
    'Saudi Arabia Travel Agency',
    'Passport Malumat',
    'Umrah Visa Saudi',
    'MISA Investor License',
    'Qiwa Labor Transfer',
    'Riyadh Batha Travel',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AiChatWidget />
      </body>
    </html>
  );
}
