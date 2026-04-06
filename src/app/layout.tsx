import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import LanguageToggle from "@/components/shared/LanguageToggle";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "HR Compass — Plateforme de diagnostic RH",
  description: "Plateforme intelligente de diagnostic des ressources humaines pour les organismes à but non lucratif",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 antialiased">
        <header className="bg-slate-900 sticky top-0 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-semibold text-white text-base tracking-tight">
                HR <span className="text-blue-400">Compass</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link
                href="/diagnostic"
                className="text-sm text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all"
              >
                Diagnostic
              </Link>
              <div className="ml-2 pl-2 border-l border-slate-700">
                <LanguageToggle />
              </div>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-slate-900 border-t border-slate-800 py-6">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} HR Compass</span>
            <span>Plateforme de diagnostic RH basée sur la recherche scientifique</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
