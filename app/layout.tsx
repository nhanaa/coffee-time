import '../styles/globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Navbar from '../components/Navbar';

const open_sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coffee Time',
  description: 'Coffee Time App Simulating a Coffee Machine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
