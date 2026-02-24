'use client';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { num: 847,  label: 'Contributions' },
  { num: 24,   label: 'Repositories'  },
  { num: 312,  label: 'GitHub Stars'  },
  { num: 18,   label: 'Pull Requests' },
];

function useCountUp(target: number, triggered: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [triggered, target, duration]);
  return count;
}

function StatCard({ num, label, triggered }: { num: number; label: string; triggered: boolean }) {
  const count = useCountUp(num, triggered);
  return (
    <div
      className="rounded-xl p-6 text-center transition-all duration-300"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <span className="block font-display font-extrabold text-4xl" style={{ color: 'var(--accent)' }}>
        {count.toLocaleString()}
      </span>
      <span className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  );
}

function ContribGraph() {
  const cells = useRef<number[]>([]);
  if (cells.current.length === 0) {
    const total = 53 * 7;
    for (let i = 0; i < total; i++) {
      const r = Math.random();
      cells.current.push(r > 0.55 ? Math.floor(Math.random() * 4) + 1 : 0);
    }
    // Spike recent activity
    for (let i = total - 30; i < total; i++) {
      if (Math.random() > 0.3) cells.current[i] = Math.floor(Math.random() * 4) + 1;
    }
  }

  const levelColors = [
    'var(--bg-3)',
    'rgba(127,255,110,0.2)',
    'rgba(127,255,110,0.4)',
    'rgba(127,255,110,0.65)',
    'rgba(127,255,110,0.9)',
  ];

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex justify-between items-center mb-5">
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          Contribution activity — last 12 months
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
          Less
          {[0,1,2,3,4].map(l => (
            <div key={l} style={{ width: 12, height: 12, borderRadius: 2, background: levelColors[l] }} />
          ))}
          More
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(53, 1fr)', gap: 3, overflowX: 'auto' }}>
        {cells.current.map((level, i) => (
          <div
            key={i}
            title={level === 0 ? 'No contributions' : `${level} contribution(s)`}
            style={{
              aspectRatio: '1',
              borderRadius: 2,
              background: levelColors[level],
              minWidth: 10,
              transition: 'transform 0.1s',
              cursor: 'default',
            }}
            onMouseEnter={e => ((e.target as HTMLElement).style.transform = 'scale(1.5)')}
            onMouseLeave={e => ((e.target as HTMLElement).style.transform = 'scale(1)')}
          />
        ))}
      </div>
    </div>
  );
}

export default function GithubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="github" className="py-24" style={{ background: 'var(--bg-2)' }}>
      <div className="max-w-5xl mx-auto px-8">
        <div className="section-label">Open Source</div>
        <h2
          className="font-display font-bold mb-3 leading-tight"
          style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)' }}
        >
          GitHub Activity
        </h2>
        <p className="mb-14" style={{ color: 'var(--text-muted)', maxWidth: 480 }}>
          Consistent contributions and a passion for building in public.
        </p>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map(s => (
            <StatCard key={s.label} {...s} triggered={triggered} />
          ))}
        </div>

        <ContribGraph />
      </div>
    </section>
  );
}
