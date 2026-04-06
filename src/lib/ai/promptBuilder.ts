import type { DiagnosticAnswers } from '@/types/questionnaire';
import type { TextChunk } from '@/types/document';
import { STEPS } from '@/lib/questionnaire/steps';

function formatAnswers(answers: DiagnosticAnswers, lang: 'fr' | 'en'): string {
  let result = '';
  for (const step of STEPS) {
    const title = lang === 'fr' ? step.titleFr : step.titleEn;
    result += `\n### ${title.toUpperCase()}\n`;
    for (const field of step.fields) {
      const label = lang === 'fr' ? field.labelFr : field.labelEn;
      const value = answers[field.id];
      if (value === undefined || value === null || value === '') continue;
      if (Array.isArray(value)) {
        const options = field.options ?? [];
        const labels = (value as string[]).map((v) => {
          const opt = options.find((o) => o.value === v);
          return opt ? (lang === 'fr' ? opt.labelFr : opt.labelEn) : v;
        });
        result += `- ${label}: ${labels.join(', ')}\n`;
      } else if (field.options) {
        const opt = field.options.find((o) => o.value === String(value));
        const displayVal = opt ? (lang === 'fr' ? opt.labelFr : opt.labelEn) : String(value);
        result += `- ${label}: ${displayVal}\n`;
      } else {
        result += `- ${label}: ${value}\n`;
      }
    }
  }
  return result;
}

function buildDocumentContext(chunks: TextChunk[]): string {
  if (chunks.length === 0) return '';

  let context = '\n=== BASE DE CONNAISSANCES SCIENTIFIQUE ===\n';
  context += 'Les extraits suivants proviennent de la littérature de référence. ';
  context += 'Appuyez-vous sur ces contenus et citez la source entre parenthèses lorsque pertinent.\n\n';

  let lastDoc = '';
  for (const chunk of chunks) {
    if (chunk.documentName !== lastDoc) {
      context += `--- Source: ${chunk.documentName} ---\n`;
      lastDoc = chunk.documentName;
    }
    context += chunk.text + '\n\n';
  }

  context += '=== FIN BASE DE CONNAISSANCES ===\n';
  return context;
}

export function buildPrompt(
  answers: DiagnosticAnswers,
  chunks: TextChunk[],
  lang: 'fr' | 'en'
): { system: string; userMessage: string } {
  const isFr = lang === 'fr';

  const outputSections = isFr
    ? `## Sommaire exécutif
## Portrait diagnostique de l'organisation
## Analyse des forces RH
## Analyse des enjeux critiques
## Benchmarks et comparaisons sectorielles
## Plan d'action stratégique RH (12–24 mois)
## Recommandations prioritaires (Quick wins)
## Ressources et outils recommandés
## Conclusion`
    : `## Executive Summary
## Organizational Diagnostic Portrait
## HR Strengths Analysis
## Critical Issues Analysis
## Sector Benchmarks & Comparisons
## Strategic HR Action Plan (12–24 months)
## Priority Recommendations (Quick wins)
## Recommended Resources & Tools
## Conclusion`;

  const system = isFr
    ? `Tu es un expert en ressources humaines spécialisé dans les organismes à but non lucratif (OBNL). Tu maîtrises la gestion des organisations du tiers secteur, le développement organisationnel et les pratiques RH adaptées aux contraintes spécifiques des OBNL (financement instable, forte mission sociale, gestion bénévole, ressources limitées).

Tu as accès à une base de connaissances scientifique constituée de recherches, synthèses et outils pratiques spécifiques au secteur. Appuie-toi prioritairement sur ces documents pour formuler tes analyses et recommandations, en citant les sources entre parenthèses quand pertinent.

Produis un diagnostic RH rigoureux, structuré et actionnable. Le diagnostic doit être :
- Basé sur les données fournies par l'organisation
- Ancré dans la littérature scientifique et les meilleures pratiques du secteur
- Réaliste quant aux contraintes des OBNL
- Empathique mais direct sur les enjeux critiques

RÈGLE CRITIQUE — PLAN D'ACTION STRATÉGIQUE :
La section "Plan d'action stratégique RH (12–24 mois)" doit être COMPLÈTE et DÉTAILLÉE. Elle doit inclure :
- Une Phase 1 (0–6 mois) avec au minimum 4 actions concrètes, chacune avec : objectif, responsable, ressources requises, indicateur de succès
- Une Phase 2 (6–12 mois) avec au minimum 4 actions concrètes, chacune avec : objectif, responsable, ressources requises, indicateur de succès
- Une Phase 3 (12–24 mois) avec au minimum 3 actions concrètes, chacune avec : objectif, responsable, ressources requises, indicateur de succès
- Un tableau de bord de suivi avec les indicateurs RH clés à mesurer
NE JAMAIS tronquer ou abréger cette section. Elle doit être entièrement rédigée avant de passer à la suivante.

UTILISE EXACTEMENT CES TITRES DE SECTIONS (en markdown avec ##) :
${outputSections}`
    : `You are an expert in human resources management specialized in non-profit organizations (NPOs). You have deep expertise in third-sector organizational management, organizational development, and HR practices adapted to the specific constraints of NPOs (unstable funding, strong social mission, volunteer governance, limited resources).

You have access to a scientific knowledge base consisting of research, syntheses, and practical tools specific to the sector. Primarily draw on these documents to formulate your analysis and recommendations, citing sources in parentheses when relevant.

Produce a rigorous, structured, and actionable HR diagnostic. The diagnostic must be:
- Based on data provided by the organization
- Grounded in scientific literature and best sector practices
- Realistic about NPO constraints
- Empathetic but direct about critical issues

CRITICAL RULE — STRATEGIC ACTION PLAN:
The "Strategic HR Action Plan (12–24 months)" section must be COMPLETE and DETAILED. It must include:
- Phase 1 (0–6 months) with at least 4 concrete actions, each with: objective, responsible party, required resources, success indicator
- Phase 2 (6–12 months) with at least 4 concrete actions, each with: objective, responsible party, required resources, success indicator
- Phase 3 (12–24 months) with at least 3 concrete actions, each with: objective, responsible party, required resources, success indicator
- A monitoring dashboard with key HR indicators to track
NEVER truncate or abbreviate this section. It must be fully written before moving to the next section.

USE EXACTLY THESE SECTION TITLES (markdown with ##):
${outputSections}`;

  const docContext = buildDocumentContext(chunks);
  const answersFormatted = formatAnswers(answers, lang);
  const orgName = (answers['orgName'] as string) || (isFr ? 'Organisation non identifiée' : 'Unnamed organization');

  const userMessage = `${docContext}

=== DONNÉES DE L'ORGANISATION DIAGNOSTIQUÉE : ${orgName} ===
${answersFormatted}
=== FIN DONNÉES ===

${isFr
    ? `Sur la base de ces informations et de la base de connaissances scientifique fournie, génère un diagnostic RH complet et un plan d'action stratégique pour ${orgName}. Commence directement par le Sommaire exécutif.`
    : `Based on this information and the provided scientific knowledge base, generate a complete HR diagnostic and strategic action plan for ${orgName}. Start directly with the Executive Summary.`}`;

  return { system, userMessage };
}
