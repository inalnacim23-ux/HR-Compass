import Link from 'next/link';

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'Questionnaire en 8 sections',
    desc: 'Structure RH, défis, pratiques, gouvernance, culture organisationnelle — une analyse exhaustive de votre réalité.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Ancré dans la recherche',
    desc: 'L\'IA s\'appuie sur votre revue de littérature scientifique et votre boîte à outils pour formuler ses recommandations.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Plan stratégique personnalisé',
    desc: 'Diagnostic complet + plan d\'action sur 12–24 mois, adapté aux contraintes réelles de votre OBNL.',
  },
];

const steps = [
  { num: '01', label: 'Remplissez le questionnaire' },
  { num: '02', label: 'L\'IA analyse votre contexte' },
  { num: '03', label: 'Recevez votre plan stratégique' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Alimenté par Claude AI · Basé sur la recherche scientifique
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Diagnostiquez votre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                gestion RH
              </span>{' '}
              en quelques minutes
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl">
              Une plateforme intelligente spécialement conçue pour les OBNL. Obtenez un diagnostic
              personnalisé et un plan d&apos;action stratégique ancré dans la littérature scientifique.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Commencer le diagnostic gratuit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <span className="text-slate-400 text-sm">Environ 15–20 minutes · Rapport immédiat</span>
            </div>
          </div>
        </div>

        {/* Steps bar */}
        <div className="relative border-t border-slate-700/50">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue-400/60 font-mono">{s.num}</span>
                    <span className="text-sm text-slate-300">{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block h-px flex-1 bg-slate-700 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Tout ce dont votre OBNL a besoin
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Une approche rigoureuse, adaptée aux réalités et contraintes du tiers secteur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Prêt à démarrer ?</h3>
            <p className="text-slate-400 text-sm">
              Complétez le questionnaire en 15–20 minutes et recevez votre diagnostic immédiatement.
            </p>
          </div>
          <Link
            href="/diagnostic"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
          >
            Commencer maintenant
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
