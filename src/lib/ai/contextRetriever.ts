import { getAllDocuments } from '@/lib/storage/documentStore';
import { readChunks } from '@/lib/storage/fileStore';
import type { TextChunk } from '@/types/document';
import type { DiagnosticAnswers } from '@/types/questionnaire';

const MAX_CONTEXT_CHARS = Number(process.env.MAX_CONTEXT_CHARS ?? 80000);

const SECTOR_KEYWORDS: Record<string, string[]> = {
  sante: ['santé', 'health', 'médical', 'soins', 'clinique'],
  services_sociaux: ['services sociaux', 'social services', 'aide', 'communautaire'],
  education: ['éducation', 'education', 'formation', 'apprentissage', 'scolaire'],
  culture: ['culture', 'arts', 'musée', 'théâtre', 'patrimoine'],
  environnement: ['environnement', 'environment', 'écologie', 'développement durable'],
  sport_loisirs: ['sport', 'loisirs', 'activité physique', 'recreation'],
  logement: ['logement', 'housing', 'habitation', 'locataire'],
  dev_eco: ['développement économique', 'economic development', 'entrepreneuriat'],
  international: ['international', 'coopération', 'cooperation', 'développement'],
};

const CHALLENGE_KEYWORDS: Record<string, string[]> = {
  recruitment: ['recrutement', 'recruitment', 'attraction', 'dotation', 'embauche'],
  retention: ['rétention', 'retention', 'roulement', 'turnover', 'fidélisation'],
  burnout: ['épuisement', 'burnout', 'bien-être', 'wellbeing', 'surcharge'],
  salaries: ['rémunération', 'salaire', 'salary', 'compensation', 'avantages'],
  training: ['formation', 'training', 'compétences', 'développement', 'skills'],
  succession: ['relève', 'succession', 'leadership', 'planification'],
  leadership: ['leadership', 'gestion', 'management', 'gestionnaire'],
  edi: ['EDI', 'équité', 'diversité', 'inclusion', 'diversity'],
  wellbeing: ['santé mentale', 'mental health', 'bien-être', 'psychologique'],
};

function extractKeywords(answers: DiagnosticAnswers): string[] {
  const keywords: string[] = [];

  const sector = answers['sector'] as string;
  if (sector && SECTOR_KEYWORDS[sector]) {
    keywords.push(...SECTOR_KEYWORDS[sector]);
  }

  for (const [key, words] of Object.entries(CHALLENGE_KEYWORDS)) {
    const fieldId = `challenge_${key}`;
    const val = answers[fieldId] as string;
    if (val === 'important' || val === 'critique') {
      keywords.push(...words);
    }
  }

  const budget = answers['budget'] as string;
  if (budget === '<250k' || budget === '250k-500k') {
    keywords.push('petite', 'small', 'ressources limitées', 'limited resources');
  }

  return keywords;
}

function scoreChunk(chunk: TextChunk, keywords: string[]): number {
  const lowerText = chunk.text.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (lowerText.includes(kw.toLowerCase())) score += 1;
  }
  if (chunk.index === 0) score += 2;
  return score;
}

export async function getRelevantChunks(answers: DiagnosticAnswers): Promise<TextChunk[]> {
  const documents = await getAllDocuments();
  if (documents.length === 0) return [];

  const keywords = extractKeywords(answers);
  const allChunks: TextChunk[] = [];

  for (const doc of documents) {
    try {
      const chunks = await readChunks(doc.id);
      allChunks.push(...chunks);
    } catch {
      // Skip documents that can't be read
    }
  }

  const scored = allChunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, keywords) }))
    .sort((a, b) => b.score - a.score);

  const selected: TextChunk[] = [];
  let totalChars = 0;

  for (const { chunk } of scored) {
    if (totalChars + chunk.text.length > MAX_CONTEXT_CHARS) break;
    selected.push(chunk);
    totalChars += chunk.text.length;
  }

  return selected;
}
