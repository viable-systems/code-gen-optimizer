export interface Finding {
  title: string;
  severity: 'high' | 'medium' | 'low';
  detail: string;
}

export interface AnalysisResult {
  summary: string;
  findings: Finding[];
  recommendations: string[];
  score: number;
}

export type ToolState = 'idle' | 'analyzing' | 'results' | 'error';
