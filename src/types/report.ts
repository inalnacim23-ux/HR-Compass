export interface DiagnosticReport {
  sessionId: string;
  organizationName: string;
  generatedAt: string;
  language: 'fr' | 'en';
  content: string;
}

export interface ReportSection {
  title: string;
  content: string;
}
