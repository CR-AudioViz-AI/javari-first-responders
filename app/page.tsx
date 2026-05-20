// app/page.tsx — Javari First Responders
// Complete working resource and AI tools hub — always free
// Real AI calls to /api/generate. No fake data.
// CR AudioViz AI, LLC · EIN 39-3646201 · May 2026
'use client'
import { useState } from 'react'
import { ACTIONS, FIELDS } from '@/lib/tool-data'


export default function FirstRespondersPage() {
  const [action, setAction] = useState(ACTIONS[0])
  const [values, setValues] = useState({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function setV(id: string, val: string) {
    setValues(p => ({ ...p, [id]: val }))
  }

  async function generate() {
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action.id, input: action.prompt(values) }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      setOutput(data.result || '')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
    setLoading(false)
  }

  const fields = FIELDS[action.id] || []

  return (
    <div style={{ background: '#020b18', minHeight: '100vh', color: '#e2eaf5', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(2,11,24,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(59,130,246,0.15)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🚒</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#60a5fa', letterSpacing: '-0.02em' }}>Javari First Responders</div>
            <div style={{ fontSize: 10, color: '#334155', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Always Free · CR AudioViz AI</div>
          </div>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get Free Access →</a>
        </div>
      </nav>
      <div style={{ height: 60 }} />

      {/* CRISIS BANNER */}
      <div style={{ background: '#1e1015', borderBottom: '1px solid rgba(239,68,68,0.2)', padding: '10px 24px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 13, color: '#f87171', fontWeight: 500 }}>
          🆘 Crisis? Call <strong>988</strong> (Suicide & Crisis Lifeline) · <strong>1-800-267-5463</strong> (First Responder Support) · <strong>911</strong> for emergencies
        </p>
      </div>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '48px 24px 36px', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Tools Built for<br /><span style={{ color: '#60a5fa' }}>Those Who Protect Us</span>
        </h1>
        <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
          Mental health resources, benefits navigation, report writing, and career tools — 
          built for firefighters, EMTs, police officers, and all first responders. 
          <strong style={{ color: '#3b82f6' }}> Free, always.</strong>
        </p>
      </section>

      {/* MAIN TOOL */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: 20, alignItems: 'start' }}>
        
        {/* LEFT */}
        <div>
          {/* Category tabs */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            {['All', 'Wellness', 'Career', 'Admin'].map(cat => (
              <span key={cat} style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', cursor: 'default' }}>{cat}</span>
            ))}
          </div>
          
          <div style={{ background: '#0a1628', border: '1px solid rgba(59,130,246,0.12)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
            {ACTIONS.map(a => (
              <button key={a.id} onClick={() => { setAction(a); setValues({}); setOutput('') }}
                style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: action.id === a.id ? 'rgba(59,130,246,0.1)' : 'transparent', borderLeft: action.id === a.id ? `3px solid ${CATEGORY_COLORS[a.category]}` : '3px solid transparent', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(59,130,246,0.06)', display: 'block' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: action.id === a.id ? '#93c5fd' : '#94a3b8' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>{a.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ background: '#0a1628', border: '1px solid rgba(59,130,246,0.12)', borderRadius: 14, padding: '18px' }}>
            {fields.map(f => (
              <div key={f.id} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder} rows={4}
                    style={{ width: '100%', background: '#020b18', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, padding: '10px 14px', color: '#e2eaf5', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
                ) : (
                  <input value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder}
                    style={{ width: '100%', background: '#020b18', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, padding: '10px 14px', color: '#e2eaf5', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                )}
              </div>
            ))}
            <button onClick={generate} disabled={loading}
              style={{ width: '100%', background: loading ? '#0f2040' : 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: loading ? '#334155' : 'white', border: 'none', borderRadius: 10, padding: '13px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
              {loading ? '⏳ Generating...' : `Generate ${action.label}`}
            </button>
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 10 }}>⚠ {error}</p>}
          </div>
        </div>

        {/* RIGHT: Output */}
        <div style={{ background: '#0a1628', border: '1px solid rgba(59,130,246,0.12)', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 80 }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(59,130,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#334155', textTransform: 'uppercase' }}>Output</span>
            {output && (
              <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                style={{ background: copied ? 'rgba(59,130,246,0.2)' : 'rgba(30,58,138,0.3)', border: '1px solid rgba(59,130,246,0.3)', color: copied ? '#93c5fd' : '#64748b', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            )}
          </div>
          {output ? (
            <textarea value={output} readOnly
              style={{ width: '100%', background: 'transparent', border: 'none', padding: '20px', color: '#e2eaf5', fontSize: 14, lineHeight: 1.75, resize: 'vertical', minHeight: 440, boxSizing: 'border-box', outline: 'none' }} />
          ) : (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{loading ? '⏳' : '🚒'}</div>
              <p style={{ color: '#1e3a5f', fontSize: 13, lineHeight: 1.7 }}>
                {loading ? 'Generating your resource...' : 'Select a tool on the left,
fill in the details, and click Generate.
All tools are free for first responders.'}
              </p>
            </div>
          )}
        </div>
      </section>

      <footer style={{ background: '#010810', borderTop: '1px solid rgba(59,130,246,0.08)', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#0f2040', fontSize: 12, margin: '0 0 4px' }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida</p>
        <p style={{ color: '#0a1628', fontSize: 12, margin: 0 }}>Your Story. Our Design. Everyone Connects. Everyone Wins.</p>
      </footer>
    </div>
  )
}
