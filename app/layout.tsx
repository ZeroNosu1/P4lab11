import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ระบบรับสมัครนักเรียน',
  description: 'ระบบจัดการการรับสมัครนักเรียน',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white relative overflow-hidden`}
      >
        {/* เอฟเฟกต์ background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="w-[700px] h-[700px] bg-blue-600/30 rounded-full blur-3xl absolute -top-40 -left-40 animate-pulse"></div>
          <div className="w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl absolute bottom-0 right-0 animate-pulse delay-500"></div>
        </div>

        {/* overlay เส้น grid hologram */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(transparent_95%,rgba(255,255,255,0.05)_96%),linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.05)_96%)] bg-[size:40px_40px]"></div>

        {children}
      </body>
    </html>
  );
}
