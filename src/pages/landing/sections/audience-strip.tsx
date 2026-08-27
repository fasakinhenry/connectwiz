const AUDIENCES = [
  'Founders',
  'Engineers',
  'Designers',
  'Students',
  'Researchers',
  'Freelancers',
  'Investors',
  'Career switchers',
];

export function AudienceStrip() {
  return (
    <section className="border-y border-hairline bg-cloud py-7">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Built for
          </span>
          {AUDIENCES.map((label, i) => (
            <span key={label} className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-hairline-strong" aria-hidden="true" />}
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
