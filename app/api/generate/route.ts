// app/api/generate/route.ts — Javari First Responders
// 8 AI tools for police, fire, EMS, and 911 professionals
// CR AudioViz AI · EIN 39-3646201 · June 2026
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function callAI(system: string, user: string): Promise<string> {
  if (process.env.GROQ_API_KEY) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.GROQ_API_KEY}`},
      body: JSON.stringify({model:'llama-3.3-70b-versatile',
        messages:[{role:'system',content:system},{role:'user',content:user}],
        max_tokens:1500})
    })
    const d = await res.json() as {choices?:{message:{content:string}}[]}
    if (d.choices?.[0]?.message?.content) return d.choices[0].message.content
  }
  if (process.env.OPENROUTER_API_KEY) {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENROUTER_API_KEY}`,'HTTP-Referer':'https://craudiovizai.com'},
      body: JSON.stringify({model:'meta-llama/llama-3.3-70b-instruct:free',
        messages:[{role:'system',content:system},{role:'user',content:user}],max_tokens:1500})
    })
    const d = await res.json() as {choices?:{message:{content:string}}[]}
    if (d.choices?.[0]?.message?.content) return d.choices[0].message.content
  }
  throw new Error('No AI provider')
}

const SYSTEM = `You are Javari, an expert AI for law enforcement, fire departments, EMS, and emergency services. You understand ICS, NFPA standards, federal grants, PTSD, and first responder culture. Produce professional, legally sound, ready-to-use documents. No placeholders — complete content only.`

function buildPrompt(action: string, f: Record<string,string>): string {
  const g = (k: string) => f[k] ?? ''
  const prompts: Record<string,string> = {
    incident:  `Write a complete, legally protective incident report. Type: ${g('Incident type')}. Date/Location: ${g('Date/time/location')}. Units: ${g('Units responding')}. Situation: ${g('What happened')}. Actions: ${g('Actions taken')}. Use passive voice, factual language, chronological order, no opinions. Include all standard sections.`,
    grant:     `Write a complete grant application for ${g('Department/agency')} requesting ${g('Grant amount')} for: ${g('Equipment needed')}. Program: ${g('Grant program')}. Community served: ${g('Community served')}. Include: Statement of Need, Project Description, Outcomes, Budget Narrative, Community Benefit, Qualifications. Ready to submit.`,
    training:  `Create a professional training manual for: ${g('Topic/skill')}. Audience: ${g('Audience')}. Duration: ${g('Duration')}. Objectives: ${g('Learning objectives')}. Sections: Purpose, Prerequisites, Equipment, Step-by-step procedures, Safety warnings, Assessment questions, References.`,
    press:     `Write AP-style press release for: ${g('Announcement')} from ${g('Department')}. Facts: ${g('Key facts')}. Contact: ${g('Contact')}. Include: 3 headline options, dateline, lead, body paragraphs, official quote, boilerplate, media contact.`,
    sop:       `Write a comprehensive SOP for: ${g('Procedure type')} in a ${g('Department type')} setting. Requirements: ${g('Specific requirements')}. Include: Purpose, Scope, Definitions, Responsibilities, Numbered procedures, Safety requirements, Exceptions, Review schedule.`,
    wellness:  `Create first responder mental wellness resources for: ${g('Situation')}. Audience: ${g('Audience')}. Available: ${g('Resources available')}. Needed: ${g('Content type')}. Include: Destigmatizing language, Warning signs, Peer support scripts, Crisis resources (988, Safe Call Now, First Responder Support Network), Leadership talking points.`,
    community: `Create community outreach program for: ${g('Program type')} targeting ${g('Target audience')} from ${g('Department')}. Message: ${g('Key message')}. Include: Program title, Goals, Presentation outline, Key messages, Interactive elements, Takeaway materials, Follow-up plan.`,
    award:     `Write a compelling award nomination for ${g('Nominee name/rank')} for the ${g('Award category')}. Incident: ${g('Incident/reason')}. Impact: ${g('Impact')}. Include: Strong opening recommendation, Detailed narrative of heroic action, Character testimony, Specific outcomes, Formal closing. Powerful and professional.`,
  }
  return prompts[action] ?? `Create professional first responder content: action=${action}, details=${JSON.stringify(f)}`
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const {action, fields} = await req.json() as {action:string;fields:Record<string,string>}
    if (!action) return NextResponse.json({error:'action required'},{status:400})
    const result = await callAI(SYSTEM, buildPrompt(action, fields))
    return NextResponse.json({result, action})
  } catch(e) {
    return NextResponse.json({error:'Generation failed'},{status:500})
  }
}