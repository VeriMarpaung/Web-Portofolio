'use client';
import { useState } from 'react';

interface Props {
  email:    string;
  github:   string;
  linkedin: string;
}

const LINKS = (p: Props) => [
  {
    icon: '✉',
    label: 'Email',
    val: p.email,
    href: `mailto:${p.email}`,
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    val: p.linkedin.replace('https://', ''),
    href: p.linkedin,
  },
  {
    icon: '⌥',
    label: 'GitHub',
    val: p.github.replace('https://', ''),
    href: p.github,
  },
];

export default function Contact(props: Props) {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(127,255,110,0.04) 0%, transparent 70%)',
          bottom: -200, right: -200,
        }}
      />

      <div className="max-w-5xl mx-auto px-8 relative">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Info */}
          <div className="reveal">
            <div className="section-label">Get in Touch</div>
            <h2
              className="font-display font-bold mb-4 leading-tight"
              style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text)' }}
            >
              Let's build something great
            </h2>
            <p className="mb-8 leading-relaxed" style={{ color: 'var(--text-muted)', maxWidth: 420 }}>
              I'm currently looking for internship or full-time opportunities. If you have a project
              or just want to say hi, my inbox is always open.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {LINKS(props).map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 rounded-xl px-5 py-4 transition-all duration-300"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold"
                    style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}
                  >
                    {l.icon}
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>
                      {l.label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      {l.val}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(['name', 'email'] as const).map(field => (
                <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <label className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                    required
                    className="rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              ))}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <label className="font-mono text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  className="rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={e  => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 font-display font-bold text-sm rounded-xl transition-all duration-300 self-start"
                style={{
                  background: status === 'sent' ? 'var(--accent-2)' : 'var(--accent)',
                  color: '#0a0a0a',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px var(--accent-glow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {status === 'sent' ? '✓ Message Sent!' : 'Send Message →'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
