import type { FormStep } from '@/types/questionnaire';

export const STEPS: FormStep[] = [
  {
    id: 'step1',
    titleFr: 'Profil organisationnel',
    titleEn: 'Organizational Profile',
    descriptionFr: 'Décrivez votre organisation.',
    descriptionEn: 'Describe your organization.',
    fields: [
      { id: 'orgName', type: 'text', labelFr: "Nom de l'organisation", labelEn: 'Organization name', required: true },
      { id: 'mission', type: 'textarea', labelFr: 'Mission principale', labelEn: 'Main mission', required: true },
      {
        id: 'sector', type: 'select', labelFr: "Secteur d'activité", labelEn: 'Sector', required: true,
        options: [
          { value: 'sante', labelFr: 'Santé', labelEn: 'Health' },
          { value: 'services_sociaux', labelFr: 'Services sociaux', labelEn: 'Social services' },
          { value: 'education', labelFr: 'Éducation', labelEn: 'Education' },
          { value: 'culture', labelFr: 'Culture / Arts', labelEn: 'Culture / Arts' },
          { value: 'environnement', labelFr: 'Environnement', labelEn: 'Environment' },
          { value: 'sport_loisirs', labelFr: 'Sport / Loisirs', labelEn: 'Sport / Leisure' },
          { value: 'logement', labelFr: 'Logement communautaire', labelEn: 'Community housing' },
          { value: 'dev_eco', labelFr: 'Développement économique', labelEn: 'Economic development' },
          { value: 'international', labelFr: 'International / Coopération', labelEn: 'International / Cooperation' },
          { value: 'autre', labelFr: 'Autre', labelEn: 'Other' },
        ],
      },
      { id: 'region', type: 'text', labelFr: 'Région / Territoire desservi', labelEn: 'Region / Territory served', required: false },
      {
        id: 'budget', type: 'select', labelFr: 'Budget annuel total', labelEn: 'Total annual budget', required: true,
        options: [
          { value: '<250k', labelFr: 'Moins de 250 000$', labelEn: 'Less than $250,000' },
          { value: '250k-500k', labelFr: '250 000$ – 500 000$', labelEn: '$250,000 – $500,000' },
          { value: '500k-1m', labelFr: '500 000$ – 1M$', labelEn: '$500,000 – $1M' },
          { value: '1m-3m', labelFr: '1M$ – 3M$', labelEn: '$1M – $3M' },
          { value: '3m-10m', labelFr: '3M$ – 10M$', labelEn: '$3M – $10M' },
          { value: '>10m', labelFr: 'Plus de 10M$', labelEn: 'More than $10M' },
        ],
      },
      {
        id: 'funding', type: 'checkbox', labelFr: 'Sources de financement principales', labelEn: 'Main funding sources', required: false,
        options: [
          { value: 'prov', labelFr: 'Gouvernement provincial', labelEn: 'Provincial government' },
          { value: 'fed', labelFr: 'Gouvernement fédéral', labelEn: 'Federal government' },
          { value: 'mun', labelFr: 'Gouvernement municipal', labelEn: 'Municipal government' },
          { value: 'fond', labelFr: 'Fondations privées', labelEn: 'Private foundations' },
          { value: 'dons', labelFr: 'Dons individuels', labelEn: 'Individual donations' },
          { value: 'revenus', labelFr: 'Revenus autonomes / services', labelEn: 'Autonomous revenues / services' },
          { value: 'cotisations', labelFr: 'Cotisations membres', labelEn: 'Member fees' },
        ],
      },
    ],
  },
  {
    id: 'step2',
    titleFr: 'Structure RH et capacité organisationnelle',
    titleEn: 'HR Structure & Organizational Capacity',
    fields: [
      { id: 'totalETP', type: 'number', labelFr: "Nombre total d'employés (ETP)", labelEn: 'Total employees (FTE)', required: true, min: 0 },
      { id: 'fullTime', type: 'number', labelFr: 'Dont temps plein', labelEn: 'Full-time', required: false, min: 0 },
      { id: 'partTime', type: 'number', labelFr: 'Dont temps partiel', labelEn: 'Part-time', required: false, min: 0 },
      { id: 'permanent', type: 'number', labelFr: 'Postes permanents', labelEn: 'Permanent positions', required: false, min: 0 },
      { id: 'contract', type: 'number', labelFr: 'Postes contractuels', labelEn: 'Contract positions', required: false, min: 0 },
      {
        id: 'hrFunction', type: 'radio', labelFr: 'Présence d\'une fonction RH dédiée', labelEn: 'Dedicated HR function', required: true,
        options: [
          { value: 'direction_rh', labelFr: 'Oui, direction RH', labelEn: 'Yes, HR director' },
          { value: 'poste_rh', labelFr: 'Oui, poste RH sans direction', labelEn: 'Yes, HR role (no director)' },
          { value: 'dg', labelFr: 'Non, RH assurées par la DG', labelEn: 'No, HR managed by ED' },
          { value: 'externe', labelFr: 'Non, RH externalisées', labelEn: 'No, HR outsourced' },
          { value: 'aucune', labelFr: 'Non, aucune fonction RH', labelEn: 'No HR function' },
        ],
      },
      {
        id: 'union', type: 'radio', labelFr: 'Présence d\'un syndicat', labelEn: 'Union presence', required: true,
        options: [
          { value: 'oui', labelFr: 'Oui', labelEn: 'Yes' },
          { value: 'en_cours', labelFr: 'En cours de syndicalisation', labelEn: 'Unionization in progress' },
          { value: 'non', labelFr: 'Non', labelEn: 'No' },
        ],
      },
      { id: 'volunteers', type: 'number', labelFr: 'Nombre de bénévoles actifs', labelEn: 'Number of active volunteers', required: false, min: 0 },
    ],
  },
  {
    id: 'step3',
    titleFr: 'Portrait de la main-d\'œuvre',
    titleEn: 'Workforce Profile',
    fields: [
      {
        id: 'genderDist', type: 'radio', labelFr: 'Genre dominant dans l\'organisation', labelEn: 'Predominant gender', required: false,
        options: [
          { value: 'majorite_femmes', labelFr: 'Majorité de femmes (>60%)', labelEn: 'Majority women (>60%)' },
          { value: 'paritaire', labelFr: 'Paritaire', labelEn: 'Gender parity' },
          { value: 'majorite_hommes', labelFr: 'Majorité d\'hommes (>60%)', labelEn: 'Majority men (>60%)' },
        ],
      },
      {
        id: 'ageGroup', type: 'checkbox', labelFr: 'Tranches d\'âge dominantes', labelEn: 'Dominant age groups', required: false,
        options: [
          { value: '18-30', labelFr: '18–30 ans', labelEn: '18–30' },
          { value: '31-40', labelFr: '31–40 ans', labelEn: '31–40' },
          { value: '41-50', labelFr: '41–50 ans', labelEn: '41–50' },
          { value: '51-60', labelFr: '51–60 ans', labelEn: '51–60' },
          { value: '60+', labelFr: '60 ans et plus', labelEn: '60+' },
        ],
      },
      { id: 'avgTenure', type: 'number', labelFr: 'Ancienneté moyenne (années)', labelEn: 'Average tenure (years)', required: false, min: 0 },
      { id: 'turnoverRate', type: 'number', labelFr: 'Taux de roulement annuel (%)', labelEn: 'Annual turnover rate (%)', required: false, min: 0, max: 100 },
      { id: 'vacantPositions', type: 'number', labelFr: 'Nombre de postes vacants actuellement', labelEn: 'Current vacant positions', required: false, min: 0 },
      { id: 'avgRecruitWeeks', type: 'number', labelFr: 'Délai moyen de dotation (semaines)', labelEn: 'Average recruitment time (weeks)', required: false, min: 0 },
      {
        id: 'absenteeism', type: 'radio', labelFr: 'Absentéisme', labelEn: 'Absenteeism', required: false,
        options: [
          { value: 'faible', labelFr: 'Faible', labelEn: 'Low' },
          { value: 'modere', labelFr: 'Modéré', labelEn: 'Moderate' },
          { value: 'eleve', labelFr: 'Élevé', labelEn: 'High' },
          { value: 'non_mesure', labelFr: 'Non mesuré', labelEn: 'Not measured' },
        ],
      },
    ],
  },
  {
    id: 'step4',
    titleFr: 'Défis et enjeux RH',
    titleEn: 'HR Challenges',
    descriptionFr: 'Évaluez chaque défi selon son niveau d\'importance pour votre organisation.',
    descriptionEn: 'Rate each challenge by its importance level for your organization.',
    fields: [
      {
        id: 'challenge_recruitment', type: 'radio', labelFr: 'Attraction et recrutement', labelEn: 'Attraction & recruitment', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_retention', type: 'radio', labelFr: 'Rétention du personnel', labelEn: 'Staff retention', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_burnout', type: 'radio', labelFr: 'Épuisement professionnel (burnout)', labelEn: 'Burnout / overload', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_salaries', type: 'radio', labelFr: 'Financement insuffisant pour salaires compétitifs', labelEn: 'Insufficient funding for competitive salaries', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_training', type: 'radio', labelFr: 'Développement des compétences et formation', labelEn: 'Skills development & training', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_succession', type: 'radio', labelFr: 'Succession et relève', labelEn: 'Succession planning', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_leadership', type: 'radio', labelFr: 'Défis de leadership chez les gestionnaires', labelEn: 'Leadership challenges in managers', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_edi', type: 'radio', labelFr: 'Équité, diversité et inclusion (EDI)', labelEn: 'Equity, diversity & inclusion (EDI)', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      {
        id: 'challenge_wellbeing', type: 'radio', labelFr: 'Bien-être psychologique et santé mentale', labelEn: 'Psychological wellbeing & mental health', required: false,
        options: [
          { value: 'nc', labelFr: 'Non concerné', labelEn: 'Not concerned' },
          { value: 'mineur', labelFr: 'Défi mineur', labelEn: 'Minor challenge' },
          { value: 'important', labelFr: 'Défi important', labelEn: 'Important challenge' },
          { value: 'critique', labelFr: 'Défi critique', labelEn: 'Critical challenge' },
        ],
      },
      { id: 'challengeContext', type: 'textarea', labelFr: 'Contexte de vos défis prioritaires : causes supposées, actions déjà tentées, résultat souhaité', labelEn: 'Context of your main challenges: assumed causes, actions already tried, desired outcome', required: false },
    ],
  },
  {
    id: 'step5',
    titleFr: 'Pratiques RH actuelles',
    titleEn: 'Current HR Practices',
    fields: [
      {
        id: 'recruitmentProcess', type: 'radio', labelFr: 'Processus de sélection documenté', labelEn: 'Documented selection process', required: false,
        options: [
          { value: 'oui_structure', labelFr: 'Oui, structuré', labelEn: 'Yes, structured' },
          { value: 'informel', labelFr: 'Informel', labelEn: 'Informal' },
          { value: 'aucun', labelFr: 'Aucun', labelEn: 'None' },
        ],
      },
      {
        id: 'onboarding', type: 'radio', labelFr: 'Programme d\'accueil formalisé', labelEn: 'Formalized onboarding program', required: false,
        options: [
          { value: 'oui_complet', labelFr: 'Oui, complet', labelEn: 'Yes, complete' },
          { value: 'partiel', labelFr: 'Partiel', labelEn: 'Partial' },
          { value: 'non', labelFr: 'Non', labelEn: 'No' },
        ],
      },
      {
        id: 'performanceReview', type: 'radio', labelFr: 'Évaluations de performance formelles', labelEn: 'Formal performance reviews', required: false,
        options: [
          { value: 'annuelles', labelFr: 'Annuelles', labelEn: 'Annual' },
          { value: 'bi_annuelles', labelFr: 'Bi-annuelles', labelEn: 'Semi-annual' },
          { value: 'informelles', labelFr: 'Informelles seulement', labelEn: 'Informal only' },
          { value: 'aucune', labelFr: 'Aucune', labelEn: 'None' },
        ],
      },
      {
        id: 'trainingBudget', type: 'select', labelFr: 'Budget formation annuel (par employé)', labelEn: 'Annual training budget (per employee)', required: false,
        options: [
          { value: '0', labelFr: '0$', labelEn: '$0' },
          { value: '1-250', labelFr: '1$ – 250$', labelEn: '$1 – $250' },
          { value: '251-500', labelFr: '251$ – 500$', labelEn: '$251 – $500' },
          { value: '501-1000', labelFr: '501$ – 1 000$', labelEn: '$501 – $1,000' },
          { value: '1000+', labelFr: 'Plus de 1 000$', labelEn: 'More than $1,000' },
        ],
      },
      {
        id: 'salaryPolicy', type: 'radio', labelFr: 'Politique salariale formalisée', labelEn: 'Formalized salary policy', required: false,
        options: [
          { value: 'echelles', labelFr: 'Oui, avec échelles salariales', labelEn: 'Yes, with salary scales' },
          { value: 'informelle', labelFr: 'Informelle', labelEn: 'Informal' },
          { value: 'non', labelFr: 'Non', labelEn: 'No' },
        ],
      },
      {
        id: 'benefits', type: 'checkbox', labelFr: 'Avantages sociaux offerts', labelEn: 'Benefits offered', required: false,
        options: [
          { value: 'assurance', labelFr: 'Assurance collective', labelEn: 'Group insurance' },
          { value: 'reer', labelFr: 'REER collectif', labelEn: 'Group RRSP' },
          { value: 'conges', labelFr: 'Congés bonifiés', labelEn: 'Enhanced leave' },
          { value: 'teletravail', labelFr: 'Télétravail', labelEn: 'Remote work' },
          { value: 'flexibilite', labelFr: 'Horaires flexibles', labelEn: 'Flexible hours' },
          { value: 'pae', labelFr: 'Programme d\'aide aux employés (PAE)', labelEn: 'Employee assistance program (EAP)' },
        ],
      },
      {
        id: 'salaryCompetitiveness', type: 'radio', labelFr: 'Compétitivité salariale vs le secteur', labelEn: 'Salary competitiveness vs sector', required: false,
        options: [
          { value: 'tres_competitif', labelFr: 'Très compétitif', labelEn: 'Very competitive' },
          { value: 'comparable', labelFr: 'Comparable', labelEn: 'Comparable' },
          { value: 'legere', labelFr: 'Légèrement en-dessous', labelEn: 'Slightly below' },
          { value: 'significatif', labelFr: 'Significativement en-dessous', labelEn: 'Significantly below' },
        ],
      },
      {
        id: 'internalComm', type: 'radio', labelFr: 'Réunions d\'équipe régulières', labelEn: 'Regular team meetings', required: false,
        options: [
          { value: 'hebdo', labelFr: 'Hebdomadaires', labelEn: 'Weekly' },
          { value: 'bi_hebdo', labelFr: 'Bimensuelles', labelEn: 'Bi-weekly' },
          { value: 'mensuelles', labelFr: 'Mensuelles', labelEn: 'Monthly' },
          { value: 'irregulieres', labelFr: 'Irrégulières', labelEn: 'Irregular' },
          { value: 'aucune', labelFr: 'Aucune', labelEn: 'None' },
        ],
      },
    ],
  },
  {
    id: 'step6',
    titleFr: 'Gouvernance et leadership',
    titleEn: 'Governance & Leadership',
    fields: [
      { id: 'boardSize', type: 'number', labelFr: 'Taille du conseil d\'administration (CA)', labelEn: 'Board of directors size', required: false, min: 0 },
      {
        id: 'boardHrCommittee', type: 'radio', labelFr: 'Comité RH au CA', labelEn: 'HR committee on the board', required: false,
        options: [
          { value: 'oui_actif', labelFr: 'Oui, actif', labelEn: 'Yes, active' },
          { value: 'oui_inactif', labelFr: 'Oui, mais inactif', labelEn: 'Yes, but inactive' },
          { value: 'non', labelFr: 'Non', labelEn: 'No' },
        ],
      },
      {
        id: 'dgTenure', type: 'select', labelFr: 'Ancienneté de la direction générale', labelEn: 'Executive director tenure', required: false,
        options: [
          { value: '<1', labelFr: 'Moins de 1 an', labelEn: 'Less than 1 year' },
          { value: '1-3', labelFr: '1 – 3 ans', labelEn: '1 – 3 years' },
          { value: '3-5', labelFr: '3 – 5 ans', labelEn: '3 – 5 years' },
          { value: '5-10', labelFr: '5 – 10 ans', labelEn: '5 – 10 years' },
          { value: '>10', labelFr: 'Plus de 10 ans', labelEn: 'More than 10 years' },
        ],
      },
      {
        id: 'successionPlan', type: 'radio', labelFr: 'Plan de relève pour la direction générale', labelEn: 'Succession plan for executive director', required: false,
        options: [
          { value: 'oui', labelFr: 'Oui, formalisé', labelEn: 'Yes, formalized' },
          { value: 'reflexion', labelFr: 'En réflexion', labelEn: 'Under consideration' },
          { value: 'non', labelFr: 'Non', labelEn: 'No' },
        ],
      },
      {
        id: 'leadershipStyle', type: 'radio', labelFr: 'Style de leadership dominant', labelEn: 'Dominant leadership style', required: false,
        options: [
          { value: 'directif', labelFr: 'Directif', labelEn: 'Directive' },
          { value: 'participatif', labelFr: 'Participatif', labelEn: 'Participative' },
          { value: 'delegant', labelFr: 'Délégant', labelEn: 'Delegating' },
          { value: 'transformationnel', labelFr: 'Transformationnel', labelEn: 'Transformational' },
          { value: 'variable', labelFr: 'Variable selon les gestionnaires', labelEn: 'Variable by manager' },
        ],
      },
      {
        id: 'teamAutonomy', type: 'radio', labelFr: 'Autonomie décisionnelle des équipes', labelEn: 'Team decision-making autonomy', required: false,
        options: [
          { value: 'tres_grande', labelFr: 'Très grande', labelEn: 'Very high' },
          { value: 'moderee', labelFr: 'Modérée', labelEn: 'Moderate' },
          { value: 'faible', labelFr: 'Faible', labelEn: 'Low' },
          { value: 'centralise', labelFr: 'Très faible (centralisé)', labelEn: 'Very low (centralized)' },
        ],
      },
    ],
  },
  {
    id: 'step7',
    titleFr: 'Culture organisationnelle et engagement',
    titleEn: 'Organizational Culture & Engagement',
    fields: [
      {
        id: 'values', type: 'radio', labelFr: 'Valeurs organisationnelles formalisées', labelEn: 'Formalized organizational values', required: false,
        options: [
          { value: 'affichees_vecues', labelFr: 'Oui, affichées et vécues', labelEn: 'Yes, displayed and lived' },
          { value: 'affichees_peu', labelFr: 'Oui, affichées mais peu vécues', labelEn: 'Yes, displayed but rarely lived' },
          { value: 'non', labelFr: 'Non formalisées', labelEn: 'Not formalized' },
        ],
      },
      { id: 'belongingScore', type: 'scale', labelFr: 'Sentiment d\'appartenance (1–10)', labelEn: 'Sense of belonging (1–10)', required: false, min: 1, max: 10 },
      { id: 'trustScore', type: 'scale', labelFr: 'Niveau de confiance employés–direction (1–10)', labelEn: 'Trust level employees–management (1–10)', required: false, min: 1, max: 10 },
      {
        id: 'recognition', type: 'radio', labelFr: 'Reconnaissance au travail', labelEn: 'Workplace recognition', required: false,
        options: [
          { value: 'formelle_informelle', labelFr: 'Pratiques formelles + informelles', labelEn: 'Formal + informal practices' },
          { value: 'surtout_informelle', labelFr: 'Surtout informelle', labelEn: 'Mostly informal' },
          { value: 'peu', labelFr: 'Peu ou pas de reconnaissance', labelEn: 'Little or no recognition' },
        ],
      },
      {
        id: 'conflictManagement', type: 'radio', labelFr: 'Gestion des conflits', labelEn: 'Conflict management', required: false,
        options: [
          { value: 'politique', labelFr: 'Politique et processus clairs', labelEn: 'Clear policy and process' },
          { value: 'cas_par_cas', labelFr: 'Gestion cas par cas', labelEn: 'Case by case' },
          { value: 'evitement', labelFr: 'Évitement', labelEn: 'Avoidance' },
          { value: 'non_gere', labelFr: 'Non géré', labelEn: 'Unmanaged' },
        ],
      },
      { id: 'mobilizationScore', type: 'scale', labelFr: 'Niveau de mobilisation du personnel (1–5)', labelEn: 'Staff mobilization level (1–5)', required: false, min: 1, max: 5 },
      {
        id: 'wellbeingInitiative', type: 'radio', labelFr: 'Initiative de bien-être psychologique', labelEn: 'Psychological wellbeing initiative', required: false,
        options: [
          { value: 'programme', labelFr: 'Programme structuré', labelEn: 'Structured program' },
          { value: 'ponctuel', labelFr: 'Actions ponctuelles', labelEn: 'Occasional actions' },
          { value: 'aucune', labelFr: 'Aucune', labelEn: 'None' },
        ],
      },
    ],
  },
  {
    id: 'step8',
    titleFr: 'Priorités et capacité de changement',
    titleEn: 'Priorities & Change Readiness',
    fields: [
      {
        id: 'planningHorizon', type: 'radio', labelFr: 'Horizon de planification RH actuel', labelEn: 'Current HR planning horizon', required: false,
        options: [
          { value: 'reactif', labelFr: 'Réactif (pas de planification)', labelEn: 'Reactive (no planning)' },
          { value: 'court', labelFr: 'Court terme (< 1 an)', labelEn: 'Short term (< 1 year)' },
          { value: 'moyen', labelFr: 'Moyen terme (1–3 ans)', labelEn: 'Medium term (1–3 years)' },
          { value: 'long', labelFr: 'Long terme (3–5 ans)', labelEn: 'Long term (3–5 years)' },
        ],
      },
      {
        id: 'changeCapacity', type: 'radio', labelFr: 'Capacité interne à mener des projets RH', labelEn: 'Internal capacity to lead HR projects', required: false,
        options: [
          { value: 'forte', labelFr: 'Forte', labelEn: 'Strong' },
          { value: 'moderee', labelFr: 'Modérée', labelEn: 'Moderate' },
          { value: 'faible', labelFr: 'Faible', labelEn: 'Weak' },
          { value: 'nulle', labelFr: 'Nulle', labelEn: 'None' },
        ],
      },
      { id: 'changeAppetite', type: 'scale', labelFr: 'Appétit pour le changement (1 = très résistant → 5 = très ouvert)', labelEn: 'Change appetite (1 = very resistant → 5 = very open)', required: false, min: 1, max: 5 },
      {
        id: 'hrBudget', type: 'select', labelFr: 'Budget disponible pour initiatives RH cette année', labelEn: 'Available budget for HR initiatives this year', required: false,
        options: [
          { value: '0', labelFr: '0$', labelEn: '$0' },
          { value: '1-5000', labelFr: '1$ – 5 000$', labelEn: '$1 – $5,000' },
          { value: '5000-15000', labelFr: '5 000$ – 15 000$', labelEn: '$5,000 – $15,000' },
          { value: '15000-50000', labelFr: '15 000$ – 50 000$', labelEn: '$15,000 – $50,000' },
          { value: '50000+', labelFr: 'Plus de 50 000$', labelEn: 'More than $50,000' },
        ],
      },
      { id: 'motivation', type: 'textarea', labelFr: 'Qu\'est-ce qui vous a motivé à faire ce diagnostic aujourd\'hui ?', labelEn: 'What motivated you to do this diagnostic today?', required: false },
      { id: 'expectedOutcomes', type: 'textarea', labelFr: 'Quels sont vos 3 résultats prioritaires attendus de ce diagnostic ?', labelEn: 'What are your top 3 expected outcomes from this diagnostic?', required: true },
      { id: 'constraints', type: 'textarea', labelFr: 'Y a-t-il des contraintes importantes à mentionner ? (légales, politiques, financières)', labelEn: 'Are there any important constraints to mention? (legal, political, financial)', required: false },
    ],
  },
];
