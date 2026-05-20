'use client'
import { useState, useRef } from 'react'
import { getActions, getFields } from '@/lib/tool-data'

export default function FirstRespondersPage() {
  const actions = getActions()
  const [actionId, setActionId] = useState(actions[0].id)
  const [values, setValues] = useState({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  function setV(id, val) { setValues(p => ({ ...p, [id]: val })) }

  async function generate() {
    const action = actions.find(a => a.id === actionId)
    if (!action) return
    setLoading(true)
    setError('')
    setOutput('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: actionId, input: action.buildPrompt(values) }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      setOutput(data.result || '')
    } catch (e) { setError(e.message || 'Something went wrong') }
    setLoading(false)
  }

  const action = actions.find(a => a.id === actionId)
  const fields = getFields(actionId)

  return (
    <div style={{ background: '#020b18', minHeight: '100vh', color: '#e2eaf5', fontFamily: 'system-ui' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(2,11,24,0.97)', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
        <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span style={{ fontSize: 22 }}>🚒</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: '#60a5fa' }}>Javari First Responders</span>
        </a>
        <a href="https://craudiovizai.com/auth/signup" style={{ background: '#2563eb', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Free Access</a>
      </nav>
      <div style={{ height: 60 }} />
      <div style={{ background: '#1e1015', padding: '9px 24px', textAlign: 'center', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
        <p style={{ margin: 0, fontSize: 13, color: '#f87171' }}>Crisis? Call <strong>988</strong> or <strong>1-800-267-5463</strong></p>
      </div>
      <section style={{ textAlign: 'center', padding: '44px 24px 32px', maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(24px,4vw,42px)', fontWeight: 800, margin: '0 0 12px' }}>Tools for <span style={{ color: '#60a5fa' }}>Those Who Protect Us</span></h1>
        <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>Mental health, benefits, reports, career tools. <strong style={{ color: '#3b82f6' }}>Always free.</strong></p>
      </section>
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 20px 80px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: 20 }}>
        <div>
          <div style={{ background: '#0a1628', border: '1px solid rgba(59,130,246,0.12)', borderRadius: 14, overflow: 'hidden', marginBottom: 16 }}>
            {actions.map(a => (
              <button key={a.id} onClick={() => { setActionId(a.id); setValues({}); setOutput('') }}
                style={{ width: '100%', textAlign: 'left', padding: '11px 16px', background: actionId === a.id ? 'rgba(59,130,246,0.1)' : 'transparent', borderLeft: actionId === a.id ? '3px solid #3b82f6' : '3px solid transparent', border: 'none', cursor: 'pointer', borderBottom: '1px solid rgba(59,130,246,0.06)', display: 'block' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: actionId === a.id ? '#93c5fd' : '#94a3b8' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: '#334155', marginTop: 2 }}>{a.desc}</div>
              </button>
            ))}
          </div>
          <div style={{ background: '#0a1628', border: '1px solid rgba(59,130,246,0.12)', borderRadius: 14, padding: '16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#334155', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>{fields.label}</div>
            {(fields.fields || []).map(f => (
              <div key={f.id} style={{ marginBottom: 12 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#64748b', marginBottom: 5, fontWeight: 600 }}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder} rows={4}
                    style={{ width: '100%', background: '#020b18', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, padding: '9px 12px', color: '#e2eaf5', fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
                ) : (
                  <input value={values[f.id] || ''} onChange={e => setV(f.id, e.target.value)} placeholder={f.placeholder}
                    style={{ width: '100%', background: '#020b18', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, padding: '9px 12px', color: '#e2eaf5', fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                )}
              </div>
            ))}
            <button onClick={generate} disabled={loading}
              style={{ width: '100%', background: loading ? '#0f2040' : '#2563eb', color: loading ? '#334155' : 'white', border: 'none', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }}>
              {loading ? 'Generating...' : 'Generate ' + (action ? action.label : '')}
            </button>
            {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 8 }}>Error: {error}</p>}
          </div>
        </div>
        <div style={{ background: '#0a1628', border: '1px solid rgba(59,130,246,0.12)', borderRadius: 14, overflow: 'hidden', position: 'sticky', top: 80, alignSelf: 'start' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(59,130,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#334155', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Output</span>
            {output && <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: copied ? '#93c5fd' : '#64748b', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>{copied ? 'Copied!' : 'Copy'}</button>}
          </div>
          {output ? (
            <textarea value={output} readOnly style={{ width: '100%', background: 'transparent', border: 'none', padding: '18px', color: '#e2eaf5', fontSize: 14, lineHeight: 1.75, resize: 'vertical', minHeight: 440, boxSizing: 'border-box', outline: 'none' }} />
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{loading ? '...' : '🚒'}</div>
              <p style={{ color: '#1e3a5f', fontSize: 13, lineHeight: 1.7 }}>{loading ? 'Generating...' : 'Select a tool and click Generate. All tools are free.'}</p>
            </div>
          )}
        </div>
      </section>
      <footer style={{ background: '#010810', borderTop: '1px solid rgba(59,130,246,0.08)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ color: '#0f2040', fontSize: 11, margin: 0 }}>2026 CR AudioViz AI LLC - EIN 39-3646201 - Fort Myers Florida</p>
      </footer>
    </div>
  )
}
