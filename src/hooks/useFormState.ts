'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { DiagnosticAnswers } from '@/types/questionnaire';
import { STEPS } from '@/lib/questionnaire/steps';

const STORAGE_KEY = 'obnl_diagnostic_form';

interface StoredForm {
  sessionId: string;
  currentStep: number;
  answers: DiagnosticAnswers;
  language: 'fr' | 'en';
}

function loadFromStorage(): StoredForm | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToStorage(state: StoredForm) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useFormState(language: 'fr' | 'en') {
  const [sessionId] = useState(() => {
    const stored = loadFromStorage();
    return stored?.sessionId ?? uuidv4();
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setCurrentStep(stored.currentStep);
      setAnswers(stored.answers);
    }
  }, []);

  useEffect(() => {
    saveToStorage({ sessionId, currentStep, answers, language });
  }, [sessionId, currentStep, answers, language]);

  const setFieldValue = useCallback(
    (fieldId: string, value: string | string[] | number) => {
      setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const isLastStep = currentStep === STEPS.length - 1;

  function validateStep(stepIndex: number): boolean {
    const step = STEPS[stepIndex];
    return step.fields
      .filter((f) => f.required)
      .every((f) => {
        const val = answers[f.id];
        if (val === undefined || val === null || val === '') return false;
        if (Array.isArray(val)) return val.length > 0;
        return true;
      });
  }

  function clearStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return {
    sessionId,
    currentStep,
    answers,
    setFieldValue,
    nextStep,
    prevStep,
    isLastStep,
    validateStep,
    clearStorage,
  };
}
