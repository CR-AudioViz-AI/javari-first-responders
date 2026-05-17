// app/layout.tsx — Javari First Responders
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Javari First Responders | Javari by CR AudioViz AI',
  description: 'First responder resources',
}
import AppShell from '@/components/AppShell'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body style={{ margin: 0, padding: 0 }}><AppShell appName="Javari First Responders" appColor="#ef4444" appEmoji="🚒" appDesc="First responder resources"
      handoffApp="Javari Legal"
      handoffUrl="https://javari-legal.vercel.app"
      handoffPitch="Know your rights →">{children}</AppShell></body></html>)
}
