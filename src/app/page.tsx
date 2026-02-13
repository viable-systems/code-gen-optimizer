import Link from 'next/link';
import { Sparkles, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-sm tracking-tight">Code Gen Optimizer</span>
          <Link
            href="/tool"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            Open Tool
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--muted)] mb-6">
            <Sparkles size={12} className="text-[var(--accent)]" />
            AI-Powered Analysis Tool
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-5">
            Code Gen Optimizer
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-xl mx-auto mb-10 leading-relaxed">
            Analyze AI-generated code for quality issues, performance bottlenecks, security vulnerabilities, and adherence to best practices. Optimize code generation prompts and outputs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
            >
              Try It Free
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://github.com/viable-systems"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-6 py-3 text-base font-medium text-[var(--fg)] hover:bg-[var(--card)] transition-colors"
            >
              View Source
            </a>
          </div>
        </div>
      </header>

      {/* How It Works */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { step: '01', icon: Zap, title: 'Paste Your Content', desc: 'Drop in your text, logs, data, or content for analysis.' },
            { step: '02', icon: Sparkles, title: 'AI Analyzes', desc: 'Claude processes your input and identifies key insights and patterns.' },
            { step: '03', icon: BarChart3, title: 'Get Results', desc: 'Receive structured findings with severity ratings, a score, and actionable recommendations.' },
          ].map((item) => (
            <div key={item.step} className="relative text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950 mb-5">
                <item.icon size={24} className="text-[var(--accent)]" />
              </div>
              <div className="absolute top-2 right-2 text-xs font-mono text-[var(--border)] font-bold">{item.step}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="text-2xl font-bold mb-10 text-center">Features</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="font-medium text-sm">Code quality analysis</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="font-medium text-sm">Performance bottleneck detection</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="font-medium text-sm">Security vulnerability scanning</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="font-medium text-sm">Best practices compliance</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="font-medium text-sm">Prompt optimization suggestions</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"><p className="font-medium text-sm">Refactoring recommendations</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-10">
          <Shield size={32} className="text-[var(--accent)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">Get started with Code Gen Optimizer — paste your content and get AI-powered insights in seconds.</p>
          <Link
            href="/tool"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            Launch Tool
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
        <p>
          Built autonomously by{' '}
          <a href="https://github.com/viable-systems" className="text-[var(--accent)] hover:underline">
            VAOS
          </a>
          {' '}&mdash; Viable Autonomous Operating System
        </p>
      </footer>
    </div>
  );
}
