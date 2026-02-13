'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
} from 'lucide-react';
import type { AnalysisResult, Finding, ToolState } from '@/lib/types';

function SeverityBadge({ severity }: { severity: Finding['severity'] }) {
  const styles: Record<string, string> = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${styles[severity]}`}>
      {severity}
    </span>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500';
  const label =
    score >= 80 ? 'Excellent' : score >= 60 ? 'Needs Attention' : 'Critical';
  return (
    <div>
      <div className="flex items-end gap-3 mb-2">
        <span className="text-4xl font-bold tabular-nums">{score}</span>
        <span className="text-sm text-[var(--muted)] pb-1">/ 100 &mdash; {label}</span>
      </div>
      <div className="h-2.5 rounded-full bg-[var(--border)] overflow-hidden">
        <div
          className={`h-full rounded-full ${color} animate-score-fill`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function FindingCard({ finding, index }: { finding: Finding; index: number }) {
  const [expanded, setExpanded] = useState(index < 3);
  return (
    <div
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-[var(--bg)] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <SeverityBadge severity={finding.severity} />
          <span className="font-medium text-sm truncate">{finding.title}</span>
        </div>
        {expanded ? <ChevronUp size={16} className="text-[var(--muted)] shrink-0" /> : <ChevronDown size={16} className="text-[var(--muted)] shrink-0" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm text-[var(--muted)] leading-relaxed">{finding.detail}</p>
        </div>
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy results'}
    </button>
  );
}

export default function ToolPage() {
  const [input, setInput] = useState('');
  const [state, setState] = useState<ToolState>('idle');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState(0);

  const phases = [
    'Parsing input...',
    'Running analysis...',
    'Identifying patterns...',
    'Generating insights...',
    'Compiling results...',
  ];

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setState('analyzing');
    setError('');
    setResult(null);
    setPhase(0);

    const interval = setInterval(() => {
      setPhase((p) => Math.min(p + 1, phases.length - 1));
    }, 1200);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      clearInterval(interval);

      if (!res.ok) {
        setError(data.error || 'Analysis failed');
        setState('error');
        return;
      }

      setResult(data);
      setState('results');
    } catch (err: unknown) {
      clearInterval(interval);
      const message = err instanceof Error ? err.message : 'Network error';
      setError(message);
      setState('error');
    }
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setState('idle');
    setError('');
    setPhase(0);
  };

  const resultText = result
    ? `Score: ${result.score}/100\n\n${result.summary}\n\nFindings:\n${result.findings.map((f) => `[${f.severity.toUpperCase()}] ${f.title}: ${f.detail}`).join('\n')}\n\nRecommendations:\n${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}`
    : '';

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <header className="border-b border-[var(--border)] bg-[var(--card)] shrink-0">
        <div className="mx-auto max-w-7xl px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
            <span className="text-[var(--border)]">/</span>
            <span className="text-sm font-semibold">Analysis Tool</span>
          </div>
          <div className="flex items-center gap-3">
            {result && <CopyButton text={resultText} />}
            {state === 'results' && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                <RotateCcw size={14} />
                New
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Input pane */}
        <div className="w-full md:w-[420px] md:min-w-[380px] border-b md:border-b-0 md:border-r border-[var(--border)] flex flex-col bg-[var(--card)]">
          <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
              Input
            </h2>
            <span className="text-[10px] text-[var(--muted)] tabular-nums">
              {input.length.toLocaleString()} chars
            </span>
          </div>
          <div className="flex-1 p-3 min-h-0">
            <textarea
              className="w-full h-full min-h-[180px] md:min-h-0 resize-none rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent placeholder:text-[var(--muted)] transition-shadow custom-scrollbar"
              placeholder="Paste your code, configuration, logs, or security report here for analysis..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={state === 'analyzing'}
              autoFocus
            />
          </div>
          <div className="p-3 border-t border-[var(--border)]">
            <button
              onClick={handleAnalyze}
              disabled={!input.trim() || state === 'analyzing'}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {state === 'analyzing' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Output pane */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Idle state */}
          {state === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950 flex items-center justify-center mb-5">
                <BarChart3 size={28} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
              <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">
                Paste your content in the input panel and click Analyze to get
                AI-powered insights, findings, and actionable recommendations.
              </p>
            </div>
          )}

          {/* Analyzing state */}
          {state === 'analyzing' && (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 rounded-2xl border-2 border-[var(--accent)] flex items-center justify-center mb-8">
                <Sparkles size={32} className="text-[var(--accent)] animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{phases[phase]}</h3>
              <p className="text-xs text-[var(--muted)] mb-6">
                Step {phase + 1} of {phases.length}
              </p>
              <div className="w-64 h-2 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-700 ease-out"
                  style={{ width: `${((phase + 1) / phases.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Error state */}
          {state === 'error' && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-5">
                <AlertTriangle size={28} className="text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analysis Failed</h3>
              <p className="text-sm text-[var(--muted)] max-w-sm mb-6">{error}</p>
              <button
                onClick={() => setState('idle')}
                className="text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Results state */}
          {state === 'results' && result && (
            <div className="p-5 md:p-8 space-y-6 max-w-3xl">
              {/* Score */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 animate-fade-up">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-4">
                  Overall Score
                </h3>
                <ScoreGauge score={result.score} />
              </div>

              {/* Summary */}
              <div
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 animate-fade-up"
                style={{ animationDelay: '80ms' }}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                  Summary
                </h3>
                <p className="text-sm leading-relaxed">{result.summary}</p>
              </div>

              {/* Findings */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                    Findings ({result.findings.length})
                  </h3>
                  <div className="flex gap-3 text-[10px] text-[var(--muted)]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      {result.findings.filter((f) => f.severity === 'high').length} high
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {result.findings.filter((f) => f.severity === 'medium').length} med
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      {result.findings.filter((f) => f.severity === 'low').length} low
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  {result.findings.map((f, i) => (
                    <FindingCard key={i} finding={f} index={i} />
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 animate-fade-up"
                style={{ animationDelay: `${(result.findings.length + 2) * 80}ms` }}
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-4">
                  Recommendations
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-500 mt-0.5 shrink-0"
                      />
                      <span className="leading-relaxed">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-center text-[var(--muted)] pt-2">
                Analysis powered by Claude AI. Results are suggestions &mdash;
                always verify with domain experts.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
