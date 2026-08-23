const ACTIVITY = [
  { name: 'amara', action: 'hit a 214-day streak', time: '2h', hue: '#287bff' },
  { name: 'kunle', action: 'joined the #100DaysOfCode circle', time: '5h', hue: '#ff8a3d' },
  { name: 'jordan', action: 'earned the "diamond" badge', time: '7h', hue: '#22c55e' },
];

export function ActivityFeed() {
  return (
    <div className="rounded-lg border-2 border-hairline p-5">
      <h2 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
        cheering you on
      </h2>
      <ul className="mt-4 flex flex-col gap-4">
        {ACTIVITY.map((item) => (
          <li key={item.name} className="flex items-start gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: item.hue }}
            >
              {item.name[0].toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink)">
                <span className="font-bold">{item.name}</span> {item.action}
              </p>
              <p className="text-xs font-semibold text-ink-soft">{item.time} ago</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-pill border-2 border-hairline px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-link transition-colors duration-200 hover:bg-cloud"
            >
              cheer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
