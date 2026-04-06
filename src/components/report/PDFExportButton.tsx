'use client';

interface Props {
  reportText: string;
  orgName: string;
  lang: 'fr' | 'en';
}

// ——— Inline markdown → HTML ———
function inline(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  let html = '';
  let inUl = false;
  let inOl = false;
  const tableBuf: string[][] = [];

  function closeList() {
    if (inUl) { html += '</ul>\n'; inUl = false; }
    if (inOl) { html += '</ol>\n'; inOl = false; }
  }

  function flushTable() {
    if (!tableBuf.length) return;
    const rows = tableBuf.filter((r) => !r.every((c) => /^[-:\s]+$/.test(c)));
    if (!rows.length) { tableBuf.length = 0; return; }
    const [head, ...body] = rows;
    let t = '<table><thead><tr>';
    head.forEach((c) => { t += `<th>${inline(c)}</th>`; });
    t += '</tr></thead><tbody>';
    body.forEach((row) => {
      t += '<tr>';
      row.forEach((c) => { t += `<td>${inline(c)}</td>`; });
      t += '</tr>';
    });
    t += '</tbody></table>\n';
    html += t;
    tableBuf.length = 0;
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Table row
    if (line.startsWith('|') && line.endsWith('|')) {
      closeList();
      tableBuf.push(line.slice(1, -1).split('|').map((c) => c.trim()));
      continue;
    }
    flushTable();

    const trimmed = line.trim();
    if (!trimmed) { closeList(); html += '<br>\n'; continue; }
    if (/^-{3,}$/.test(trimmed) || /^\*{3,}$/.test(trimmed)) { closeList(); html += '<hr>\n'; continue; }
    if (line.startsWith('## '))   { closeList(); html += `<h2>${inline(line.slice(3).trim())}</h2>\n`; continue; }
    if (line.startsWith('### '))  { closeList(); html += `<h3>${inline(line.slice(4).trim())}</h3>\n`; continue; }
    if (/^#{4,6}\s/.test(line))   { closeList(); html += `<h4>${inline(line.replace(/^#{4,6}\s+/, '').trim())}</h4>\n`; continue; }
    if (line.startsWith('> '))    { closeList(); html += `<blockquote>${inline(line.slice(2).trim())}</blockquote>\n`; continue; }

    const numM = line.match(/^(\d+)\.\s+(.+)$/);
    if (numM) {
      if (inUl) { html += '</ul>\n'; inUl = false; }
      if (!inOl) { html += '<ol>\n'; inOl = true; }
      html += `<li>${inline(numM[2].trim())}</li>\n`;
      continue;
    }

    if (/^[-*•]\s/.test(line)) {
      if (inOl) { html += '</ol>\n'; inOl = false; }
      if (!inUl) { html += '<ul>\n'; inUl = true; }
      html += `<li>${inline(line.replace(/^[-*•]\s+/, '').trim())}</li>\n`;
      continue;
    }

    closeList();
    html += `<p>${inline(trimmed)}</p>\n`;
  }
  closeList();
  flushTable();
  return html;
}

function buildPrintHtml(reportText: string, orgName: string, generatedAt: string): string {
  const body = markdownToHtml(reportText);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Diagnostic RH — ${orgName}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Georgia', serif;
    font-size: 11pt;
    color: #1a1a1a;
    line-height: 1.65;
    background: #fff;
  }
  .wrap { max-width: 780px; margin: 0 auto; padding: 48px 56px; }

  /* Header */
  .doc-header { border-bottom: 2.5px solid #2563eb; padding-bottom: 14px; margin-bottom: 26px; }
  .doc-header h1 { font-size: 19pt; color: #1e3a8a; margin-bottom: 4px; font-family: Arial, sans-serif; }
  .doc-header p  { font-size: 9pt; color: #6b7280; }

  /* Headings */
  h2 {
    font-family: Arial, sans-serif;
    font-size: 13.5pt;
    color: #1e3a8a;
    border-bottom: 1px solid #dbeafe;
    padding-bottom: 5px;
    margin: 24px 0 10px;
    page-break-after: avoid;
  }
  h3 {
    font-family: Arial, sans-serif;
    font-size: 11.5pt;
    color: #1e40af;
    margin: 14px 0 5px;
    page-break-after: avoid;
  }
  h4 {
    font-family: Arial, sans-serif;
    font-size: 10.5pt;
    color: #374151;
    margin: 10px 0 4px;
    page-break-after: avoid;
  }

  /* Text */
  p { margin-bottom: 7px; }
  strong { font-weight: bold; color: #111; }
  em { font-style: italic; }
  code { background: #f1f5f9; padding: 1px 5px; border-radius: 3px; font-size: 9pt; font-family: monospace; }

  /* Lists */
  ul, ol { padding-left: 22px; margin: 4px 0 8px; }
  li { margin-bottom: 4px; }
  li p { margin: 0; }

  /* Blockquote */
  blockquote {
    border-left: 3px solid #93c5fd;
    margin: 8px 0 8px 4px;
    padding: 4px 0 4px 14px;
    color: #475569;
    font-style: italic;
    font-size: 10pt;
  }

  /* HR */
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 14px 0; }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 14px;
    font-size: 9.5pt;
    font-family: Arial, sans-serif;
    page-break-inside: avoid;
  }
  thead { background: #eff6ff; }
  th {
    color: #1e40af;
    font-weight: bold;
    padding: 7px 9px;
    border: 1px solid #bfdbfe;
    text-align: left;
    vertical-align: top;
  }
  td {
    padding: 6px 9px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: #f8fafc; }

  /* Footer */
  .doc-footer {
    border-top: 1px solid #e2e8f0;
    margin-top: 36px;
    padding-top: 8px;
    text-align: center;
    font-size: 8pt;
    color: #9ca3af;
    font-family: Arial, sans-serif;
  }

  /* Print overrides */
  @page { margin: 1.8cm 1.5cm; size: A4; }
  @media print {
    body { font-size: 10.5pt; }
    .wrap { padding: 0; max-width: 100%; }
    h2 { page-break-before: auto; }
    a { text-decoration: none; color: inherit; }
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="doc-header">
    <h1>Diagnostic RH &mdash; ${orgName}</h1>
    <p>Généré le ${generatedAt} &nbsp;·&nbsp; HR Compass</p>
  </div>
  ${body}
  <div class="doc-footer">HR Compass &mdash; Confidentiel</div>
</div>
<script>
  window.addEventListener('load', function() {
    setTimeout(function() { window.print(); }, 300);
  });
</script>
</body>
</html>`;
}

export default function PDFExportButton({ reportText, orgName, lang }: Props) {
  function handleExport() {
    const generatedAt = new Date().toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric', month: 'long', day: 'numeric',
    });

    const html = buildPrintHtml(reportText, orgName, generatedAt);
    const win = window.open('', '_blank');
    if (!win) {
      alert(lang === 'fr'
        ? 'Veuillez autoriser les popups pour exporter le PDF.'
        : 'Please allow popups to export the PDF.');
      return;
    }
    win.document.write(html);
    win.document.close();
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {lang === 'fr' ? 'Exporter en PDF' : 'Export as PDF'}
    </button>
  );
}
