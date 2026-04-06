export default function StreamingIndicator({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <div className="flex items-center gap-3 text-blue-600 py-8">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <span className="text-sm font-medium">
        {lang === 'fr' ? 'Génération du diagnostic en cours...' : 'Generating your diagnostic...'}
      </span>
    </div>
  );
}
