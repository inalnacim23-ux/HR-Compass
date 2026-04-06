'use client';

import { useEffect, useState } from 'react';
import type { DocumentRecord } from '@/types/document';
import DocumentList from '@/components/admin/DocumentList';
import UploadDropzone from '@/components/admin/UploadDropzone';

// ——— Password Gate ———
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        sessionStorage.setItem('admin_auth', '1');
        onAuth();
      } else {
        const data = await res.json();
        setError(data.error || 'Accès refusé');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base">Accès restreint</h1>
            <p className="text-xs text-slate-500">Gestion des documents</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Mot de passe administrateur
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
              placeholder="••••••••"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 transition-all"
          >
            {loading ? 'Vérification...' : 'Accéder'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ——— Admin Content ———
function AdminContent() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchDocuments() {
    const res = await fetch('/api/documents');
    const data = await res.json();
    setDocuments(data);
  }

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function handleUpload(file: File, label: string) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('label', label);
      const res = await fetch('/api/documents/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur lors de l'upload");
      }
      await fetchDocuments();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce document ?')) return;
    await fetch(`/api/documents?id=${id}`, { method: 'DELETE' });
    await fetchDocuments();
  }

  function handleLogout() {
    sessionStorage.removeItem('admin_auth');
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Gestion des documents</h1>
            <p className="text-slate-500 mt-1">
              Uploadez vos documents de recherche (PDF/DOCX) qui alimenteront le moteur de diagnostic IA.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-slate-400 hover:text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            Déconnexion
          </button>
        </div>

        <div className="mb-8">
          <UploadDropzone onUpload={handleUpload} uploading={uploading} />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Documents ({documents.length})
          </h2>
          <DocumentList documents={documents} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

// ——— Page ———
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem('admin_auth') === '1');
  }, []);

  // Avoid flash of gate before sessionStorage is read
  if (authed === null) return null;

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return <AdminContent />;
}
