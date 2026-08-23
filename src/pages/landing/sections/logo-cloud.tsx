const LOGOS = ['buildspace', 'foundersdesk', 'cohortly', 'shipfast', 'orbitclub', 'loopwork'];

export function LogoCloud() {
  return (
    <section className="border-y border-hairline bg-cloud py-8">
      <div className="container-page">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-ink-soft">
          trusted by builders and communities growing their network on connectwiz
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {LOGOS.map((name) => (
            <span
              key={name}
              className="text-lg font-bold tracking-tight text-ink-soft opacity-70 transition-opacity duration-200 hover:opacity-100"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
