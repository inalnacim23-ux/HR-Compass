import type { Translations } from './fr';

const en: Translations = {
  nav: {
    diagnostic: 'Diagnostic',
    admin: 'Documents',
    title: 'OBNL HR Diagnostic',
  },
  landing: {
    title: 'HR Diagnostic Platform for Non-Profit Organizations',
    subtitle:
      'Get a personalized HR diagnostic and a strategic action plan based on scientific research.',
    cta: 'Start the diagnostic',
    features: {
      f1: 'Detailed questionnaire in 8 sections',
      f2: 'Analysis based on scientific literature',
      f3: 'Strategic plan tailored to your context',
    },
  },
  form: {
    next: 'Next',
    previous: 'Previous',
    submit: 'Generate diagnostic',
    step: 'Step',
    of: 'of',
    required: 'This field is required',
  },
  report: {
    generating: 'Generating your diagnostic...',
    exportPdf: 'Export as PDF',
    newDiagnostic: 'New diagnostic',
    generatedFor: 'Diagnostic generated for',
  },
  admin: {
    title: 'Document management',
    upload: 'Upload a document',
    noDocuments: 'No documents uploaded',
  },
};

export default en;
