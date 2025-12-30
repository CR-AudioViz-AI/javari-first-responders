// app/page.tsx
// Javari First Responders Hub - Landing Page
// Monday, December 30, 2025 - Henderson Standard

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Heart, Brain, GraduationCap, Users, Gift,
  BadgeCheck, Phone, Star, ChevronRight, Lock, Bell
} from 'lucide-react';

export default function FirstRespondersHub() {
  const [activeTab, setActiveTab] = useState('wellness');

  const features = [
    {
      id: 'wellness',
      icon: Heart,
      title: 'Wellness Center',
      color: 'from-red-500 to-pink-500',
      items: [
        'AI-powered mental health check-ins',
        'Anonymous peer support community',
        'PTSD resources & coping strategies',
        'Sleep & stress management tools',
        'Critical incident support'
      ]
    },
    {
      id: 'career',
      icon: GraduationCap,
      title: 'Career Hub',
      color: 'from-blue-500 to-cyan-500',
      items: [
        'Resume builder for public safety',
        'AI interview coaching',
        'Promotion exam prep',
        'Leadership development',
        'Retirement planning'
      ]
    },
    {
      id: 'training',
      icon: Brain,
      title: 'Training Academy',
      color: 'from-purple-500 to-indigo-500',
      items: [
        'Continuing education tracking',
        'Certification management',
        'Scenario-based training',
        'Department policy library',
        'Inter-agency collaboration'
      ]
    },
    {
      id: 'family',
      icon: Users,
      title: 'Family Support',
      color: 'from-green-500 to-emerald-500',
      items: [
        'Spouse & child resources',
        'Family counseling referrals',
        'Financial planning tools',
        'Shift-work family tips',
        'Emergency notifications'
      ]
    },
    {
      id: 'community',
      icon: Shield,
      title: 'Community',
      color: 'from-orange-500 to-amber-500',
      items: [
        'Verified responder profiles',
        'Department directories',
        'Event calendar',
        'Mentorship matching',
        'Retired responder network'
      ]
    },
    {
      id: 'benefits',
      icon: Gift,
      title: 'Benefits & Discounts',
      color: 'from-teal-500 to-cyan-500',
      items: [
        'Exclusive partner discounts',
        'Insurance resources',
        'Home buying programs',
        'Vehicle discounts',
        'Travel deals'
      ]
    }
  ];

  const stats = [
    { value: '2.5M+', label: 'First Responders in US' },
    { value: '30%', label: 'Experience PTSD symptoms' },
    { value: '1 in 4', label: 'Struggle with mental health' },
    { value: '100%', label: 'Deserve support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <nav className="relative z-10 container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">Javari First Responders</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2">
              <BadgeCheck className="w-4 h-4" />
              Verify & Join
            </button>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Lock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Verified First Responders Only</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-red-400 bg-clip-text text-transparent">
              Supporting Those Who Serve
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              A dedicated platform for firefighters, police officers, EMTs, and dispatchers. 
              AI-powered tools, mental health resources, career development, and a community that understands.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold flex items-center gap-2 transition shadow-lg shadow-blue-500/25">
                <BadgeCheck className="w-5 h-5" />
                Verify Your Badge
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold flex items-center gap-2 transition">
                <Phone className="w-5 h-5" />
                24/7 Crisis Line
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive resources designed specifically for first responders and their families.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 border border-white/10 hover:border-white/20 transition cursor-pointer`}
                onClick={() => setActiveTab(feature.id)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-red-600/20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Bell className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              You Protect Us. Let Us Support You.
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of verified first responders who are taking control of their 
              mental health, advancing their careers, and connecting with a community that understands.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold inline-flex items-center gap-2 transition shadow-lg shadow-blue-500/25">
              <BadgeCheck className="w-5 h-5" />
              Verify & Join Free
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="font-semibold">Javari First Responders</span>
            </div>
            <p className="text-gray-500 text-sm">
              A CR AudioViz AI Social Impact Initiative | "Everyone connects. Everyone wins."
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
