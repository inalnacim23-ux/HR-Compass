const fr = {
  nav: {
    diagnostic: 'Diagnostic',
    admin: 'Documents',
    title: 'HR Compass',
  },
  landing: {
    title: 'Plateforme de Diagnostic RH pour OBNL',
    subtitle:
      'Obtenez un diagnostic personnalisé de votre situation RH et un plan d\'action stratégique basé sur la recherche scientifique.',
    cta: 'Commencer le diagnostic',
    features: {
      f1: 'Questionnaire détaillé en 8 sections',
      f2: 'Analyse basée sur la littérature scientifique',
      f3: 'Plan stratégique personnalisé à votre contexte',
    },
  },
  form: {
    next: 'Suivant',
    previous: 'Précédent',
    submit: 'Générer le diagnostic',
    step: 'Étape',
    of: 'sur',
    required: 'Ce champ est requis',
  },
  report: {
    generating: 'Génération du diagnostic en cours...',
    exportPdf: 'Exporter en PDF',
    newDiagnostic: 'Nouveau diagnostic',
    generatedFor: 'Diagnostic généré pour',
  },
  admin: {
    title: 'Gestion des documents',
    upload: 'Uploader un document',
    noDocuments: 'Aucun document uploadé',
  },
};

export default fr;
export type Translations = typeof fr;
