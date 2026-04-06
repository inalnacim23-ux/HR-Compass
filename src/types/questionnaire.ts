export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'scale'
  | 'percentage';

export interface SelectOption {
  value: string;
  labelFr: string;
  labelEn: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  labelFr: string;
  labelEn: string;
  required: boolean;
  options?: SelectOption[];
  min?: number;
  max?: number;
  placeholder?: string;
}

export interface FormStep {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr?: string;
  descriptionEn?: string;
  fields: FormField[];
}

export type DiagnosticAnswers = Record<string, string | string[] | number>;

export interface DiagnosticFormState {
  currentStep: number;
  answers: DiagnosticAnswers;
  language: 'fr' | 'en';
  sessionId: string;
}
