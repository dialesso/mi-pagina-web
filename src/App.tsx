/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { 
  ShieldCheck, Anchor, TrendingUp, Compass, Heart, Share2, Phone, Mail, 
  MapPin, CheckCircle2, ArrowRight, Star, ChevronRight, Play, Info, 
  User, Lock, HelpCircle, Truck, Layers, Target, Eye, Globe 
} from 'lucide-react';
import SaaS_Dashboard from './components/SaaS_Dashboard';
import ContainerTable from './components/ContainerTable';
import StreetTurnFlow from './components/StreetTurnFlow';
import Logo from './components/Logo';
import { TARGET_GROUPS, PREMIUM_PLANS, TIMELINE_STEPS } from './data';
import { Container } from './types';

// Using a premium Unsplash maritime seaport background as fallback since image-gen quota is spent
const PORT_HERO_IMAGE = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80';

export default function App() {
  const [activePage, setActivePage] = useState<'inicio' | 'servicios' | 'como-funciona' | 'contenedores' | 'nosotros' | 'contacto'>('inicio');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Stats Counters
  const [stats, setStats] = useState({
    containers: 28,
    activeOps: 14,
    avgSavings: 210,
    kmsSaved: 1340,
    co2Reduced: 0.8
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) {
      alert('Por favor ingrese su correo empresarial.');
      return;
    }
    if (!passwordInput) {
      alert('Por favor ingrese su contraseña.');
      return;
    }
    
    const emailLower = emailInput.trim().toLowerCase();
    if (emailLower === 'demo@portlink.pe' && passwordInput === 'portlink2027') {
      setIsLoggedIn(true);
    } else if (emailLower === 'gerencia@peruimport.pe' && passwordInput === 'peruimport2027') {
      setIsLoggedIn(true);
    } else {
      alert('Credenciales incorrectas.\n\nPor favor use las credenciales demo:\nCorreo: demo@portlink.pe\nContraseña: portlink2027');
    }
  };

  const handleDemoAccess = () => {
    setEmailInput('demo@portlink.pe');
    setPasswordInput('portlink2027');
    setShowDemoModal(false);
  };

  // If user is logged in, show the comprehensive B2B SaaS Dashboard!
  if (isLoggedIn) {
    return (
      <SaaS_Dashboard 
        userEmail={emailInput} 
        onLogout={() => {
          setIsLoggedIn(false);
          // Return to the top of landing page
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-brand-celeste/30 selection:text-brand-navy">
      
      {/* 1. TOP HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo Group */}
            <button 
              onClick={() => { setActivePage('inicio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-[#00A8E8]/20 rounded-xl"
            >
              <Logo variant="horizontal" theme="light" />
            </button>

            {/* Middle Nav Desktop Links */}
            <nav className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => { setActivePage('inicio'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-sm font-semibold transition-all py-1.5 px-3 rounded-lg ${activePage === 'inicio' ? 'text-[#00A8E8] bg-slate-100 font-bold' : 'text-slate-500 hover:text-[#00A8E8] hover:bg-slate-50'}`}
              >
                Inicio
              </button>
              <button
                onClick={() => { setActivePage('servicios'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-sm font-semibold transition-all py-1.5 px-3 rounded-lg ${activePage === 'servicios' ? 'text-[#00A8E8] bg-slate-100 font-bold' : 'text-slate-500 hover:text-[#00A8E8] hover:bg-slate-50'}`}
              >
                Servicios
              </button>
              <button
                onClick={() => { setActivePage('como-funciona'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-sm font-semibold transition-all py-1.5 px-3 rounded-lg ${activePage === 'como-funciona' ? 'text-[#00A8E8] bg-slate-100 font-bold' : 'text-slate-500 hover:text-[#00A8E8] hover:bg-slate-50'}`}
              >
                ¿Cómo funciona?
              </button>
              <button
                onClick={() => { setActivePage('contenedores'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-sm font-semibold transition-all py-1.5 px-3 rounded-lg ${activePage === 'contenedores' ? 'text-[#00A8E8] bg-slate-100 font-bold' : 'text-slate-500 hover:text-[#00A8E8] hover:bg-slate-50'}`}
              >
                Contenedores
              </button>
              <button
                onClick={() => { setActivePage('nosotros'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-sm font-semibold transition-all py-1.5 px-3 rounded-lg ${activePage === 'nosotros' ? 'text-[#00A8E8] bg-slate-100 font-bold' : 'text-slate-500 hover:text-[#00A8E8] hover:bg-slate-50'}`}
              >
                Nosotros
              </button>
              <button
                onClick={() => { setActivePage('contacto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-sm font-semibold transition-all py-1.5 px-3 rounded-lg ${activePage === 'contacto' ? 'text-[#00A8E8] bg-slate-100 font-bold' : 'text-slate-500 hover:text-[#00A8E8] hover:bg-slate-50'}`}
              >
                Contacto
              </button>
            </nav>

            {/* Connection Actions buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setActivePage('inicio');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    const el = document.getElementById('b2b-email-input');
                    if (el) el.focus();
                  }, 50);
                }}
                className="px-4 py-2 text-xs font-bold text-brand-navy hover:bg-slate-50 border-2 border-brand-navy rounded-lg transition duration-150"
                id="btn-nav-login"
              >
                Iniciar sesión
              </button>
              
              <button 
                onClick={() => setShowDemoModal(true)}
                className="px-4 py-2 text-xs font-bold bg-brand-navy hover:bg-brand-navy/90 text-white rounded-lg transition duration-150 shadow-lg shadow-blue-900/10 hover:scale-[1.03]"
                id="btn-nav-register"
              >
                Registrarse
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* DEMO INTERACTIVE OVERLAY MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-navy border border-slate-800 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
            
            <div className="text-center space-y-4">
              <span className="text-3xl">⚓</span>
              <h3 className="text-xl font-display font-bold text-brand-celeste">
                Solicitar Acceso Corporativo
              </h3>
              <p className="text-xs text-slate-300">
                Complete el formulario de pre-registro para recibir sus credenciales de acceso a la plataforma de Street Turn Perú.
              </p>

              <form onSubmit={(e) => {
                e.preventDefault();
                alert('¡Solicitud recibida! Un especialista de Port Link validará su RUC y le enviará sus credenciales de acceso por correo corporativo en un plazo de 15 minutos.');
                setShowDemoModal(false);
              }} className="space-y-3 text-left">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">RUC de la Empresa</label>
                  <input required type="text" maxLength={11} placeholder="Ej. 20609341298" className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs outline-none focus:border-brand-celeste transition-all text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Razón Social</label>
                  <input required type="text" placeholder="Ej. Transportes del Norte SAC" className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs outline-none focus:border-brand-celeste transition-all text-white" />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Correo Corporativo</label>
                  <input required type="email" placeholder="Ej. logistica@empresa.pe" className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs outline-none focus:border-brand-celeste transition-all text-white" />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowDemoModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl transition-all"
                  >
                    Cerrar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#00A8E8] hover:bg-[#00A8E8]/80 text-brand-navy font-bold text-xs rounded-xl transition-all"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

      {activePage === 'inicio' && (
        <>
          {/* 2. HERO SECTION & INTEGRATED LOGIN DRAWER */}
          <section id="inicio" className="relative text-white overflow-hidden py-16 lg:py-24 bg-brand-navy px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        
        {/* Hero Background Layer with Polish Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2342] via-[#0F4C81] to-[#0A2342] opacity-95 z-0" />
        
        {/* Dynamic Image backdrop overlay - layered behind gradient */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src={PORT_HERO_IMAGE} 
            alt="Puerto Moderno de Callao" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Abstract Port Visual SVG representation from Design HTML */}
        <div className="absolute bottom-0 right-0 w-2/3 h-full opacity-10 pointer-events-none z-0">
          <svg viewBox="0 0 400 300" fill="none" stroke="white" strokeWidth="1" className="w-full h-full">
            <path d="M50,250 L350,250 M100,250 L100,100 M180,250 L180,50 M260,250 L260,80" />
            <rect x="90" y="120" width="40" height="20" />
            <rect x="90" y="145" width="40" height="20" />
            <rect x="170" y="80" width="40" height="20" />
            <rect x="170" y="105" width="40" height="20" />
            <rect x="250" y="110" width="40" height="20" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* HERO LEFT COLUMN: Branding & Core Promises */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-celeste/10 border border-brand-celeste/25 text-brand-celeste rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-brand-celeste animate-ping" />
              Primer optimizador Street Turn de contenedores en el Perú
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white mb-4">
              Conecta, Optimiza y <span className="text-[#00A8E8]">Transforma</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-xl italic font-light mb-8">
              Plataforma digital que conecta importadores, exportadores y operadores logísticos para reutilizar contenedores vacíos mediante operaciones <span className="font-semibold text-white">Street Turn</span>, reduciendo costos, tiempos de entrega y emisiones contaminantes.
            </p>

            {/* Core benefits checklist based on Design HTML */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8 text-slate-200">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-1 bg-[#00A8E8] rounded-full text-white shrink-0">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
                <span>Menor costo operativo fletamiento</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-1 bg-[#00A8E8] rounded-full text-white shrink-0">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
                <span>Mayor trazabilidad de aduanas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-1 bg-[#00A8E8] rounded-full text-white shrink-0">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
                <span>Menos kilómetros en vacío</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-1 bg-[#00A8E8] rounded-full text-white shrink-0">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </div>
                <span>EIR Digital & Monitoreo</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDemoAccess}
                className="px-6 py-3 bg-[#00A8E8] hover:bg-[#00A8E8]/90 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all text-sm flex items-center justify-center gap-2"
                id="hero-demo-trigger"
              >
                Solicitar Demostración
                <ArrowRight className="w-4 h-4" />
              </button>

              <a 
                href="#contenedores"
                className="px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all text-sm text-center flex items-center justify-center gap-1.5"
              >
                Ver Contenedores
              </a>
            </div>

          </div>

          {/* HERO RIGHT COLUMN: Compact Design Login Card */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="bg-white text-slate-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl shadow-black/40 border border-slate-100 text-left">
              <div className="mb-6 flex justify-center">
                <Logo variant="full" size="md" theme="light" />
              </div>

              <h3 className="text-xl font-bold text-[#0A2342] mb-1">
                Acceso Corporativo
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Simplifique su triangulación de contenedores de origen peruano.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Correo empresarial
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="ejemplo@empresa.pe"
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all"
                      id="b2b-email-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all"
                      id="b2b-password-input"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-[#00A8E8]"
                    />
                    <span className="text-slate-500">Recordarme</span>
                  </label>
                  <a href="#olvide" onClick={(e) => { e.preventDefault(); alert('Si olvidó su contraseña corporativa, por favor contacte a soporte@portlink.pe'); }} className="text-[#0F4C81] font-semibold hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0F4C81] text-white font-bold rounded-xl shadow-lg hover:bg-[#0A2342] transition-all text-sm"
                  id="btn-hero-login"
                >
                  Iniciar sesión
                </button>

                <p className="text-center text-xs text-slate-400 mt-4">
                  ¿Aún no tienes cuenta?{' '}
                  <button 
                    type="button" 
                    onClick={() => setShowDemoModal(true)} 
                    className="text-[#00A8E8] font-bold hover:underline"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </form>

            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE STATISTICS HIGHLIGHT BANNER */}
      <section className="bg-white border-b border-slate-200 relative z-10 py-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-150">
            
            <div className="text-center md:text-left md:pl-0 pt-4 md:pt-0">
              <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest">Contenedores disponibles</span>
              <p className="text-3xl font-extrabold text-brand-navy mt-1 font-display">{stats.containers}</p>
              <span className="text-xs text-brand-petroleum">Equipos en Lima y Callao</span>
            </div>

            <div className="text-center pt-4 md:pt-0">
              <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest">Operaciones activas</span>
              <p className="text-3xl font-extrabold text-brand-navy mt-1 font-display">{stats.activeOps}</p>
              <span className="text-xs text-brand-petroleum">Tránsitos simultáneos</span>
            </div>

            <div className="text-center pt-4 md:pt-0">
              <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest font-bold">Ahorro Promedio Generado</span>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1 font-display">US$ {stats.avgSavings}</p>
              <span className="text-xs text-slate-500">Por Street Turn confirmado</span>
            </div>

            <div className="text-center pt-4 md:pt-0">
              <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest">Kilómetros evitados</span>
              <p className="text-3xl font-extrabold text-brand-navy mt-1 font-display">{stats.kmsSaved.toLocaleString()} km</p>
              <span className="text-xs text-slate-500">Reducción flete muerto</span>
            </div>

            <div className="text-center col-span-2 md:col-span-1 pt-4 md:pt-0">
              <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest">CO₂ reducido</span>
              <p className="text-3xl font-extrabold text-emerald-600 mt-1 font-display">{stats.co2Reduced} Tn</p>
              <span className="text-xs text-emerald-600">Huella de carbono mitigada</span>
            </div>

          </div>
        </div>
      </section>
        </>
      )}

      {activePage === 'servicios' && (
        <>
          {/* 4. TARGET AUDIENCE SECTOR ORGANIZATIONS */}
      <section id="servicios" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-celeste bg-brand-celeste/10 px-3 py-1 rounded-full border border-brand-celeste/20">
              Ecosistema Marítimo Integrado
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
              Diseñado para todos los Operadores Portuarios
            </h2>
            <p className="text-sm text-slate-500">
              Sincronizamos a los principales actores de la cadena logística en el Perú, disminuyendo demoras por devolución de equipos y tiempos muertos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TARGET_GROUPS.map((g, idx) => (
              <div 
                key={g.name}
                className="bg-white p-6 rounded-2xl border border-slate-200 text-left hover:shadow-xl hover:-translate-y-1 transition duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-petroleum/10 text-brand-petroleum flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-brand-celeste group-hover:text-brand-navy transition duration-150">
                  {idx === 0 && '📦'}
                  {idx === 1 && '💼'}
                  {idx === 2 && '⚙️'}
                  {idx === 3 && '📥'}
                  {idx === 4 && '📤'}
                  {idx === 5 && '🚛'}
                </div>
                <h4 className="font-display font-bold text-lg text-brand-navy">{g.name}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
        </>
      )}

      {activePage === 'como-funciona' && (
        <>
          {/* 5. PORT MATCH STREET TURN FLOW SIMULATION GRAPHICS */}
      <section className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left space-y-5">
            <span className="text-xs font-bold text-brand-petroleum tracking-wider uppercase bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
              Flujos Automatizados
            </span>
            <h3 className="text-3xl font-display font-extrabold text-brand-navy tracking-tight leading-none">
              El Corazón del Street Turn Match
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Omitimos completamente el paso por depósitos temporales extraportuarios. El importador cedente de Lurín transfiere la propiedad del contenedor directamente al exportador en el Callao para consolidar carga de exportación inmediata.
            </p>
            
            <div className="space-y-3 pt-2 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-celeste rounded-full" />
                Detección inteligente de navieras compatibles (MSC, Maersk, CMA CGM).
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-celeste rounded-full" />
                Automatización de inspecciones EIR para deslinde de daños.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-celeste rounded-full" />
                Integración con depósitos y terminales portuarios (APM y DP World).
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <StreetTurnFlow />
          </div>

        </div>
      </section>

      {/* 6. HOW IT WORKS HORIZONTAL TIMELINE */}
      <section id="como-funciona" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-celeste bg-brand-celeste/10 px-3 py-1 rounded-full border border-brand-celeste/20">
              Flujo de Operación
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
              ¿Cómo funciona PORT LINK?
            </h2>
            <p className="text-sm text-slate-500">
              Nuestra tecnología une a importadores y exportadores peruanos en 5 simples pasos coordinados y digitalmente respaldados.
            </p>
          </div>

          {/* Horizontal animated timeline process container */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left relative">
            
            {TIMELINE_STEPS.map((step) => (
              <div 
                key={step.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 relative group hover:shadow-xl transition duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-celeste flex items-center justify-center font-bold font-display text-lg mb-4 shadow-md group-hover:scale-110 transition duration-150">
                    {step.id}
                  </div>
                  <h4 className="font-display font-bold text-base text-brand-navy">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    {step.text}
                  </p>
                </div>

                {/* Arrow visual to represent path */}
                {step.id < 5 && (
                  <div className="hidden md:block absolute top-10 -right-4 z-15 text-slate-300">
                    <ArrowRight className="w-6 h-6 animate-pulse text-brand-celeste" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
        </>
      )}

      {activePage === 'contenedores' && (
        <>
          {/* 7. LIVE REGISTERED CONTAINERS TABLE SECTION */}
      <section id="contenedores" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-celeste bg-brand-celeste/10 px-3 py-1 rounded-full border border-brand-celeste/20">
              Panel en Vivo
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
              Contenedores Vacíos Disponibles
            </h2>
            <p className="text-sm text-slate-500 col-span-3">
              Explore los equipos que se encuentran liberados de descarga de importación listos para Street Turn. Pruebe a filtrar por Naviera o Ubicación del almacén en tiempo real.
            </p>
          </div>

          <ContainerTable 
            onActionClick={(container) => {
              // Direct login simulated action which guides customer to saas dashboard matching process!
              alert(`Para iniciar el Street Turn para el contenedor ${container.code}, por favor acceda a la Demo utilizando el botón 'Entrada Sandbox' en la tarjeta de login superior.`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            actionText="Solicitar Match ⚡"
          />

        </div>
      </section>
        </>
      )}

      {activePage === 'servicios' && (
        <>
          {/* 8. PREMIUM PLAN PRICING PACKAGES */}
      <section id="pricing" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-celeste bg-brand-celeste/10 px-3 py-1 rounded-full border border-brand-celeste/20">
              Modelos de Certificación
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
              Módulos de Triangulación Certificada
            </h2>
            <p className="text-sm text-slate-500">
              Elija el nivel de protección civil, GPS, y respaldo normativo que se adapte al tipo de mercancía y confianza con su transportista.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PREMIUM_PLANS.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-3xl border text-left p-8 flex flex-col justify-between hover:shadow-2xl transition duration-300 relative ${
                  plan.id === 'smart' 
                    ? 'border-brand-celeste ring-4 ring-brand-celeste/10 shadow-xl' 
                    : 'border-slate-200'
                }`}
              >
                {plan.id === 'smart' && (
                  <span className="absolute -top-3.5 left-6 bg-brand-celeste text-brand-navy text-[10px] uppercase font-mono font-black tracking-widest px-3 py-1 rounded-full shadow">
                    ★ RECOMENDADO POR ADUANAS
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-black text-brand-navy tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold mt-1 leading-snug">{plan.tagline}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-normal">
                    {plan.description}
                  </p>

                  <div className="border-t border-slate-100 pt-6 space-y-3.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Incluye:</span>
                    {plan.includes.map(inc => (
                      <div key={inc} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <span className="text-brand-celeste shrink-0 text-base leading-none font-bold">✓</span>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => {
                      alert(`Usted ha seleccionado el plan ${plan.name}. Para iniciar fletes bajo este modelo, acceda al Portal SaaS mediante el botón Sandbox en la tarjeta superior.`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition duration-150 uppercase tracking-wider ${
                      plan.id === 'smart'
                        ? 'bg-brand-navy hover:bg-brand-celeste text-white hover:text-brand-navy'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Ver más detalles del plan
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
        </>
      )}

      {activePage === 'nosotros' && (
        <>
          {/* 9. PORT LINK CORPORATE IDENTITY, MISSION, VISION */}
      <section id="nosotros" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-8 text-left">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-celeste bg-brand-celeste/10 px-3 py-1 rounded-full border border-brand-celeste/20">
                Liderazgo Logístico B2B
              </span>
              <h2 className="text-4xl font-display font-extrabold text-brand-navy tracking-tight">
                Impulsamos la Sostenibilidad Portuaria del Perú
              </h2>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              PORT LINK es una plataforma digital peruana especializada en operaciones Street Turn para optimizar la reutilización de contenedores vacíos.
            </p>

            <p className="text-sm text-slate-500 leading-relaxed">
              Conectamos importadores, exportadores y operadores logísticos para reducir recorridos innecesarios de flete vacío, costos operativos sustanciales y emisiones contaminantes mediante tecnología, trazabilidad y soluciones inteligentes homologadas internacionalmente.
            </p>

            {/* Quick badges row */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xl">🇵🇪</span>
                <p className="text-[10px] font-bold text-slate-600 mt-2">Tecnología Peruana</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xl">⚓</span>
                <p className="text-[10px] font-bold text-slate-600 mt-2">Corazón Portuario</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xl">🍃</span>
                <p className="text-[10px] font-bold text-slate-600 mt-2">Logística Verde</p>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Mission Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4 border border-slate-800 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-celeste/5 rounded-full blur-2xl" />
              <span className="w-10 h-10 rounded-full bg-brand-celeste/10 text-brand-celeste flex items-center justify-center font-bold text-lg">
                🎯
              </span>
              <h4 className="text-lg font-display font-bold text-brand-celeste uppercase tracking-wider">
                Nuestra Misión
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transformar la logística portuaria mediante soluciones digitales seguras, eficientes y socialmente comprometidas en la reutilización estructural de contenedores vacíos.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-brand-navy text-white rounded-3xl p-8 space-y-4 border border-slate-800 text-left relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-celeste/10 rounded-full blur-2xl" />
              <span className="w-10 h-10 rounded-full bg-brand-celeste/15 text-brand-celeste flex items-center justify-center font-bold text-lg">
                👁️
              </span>
              <h4 className="text-lg font-display font-bold text-brand-celeste uppercase tracking-wider">
                Nuestra Visión
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ser la plataforma líder de reutilización de contenedores vacíos en el Perú, consolidando operaciones Street Turn en todos los puertos marítimos y terrestres de Sudamérica para el año 2028.
              </p>
            </div>

          </div>

        </div>
      </section>
        </>
      )}

      {activePage === 'contacto' && (
        <div className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-[#00A8E8] uppercase tracking-wider bg-[#00A8E8]/10 px-3 py-1 rounded-full">
                  Soporte Directo B2B
                </span>
                <h2 className="text-3xl font-extrabold text-[#0A2342] mt-3">
                  Envíenos un mensaje corporativo
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  Nuestros agentes especializados de Port Link le responderán en menos de 2 horas hábiles.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('¡Mensaje enviado con éxito! Un especialista en Street Turn se pondrá en contacto con usted.'); }} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Nombre y Apellido</label>
                    <input required type="text" placeholder="Ej. Juan Pérez" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Empresa / RUC</label>
                    <input required type="text" placeholder="Ej. Logística SAC" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Correo Empresarial</label>
                  <input required type="email" placeholder="juan.perez@empresa.pe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all" />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Asunto de Interés</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all">
                    <option>Solicitar Demostración Guiada</option>
                    <option>Integración API para Transportistas</option>
                    <option>Planes Corporativos y Seguros</option>
                    <option>Soporte de Cuenta y Facturación</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Detalle de su Consulta</label>
                  <textarea required rows={4} placeholder="Escriba aquí los detalles de su operación..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#00A8E8] focus:ring-1 focus:ring-[#00A8E8] transition-all"></textarea>
                </div>

                <button type="submit" className="w-full py-4 bg-[#0F4C81] hover:bg-[#0A2342] text-white font-bold rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2">
                  Enviar Consulta Corporativa ⚡
                </button>
              </form>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="bg-[#0A2342] text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A8E8]/10 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-xl font-bold text-[#00A8E8]">Oficina Central Callao</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Nuestras operaciones principales se controlan estratégicamente desde el centro logístico más dinámico del país.
                </p>

                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/10 rounded-lg text-white">📍</div>
                    <div className="text-xs text-slate-300 leading-normal">
                      Av. Néstor Gambetta, Callao - Perú<br />
                      <span className="text-[10px] text-slate-400">Frente al Terminal Marítimo DP World y APM Terminals</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg text-white">✉️</div>
                    <p className="text-xs text-slate-300">contacto@portlink.pe</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg text-white">📞</div>
                    <p className="text-xs text-slate-300">+51 (1) 640-PORT</p>
                  </div>
                </div>
              </div>

              {/* Simulated Map Visual */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-md relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-[#E5E3DF] flex flex-col justify-between p-4">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow text-xs relative z-10">
                    <p className="font-bold text-[#0A2342]">⚓ Sede Port Link Callao</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Av. Néstor Gambetta Km 6.5, Callao, Perú</p>
                  </div>
                  {/* Abstract Grid Map lines representation */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg width="100%" height="100%">
                      <line x1="20" y1="0" x2="20" y2="100%" stroke="currentColor" strokeWidth="2" />
                      <line x1="120" y1="0" x2="120" y2="100%" stroke="currentColor" strokeWidth="3" />
                      <line x1="220" y1="0" x2="220" y2="100%" stroke="currentColor" strokeWidth="1" />
                      <line x1="0" y1="80" x2="100%" y2="80" stroke="currentColor" strokeWidth="4" />
                      <line x1="0" y1="180" x2="100%" y2="180" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex justify-center items-center h-full">
                    <span className="text-4xl animate-bounce">📍</span>
                  </div>
                  <div className="text-right text-[9px] text-slate-500 relative z-10">
                    Map data ©2027 Port Link GPS Engine
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 10. EL PRESTIGIOSO FOOTER CON ENLACES Y MARCAS REGISTRADAS */}
      <footer id="contacto" className="bg-brand-navy text-white pt-16 pb-8 border-t border-slate-800 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Visual mesh */}
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-celeste/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <Logo variant="horizontal" theme="dark" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Conectamos contenedores vacíos, optimizamos tu logística portuaria peruana de importación y exportación de punta a punta.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 bg-slate-800/60 hover:bg-brand-celeste hover:text-brand-navy rounded-lg flex items-center justify-center transition"
              >
                💼
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 bg-slate-800/60 hover:bg-brand-celeste hover:text-brand-navy rounded-lg flex items-center justify-center transition"
              >
                👥
              </a>
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 bg-slate-800/60 hover:bg-brand-celeste hover:text-brand-navy rounded-lg flex items-center justify-center transition"
              >
                📱
              </a>
            </div>
          </div>

          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase">Ubicaciones y Oficinas</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-celeste shrink-0" />
                <span>Callao - Perú<br />Av. Néstor Gambetta, Callao</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-celeste" />
                <a href="mailto:contacto@portlink.pe" className="hover:underline">contacto@portlink.pe</a>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-celeste" />
                <a href="https://www.portlink.pe" target="_blank" rel="noreferrer" className="hover:underline">www.portlink.pe</a>
              </p>
            </div>
          </div>

          <div className="md:col-span-4 text-left space-y-4">
            <h4 className="font-display font-semibold text-white tracking-wider text-sm uppercase">Soporte y Consultas B2B</h4>
            <p className="text-xs text-slate-300">
              ¿Desea cotizar un plan a la medida de su agencia fiscalizadora? Regístrese para recibir asesoría.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="su-correo@empresa.pe"
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs w-full text-white placeholder-slate-500 focus:outline-none focus:border-brand-celeste"
              />
              <button 
                onClick={() => alert('¡Gracias por suscribirse! Pronto recibirá un catálogo informativo de Street Terms peruanos.')}
                className="px-4 py-2 bg-brand-celeste text-brand-navy font-bold text-xs rounded-lg whitespace-nowrap hover:bg-brand-celeste/95"
              >
                Enviar
              </button>
            </div>
          </div>

        </div>

        {/* Copy lines */}
        <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© 2027 PORT LINK. Todos los derechos reservados. Callao - Perú.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:underline">Políticas de Privacidad SUTRAN</a>
            <a href="#terms" className="hover:underline">Términos de Flete de Contenedores</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
