/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Container as ContainerIcon, CheckCircle2, RefreshCw, Send, Loader2 } from 'lucide-react';

export default function StreetTurnFlow() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-brand-navy border border-slate-800 p-8 rounded-2xl text-white relative overflow-hidden shadow-2xl">
      {/* Abstract background graphics */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-celeste/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-petroleum/10 rounded-full blur-3xl" />

      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-display font-semibold tracking-wide text-brand-celeste">
            Simulador de Triangulación Activa
          </h3>
          <p className="text-xs text-slate-400">
            Visualización paso a paso del flujo Street Turn en tiempo real.
          </p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 transition-all ${
            isPlaying ? 'bg-brand-celeste/20 text-brand-celeste border border-brand-celeste/30' : 'bg-slate-800 text-slate-300'
          }`}
          id="btn-play-simulator"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          {isPlaying ? 'Animación activa' : 'Pausado'}
        </button>
      </div>

      {/* Main Flow Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center relative py-6">
        {/* Node 1: Importador */}
        <div className={`p-4 rounded-xl border transition-all duration-500 text-center relative z-10 ${
          step === 0 
            ? 'bg-brand-petroleum border-brand-celeste shadow-lg shadow-brand-celeste/10 scale-105' 
            : 'bg-slate-900/50 border-slate-800 text-slate-400'
        }`}>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2 text-brand-celeste font-bold">
            🏢
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Paso 1</p>
          <h4 className="text-sm font-semibold text-white mt-1">Importador</h4>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full mt-1 inline-block text-slate-300">
            Libera Contenedor
          </span>
        </div>

        {/* Arrow 1 to 2 */}
        <div className="flex lg:flex-col items-center justify-center text-slate-600">
          <motion.div 
            animate={{ x: step === 0 ? [0, 10, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-6 h-6 lg:rotate-0 rotate-90 my-2 lg:my-0 text-brand-celeste" />
          </motion.div>
        </div>

        {/* Node 2: Container Status */}
        <div className={`p-4 rounded-xl border transition-all duration-500 text-center relative z-10 ${
          step === 1 || step === 2
            ? 'bg-slate-900 border-brand-celeste shadow-lg scale-105'
            : 'bg-slate-900/50 border-slate-800 text-slate-400'
        }`}>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2 text-amber-500 font-bold">
            📦
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Paso 2</p>
          <h4 className="text-sm font-semibold text-white mt-1">MSCU4587124</h4>
          <p className="text-[10px] text-slate-300 mt-1">40 HC • Callao</p>
          {step === 1 && (
            <span className="text-[9px] text-amber-400 block mt-1 font-mono animate-pulse">
              Inspección EIR OK
            </span>
          )}
        </div>

        {/* Arrow 2 to 3 */}
        <div className="flex lg:flex-col items-center justify-center text-slate-600">
          <motion.div 
            animate={{ x: step === 2 ? [0, 10, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-6 h-6 lg:rotate-0 rotate-90 my-2 lg:my-0 text-brand-celeste" />
          </motion.div>
        </div>

        {/* Node 3: PORT LINK MATCH */}
        <div className={`p-5 rounded-xl border transition-all duration-700 text-center relative z-10 ${
          step === 2 || step === 3
            ? 'bg-slate-900 border-brand-celeste shadow-lg ring-2 ring-brand-celeste/20 scale-105'
            : 'bg-slate-900/50 border-slate-800 text-slate-400'
        }`}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-celeste text-brand-navy font-bold text-[9px] px-2.5 py-0.5 rounded-full tracking-widest animate-pulse">
            PLATAFORMA AI
          </div>
          <div className="w-11 h-11 rounded-full bg-brand-navy border-2 border-brand-celeste flex items-center justify-center mx-auto mb-2 text-brand-celeste font-bold shadow-md shadow-brand-celeste/20">
            ⚡
          </div>
          <h4 className="text-sm font-bold text-white mt-1 text-brand-celeste">PORT LINK MATCH</h4>
          <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full mt-2 inline-block">
            {step >= 2 ? 'Fusión de Ruta OK' : 'Minería de Datos'}
          </span>
        </div>

        {/* Arrow 3 to 4 */}
        <div className="flex lg:flex-col items-center justify-center text-slate-600">
          <motion.div 
            animate={{ x: step === 3 ? [0, 10, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-6 h-6 lg:rotate-0 rotate-90 my-2 lg:my-0 text-brand-celeste" />
          </motion.div>
        </div>

        {/* Node 4: Exportador */}
        <div className={`p-4 rounded-xl border transition-all duration-500 text-center relative z-10 ${
          step === 3 || step === 4
            ? 'bg-slate-900 border-brand-celeste shadow-lg scale-105'
            : 'bg-slate-900/50 border-slate-800 text-slate-400'
        }`}>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-2 text-emerald-500 font-bold">
            🏭
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Paso 3</p>
          <h4 className="text-sm font-semibold text-white mt-1">Exportador</h4>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full mt-1 inline-block text-slate-300">
            Reutiliza Equipo
          </span>
        </div>

        {/* Arrow 4 to 5 */}
        <div className="flex lg:flex-col items-center justify-center text-slate-600">
          <motion.div 
            animate={{ x: step === 4 ? [0, 10, 0] : 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className="w-6 h-6 lg:rotate-0 rotate-90 my-2 lg:my-0 text-brand-celeste" />
          </motion.div>
        </div>

        {/* Node 5: Confirmed */}
        <div className={`p-4 rounded-xl border transition-all duration-500 text-center relative col-span-1 lg:col-span-1 z-10 ${
          step === 4 
            ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105' 
            : 'bg-slate-900/50 border-slate-800 text-slate-400'
        }`}>
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 animate-bounce" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Paso Final</p>
          <h4 className="text-sm font-semibold text-white mt-1">Operación Confirmada</h4>
          <span className="text-[10px] text-emerald-300 block mt-1 font-mono">
            Ahorro: US$210
          </span>
        </div>
      </div>

      {/* Description text with dynamic animations */}
      <div className="mt-6 bg-slate-900/60 rounded-xl p-4 border border-slate-800/80 min-h-[5rem] flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-brand-celeste/10 flex items-center justify-center shrink-0">
          <Send className="w-4 h-4 text-brand-celeste" />
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="text-sm font-semibold text-white">
                {step === 0 && '1. Liberación por Importadora: Aceros del Pacífico S.A.'}
                {step === 1 && '2. Inspección Móvil y Validación de Daños'}
                {step === 2 && '3. Inteligencia de Emparejamiento Digital Street Turn'}
                {step === 3 && '4. Asignación Directa y Traslado Automatizado'}
                {step === 4 && '5. Entrega de Contenedor Lleno en Terminal Callao'}
              </h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {step === 0 && 'El importador termina de descargar su mercancía en Lurín y declara la disponibilidad inmediata del contenedor de 40 pies para evitar sobrestadía y costos de devolución al depósito de vacíos.'}
                {step === 1 && 'El transportista utiliza la app de PORT LINK para capturar imágenes de las seis caras del contenedor. Se genera un reporte EIR Digital para certificar el perfecto estado del receptáculo.'}
                {step === 2 && 'El motor algorítmico cruza la ubicación y naviera (MSC) y asigna el contenedor a un exportador que requiere cargar mercancías agrícolas a menos de 12 km de distancia.'}
                {step === 3 && 'Se notifica al chofer para realizar la recolección directamente en el almacén de vaciado, omitiendo completamente las 4 horas de cola en el depósito temporal extra-portuario.'}
                {step === 4 && 'Operación exitosa: Se ahorraron 140 km de flete muerto, US$210 de costos de manipulación, y 0.2 toneladas métricas de emisiones de CO₂ en la atmósfera peruana.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
