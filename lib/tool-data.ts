// lib/tool-data.ts — javari-first-responders
// Tool definitions extracted from page.tsx to keep JSX parser clean
// CR AudioViz AI · May 2026

const ACTIONS = [
  { id: 'mental_health_resources', label: '🧠 Mental Health Support',  desc: 'Resources, coping strategies, and crisis support',      category: 'wellness', prompt: (v) => `As a mental health resource for first responders, provide comprehensive support for: ${v.situation || 'general mental health and stress management'}. Include: immediate coping strategies, PTSD awareness, peer support resources, professional help guidance, and crisis contacts. Role: ${v.role || 'first responder'}.` },
  { id: 'benefits_guide',         label: '📋 Benefits Navigator',      desc: 'Navigate your benefits, disability, and compensation',  category: 'career',   prompt: (v) => `Create a detailed benefits guide for a ${v.role || 'first responder'} in ${v.state || 'the United States'}. Cover: health insurance options, disability benefits, line-of-duty death benefits, retirement planning, PTSD/mental health benefits, and how to file claims. Agency type: ${v.agency || 'municipal'}.` },
  { id: 'incident_report',        label: '📝 Incident Report',         desc: 'Professional incident report from your notes',          category: 'admin',    prompt: (v) => `Write a professional incident report based on these notes: ${v.notes || ''}. Format it properly with: Date/Time, Location, Units Responding, Incident Type, Actions Taken, Outcomes, and Follow-up Required. Role: ${v.role || 'officer'}.` },
  { id: 'career_development',     label: '🎯 Career Development',      desc: 'Promotion prep, civilian transition, or advancement',   category: 'career',   prompt: (v) => `Create a comprehensive career development plan for a ${v.role || 'first responder'} with ${v.experience || '5'} years experience. Goal: ${v.goal || 'promotion to supervisor'}. Include: skills gap analysis, training recommendations, certification paths, leadership development, and a 90-day action plan.` },
  { id: 'training_plan',          label: '🏋️ Training Plan',          desc: 'Physical and skills training program',                   category: 'wellness', prompt: (v) => `Design a complete training program for a ${v.role || 'firefighter / EMT / officer'}. Include: physical fitness protocol, skills certification schedule, scenario-based training, mental resilience exercises, and injury prevention. Duration: ${v.duration || '12 weeks'}.` },
  { id: 'peer_support',           label: '🤝 Peer Support Script',     desc: 'How to support a colleague after a critical incident', category: 'wellness', prompt: (v) => `Write a peer support guide and conversation script for helping a ${v.role || 'first responder'} colleague after: ${v.incident || 'a critical incident'}. Include: what to say and not say, warning signs of PTSD, when to escalate to professional help, and local support resources.` },
]


const FIELDS = {
  mental_health_resources: [{ id: 'role', label: 'Your Role', placeholder: 'Firefighter, EMT, Police Officer...' }, { id: 'situation', label: 'Situation or Concern', placeholder: 'Dealing with PTSD after a critical incident...' }],
  benefits_guide:         [{ id: 'role', label: 'Your Role', placeholder: 'Police Officer, Firefighter, Paramedic...' }, { id: 'state', label: 'State', placeholder: 'Florida' }, { id: 'agency', label: 'Agency Type', placeholder: 'Municipal, County, State, Federal' }],
  incident_report:        [{ id: 'role', label: 'Your Role', placeholder: 'Officer, Firefighter, EMT...' }, { id: 'notes', label: 'Your Notes', placeholder: 'Paste your incident notes here...', type: 'textarea' }],
  career_development:     [{ id: 'role', label: 'Current Role', placeholder: 'Police Officer, FF/Paramedic...' }, { id: 'experience', label: 'Years Experience', placeholder: '5' }, { id: 'goal', label: 'Career Goal', placeholder: 'Sergeant, Captain, Civilian transition...' }],
  training_plan:          [{ id: 'role', label: 'Your Role', placeholder: 'Firefighter, EMT, Officer...' }, { id: 'duration', label: 'Program Duration', placeholder: '12 weeks' }],
  peer_support:           [{ id: 'role', label: 'Colleague Role', placeholder: 'Officer, Firefighter, EMT...' }, { id: 'incident', label: 'Type of Incident', placeholder: 'Line-of-duty injury, traumatic call...' }],
}

const CATEGORY_COLORS = {
  wellness: '#3b82f6',
  career: '#10b981',
  admin: '#f59e0b',
}
