/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Operation } from '../types';
import { INITIAL_OPERATIONS } from '../data';
import { Compass, AlertTriangle, Truck, MapPin, Eye, Play, StopCircle, RefreshCw, Layers, ShieldCheck } from 'lucide-react';

interface GpsProps {
  onNotifyAdmin?: (msg: string) => void;
}

export default function GpsTracker({ onNotifyAdmin }: GpsProps) {
  const [operations, setOperations] = useState<Operation[]>(INITIAL_OPERATIONS);
  const [selectedOpId, setSelectedOpId] = useState(INITIAL_OPERATIONS[0].id);
  const [isSimulatingCoords, setIsSimulatingCoords] = useState(true);
  const [stepFactor, setStepFactor] = useState(0);

  const selectedOp = operations.find(o => o.id === selectedOpId) || operations[0];

  // Simulating small coordinate drift to represent real-time updates
  useEffect(() => {
    if (!isSimulatingCoords) return;
    const interval = setInterval(() => {
      setStepFactor(prev => (prev + 1) % 100);
      setOperations(prevOps => prevOps.map(op => {
        if (op.currentCoord) {
          // Add micro jitter
          const latJitter = (Math.sin(Date.now() / 2000) * 0.0001);
          const lngJitter = (Math.cos(Date.now() / 2000) * 0.0001);
          return {
            ...op,
            progress: Math.min(op.progress + (Math.random() > 0.7 ? 1 : 0), 100),
            currentCoord: {
              lat: op.currentCoord.lat + latJitter,
              lng: op.currentCoord.lng + lngJitter
            }
          };
        }
        return op;
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulatingCoords]);

  const triggerGpsAlert = (id: string) => {
    setOperations(prevOps => prevOps.map(op => {
      if (op.id === id) {
        const nextState = !op.gpsAlert;
        if (nextState && onNotifyAdmin) {
          onNotifyAdmin(`¡ALERTA GPS CRÍTICA! Contenedor ${op.containerCode} se desvió de la ruta panamericana norte hacia zona residencial no autorizada.`);
        }
        return {
          ...op,
          gpsAlert: nextState
        };
      }
      return op;
    }));
  };

  const getStatusBadgeStyle = (status: Operation['status']) => {
    switch (status) {
      case 'Confirmada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Verificación EIR': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'En Tránsito': return 'bg-brand-celeste/20 text-brand-petroleum border-brand-celeste/30';
      case 'Completado': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      
      {/* LEFT: Operations Selector Panel */}
      <div className="lg:col-span-4 border-r border-slate-200 flex flex-col h-full">
        <div className="p-5 border-b border-slate-200 bg-brand-navy text-white">
          <h3 className="font-display font-bold text-lg flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-celeste animate-spin" />
            Flotas e Hilos GPS Activos
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Plataforma homologada con SUTRAN Peru para escolta digital.
          </p>
        </div>

        {/* Live list block */}
        <div className="divide-y divide-slate-100 overflow-y-auto max-h-[450px]">
          {operations.map((op) => {
            const isSelected = op.id === selectedOpId;
            return (
              <button
                key={op.id}
                onClick={() => setSelectedOpId(op.id)}
                className={`w-full text-left p-4 transition-all duration-150 flex flex-col gap-2 relative ${
                  isSelected ? 'bg-slate-50 border-r-4 border-brand-celeste' : 'hover:bg-slate-50/50'
                }`}
                id={`btn-op-select-${op.id}`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="font-mono text-sm font-bold text-brand-navy">{op.containerCode}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadgeStyle(op.status)}`}>
                    {op.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 text-xs text-slate-500">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Naviera</span>
                    <span className="text-slate-800 font-semibold">{op.naviera} • {op.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Progreso</span>
                    <span className="text-brand-petroleum font-bold">{op.progress}%</span>
                  </div>
                </div>

                {/* Tracking bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      op.gpsAlert ? 'bg-rose-500 animate-pulse' : 'bg-brand-celeste'
                    }`}
                    style={{ width: `${op.progress}%` }}
                  />
                </div>

                {/* Alert Warning pill */}
                {op.gpsAlert && (
                  <div className="bg-rose-50 border border-rose-200 p-2 rounded-lg flex items-center gap-1.5 mt-1 animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="text-[10px] font-bold text-rose-700">RUTA ALTERADA / GEOCERCA VIOLADA</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Control bar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 mt-auto flex justify-between items-center">
          <span className="text-xs text-slate-500">Simulación Automática</span>
          <button
            onClick={() => setIsSimulatingCoords(!isSimulatingCoords)}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              isSimulatingCoords ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
            id="btn-toggle-coords"
          >
            {isSimulatingCoords ? 'Pausar Datos' : 'Reanudar Datos'}
          </button>
        </div>
      </div>

      {/* RIGHT: High-Fidelity Custom Vector Map */}
      <div className="lg:col-span-8 flex flex-col justify-between p-6 bg-slate-50 gap-6">
        
        {/* Top Details bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Transportista</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedOp.driverName}</p>
            <p className="text-[10px] text-slate-500 uppercase font-mono">Placa: {selectedOp.plateNumber}</p>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coordenadas</span>
            <p className="text-xs font-mono font-bold text-slate-800 mt-1">
              -{selectedOp.currentCoord?.lat.toFixed(4)}°S, -{selectedOp.currentCoord?.lng.toFixed(4)}°W
            </p>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geocerca Canal</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-1 bg-emerald-50 px-2 py-0.5 border border-emerald-100 rounded">
              <ShieldCheck className="w-3.5 h-3.5" /> Estándar Vigente
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ahorro Prometido</span>
            <p className="text-sm font-bold text-emerald-600 mt-0.5">US${selectedOp.savingsUsd}</p>
            <p className="text-[10px] text-slate-400 font-medium">-{selectedOp.kilometersAvoided}km Flete</p>
          </div>
        </div>

        {/* Vector Map Simulation Canvas */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden h-[340px] shadow-inner flex items-center justify-center">
          
          {/* Custom Blueprint Map Grid */}
          <svg className="absolute inset-0 w-full h-full text-slate-800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Ocean representation on left */}
            <rect x="0" y="0" width="30%" height="100%" fill="#0a1d37" opacity="0.6" />
            
            {/* Grid Backdrop */}
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Custom Coastal Line */}
            <path d="M 90,0 Q 110,120 130,220 T 110,340" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
            
            {/* Custom Major Routes */}
            {/* Panamericana Norte / Sur Route */}
            <path d="M 120,340 C 130,270 190,200 240,160 T 400,90" fill="none" stroke="#475569" strokeWidth="6" />
            <path d="M 120,340 C 130,270 190,200 240,160 T 400,90" fill="none" stroke="#8294c4" strokeWidth="2" strokeDasharray="3 3" />

            {/* Secondary Port access routes */}
            <path d="M 110,220 L 280,240 L 450,150" fill="none" stroke="#334155" strokeWidth="4" />

            {/* Route path highlight depending on progress */}
            {selectedOpId === 'op-001' && (
              <path d="M 110,220 L 200,226 L 280,240" fill="none" stroke="#00a8e8" strokeWidth="3" className="animate-pulse" />
            )}
            {selectedOpId === 'op-002' && (
              <path d="M 120,340 C 130,270 190,200 210,185" fill="none" stroke="#00a8e8" strokeWidth="3" />
            )}
            {selectedOpId === 'op-003' && (
              <path d="M 120,340 L 150,300" fill="none" stroke="#00a8e8" strokeWidth="3" />
            )}

            {/* Labels on Map */}
            <text x="35" y="150" fill="#00a8e8" fontSize="10" fontWeight="bold" opacity="0.4" fontFamily="monospace">Océano Pacífico</text>
            <text x="35" y="165" fill="#00a8e8" fontSize="8" opacity="0.3" fontFamily="monospace">Zona fondeo naves</text>
            
            <text x="135" y="245" fill="#ffffff" fontSize="10" fontWeight="bold" opacity="0.6">Puerto Callao</text>
            <text x="145" y="255" fill="#00a8e8" fontSize="8">APM / DP World</text>

            <text x="290" y="235" fill="#94a3b8" fontSize="9">Av. Elmer Faucett</text>
            <text x="250" y="150" fill="#94a3b8" fontSize="9" transform="rotate(-15 250 150)">Av. N. Panamericana</text>

            <text x="350" y="80" fill="#ffffff" fontSize="10" opacity="0.6" fontWeight="bold">Ventanilla Industrial</text>
            <text x="350" y="92" fill="#00a8e8" fontSize="8">Depósitos temporales</text>

            {/* Visual Geofence Overlay circle */}
            <circle cx="280" cy="240" r="50" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="290" y="280" fill="#10b981" fontSize="8" fontWeight="bold" opacity="0.7">Geocercas OK</text>
          </svg>

          {/* Dynamic Pin representing current coordinates */}
          {selectedOpId === 'op-001' && (
            <div 
              className="absolute transition-all duration-1000 flex flex-col items-center"
              style={{ left: '46%', top: '65%' }}
            >
              <div className="absolute -top-10 bg-black/80 px-2 py-0.5 rounded text-[9px] text-white whitespace-nowrap font-mono border border-slate-700">
                MSC - Callao
              </div>
              <div className="w-5 h-5 bg-brand-celeste rounded-full flex items-center justify-center animate-bounce shadow-lg ring-4 ring-brand-celeste/20">
                <Truck className="w-3 h-3 text-brand-navy" />
              </div>
              <div className="w-2.5 h-2.5 bg-brand-celeste/50 rounded-full animate-ping absolute -bottom-1" />
            </div>
          )}

          {selectedOpId === 'op-002' && (
            <div 
              className="absolute transition-all duration-1000 flex flex-col items-center"
              style={{ left: '60%', top: '48%' }}
            >
              <div className="absolute -top-10 bg-black/80 px-2 py-0.5 rounded text-[9px] text-white whitespace-nowrap font-mono border border-slate-700">
                Maersk - Ventanilla Route
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg ring-4 ${
                selectedOp.gpsAlert ? 'bg-red-500 ring-red-500/40' : 'bg-brand-celeste ring-brand-celeste/20'
              }`}>
                <Truck className="w-3 h-3 text-white" />
              </div>
              <div className="w-2.5 h-2.5 bg-red-500/50 rounded-full animate-ping absolute -bottom-1" />
            </div>
          )}

          {selectedOpId === 'op-003' && (
            <div 
              className="absolute transition-all duration-1000 flex flex-col items-center"
              style={{ left: '30%', top: '80%' }}
            >
              <div className="absolute -top-10 bg-black/80 px-2 py-0.5 rounded text-[9px] text-white whitespace-nowrap font-mono border border-slate-700">
                ONE - Lurín Route
              </div>
              <div className="w-5 h-5 bg-brand-celeste rounded-full flex items-center justify-center animate-bounce shadow-lg ring-4 ring-brand-celeste/20">
                <Truck className="w-3 h-3 text-brand-navy" />
              </div>
              <div className="w-2.5 h-2.5 bg-brand-celeste/50 rounded-full animate-ping absolute -bottom-1" />
            </div>
          )}

          {/* Compass layout absolute overlay */}
          <div className="absolute bottom-4 right-4 bg-black/70 border border-slate-800 p-2 rounded-lg flex items-center gap-1.5 backdrop-blur-md">
            <span className="text-[10px] text-slate-400 font-mono">SEGUIMIENTO GPS SUTRAN</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="absolute bottom-4 left-4 bg-black/70 border border-slate-800 px-3 py-1.5 rounded-lg flex flex-col gap-0.5 backdrop-blur-md">
            <span className="text-[8px] text-slate-400 font-mono">ENLACE ACTIVO</span>
            <span className="text-[11px] text-brand-celeste font-mono font-bold tracking-widest uppercase">DP WORLD CALLAO</span>
          </div>
        </div>

        {/* Action Panel in Footer of Maps */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
          <div>
            <p className="text-xs text-slate-500">
              ¿Desea probar los protocolos de contingencia y seguridad integral de <b>SMART TURN</b>?
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Simule un desvío de corredor fiscal para verificar alertas a la central policial.
            </p>
          </div>
          
          <button
            onClick={() => triggerGpsAlert(selectedOpId)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              selectedOp.gpsAlert 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20'
            }`}
            id={`btn-simulate-alert-${selectedOpId}`}
          >
            <AlertTriangle className="w-4 h-4" />
            {selectedOp.gpsAlert ? 'Desactivar Alerta Simulada' : 'Simular Alerta de Desvío'}
          </button>
        </div>

      </div>
    </div>
  );
}
