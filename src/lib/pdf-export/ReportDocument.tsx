import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

// ============================================================
// STYLES
// ============================================================
const S = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingBottom: 70,
    paddingHorizontal: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1a1a1a',
  },
  // ——— Header (page 1 only, no fixed) ———
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
    marginBottom: 3,
  },
  headerSub: {
    fontSize: 9,
    color: '#6b7280',
  },
  // ——— Section heading (##) ———
  h2Wrapper: {
    marginTop: 16,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
    paddingBottom: 3,
  },
  h2Text: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1e3a8a',
  },
  // ——— Sub-heading (###) ———
  h3Wrapper: {
    marginTop: 8,
    marginBottom: 3,
  },
  h3Text: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1e40af',
  },
  // ——— Paragraph ———
  para: {
    fontSize: 10,
    lineHeight: 1.55,
    color: '#1a1a1a',
    marginBottom: 5,
  },
  // ——— Bullet ———
  bulletWrap: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 6,
  },
  bulletMark: {
    fontSize: 10,
    color: '#3b82f6',
    width: 12,
  },
  bulletBody: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1a1a1a',
    flex: 1,
  },
  // ——— Blockquote ———
  bqWrap: {
    borderLeftWidth: 3,
    borderLeftColor: '#93c5fd',
    paddingLeft: 8,
    marginLeft: 8,
    marginBottom: 5,
  },
  bqText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Oblique',
    color: '#475569',
    lineHeight: 1.5,
  },
  // ——— Horizontal rule ———
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginVertical: 8,
  },
  // ——— Table ———
  table: {
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  theadRow: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
  },
  tbodyRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  thCell: {
    flex: 1,
    padding: 5,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1e40af',
    borderRightWidth: 1,
    borderRightColor: '#bfdbfe',
  },
  thCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#1e40af',
  },
  tdCell: {
    flex: 1,
    padding: 5,
    fontSize: 9,
    color: '#1a1a1a',
    lineHeight: 1.4,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
  },
  tdCellLast: {
    flex: 1,
    padding: 5,
    fontSize: 9,
    color: '#1a1a1a',
    lineHeight: 1.4,
  },
  // ——— Footer (absolute, fixed on all pages) ———
  footer: {
    position: 'absolute',
    bottom: 22,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 4,
    textAlign: 'center',
    fontSize: 8,
    color: '#9ca3af',
  },
});

// ============================================================
// HELPERS
// ============================================================

/** Strip emoji that crash Helvetica encoding */
function stripEmoji(s: string): string {
  // eslint-disable-next-line no-control-regex
  return s.replace(/[^\x00-\x7E\u00A0-\u024F\u2018-\u201F\u2026\u2013\u2014]/g, '').trim();
}

/** Clean markdown inline markers for plain text fallback */
function cleanInline(s: string): string {
  return s
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1');
}

/**
 * Render a text string with inline **bold** and *italic* support.
 * IMPORTANT: child <Text> nodes only carry fontFamily — no spacing/layout styles.
 * All spacing comes exclusively from the wrapper View.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PS = any;

function InlineText({ text, style }: { text: string; style: PS }) {
  const cleaned = stripEmoji(text);

  // Parse **bold** and *italic* segments
  type Seg = { bold: boolean; italic: boolean; t: string };
  const segs: Seg[] = [];
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let cursor = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cleaned)) !== null) {
    if (m.index > cursor) segs.push({ bold: false, italic: false, t: cleaned.slice(cursor, m.index) });
    if (m[0].startsWith('**')) segs.push({ bold: true,  italic: false, t: m[2] });
    else                       segs.push({ bold: false, italic: true,  t: m[3] });
    cursor = m.index + m[0].length;
  }
  if (cursor < cleaned.length) segs.push({ bold: false, italic: false, t: cleaned.slice(cursor) });

  if (segs.length === 0) return <Text style={style}>{cleaned}</Text>;

  // No formatting segments → single Text
  if (segs.every((s) => !s.bold && !s.italic)) {
    return <Text style={style}>{segs.map((s) => s.t).join('')}</Text>;
  }

  // Mixed: outer Text owns spacing; inner Text only overrides fontFamily
  return (
    <Text style={style}>
      {segs.map((seg, i) => {
        if (seg.bold)   return <Text key={i} style={{ fontFamily: 'Helvetica-Bold'    }}>{seg.t}</Text>;
        if (seg.italic) return <Text key={i} style={{ fontFamily: 'Helvetica-Oblique' }}>{seg.t}</Text>;
        return <Text key={i}>{seg.t}</Text>;
      })}
    </Text>
  );
}

// ============================================================
// BLOCK TYPES & PARSER
// ============================================================
type Block =
  | { k: 'h2';  text: string }
  | { k: 'h3';  text: string }
  | { k: 'para'; text: string }
  | { k: 'bullet'; text: string; num?: number }
  | { k: 'bq';  text: string }
  | { k: 'hr' }
  | { k: 'table'; rows: string[][] };

function parseMarkdown(raw: string): Block[] {
  const lines = raw.split('\n');
  const out: Block[] = [];
  const tableBuf: string[][] = [];

  function flushTable() {
    if (!tableBuf.length) return;
    const rows = tableBuf.filter((r) => !r.every((c) => /^[-:\s]+$/.test(c)));
    if (rows.length) out.push({ k: 'table', rows });
    tableBuf.length = 0;
  }

  for (const raw of lines) {
    const line = raw.trimEnd();

    // Table row
    if (line.startsWith('|') && line.endsWith('|')) {
      tableBuf.push(line.slice(1, -1).split('|').map((c) => cleanInline(c.trim())));
      continue;
    }
    flushTable();

    if (!line.trim()) continue;
    if (/^-{3,}$/.test(line.trim()) || /^\*{3,}$/.test(line.trim())) { out.push({ k: 'hr' }); continue; }
    if (line.startsWith('## '))  { out.push({ k: 'h2',  text: line.slice(3).trim() }); continue; }
    if (line.startsWith('### ')) { out.push({ k: 'h3',  text: line.slice(4).trim() }); continue; }
    if (/^#{4,6}\s/.test(line))  { out.push({ k: 'h3',  text: line.replace(/^#{4,6}\s+/, '').trim() }); continue; }
    if (line.startsWith('> '))   { out.push({ k: 'bq',  text: line.slice(2).trim() }); continue; }

    const numMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) { out.push({ k: 'bullet', text: numMatch[2].trim(), num: parseInt(numMatch[1]) }); continue; }

    if (/^[-*•]\s/.test(line)) { out.push({ k: 'bullet', text: line.replace(/^[-*•]\s+/, '').trim() }); continue; }

    out.push({ k: 'para', text: line.trim() });
  }
  flushTable();
  return out;
}

// ============================================================
// BLOCK RENDERER
// ============================================================
function renderBlock(b: Block, i: number) {
  switch (b.k) {
    case 'h2':
      return (
        <View key={i} style={S.h2Wrapper}>
          <Text style={S.h2Text}>{stripEmoji(cleanInline(b.text))}</Text>
        </View>
      );

    case 'h3':
      return (
        <View key={i} style={S.h3Wrapper}>
          <InlineText text={b.text} style={S.h3Text} />
        </View>
      );

    case 'para':
      return (
        <View key={i} style={{ marginBottom: 5 }}>
          <InlineText text={b.text} style={S.para} />
        </View>
      );

    case 'bullet': {
      const mark = b.num != null ? `${b.num}.` : '•';
      return (
        <View key={i} style={S.bulletWrap}>
          <Text style={S.bulletMark}>{mark}</Text>
          <View style={{ flex: 1 }}>
            <InlineText text={b.text} style={S.bulletBody} />
          </View>
        </View>
      );
    }

    case 'bq':
      return (
        <View key={i} style={S.bqWrap}>
          <InlineText text={b.text} style={S.bqText} />
        </View>
      );

    case 'hr':
      return <View key={i} style={S.hr} />;

    case 'table': {
      if (!b.rows.length) return null;
      const [head, ...body] = b.rows;
      return (
        <View key={i} style={S.table}>
          <View style={S.theadRow}>
            {head.map((cell, ci) => (
              <Text key={ci} style={ci < head.length - 1 ? S.thCell : S.thCellLast}>{cell}</Text>
            ))}
          </View>
          {body.map((row, ri) => (
            <View key={ri} style={S.tbodyRow}>
              {row.map((cell, ci) => (
                <Text key={ci} style={ci < row.length - 1 ? S.tdCell : S.tdCellLast}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>
      );
    }

    default: return null;
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
interface Props {
  reportText: string;
  orgName: string;
  generatedAt: string;
}

export default function ReportDocument({ reportText, orgName, generatedAt }: Props) {
  const blocks = parseMarkdown(reportText);

  return (
    <Document>
      <Page size="A4" style={S.page}>

        {/* Title header — page 1 only, NOT fixed */}
        <View style={S.header}>
          <Text style={S.headerTitle}>Diagnostic RH — {orgName}</Text>
          <Text style={S.headerSub}>Généré le {generatedAt}</Text>
        </View>

        {/* All content blocks */}
        {blocks.map((b, i) => renderBlock(b, i))}

        {/* Footer — absolute + fixed so it appears on every page without pushing content */}
        <Text style={S.footer} fixed>
          HR Compass — Confidentiel
        </Text>

      </Page>
    </Document>
  );
}
