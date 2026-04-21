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
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const website = String(formData.get('website') || '').trim();

    setStatus('sending');
    setErrorText('');

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error('Backend contact endpoint is unavailable.');
      }

      setStatus('sent');
      form.reset();
      window.setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch {
      // Fallback for local dev or if function not deployed yet.
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent([
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
      ].join('\n'));

      window.location.href = `mailto:${props.email}?subject=${subject}&body=${body}`;
      setStatus('error');
      setErrorText('Email service belum aktif di environment ini, jadi dibuka via mail app sebagai fallback.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500, height: 500,
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 70%)',
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
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
              />

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
                disabled={status === 'sending'}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px var(--accent-glow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent' : 'Send Message →'}
              </button>

              {status === 'sent' && (
                <p className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                  Message sent successfully. Thank you!
                </p>
              )}

              {status === 'error' && (
                <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  {errorText}
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
