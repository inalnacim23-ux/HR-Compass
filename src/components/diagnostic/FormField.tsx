'use client';

import type { FormField as FormFieldType } from '@/types/questionnaire';
import type { DiagnosticAnswers } from '@/types/questionnaire';

interface Props {
  field: FormFieldType;
  value: DiagnosticAnswers[string];
  onChange: (value: string | string[] | number) => void;
  lang: 'fr' | 'en';
}

export default function FormField({ field, value, onChange, lang }: Props) {
  const label = lang === 'fr' ? field.labelFr : field.labelEn;

  const inputClass =
    'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  if (field.type === 'text') {
    return (
      <div>
        <Label label={label} required={field.required} />
        <input
          type="text"
          className={inputClass}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'number') {
    return (
      <div>
        <Label label={label} required={field.required} />
        <input
          type="number"
          className={inputClass}
          min={field.min}
          max={field.max}
          value={(value as number) ?? ''}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  if (field.type === 'textarea') {
    return (
      <div>
        <Label label={label} required={field.required} />
        <textarea
          className={`${inputClass} min-h-[100px] resize-y`}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  if (field.type === 'select') {
    return (
      <div>
        <Label label={label} required={field.required} />
        <select
          className={inputClass}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- {lang === 'fr' ? 'Sélectionnez' : 'Select'} --</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {lang === 'fr' ? opt.labelFr : opt.labelEn}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === 'radio') {
    return (
      <div>
        <Label label={label} required={field.required} />
        <div className="space-y-2 mt-1">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={field.id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                className="accent-blue-600"
              />
              <span className="text-sm text-slate-800">
                {lang === 'fr' ? opt.labelFr : opt.labelEn}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'checkbox') {
    const selected = (value as string[]) ?? [];
    return (
      <div>
        <Label label={label} required={field.required} />
        <div className="space-y-2 mt-1">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={opt.value}
                checked={selected.includes(opt.value)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...selected, opt.value]
                    : selected.filter((v) => v !== opt.value);
                  onChange(updated);
                }}
                className="accent-blue-600"
              />
              <span className="text-sm text-slate-800">
                {lang === 'fr' ? opt.labelFr : opt.labelEn}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === 'scale') {
    const min = field.min ?? 1;
    const max = field.max ?? 10;
    const current = (value as number) ?? min;
    return (
      <div>
        <Label label={label} required={field.required} />
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-slate-500">{min}</span>
          <input
            type="range"
            min={min}
            max={max}
            value={current}
            onChange={(e) => onChange(Number(e.target.value))}
            className="flex-1 accent-blue-600"
          />
          <span className="text-sm text-slate-500">{max}</span>
          <span className="ml-2 font-semibold text-blue-600 w-6 text-center">{current}</span>
        </div>
      </div>
    );
  }

  return null;
}

function Label({ label, required }: { label: string; required: boolean }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
