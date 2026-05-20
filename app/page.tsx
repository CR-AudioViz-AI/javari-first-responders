// app/page.tsx — Javari First Responders
// Complete working resource and AI tools hub — always free
// Real AI calls to /api/generate. No fake data.
// CR AudioViz AI, LLC · EIN 39-3646201 · May 2026
'use client'
import { useState } from 'react'

const ACTIONS = [
  { id: 'mental_health_resources', label: '🧠 Mental Health Support',  desc: 'Resources, coping strategies, and crisis support',      category: 'wellness', prompt: (v: V) => `As a mental health resource for first responders, provide comprehensive support for: ${v.situation || 'general mental health and stress management'}. Include: immediate coping strategies, PTSD awareness, peer support resources, professional help guidance, and crisis contacts. Role: ${v.role || 'first responder'}.` },
  { id: 'benefits_guide',         label: '📋 Benefits Navigator',      desc: 'Navigate your benefits, disability, and compensation',  category: 'career',   prompt: (v: V) => `Create a detailed benefits guide for a ${v.role || 'first responder'} in ${v.state || 'the United States'}. Cover: health insurance options, disability benefits, line-of-duty death benefits, retirement planning, PTSD/mental health benefits, and how to file claims. Agency type: ${v.agency || 'municipal'}.` },
  { id: 'incident_report',        label: '📝 Incident Report',         desc: 'Professional incident report from your notes',          category: 'admin',    prompt: (v: V) => `Write a professional incident report based on these notes: ${v.notes || ''}. Format it properly with: Date/Time, Location, Units Responding, Incident Type, Actions Taken, Outcomes, and Follow-up Required. Role: ${v.role || 'officer'}.` },
  { id: 'career_development',     label: '🎯 Career Development',      desc: 'Promotion prep, civilian transition, or advancement',   category: 'career',   prompt: (v: V) => `Create a comprehensive career development plan for a ${v.role || 'first responder'} with ${v.experience || '5'} years experience. Goal: ${v.goal || 'promotion to supervisor'}. Include: skills gap analysis, training recommendations, certification paths, leadership development, and a 90-day action plan.` },
  { id: 'training_plan',          label: '🏋️ Training Plan',          desc: 'Physical and skills training program',                   category: 'wellness', prompt: (v: V) => `Design a complete training program for a ${v.role || 'firefighter / EMT / officer'}. Include: physical fitness protocol, skills certification schedule, scenario-based training, mental resilience exercises, and injury prevention. Duration: ${v.duration || '12 weeks'}.` },
  { id: 'peer_support',           label: '🤝 Peer Support Script',     desc: 'How to support a colleague after a critical incident', category: 'wellness', prompt: (v: V) => `Write a peer support guide and conversation script for helping a ${v.role || 'first responder'} colleague after: ${v.incident || 'a critical incident'}. Include: what to say and not say, warning signs of PTSD, when to escalate to professional help, and local support resources.` },
]

type V = Record<string, string>

const FIELDS: Record<string, Array<{ id: string; label: string; placeholder: string; type?: string }>> = {
  mental_health_resources: [{ id: 'role', label: 'Your Role', placeholder: 'Firefighter, EMT, Police Officer...' }, { id: 'situation', label: 'Situation or Concern', placeholder: 'Dealing with PTSD after a critical incident...' }],
  benefits_guide:         [{ id: 'role', label: 'Your Role', placeholder: 'Police Officer, Firefighter, Paramedic...' }, { id: 'state', label: 'State', placeholder: 'Florida' }, { id: 'agency', label: 'Agency Type', placeholder: 'Municipal, County, State, Federal' }],
  incident_report:        [{ id: 'role', label: 'Your Role', placeholder: 'Officer, Firefighter, EMT...' }, { id: 'notes', label: 'Your Notes', placeholder: 'Paste your incident notes here...', type: 'textarea' }],
  career_development:     [{ id: 'role', label: 'Current Role', placeholder: 'Police Officer, FF/Paramedic...' }, { id: 'experience', label: 'Years Experience', placeholder: '5' }, { id: 'goal', label: 'Career Goal', placeholder: 'Sergeant, Captain, Civilian transition...' }],
  training_plan:          [{ id: 'role', label: 'Your Role', placeholder: 'Firefighter, EMT, Officer...' }, { id: 'duration', label: 'Program Duration', placeholder: '12 weeks' }],
  peer_support:           [{ id: 'role', label: 'Colleague Role', placeholder: 'Officer, Firefighter, EMT...' }, { id: 'incident', label: 'Type of Incident', placeholder: 'Line-of-duty injury, traumatic call...' }],
}

const CATEGORY_COLORS: Record<string, string> = {
  wellness: '#3b82f6',
  career: '#10b981',
  admin: '#f59e0b',
}

export default function FirstRespondersPage() {
  const [action, setAction] = useState(ACTIONS[0])
  const [values, setValues] = useState<V>({})
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
      const data = await res.json() as { result?: string; error?: string }
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      setOutput(data.result || '')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    }
    setLoading(false)
  }

  const fields = FIELDS[action.id] || []

  return (
    <div style={{ background: '#020b18', minHeight: '100vh', color: '#e2eaf5', fontFamily: '"DM Sans", system-ui, sans-serif' }}>
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
