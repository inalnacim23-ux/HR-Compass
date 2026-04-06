'use client';

import { useRef, useState } from 'react';

interface Props {
  onUpload: (file: File, label: string) => Promise<void>;
  uploading: boolean;
}

export default function UploadDropzone({ onUpload, uploading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [label, setLabel] = useState('');

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    await onUpload(files[0], label);
    setLabel('');
  }

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Étiquette du document (optionnel)"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <p className="text-blue-600 font-medium">Traitement en cours...</p>
        ) : (
          <>
            <p className="text-gray-600 font-medium">
              Glissez-déposez un fichier ou cliquez pour sélectionner
            </p>
            <p className="text-sm text-gray-400 mt-1">PDF ou DOCX · max 20 MB</p>
          </>
        )}
      </div>
    </div>
  );
}
