import type { DiagnosticAnswers } from '@/types/questionnaire';

// ============================================================
// BOÎTE À OUTILS RH OBNL — Metadata (26 outils)
// ============================================================
const OUTILS_METADATA: Record<string, {
  titre: string;
  axe: string;
  niveau: string;
  priorité: string;
  durée: string;
  fréquence: string;
  étoiles: number;
  thèmes: string[];
  mots_clés: string[];
  page_pdf: number;
}> = {
  'G-1': {
    titre: "Autodiagnostic de la gouvernance RH",
    axe: "Gouvernance", niveau: "CA et Direction", priorité: "HAUTE",
    durée: "2-3h", fréquence: "Annuel", étoiles: 3,
    thèmes: ["gouvernance", "planification stratégique", "DEI", "résilience", "relève", "rôles"],
    mots_clés: ["mission", "planification", "reddition de comptes", "rôles", "confiance", "GRH stratégique", "DEI", "relève"],
    page_pdf: 4,
  },
  'G-2': {
    titre: "Clarification des rôles et responsabilités en GRH",
    axe: "Gouvernance", niveau: "CA et Direction", priorité: "HAUTE",
    durée: "1-2h", fréquence: "Annuel ou lors de changements", étoiles: 3,
    thèmes: ["gouvernance", "rôles", "leadership", "politique RH"],
    mots_clés: ["rôles", "responsabilités", "CA", "direction", "micromanagement", "zones grises", "délégation"],
    page_pdf: 6,
  },
  'G-3': {
    titre: "Grille d'analyse du casting du CA",
    axe: "Gouvernance", niveau: "CA et Direction", priorité: "MOYENNE",
    durée: "1h", fréquence: "Annuel", étoiles: 2,
    thèmes: ["gouvernance", "diversité", "DEI", "leadership"],
    mots_clés: ["conseil d'administration", "CA", "compétences", "diversité", "représentation", "profils"],
    page_pdf: 8,
  },
  'G-4': {
    titre: "Plan de gestion prévisionnelle des RH",
    axe: "Gouvernance", niveau: "CA et Direction", priorité: "MOYENNE",
    durée: "2h", fréquence: "Annuel", étoiles: 2,
    thèmes: ["planification stratégique", "relève", "recrutement", "transfert savoirs"],
    mots_clés: ["relève", "postes vulnérables", "candidats internes", "transfert", "succession", "prévisionnel"],
    page_pdf: 9,
  },
  'G-5': {
    titre: "Protocole de gestion de crise organisationnelle",
    axe: "Gouvernance", niveau: "CA et Direction", priorité: "HAUTE",
    durée: "2-3h", fréquence: "À préparer hors crise, réviser annuellement", étoiles: 3,
    thèmes: ["crise", "résilience", "gouvernance", "leadership"],
    mots_clés: ["crise", "financement", "départ imprévu", "conflit", "réputation", "continuité", "CA-direction"],
    page_pdf: 10,
  },
  'G-6': {
    titre: "Politique DEI simplifiée",
    axe: "Gouvernance", niveau: "CA et Direction", priorité: "MOYENNE",
    durée: "1-2h", fréquence: "À adopter formellement", étoiles: 2,
    thèmes: ["DEI", "inclusion", "diversité", "politique RH"],
    mots_clés: ["équité", "diversité", "inclusion", "DEI", "représentation", "biais", "audit salarial"],
    page_pdf: 12,
  },
  'G-7': {
    titre: "Grille d'évaluation de la résilience organisationnelle",
    axe: "Gouvernance", niveau: "CA et Direction", priorité: "MOYENNE",
    durée: "1-2h", fréquence: "Annuel ou après turbulence", étoiles: 2,
    thèmes: ["résilience", "crise", "planification stratégique", "gouvernance"],
    mots_clés: ["résilience", "chocs", "adaptation", "bailleurs", "financement diversifié", "continuité", "mission"],
    page_pdf: 13,
  },
  'F-1': {
    titre: "Analyse des besoins de formation",
    axe: "Formation", niveau: "Direction et équipe", priorité: "HAUTE",
    durée: "1-2h", fréquence: "Annuel", étoiles: 3,
    thèmes: ["formation", "développement professionnel"],
    mots_clés: ["formation", "besoins", "compétences", "plan", "budget formation", "lacunes"],
    page_pdf: 15,
  },
  'F-2': {
    titre: "Plan annuel de formation",
    axe: "Formation", niveau: "Direction et équipe", priorité: "HAUTE",
    durée: "2h", fréquence: "Annuel", étoiles: 3,
    thèmes: ["formation", "DEI", "compétences interculturelles"],
    mots_clés: ["plan de formation", "budget", "échéancier", "interculturel", "DEI", "accueil", "conflits", "leadership"],
    page_pdf: 17,
  },
  'F-3': {
    titre: "Guide d'accueil et d'intégration",
    axe: "Formation", niveau: "Direction et équipe", priorité: "HAUTE",
    durée: "2-3h", fréquence: "À chaque arrivée", étoiles: 3,
    thèmes: ["intégration", "onboarding", "formation", "rétention"],
    mots_clés: ["accueil", "intégration", "onboarding", "nouveau membre", "mission francophone", "avantages sociaux", "mentor"],
    page_pdf: 18,
  },
  'F-4': {
    titre: "Fiche de suivi du développement professionnel",
    axe: "Formation", niveau: "Direction et équipe", priorité: "MOYENNE",
    durée: "30min/personne", fréquence: "Lors des évaluations", étoiles: 2,
    thèmes: ["développement professionnel", "formation", "rétention"],
    mots_clés: ["développement", "objectifs", "compétences", "suivi individuel", "transfert", "aspirations"],
    page_pdf: 20,
  },
  'F-5': {
    titre: "Programme de mentorat interne",
    axe: "Formation", niveau: "Direction et équipe", priorité: "MOYENNE",
    durée: "2-3h", fréquence: "Continu", étoiles: 2,
    thèmes: ["mentorat", "transfert savoirs", "relève", "formation"],
    mots_clés: ["mentorat", "mentor", "transfert", "savoirs", "dyades", "contrat de mentorat", "relève"],
    page_pdf: 21,
  },
  'F-6': {
    titre: "Grille de gestion des conflits",
    axe: "Formation", niveau: "Direction et équipe", priorité: "MOYENNE",
    durée: "Référence", fréquence: "À consulter en situation", étoiles: 2,
    thèmes: ["conflits", "leadership", "interculturel"],
    mots_clés: ["conflit", "cognitif", "relationnel", "valeurs", "rôles", "interculturel", "médiation", "tension"],
    page_pdf: 23,
  },
  'F-7': {
    titre: "Outil de transfert des connaissances et de mémoire organisationnelle",
    axe: "Formation", niveau: "Direction et équipe", priorité: "HAUTE",
    durée: "1-2h/poste", fréquence: "Continu, obligatoire avant tout départ", étoiles: 3,
    thèmes: ["transfert savoirs", "relève", "mémoire organisationnelle", "départ"],
    mots_clés: ["transfert", "savoirs", "départ", "succession", "mémoire organisationnelle", "procédurier", "shadowing"],
    page_pdf: 25,
  },
  'R-1': {
    titre: "Politique de reconnaissance — cadre minimal",
    axe: "Reconnaissance", niveau: "Direction et équipe", priorité: "HAUTE",
    durée: "1-2h", fréquence: "À adopter formellement", étoiles: 3,
    thèmes: ["reconnaissance", "rétention", "mobilisation"],
    mots_clés: ["reconnaissance", "valorisation", "mission francophone", "remerciements", "évaluation", "célébration", "avantages sociaux"],
    page_pdf: 27,
  },
  'R-2': {
    titre: "Grille d'évaluation annuelle du personnel",
    axe: "Reconnaissance", niveau: "Direction et équipe", priorité: "HAUTE",
    durée: "1-2h/personne", fréquence: "Annuel", étoiles: 3,
    thèmes: ["évaluation", "reconnaissance", "développement professionnel", "rétention"],
    mots_clés: ["évaluation", "performance", "autoévaluation", "rétroaction", "plan de développement", "valorisation"],
    page_pdf: 29,
  },
  'R-3': {
    titre: "Programme de reconnaissance des bénévoles",
    axe: "Reconnaissance", niveau: "Direction et équipe", priorité: "HAUTE",
    durée: "2h", fréquence: "Annuel", étoiles: 3,
    thèmes: ["bénévoles", "reconnaissance", "rétention"],
    mots_clés: ["bénévoles", "reconnaissance", "valorisation", "partenaires", "lettre de référence", "événement"],
    page_pdf: 31,
  },
  'R-4': {
    titre: "Sondage annuel sur le climat organisationnel",
    axe: "Reconnaissance", niveau: "Direction et équipe", priorité: "MOYENNE",
    durée: "1h préparation", fréquence: "Annuel", étoiles: 2,
    thèmes: ["climat organisationnel", "mobilisation", "reconnaissance", "inclusion"],
    mots_clés: ["sondage", "climat", "satisfaction", "anonyme", "mobilisation", "rétention", "avantages sociaux"],
    page_pdf: 32,
  },
  'R-5': {
    titre: "Plan de prévention de l'épuisement professionnel",
    axe: "Reconnaissance", niveau: "Direction et équipe", priorité: "MOYENNE",
    durée: "1-2h", fréquence: "Annuel et lors de périodes de pression", étoiles: 2,
    thèmes: ["épuisement", "bien-être", "résilience", "conditions de travail"],
    mots_clés: ["épuisement", "burnout", "bien-être", "charge de travail", "PAE", "culture du sacrifice", "flexibilité"],
    page_pdf: 34,
  },
  'R-6': {
    titre: "Tableau de bord de la reconnaissance — suivi annuel",
    axe: "Reconnaissance", niveau: "Direction", priorité: "MOYENNE",
    durée: "5min/mois", fréquence: "Mensuel", étoiles: 1,
    thèmes: ["reconnaissance", "suivi", "tableau de bord"],
    mots_clés: ["tableau de bord", "suivi", "reconnaissance", "pratiques", "mensuel", "indicateur d'alerte"],
    page_pdf: 36,
  },
  'R-7': {
    titre: "Grille d'évaluation du climat inclusif et de la mobilisation",
    axe: "Reconnaissance", niveau: "Direction et équipe", priorité: "MOYENNE",
    durée: "1h", fréquence: "Annuel", étoiles: 2,
    thèmes: ["inclusion", "mobilisation", "climat organisationnel", "DEI"],
    mots_clés: ["inclusion", "mobilisation", "équité", "sentiment d'appartenance", "diversité", "leviers", "participation"],
    page_pdf: 37,
  },
  'A-1': {
    titre: "Guide de recrutement inclusif en contexte francophone",
    axe: "Gestion administrative", niveau: "Gestionnaires terrain", priorité: "HAUTE",
    durée: "2-3h", fréquence: "À chaque ouverture de poste", étoiles: 3,
    thèmes: ["recrutement", "inclusif", "francophone", "DEI"],
    mots_clés: ["recrutement", "offre d'emploi", "sélection", "grille", "francophone", "ACFO", "RDÉE", "package", "compétences linguistiques"],
    page_pdf: 39,
  },
  'A-2': {
    titre: "Guide des avantages sociaux et conditions de travail",
    axe: "Gestion administrative", niveau: "Gestionnaires terrain", priorité: "HAUTE",
    durée: "1h préparation", fréquence: "Remis à l'embauche, révisé annuellement", étoiles: 3,
    thèmes: ["avantages sociaux", "conditions de travail", "recrutement", "rétention"],
    mots_clés: ["avantages sociaux", "retraite", "assurance", "vacances", "hybride", "flexibilité", "PAE", "package"],
    page_pdf: 41,
  },
  'A-3': {
    titre: "Outil de valorisation du package d'employeur OBNL francophone",
    axe: "Gestion administrative", niveau: "Gestionnaires terrain", priorité: "HAUTE",
    durée: "1h", fréquence: "À chaque recrutement et entretien", étoiles: 3,
    thèmes: ["recrutement", "rétention", "avantages sociaux", "salaire"],
    mots_clés: ["package", "valeur totale", "salaire", "avantages", "retraite", "vacances", "compétitif", "marché anglophone"],
    page_pdf: 43,
  },
  'A-4': {
    titre: "Politique de gestion des congés et des vacances",
    axe: "Gestion administrative", niveau: "Gestionnaires terrain", priorité: "MOYENNE",
    durée: "1h", fréquence: "À documenter formellement, révisé annuellement", étoiles: 2,
    thèmes: ["congés", "vacances", "conditions de travail", "avantages sociaux"],
    mots_clés: ["congés", "vacances", "maladie", "deuil", "parental", "fériés", "politique", "normes du travail"],
    page_pdf: 45,
  },
  'A-5': {
    titre: "Protocole de gestion des départs (offboarding)",
    axe: "Gestion administrative", niveau: "Gestionnaires terrain", priorité: "MOYENNE",
    durée: "1-2h", fréquence: "À chaque départ", étoiles: 2,
    thèmes: ["départ", "offboarding", "transfert savoirs", "droits"],
    mots_clés: ["départ", "offboarding", "indemnités", "assurance-emploi", "transfert", "entretien de départ", "alumni", "réputation"],
    page_pdf: 47,
  },
};

// ============================================================
// CHALLENGE → TOOLS MAPPING
// ============================================================
const CHALLENGE_TO_TOOLS: Record<string, string[]> = {
  challenge_recruitment: ['A-1', 'A-2', 'A-3', 'F-3'],
  challenge_retention:   ['R-1', 'R-2', 'A-2', 'A-3', 'R-5'],
  challenge_burnout:     ['R-5', 'R-4', 'R-1'],
  challenge_salaries:    ['A-2', 'A-3', 'G-7'],
  challenge_training:    ['F-1', 'F-2', 'F-3', 'F-4'],
  challenge_succession:  ['G-4', 'F-5', 'F-7', 'A-5'],
  challenge_leadership:  ['G-2', 'G-1', 'F-6'],
  challenge_edi:         ['G-6', 'G-3', 'R-7', 'A-1'],
  challenge_wellbeing:   ['R-5', 'R-4', 'G-5'],
};

// ============================================================
// PARCOURS
// ============================================================
const PARCOURS_META: Record<string, {
  labelFr: string;
  labelEn: string;
  descFr: string;
  descEn: string;
  outils: string[];
}> = {
  organisme_qui_démarre: {
    labelFr: "Organisme qui démarre ou se structure",
    labelEn: "Organization starting out or structuring itself",
    descFr: "Votre organisation a besoin de poser des bases RH solides. Ce parcours vous guide pour établir les fondements essentiels : gouvernance, rôles, accueil, conditions de travail et reconnaissance.",
    descEn: "Your organization needs to build solid HR foundations. This pathway guides you through the essentials: governance, roles, onboarding, working conditions, and recognition.",
    outils: ['G-1', 'G-2', 'F-3', 'A-1', 'A-2', 'R-1', 'R-2'],
  },
  en_crise_ou_fragilité: {
    labelFr: "Organisation en crise ou en fragilité",
    labelEn: "Organization in crisis or fragility",
    descFr: "Votre organisation traverse une période difficile. Ce parcours priorise la résilience, la gestion de crise et la prévention de l'épuisement pour stabiliser et rebâtir.",
    descEn: "Your organization is going through a difficult period. This pathway prioritizes resilience, crisis management, and burnout prevention to stabilize and rebuild.",
    outils: ['G-5', 'G-7', 'G-1', 'R-5', 'R-4', 'A-2'],
  },
  recrutement_rétention: {
    labelFr: "Recrutement et rétention",
    labelEn: "Recruitment and retention",
    descFr: "Attirer et retenir du personnel qualifié est votre priorité. Ce parcours vous donne les outils pour améliorer votre marque employeur, vos conditions de travail et vos pratiques de reconnaissance.",
    descEn: "Attracting and retaining qualified staff is your priority. This pathway gives you tools to improve your employer brand, working conditions, and recognition practices.",
    outils: ['A-1', 'A-2', 'A-3', 'R-1', 'R-2', 'R-3'],
  },
  transition_relève: {
    labelFr: "Transition et relève",
    labelEn: "Succession and transition",
    descFr: "Votre organisation prépare une transition de direction ou fait face à des risques de perte de savoirs. Ce parcours sécurise le transfert des connaissances et prépare la relève.",
    descEn: "Your organization is preparing a leadership transition or faces knowledge loss risks. This pathway secures knowledge transfer and prepares succession.",
    outils: ['G-4', 'F-7', 'F-5', 'A-5', 'G-3', 'F-4'],
  },
  DEI_inclusion: {
    labelFr: "Équité, diversité et inclusion",
    labelEn: "Equity, diversity and inclusion",
    descFr: "Votre organisation souhaite renforcer son engagement envers l'EDI. Ce parcours vous propose des outils pour formaliser vos pratiques inclusives, de la gouvernance au recrutement.",
    descEn: "Your organization wants to strengthen its commitment to EDI. This pathway offers tools to formalize inclusive practices, from governance to recruitment.",
    outils: ['G-6', 'G-3', 'F-2', 'F-6', 'R-7', 'A-1'],
  },
  gouvernance_stratégique: {
    labelFr: "Gouvernance stratégique",
    labelEn: "Strategic governance",
    descFr: "Votre CA et votre direction ont besoin de clarifier leur rôle respectif en GRH et de renforcer la gouvernance organisationnelle. Ce parcours structure la prise de décision stratégique.",
    descEn: "Your board and management need to clarify their respective roles in HRM and strengthen organizational governance. This pathway structures strategic decision-making.",
    outils: ['G-1', 'G-7', 'G-2', 'G-4', 'G-5', 'A-2'],
  },
};

// ============================================================
// SCORING ENGINE
// ============================================================
function scoreTools(answers: DiagnosticAnswers): Array<{ code: string; score: number }> {
  const scores: Record<string, number> = {};

  const add = (code: string, pts: number) => {
    scores[code] = (scores[code] ?? 0) + pts;
  };

  // Score from challenge matrix
  const challengeFields = Object.keys(CHALLENGE_TO_TOOLS) as Array<keyof typeof CHALLENGE_TO_TOOLS>;
  for (const field of challengeFields) {
    const value = answers[field];
    const severity = value === 'critique' ? 5 : value === 'important' ? 3 : 0;
    if (severity === 0) continue;
    for (const code of CHALLENGE_TO_TOOLS[field]) {
      add(code, severity);
    }
  }

  // Score from HR practices gaps
  if (answers.onboarding === 'non') add('F-3', 3);
  if (answers.performanceReview === 'aucune') add('R-2', 3);
  if (answers.salaryPolicy === 'non') { add('A-2', 2); add('A-3', 2); }
  if (answers.trainingBudget === '0') { add('F-1', 2); add('F-2', 2); }
  if (answers.recruitmentProcess === 'aucun') add('A-1', 2);
  if (answers.successionPlan === 'non') { add('G-4', 2); add('F-7', 2); }
  if (answers.boardHrCommittee === 'non') { add('G-1', 2); add('G-2', 1); }
  if (answers.wellbeingInitiative === 'aucune') add('R-5', 2);
  if (answers.conflictManagement === 'evitement' || answers.conflictManagement === 'non_gere') add('F-6', 2);
  if (answers.recognition === 'peu') add('R-1', 2);

  // Apply quality bonuses from metadata
  return Object.entries(scores)
    .map(([code, score]) => {
      const outil = OUTILS_METADATA[code];
      if (!outil) return { code, score: 0 };
      let finalScore = score;
      if (outil.priorité === 'HAUTE') finalScore += 1;
      finalScore += outil.étoiles;
      return { code, score: finalScore };
    })
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score);
}

// ============================================================
// PARCOURS DETECTION
// ============================================================
function detectParcours(answers: DiagnosticAnswers): string {
  const etp = Number(answers.totalETP) || 0;
  const scores: Record<string, number> = {
    organisme_qui_démarre: 0,
    en_crise_ou_fragilité: 0,
    recrutement_rétention: 0,
    transition_relève: 0,
    DEI_inclusion: 0,
    gouvernance_stratégique: 0,
  };

  // organisme_qui_démarre
  if (etp <= 10) scores.organisme_qui_démarre += 3;
  if (answers.hrFunction === 'aucune') scores.organisme_qui_démarre += 2;
  if (answers.hrFunction === 'dg') scores.organisme_qui_démarre += 1;

  // en_crise_ou_fragilité
  if (answers.challenge_salaries === 'critique') scores.en_crise_ou_fragilité += 3;
  if (answers.challenge_burnout === 'critique') scores.en_crise_ou_fragilité += 2;
  if (answers.challenge_wellbeing === 'critique') scores.en_crise_ou_fragilité += 2;

  // recrutement_rétention
  if (answers.challenge_recruitment === 'critique') scores.recrutement_rétention += 4;
  if (answers.challenge_retention === 'critique') scores.recrutement_rétention += 4;
  if (answers.challenge_recruitment === 'important') scores.recrutement_rétention += 2;
  if (answers.challenge_retention === 'important') scores.recrutement_rétention += 2;
  if (Number(answers.vacantPositions) > 2) scores.recrutement_rétention += 1;

  // transition_relève
  if (answers.challenge_succession === 'critique') scores.transition_relève += 3;
  if (answers.successionPlan === 'non') scores.transition_relève += 2;
  if (answers.dgTenure === '<1') scores.transition_relève += 2;
  if (answers.dgTenure === '>10') scores.transition_relève += 1;

  // DEI_inclusion
  if (answers.challenge_edi === 'critique') scores.DEI_inclusion += 4;
  if (answers.challenge_edi === 'important') scores.DEI_inclusion += 2;

  // gouvernance_stratégique
  if (answers.challenge_leadership === 'critique') scores.gouvernance_stratégique += 2;
  if (answers.boardHrCommittee === 'non') scores.gouvernance_stratégique += 1;
  if (answers.hrFunction === 'aucune') scores.gouvernance_stratégique += 1;

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}

// ============================================================
// LABEL HELPERS
// ============================================================
const CHALLENGE_LABELS_FR: Record<string, string> = {
  challenge_recruitment: 'Attraction et recrutement',
  challenge_retention:   'Rétention du personnel',
  challenge_burnout:     'Épuisement professionnel',
  challenge_salaries:    'Financement insuffisant pour salaires compétitifs',
  challenge_training:    'Développement des compétences et formation',
  challenge_succession:  'Succession et relève',
  challenge_leadership:  'Défis de leadership',
  challenge_edi:         'Équité, diversité et inclusion (EDI)',
  challenge_wellbeing:   'Bien-être psychologique et santé mentale',
};
const CHALLENGE_LABELS_EN: Record<string, string> = {
  challenge_recruitment: 'Attraction & recruitment',
  challenge_retention:   'Staff retention',
  challenge_burnout:     'Burnout / professional exhaustion',
  challenge_salaries:    'Insufficient funding for competitive salaries',
  challenge_training:    'Skills development & training',
  challenge_succession:  'Succession planning',
  challenge_leadership:  'Leadership challenges',
  challenge_edi:         'Equity, diversity & inclusion (EDI)',
  challenge_wellbeing:   'Psychological wellbeing & mental health',
};

const SECTOR_LABELS_FR: Record<string, string> = {
  sante: 'Santé', services_sociaux: 'Services sociaux', education: 'Éducation',
  culture: 'Culture / Arts', environnement: 'Environnement', sport_loisirs: 'Sport / Loisirs',
  logement: 'Logement communautaire', dev_eco: 'Développement économique',
  international: 'International / Coopération', autre: 'Autre',
};
const SECTOR_LABELS_EN: Record<string, string> = {
  sante: 'Health', services_sociaux: 'Social services', education: 'Education',
  culture: 'Culture / Arts', environnement: 'Environment', sport_loisirs: 'Sport / Leisure',
  logement: 'Community housing', dev_eco: 'Economic development',
  international: 'International / Cooperation', autre: 'Other',
};

// ============================================================
// REPORT BUILDER
// ============================================================
export function generateDemoReport(
  answers: DiagnosticAnswers,
  lang: 'fr' | 'en'
): string {
  const isFr = lang === 'fr';
  const topTools = scoreTools(answers).slice(0, 7);
  const parcoursKey = detectParcours(answers);
  const parcours = PARCOURS_META[parcoursKey];

  const orgName = String(answers.orgName || (isFr ? 'Votre organisation' : 'Your organization'));
  const sector = String(answers.sector || '');
  const etp = answers.totalETP != null ? Number(answers.totalETP) : null;
  const budget = String(answers.budget || '');
  const hrFunction = String(answers.hrFunction || '');
  const turnover = answers.turnoverRate != null ? Number(answers.turnoverRate) : null;
  const vacancies = answers.vacantPositions != null ? Number(answers.vacantPositions) : null;

  // Critical and important challenges
  const criticalChallenges = Object.keys(CHALLENGE_TO_TOOLS).filter(
    (f) => answers[f] === 'critique'
  );
  const importantChallenges = Object.keys(CHALLENGE_TO_TOOLS).filter(
    (f) => answers[f] === 'important'
  );

  const challengeLabels = isFr ? CHALLENGE_LABELS_FR : CHALLENGE_LABELS_EN;
  const sectorLabel = isFr
    ? SECTOR_LABELS_FR[sector] ?? sector
    : SECTOR_LABELS_EN[sector] ?? sector;

  // ——— Section 1: Portrait ———
  let report = isFr
    ? `## Portrait de l'organisation\n\n`
    : `## Organizational Portrait\n\n`;

  if (isFr) {
    report += `**${orgName}** est un OBNL œuvrant dans le secteur **${sectorLabel || 'non précisé'}**`;
    if (etp !== null) report += ` avec **${etp} employé${etp > 1 ? 's' : ''} (ETP)**`;
    report += '.\n\n';

    const hrFunctionLabels: Record<string, string> = {
      direction_rh: 'une direction RH dédiée',
      poste_rh: 'un poste RH (sans direction)',
      dg: 'la direction générale assure les RH',
      externe: 'les RH sont externalisées',
      aucune: 'aucune fonction RH formelle',
    };
    if (hrFunction) {
      report += `**Fonction RH :** ${hrFunctionLabels[hrFunction] ?? hrFunction}.\n\n`;
    }

    const indicators: string[] = [];
    if (turnover !== null && turnover > 0) indicators.push(`Taux de roulement : **${turnover}%**`);
    if (vacancies !== null && vacancies > 0) indicators.push(`Postes vacants actuellement : **${vacancies}**`);
    if (indicators.length > 0) {
      report += `**Indicateurs clés :** ${indicators.join(' · ')}\n\n`;
    }

    if (!budget || budget === '<250k') {
      report += `> ⚡ **Note :** Avec des ressources budgétaires limitées, ce diagnostic mise sur des outils accessibles et à fort impact, conçus spécifiquement pour les réalités des OBNL.\n\n`;
    }
  } else {
    report += `**${orgName}** is an NPO operating in the **${sectorLabel || 'unspecified'}** sector`;
    if (etp !== null) report += ` with **${etp} employee${etp > 1 ? 's' : ''} (FTE)**`;
    report += '.\n\n';

    const hrFunctionLabels: Record<string, string> = {
      direction_rh: 'a dedicated HR director',
      poste_rh: 'an HR role (no director)',
      dg: 'HR managed by the executive director',
      externe: 'outsourced HR',
      aucune: 'no formal HR function',
    };
    if (hrFunction) {
      report += `**HR function:** ${hrFunctionLabels[hrFunction] ?? hrFunction}.\n\n`;
    }

    const indicators: string[] = [];
    if (turnover !== null && turnover > 0) indicators.push(`Turnover rate: **${turnover}%**`);
    if (vacancies !== null && vacancies > 0) indicators.push(`Current vacancies: **${vacancies}**`);
    if (indicators.length > 0) {
      report += `**Key indicators:** ${indicators.join(' · ')}\n\n`;
    }
  }

  // ——— Section 2: Défis identifiés ———
  report += isFr
    ? `## Défis prioritaires identifiés\n\n`
    : `## Priority Challenges Identified\n\n`;

  if (criticalChallenges.length === 0 && importantChallenges.length === 0) {
    report += isFr
      ? `Aucun défi critique ou important n'a été identifié dans le questionnaire.\n\n`
      : `No critical or important challenges were identified in the questionnaire.\n\n`;
  } else {
    if (criticalChallenges.length > 0) {
      report += isFr ? `**Défis critiques :**\n` : `**Critical challenges:**\n`;
      for (const f of criticalChallenges) {
        report += `- 🔴 ${challengeLabels[f]}\n`;
      }
      report += '\n';
    }
    if (importantChallenges.length > 0) {
      report += isFr ? `**Défis importants :**\n` : `**Important challenges:**\n`;
      for (const f of importantChallenges) {
        report += `- 🟡 ${challengeLabels[f]}\n`;
      }
      report += '\n';
    }
  }

  if (answers.challengeContext) {
    report += isFr
      ? `**Contexte additionnel :** ${answers.challengeContext}\n\n`
      : `**Additional context:** ${answers.challengeContext}\n\n`;
  }

  // ——— Section 3: Recommandations GRH ———
  report += isFr
    ? `## Recommandations GRH — Boîte à outils\n\n`
    : `## HR Recommendations — Toolkit\n\n`;

  if (topTools.length === 0) {
    report += isFr
      ? `Complétez la section des défis pour obtenir des recommandations personnalisées.\n\n`
      : `Complete the challenges section to receive personalized recommendations.\n\n`;
  } else {
    report += isFr
      ? `Sur la base de votre portrait organisationnel et de vos défis prioritaires, voici les **${topTools.length} outils de la Boîte à outils RH OBNL** les plus pertinents pour votre situation :\n\n`
      : `Based on your organizational profile and priority challenges, here are the **${topTools.length} tools from the NPO HR Toolkit** most relevant to your situation:\n\n`;

    for (const { code } of topTools) {
      const outil = OUTILS_METADATA[code];
      const stars = '⭐'.repeat(outil.étoiles);
      const priorityBadge = outil.priorité === 'HAUTE'
        ? (isFr ? '🔴 Priorité haute' : '🔴 High priority')
        : (isFr ? '🟡 Priorité moyenne' : '🟡 Medium priority');

      report += `### ${code} — ${outil.titre}\n\n`;
      report += `${stars} | **${outil.axe}** | ${priorityBadge} | `;
      report += isFr
        ? `Durée : ${outil.durée} | Fréquence : ${outil.fréquence}\n\n`
        : `Duration: ${outil.durée} | Frequency: ${outil.fréquence}\n\n`;

      const thèmesLabel = isFr ? 'Thèmes couverts' : 'Themes covered';
      report += `**${thèmesLabel} :** ${outil.thèmes.join(', ')}\n\n`;

      const pageLabel = isFr ? 'Voir page' : 'See page';
      report += `📄 *${pageLabel} ${outil.page_pdf} de la Boîte à outils RH OBNL*\n\n`;
      report += '---\n\n';
    }
  }

  // ——— Section 4: Quick wins ———
  report += isFr ? `## Quick Wins — Premières actions concrètes\n\n` : `## Quick Wins — First Concrete Actions\n\n`;

  const quickWins = topTools
    .filter(({ code }) => OUTILS_METADATA[code].priorité === 'HAUTE' && OUTILS_METADATA[code].étoiles === 3)
    .slice(0, 3);

  if (quickWins.length === 0) {
    report += isFr
      ? `Commencez par les outils à plus haute priorité listés dans la section précédente.\n\n`
      : `Start with the highest-priority tools listed in the previous section.\n\n`;
  } else {
    report += isFr
      ? `Ces **${quickWins.length} actions** peuvent être démarrées rapidement et auront un impact immédiat :\n\n`
      : `These **${quickWins.length} actions** can be started quickly and will have immediate impact:\n\n`;

    quickWins.forEach(({ code }, i) => {
      const outil = OUTILS_METADATA[code];
      report += `**${i + 1}. ${code} — ${outil.titre}**\n`;
      report += isFr
        ? `Investissement : ${outil.durée} · Impact : fort · Page ${outil.page_pdf}\n\n`
        : `Investment: ${outil.durée} · Impact: high · Page ${outil.page_pdf}\n\n`;
    });
  }

  // ——— Section 5: Parcours suggéré ———
  report += isFr ? `## Parcours suggéré\n\n` : `## Suggested Pathway\n\n`;

  const parcoursLabel = isFr ? parcours.labelFr : parcours.labelEn;
  const parcoursDesc = isFr ? parcours.descFr : parcours.descEn;

  report += `**${parcoursLabel}**\n\n`;
  report += `${parcoursDesc}\n\n`;

  report += isFr ? `**Séquence recommandée :**\n\n` : `**Recommended sequence:**\n\n`;
  parcours.outils.forEach((code, i) => {
    const outil = OUTILS_METADATA[code];
    report += `${i + 1}. **${code}** — ${outil.titre} *(${outil.durée})*\n`;
  });

  report += '\n';
  const toolkitUrl = 'https://drive.google.com/file/d/1TlUQ59UiVwSAnER7jWK_LsFvaPuhF7Ig/view?usp=sharing';

  report += isFr
    ? `> 💡 *Ce diagnostic démo est généré à partir de la Boîte à outils RH OBNL. Consultez la boîte à outils complète pour suivre les étapes recommandées : [📥 Télécharger la Boîte à outils RH OBNL](${toolkitUrl})*\n\n`
    : `> 💡 *This demo diagnostic is generated from the NPO HR Toolkit. Access the full toolkit to follow the recommended steps: [📥 Download the NPO HR Toolkit](${toolkitUrl})*\n\n`;

  report += isFr
    ? `> 🚀 *Pour un diagnostic complet ancré dans la littérature scientifique et personnalisé par l'IA, accédez à la version Premium.*\n`
    : `> 🚀 *For a complete AI-powered diagnostic grounded in scientific literature, access the Premium version.*\n`;

  return report;
}
