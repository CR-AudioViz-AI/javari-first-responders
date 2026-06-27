"use client";
// app/page.tsx — Javari First Responders
// CR AudioViz AI · EIN 39-3646201 · June 2026
import { useState, useCallback } from "react";

const TOOLS = [
  { id:"incident",  icon:"📋", label:"Incident Report",    desc:"Clear, accurate reports that protect you legally",       color:"#EF4444" },
  { id:"grant",     icon:"💰", label:"Equipment Grant",    desc:"Fund new equipment, vehicles, and training programs",    color:"#F59E0B" },
  { id:"training",  icon:"📚", label:"Training Manual",    desc:"Professional training guides for any procedure",         color:"#3B82F6" },
  { id:"press",     icon:"📰", label:"Press Release",      desc:"Communicate department updates to media and public",     color:"#8B5CF6" },
  { id:"sop",       icon:"📋", label:"SOP Writer",         desc:"Standard operating procedures for any scenario",        color:"#10B981" },
  { id:"wellness",  icon:"🧠", label:"Mental Health Guide","desc":"PTSD resources, peer support, wellness programs",      color:"#EC4899" },
  { id:"community", icon:"🤝", label:"Community Outreach", desc:"Public safety communications and school programs",       color:"#06B6D4" },
  { id:"award",     icon:"🏅", label:"Award Nomination",   desc:"Nominate team members for department honors",            color:"#84CC16" },
];

const FIELDS: Record<string, {label:string; placeholder:string}[]> = {
  incident: [
    {label:"Incident type",     placeholder:"Vehicle accident, structure fire, medical emergency"},
    {label:"Date/time/location",placeholder:"June 27 2026, 14:32, I-75 MM 138"},
    {label:"Units responding",  placeholder:"Engine 12, Medic 7, PD Units 3+5"},
    {label:"What happened",     placeholder:"Two-vehicle collision, one vehicle on fire, two victims..."},
    {label:"Actions taken",     placeholder:"Secured scene, extricated victim, transported to Lee Memorial"},
  ],
  grant: [
    {label:"Department/agency", placeholder:"Fort Myers Fire Department"},
    {label:"Equipment needed",  placeholder:"Self-contained breathing apparatus (SCBA) — 12 units"},
    {label:"Grant amount",      placeholder:"$85,000"},
    {label:"Grant program",     placeholder:"FEMA AFG Grant, COPS program"},
    {label:"Community served",  placeholder:"78,000 residents, 42 sq miles"},
  ],
  training: [
    {label:"Topic/skill",        placeholder:"Rapid Intervention Team / Active shooter response"},
    {label:"Audience",           placeholder:"New firefighters, 6-month academy"},
    {label:"Duration",           placeholder:"8-hour course"},
    {label:"Learning objectives",placeholder:"Scene assessment, team communication, extraction"},
  ],
  press: [
    {label:"Announcement",placeholder:"New ladder truck / Lifesaving rescue"},
    {label:"Department",  placeholder:"Cape Coral Fire Department"},
    {label:"Key facts",   placeholder:"847 calls in May, 99% under 5-min response"},
    {label:"Contact",     placeholder:"PIO Sarah Johnson, (239) 555-0200"},
  ],
  sop: [
    {label:"Procedure type",       placeholder:"Vehicle extraction / Cardiac arrest protocol"},
    {label:"Department type",      placeholder:"Fire/EMS/Police"},
    {label:"Specific requirements",placeholder:"NFPA standards, state regulations"},
  ],
  wellness: [
    {label:"Situation",          placeholder:"Post-incident stress after mass casualty event"},
    {label:"Audience",           placeholder:"Full department, 45 first responders"},
    {label:"Resources available",placeholder:"EAP program, peer support team"},
    {label:"Content type",       placeholder:"Resource brief, peer support scripts, leadership talking points"},
  ],
  community: [
    {label:"Program type",   placeholder:"School safety / Neighborhood watch / Fire prevention"},
    {label:"Target audience",placeholder:"Elementary students / Senior citizens / Businesses"},
    {label:"Department",     placeholder:"Fort Myers Fire Station 2"},
    {label:"Key message",    placeholder:"Smoke alarms save lives — make an escape plan"},
  ],
  award: [
    {label:"Nominee name/rank",  placeholder:"Lt. James Torres, Engine 5"},
    {label:"Award category",     placeholder:"Lifesaving Award / Medal of Valor"},
    {label:"Incident/reason",    placeholder:"June 15 - entered burning structure, rescued family"},
    {label:"Impact",             placeholder:"Two lives saved, patient discharged after 3 days"},
  ],
};

const C = { bg:"#0a0f1a", card:"rgba(16,28,52,0.9)", red:"#EF4444", text:"#F0F8FF", text2:"#607090" };

export default function FirstRespondersPage() {
  const [active, setActive]   = useState<string|null>(null);
  const [fields, setFields]   = useState<Record<string,string>>({});
  const [result, setResult]   = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const tool = TOOLS.find(t => t.id === active);

  const generate = useCallback(async () => {
    if (!active) return;
    setLoading(true); setResult("");
    try {
      const res = await fetch("/api/generate", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ action: active, fields }),
      });
      const d = await res.json() as {result?:string};
      setResult(d.result ?? "Error");
    } catch { setResult("Network error"); }
    setLoading(false);
  }, [active, fields]);

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"system-ui"}}>
      <div style={{background:"linear-gradient(135deg,rgba(239,68,68,0.1),rgba(16,28,52,0.9))",
        borderBottom:"1px solid rgba(239,68,68,0.2)",padding:"20px 24px",
        display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
          <h1 style={{margin:0,fontSize:22,fontWeight:900,
            background:"linear-gradient(135deg,#EF4444,#F59E0B)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            🚒 Javari First Responders
          </h1>
          <p style={{margin:"4px 0 0",color:C.text2,fontSize:12}}>
            AI tools for police, fire, EMS, and 911 professionals · CR AudioViz AI
          </p>
        </div>
        <a href="https://craudiovizai.com" target="_blank" rel="noopener noreferrer"
          style={{padding:"8px 16px",borderRadius:8,
            background:"linear-gradient(135deg,#EF4444,#F59E0B)",
            color:"#fff",fontWeight:800,fontSize:11,textDecoration:"none"}}>
          Full Platform →
        </a>
      </div>
      <div style={{maxWidth:900,margin:"0 auto",padding:"28px 20px"}}>
        <div style={{marginBottom:24,padding:"14px 18px",
          background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",
          borderRadius:10,textAlign:"center"}}>
          <span style={{fontSize:13,color:C.red,fontWeight:700}}>
            🆓 Free for all first responders — Police, Fire, EMS, 911
          </span>
        </div>
        {!active && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
            {TOOLS.map(t => (
              <button key={t.id} onClick={() => { setActive(t.id); setFields({}); setResult(""); }}
                style={{padding:"16px",borderRadius:12,textAlign:"left",background:C.card,
                  border:`1px solid ${t.color}30`,cursor:"pointer",fontFamily:"system-ui",color:C.text}}>
                <div style={{fontSize:24,marginBottom:8}}>{t.icon}</div>
                <div style={{fontWeight:800,fontSize:13,marginBottom:4}}>{t.label}</div>
                <div style={{fontSize:11,color:C.text2}}>{t.desc}</div>
              </button>
            ))}
          </div>
        )}
        {active && tool && (
          <div>
            <button onClick={() => { setActive(null); setResult(""); }}
              style={{marginBottom:16,background:"none",border:"none",color:C.red,
                cursor:"pointer",fontSize:13,fontFamily:"system-ui"}}>← Back</button>
            <div style={{padding:"20px",background:C.card,
              border:`1px solid ${tool.color}30`,borderRadius:14,marginBottom:16}}>
              <h2 style={{margin:"0 0 4px",fontSize:18,fontWeight:900}}>{tool.icon} {tool.label}</h2>
              <p style={{margin:"0 0 20px",color:C.text2,fontSize:12}}>{tool.desc}</p>
              {(FIELDS[active] ?? []).map((f, i) => (
                <div key={i} style={{marginBottom:12}}>
                  <label style={{display:"block",fontSize:11,fontWeight:700,color:C.text2,
                    marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>{f.label}</label>
                  <textarea value={fields[f.label]??""} rows={2} placeholder={f.placeholder}
                    onChange={e => setFields(p => ({...p, [f.label]: e.target.value}))}
                    style={{width:"100%",padding:"10px 12px",borderRadius:8,fontSize:13,
                      border:"1px solid rgba(255,255,255,0.1)",background:"rgba(0,0,0,0.3)",
                      color:C.text,fontFamily:"system-ui",outline:"none",
                      resize:"vertical",boxSizing:"border-box"}}/>
                </div>
              ))}
              <button onClick={() => void generate()} disabled={loading}
                style={{width:"100%",padding:"12px",borderRadius:10,fontWeight:800,
                  fontSize:14,border:"none",cursor:loading?"not-allowed":"pointer",
                  fontFamily:"system-ui",color:loading?"#607090":"#fff",
                  background:loading?"rgba(255,255,255,0.06)":"linear-gradient(135deg,#EF4444,#F59E0B)"}}>
                {loading ? "⏳ Generating..." : `✨ Generate ${tool.label}`}
              </button>
            </div>
            {result && (
              <div style={{padding:"20px",background:"rgba(0,0,0,0.4)",
                border:"1px solid rgba(255,255,255,0.08)",borderRadius:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
                  <span style={{fontSize:13,fontWeight:700,color:"#10B981"}}>✅ Generated</span>
                  <button onClick={async()=>{await navigator.clipboard.writeText(result);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
                    style={{padding:"6px 14px",borderRadius:7,fontSize:11,fontWeight:700,cursor:"pointer",
                      fontFamily:"system-ui",background:copied?"rgba(16,185,129,0.15)":"rgba(255,255,255,0.08)",
                      color:copied?"#10B981":"#607090",
                      border:"1px solid "+(copied?"rgba(16,185,129,0.3)":"rgba(255,255,255,0.1)")}}>
                    {copied?"✓ Copied!":"📋 Copy"}
                  </button>
                </div>
                <pre style={{margin:0,whiteSpace:"pre-wrap",fontSize:13,lineHeight:1.6,
                  color:C.text,fontFamily:"system-ui"}}>{result}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}