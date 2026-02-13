import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Code Gen Optimizer',
  description: 'Analyze AI-generated code for quality issues, performance bottlenecks, security vulnerabilities, and adherence to best practices. Optimize code generation prompts and outputs.',
  openGraph: {
    title: 'Code Gen Optimizer',
    description: 'Analyze AI-generated code for quality issues, performance bottlenecks, security vulnerabilities, and adherence to best practices. Optimize code generation prompts and outputs.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Code Gen Optimizer',
    description: 'Analyze AI-generated code for quality issues, performance bottlenecks, security vulnerabilities, and adherence to best practices. Optimize code generation prompts and outputs.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
