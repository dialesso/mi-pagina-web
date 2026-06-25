/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { Container, Operation, EIRReport } from '../types';
import { INITIAL_CONTAINERS, INITIAL_OPERATIONS, PREMIUM_PLANS } from '../data';
import ContainerTable from './ContainerTable';
import EirDigitalTool from './EirDigitalTool';
import GpsTracker from './GpsTracker';
import StreetTurnFlow from './StreetTurnFlow';
import Logo from './Logo';
import { 
  Compass, LayoutDashboard, PlusCircle, Search, TrendingUp, History, 
  Settings, LogOut, CheckCircle2, User, Globe, MessageSquare, Ship, 
  MapPin, Cloud, DollarSign, Calendar, Info, RefreshCw, Layers, ShieldCheck, Play 
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
  userEmail?: string;
}

export default function SaaS_Dashboard({ onLogout, userEmail = 'contacto@portlink.pe' }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'inicio' | 'publicar' | 'buscar' | 'operaciones' | 'gps' | 'eir' | 'historial' | 'reportes' | 'perfil'>('inicio');
  
  // Dynamic application state
  const [containers, setContainers] = useState<Container[]>(INITIAL_CONTAINERS);
  const [operations, setOperations] = useState<Operation[]>(INITIAL_OPERATIONS);
  const [eirReports, setEirReports] = useState<EIRReport[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  // Match process state
  const [matchingContainer, setMatchingContainer] = useState<Container | null>(null);
  const [isMatchingInProgress, setIsMatchingInProgress] = useState(false);
  const [matchExporterName, setMatchExporterName] = useState('Agrícola del Sur SAC');
  const [matchSuccess, setMatchSuccess] = useState(false);

  // New Published container fields
  const [newNaviera, setNewNaviera] = useState('MSC');
  const [newCode, setNewCode] = useState('MSCU' + Math.floor(1000000 + Math.random() * 9000000));
  const [newType, setNewType] = useState<'40 HC' | '20 DC' | '40 DC' | '20 RF'>('40 HC');
  const [newEmptyDate, setNewEmptyDate] = useState('24/09/2027');
  const [newLocation, setNewLocation] = useState('Callao');
  const [newCompanyName, setNewCompanyName] = useState('Importaciones Sol de Lima SAC');

  // New active operation dynamic counter
  const triggerNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  // Add container action
  const handlePublishContainer = (e: FormEvent) => {
    e.preventDefault();
    const newContainer: Container = {
      id: `c-${Date.now()}`,
      naviera: newNaviera,
      code: newCode.toUpperCase().trim(),
      type: newType,
      emptyDate: newEmptyDate,
      location: newLocation,
      status: 'Disponible',
      companyName: newCompanyName,
      priceEstimated: 210,
      savingsEstimated: 210
    };

    setContainers([newContainer, ...containers]);
    triggerNotification(`¡Contenedor ${newContainer.code} registrado correctamente! Ya está visible en el mercado y disponible para Street Turn.`);
    
    // Reset code
    setNewCode('MSCU' + Math.floor(1000000 + Math.random() * 9000000));
    setActiveTab('buscar'); // Take users to the matching pool to explore
  };

  const handleStartMatchSimulation = (container: Container) => {
    setMatchingContainer(container);
    setIsMatchingInProgress(true);
    setMatchSuccess(false);

    // Simulate smart matching duration
    setTimeout(() => {
      setIsMatchingInProgress(false);
      setMatchSuccess(true);
    }, 3000);
  };

  const confirmMatchOperation = () => {
    if (!matchingContainer) return;

    const newOp: Operation = {
      id: `op-${Math.floor(100 + Math.random() * 900)}`,
      containerId: matchingContainer.id,
      containerCode: matchingContainer.code,
      naviera: matchingContainer.naviera,
      type: matchingContainer.type,
      importer: matchingContainer.companyName,
      exporter: matchExporterName,
      status: 'Confirmada',
      progress: 15,
      driverName: 'Oscar Lizárraga',
      plateNumber: 'C8X-942',
      currentCoord: { lat: -12.0431, lng: -77.1245 },
      gpsAlert: false,
      savingsUsd: 210,
      co2SavedTon: 0.08,
      kilometersAvoided: 110,
      dateCreated: new Date().toLocaleDateString('es-PE')
    };

    // Add to operational list
    setOperations([newOp, ...operations]);
    
    // Update container status so it cannot be matched again in real time
    setContainers(prev => prev.map(c => c.code === matchingContainer.code ? { ...c, status: 'En tránsito' } : c));

    triggerNotification(`¡Conexión Street Turn confirmada para ${matchingContainer.code}! La orden de ruta ha sido transmitida al transportista escolar SUTRAN.`);
    setMatchingContainer(null);
    setMatchSuccess(false);
    setActiveTab('operaciones');
  };

  // Stats calculate
  const statsTotalContainers = containers.filter(c => c.status === 'Disponible' || c.status === 'Próxima liberación').length;
  const statsActiveOps = operations.filter(o => o.status !== 'Completado').length;
  const statsSavings = operations.reduce((acc, o) => acc + o.savingsUsd, 0);
  const statsKms = operations.reduce((acc, o) => acc + o.kilometersAvoided, 0);
  const statsCo2 = operations.reduce((acc, o) => acc + o.co2SavedTon, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans relative">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-brand-navy border-2 border-brand-celeste text-white rounded-xl shadow-2xl p-4 flex gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-brand-celeste/20 flex items-center justify-center shrink-0 text-brand-celeste text-lg font-bold">
            🔔
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-brand-celeste">Mensaje del Puerto de Callao</h4>
            <p className="text-xs text-slate-300 mt-1">{notification}</p>
          </div>
        </div>
      )}

      {/* MATCH POPUP MODAL (Intelligent Match Simulator) */}
      {matchingContainer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-brand-navy border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
            
            <div className="p-6 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
              <div>
                <span className="bg-brand-celeste/20 text-brand-celeste text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Algoritmo de Correlación Sincrona
                </span>
                <h3 className="text-lg font-display font-bold text-white mt-1">
                  Reutilizador de Ruta Inteligente Street Turn
                </h3>
              </div>
              <button 
                onClick={() => setMatchingContainer(null)} 
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Top details */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <div>
                  <h5 className="text-[10px] text-slate-500 font-bold uppercase">Importador Cedente</h5>
                  <p className="text-xs font-bold text-white mt-0.5 truncate">{matchingContainer.companyName}</p>
                  <p className="text-xs text-brand-celeste font-mono mt-1">
                    📍 {matchingContainer.location} • {matchingContainer.naviera}
                  </p>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <h5 className="text-[10px] text-slate-500 font-bold uppercase">Equipo Reusable</h5>
                  <p className="text-sm font-mono font-bold text-brand-celeste mt-0.5">{matchingContainer.code}</p>
                  <p className="text-xs text-slate-400">Tipo: {matchingContainer.type} HC Seco</p>
                </div>
              </div>

              {/* Loader match / Success matching */}
              {isMatchingInProgress ? (
                <div className="py-10 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-brand-celeste animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center text-lg">🛰️</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Buscando Exportador de Cercanías...</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Cruzando manifiestos de aduana, booking activo de exportaciones y geolocalización de camiones en Callao, Lurín y Ventanilla.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl flex gap-3 text-sm">
                    <span className="text-xl">🎉</span>
                    <div>
                      <h4 className="font-bold text-emerald-400">¡MATCH IDEAL ENCONTRADO! (Eficiencia 98%)</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Se identificó una solicitud de reserva activa que requiere un contenedor vació seco de tipo <b>{matchingContainer.type}</b> con la naviera <b>{matchingContainer.naviera}</b>.
                      </p>
                    </div>
                  </div>

                  {/* Exporter matched fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-slate-400 uppercase font-semibold">Exportador Seleccionado</label>
                      <input
                        type="text"
                        value={matchExporterName}
                        onChange={(e) => setMatchExporterName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-brand-celeste"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-500">Kilómetros Evitados</span>
                        <p className="text-sm font-bold text-white mt-1">115 Kilómetros</p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-500">Ahorro Estimado</span>
                        <p className="text-sm font-bold text-emerald-400 mt-1">US$ 210 de flete</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action trigger */}
              <div className="flex gap-3 justify-end border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setMatchingContainer(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-300"
                >
                  Cancelar
                </button>
                {matchSuccess && (
                  <button
                    type="button"
                    onClick={confirmMatchOperation}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1 shadow-md shadow-emerald-500/20"
                    id="btn-confirm-streetturn"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Autorizar Triangulación Street Turn
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 shrink-0 flex flex-col justify-between">
        <div className="p-6">
          {/* Brand Logo Header */}
          <div className="flex items-center justify-between mb-8">
            <Logo variant="horizontal" theme="dark" />
            <span className="text-[9px] bg-brand-celeste/15 text-brand-celeste border border-brand-celeste/30 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest shrink-0">
              SaaS
            </span>
          </div>

          {/* User Meta header */}
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-full bg-brand-celeste/15 flex items-center justify-center text-brand-celeste font-bold shadow-md shadow-brand-celeste/10">
              U
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-300 truncate">{userEmail}</p>
              <p className="text-[10px] text-brand-celeste flex items-center gap-1 font-semibold uppercase mt-0.5">
                ● Operador Activo
              </p>
            </div>
          </div>

          {/* Sidebar Menu options */}
          <nav className="space-y-1.5">
            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">OPERATIVO</h5>
            <button
              onClick={() => setActiveTab('inicio')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'inicio' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-brand-celeste" />
              Inicio / Dashboard
            </button>

            <button
              onClick={() => setActiveTab('publicar')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'publicar' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-brand-celeste" />
              Publicar contenedor
            </button>

            <button
              onClick={() => setActiveTab('buscar')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'buscar' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4 text-brand-celeste" />
              Buscar contenedores
            </button>

            <button
              onClick={() => setActiveTab('operaciones')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'operaciones' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-brand-celeste animate-spin-slow" />
              Operaciones activas
              <span className="ml-auto bg-brand-celeste/20 text-brand-celeste px-1.5 py-0.5 rounded text-[9px] font-bold">
                {operations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gps')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'gps' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4 text-brand-celeste" />
              Seguimiento GPS
            </button>

            <button
              onClick={() => setActiveTab('eir')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'eir' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-brand-celeste" />
              EIR Digital
            </button>

            <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-6">ANALÍTICA & CUENTA</h5>

            <button
              onClick={() => setActiveTab('historial')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'historial' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <History className="w-4 h-4 text-brand-celeste" />
              Historial
            </button>

            <button
              onClick={() => setActiveTab('reportes')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'reportes' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-brand-celeste" />
              Reportes
            </button>

            <button
              onClick={() => setActiveTab('perfil')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition ${
                activeTab === 'perfil' ? 'bg-brand-petroleum text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-brand-celeste" />
              Perfil de empresa
            </button>
          </nav>
        </div>

        {/* Logout bottom footer area */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex flex-col gap-3">
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span>PORT LINK v2.4</span>
            <span className="text-brand-celeste font-mono font-bold">Estable</span>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900 text-rose-300 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MAIN MAIN CONTENT STAGE */}
      <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto max-h-screen">
        
        {/* Banner with local Peruvian Logistics greeting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">
              {activeTab === 'inicio' && 'Panel General de Operaciones'}
              {activeTab === 'publicar' && 'Publicar Contenedor Libre'}
              {activeTab === 'buscar' && 'Buscar Contenedores Disponibles'}
              {activeTab === 'operaciones' && 'Monitoreo de Operaciones Activas'}
              {activeTab === 'gps' && 'Soporte y Seguimiento Satelital SUTRAN'}
              {activeTab === 'eir' && 'EIR Móvil y Certificados Digitales'}
              {activeTab === 'historial' && 'Historial de Triangulaciones Callao'}
              {activeTab === 'reportes' && 'Reportes Estadísticos de Sostenibilidad'}
              {activeTab === 'perfil' && 'Ajustes de Perfil B2B Corporativo'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              RUC del Operador: 20609341298 • Terminal APM Callao - Puerto Central Perú.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-brand-celeste/10 text-brand-celeste border border-brand-celeste/20 rounded-full text-xs font-bold font-mono">
              Demo Interactiva Activa
            </span>
          </div>
        </div>

        {/* TAB 1: INICIO (SAAS DASHBOARD OVERVIEW) */}
        {activeTab === 'inicio' && (
          <div className="space-y-6">
            
            {/* Quick KPI stats row */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Disponibles</span>
                <p className="text-2xl font-bold font-display text-brand-celeste mt-1">{statsTotalContainers}</p>
                <span className="text-[10px] text-slate-400 block mt-1">Contenedores</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Operaciones Activas</span>
                <p className="text-2xl font-bold font-display text-white mt-1">{statsActiveOps}</p>
                <span className="text-[10px] text-slate-400 block mt-1">Triangulaciones</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Ahorro Promedio</span>
                <p className="text-2xl font-bold font-display text-white mt-1">US$ 210</p>
                <span className="text-[10px] text-emerald-400 block mt-1">Por Operación</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Km Evitados</span>
                <p className="text-2xl font-bold font-display text-brand-celeste mt-1">{(statsKms + 1340).toLocaleString()} km</p>
                <span className="text-[10px] text-slate-400 block mt-1">Flete vacío ahorrado</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-left col-span-2 md:col-span-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Reducción CO₂</span>
                <p className="text-2xl font-bold font-display text-emerald-400 mt-1">{(statsCo2 + 0.8).toFixed(2)} Tn</p>
                <span className="text-[10px] text-emerald-400 block mt-1">Emisiones compensadas</span>
              </div>
            </div>

            {/* Quick overview alert */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-blue-500/20 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-3 text-left">
                <span className="text-2xl">🌱</span>
                <div>
                  <h4 className="font-display font-bold text-sm text-brand-celeste">
                    ¿Cómo funciona este panel interactivo?
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    Este panel SaaS simula el entorno real que utilizan los exportadores peruanos. Puedes 
                    <b> Publicar un Contenedor</b> vacío de un importador, y luego ir a 
                    <b> Buscar Contenedores</b> para realizar un match instantáneo de triangulación, viéndolo circular vivo en el mapa GPS.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('buscar')}
                className="px-4 py-2 bg-brand-celeste hover:bg-brand-celeste/80 text-brand-navy font-bold text-xs rounded-xl transition whitespace-nowrap self-stretch md:self-auto flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                Buscar Equipos Ahora
              </button>
            </div>

            {/* Street Turn Active Simulator animation in dashboard */}
            <StreetTurnFlow />

            {/* Table layout inside dashboard */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-bold text-lg text-white">Mercado en Tiempo Real (Lima & Callao)</h3>
                <button 
                  onClick={() => setActiveTab('buscar')} 
                  className="text-xs text-brand-celeste hover:underline font-bold"
                >
                  Ver todos los contenedores →
                </button>
              </div>
              <ContainerTable 
                onActionClick={handleStartMatchSimulation}
                actionText="Buscar Match Inteligente ⚡"
              />
            </div>

          </div>
        )}

        {/* TAB 2: PUBLICAR CONTENEDOR */}
        {activeTab === 'publicar' && (
          <div className="max-w-2xl mx-auto bg-slate-950/60 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
            <div>
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-6 h-6 text-brand-celeste animate-bounce" />
                Declarar Disponibilidad de Contenedor Vacío
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ingrese los datos del contenedor de importación descargado en su almacén para que el algoritmo busque exportadores compatibles y configure el Street Turn.
              </p>
            </div>

            <form onSubmit={handlePublishContainer} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                    Línea Naviera Propietaria
                  </label>
                  <select
                    value={newNaviera}
                    onChange={(e) => setNewNaviera(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-celeste"
                    id="new-naviera"
                  >
                    <option value="MSC">MSC</option>
                    <option value="MAERSK">MAERSK</option>
                    <option value="CMA CGM">CMA CGM</option>
                    <option value="ONE">ONE</option>
                    <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                    Código de Contenedor (Número de Sigla)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={11}
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Ej: MSCU4587124"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-celeste font-mono font-bold"
                    id="new-code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                    Tipo de Contenedor ISO
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-celeste"
                    id="new-type"
                  >
                    <option value="40 HC">40 HC (High Cube, Seco)</option>
                    <option value="20 DC">20 DC (Dry Cargo Standard)</option>
                    <option value="40 DC">40 DC (Dry Cargo Standard)</option>
                    <option value="20 RF">20 Reefer (Refrigerado)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                    Fecha programada de vaciado
                  </label>
                  <input
                    type="text"
                    required
                    value={newEmptyDate}
                    onChange={(e) => setNewEmptyDate(e.target.value)}
                    placeholder="Ej: 24/09/2027"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-celeste"
                    id="new-date"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                    Ubicación Almacén
                  </label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-celeste"
                    id="new-location"
                  >
                    <option value="Callao">Callao, Perú</option>
                    <option value="Ventanilla">Ventanilla, Perú</option>
                    <option value="Lurín">Lurín, Perú</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                  Nombre de Importadora Cedente
                </label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="Ej: Corporación Industrial del Perú"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-celeste"
                  id="new-company-name"
                />
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-400">
                <p className="font-bold text-white mb-1 flex items-center gap-1">
                  <Info className="w-4 h-4 text-brand-celeste shrink-0" />
                  Beneficios del Registro Inmediato:
                </p>
                <p>✓ El algoritmo cruza su equipo con 48 exportadores agrícolas y minerales en las cercanías.</p>
                <p>✓ Se exime automáticamente del pago por día de sobrestadía desde el instante del reporte.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-celeste hover:bg-brand-celeste/80 text-brand-navy font-bold rounded-xl transition duration-200"
                id="btn-submit-publish"
              >
                Publicar Contenedor en Mercado Abierto
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: BUSCAR CONTENEDORES */}
        {activeTab === 'buscar' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Buscador y Match de Contenedores Libres</h2>
              <p className="text-xs text-slate-400 mt-1">
                Filtre y cotice los contenedores de importación disponibles para triangulación inmediata. Al hacer clic en match, simulará el emparejamiento con el exportador.
              </p>
            </div>

            <ContainerTable 
              onActionClick={handleStartMatchSimulation}
              actionText="Iniciar Match Sincrónico ⚡"
            />
          </div>
        )}

        {/* TAB 4: OPERACIONES ACTIVAS */}
        {activeTab === 'operaciones' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Monitoreo de Triangulaciones Activas</h2>
              <p className="text-xs text-slate-400 mt-1">
                La siguiente tabla muestra el avance de las triangulaciones activas confirmadas por PORT LINK.
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 bg-slate-900 border-b border-slate-800 text-white font-bold text-sm tracking-wide">
                Lista de Triangulaciones de Flota
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-900/50 text-slate-500 font-bold text-xs uppercase tracking-wider border-b border-slate-800">
                      <th className="py-3.5 px-6">Código Ops</th>
                      <th className="py-3.5 px-6">Contenedor</th>
                      <th className="py-3.5 px-6">Naviera / Tipo</th>
                      <th className="py-3.5 px-6">Origen (Impo) / Destino (Expo)</th>
                      <th className="py-3.5 px-6">Progreso</th>
                      <th className="py-3.5 px-6">Chofer</th>
                      <th className="py-3.5 px-6">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {operations.map(op => (
                      <tr key={op.id} className="hover:bg-slate-900/40 text-slate-300">
                        <td className="py-4 px-6 font-mono font-bold text-slate-400">{op.id}</td>
                        <td className="py-4 px-6 font-mono font-bold text-brand-celeste">{op.containerCode}</td>
                        <td className="py-4 px-6 font-medium">{op.naviera} • {op.type}</td>
                        <td className="py-4 px-6 max-w-xs truncate text-[12px]">
                          <div className="text-slate-200 truncate"><b>Impo:</b> {op.importer}</div>
                          <div className="text-emerald-400 truncate"><b>Expo:</b> {op.exporter}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs">{op.progress}%</span>
                            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden shrink-0">
                              <div className="bg-brand-celeste h-full" style={{ width: `${op.progress}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs">
                          <div>{op.driverName}</div>
                          <div className="text-slate-500 font-mono text-[10px]">Placa: {op.plateNumber}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            op.status === 'Verificación EIR' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            op.status === 'En Tránsito' ? 'bg-brand-celeste/20 text-brand-celeste border border-brand-celeste/30 animate-pulse' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {op.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row gap-5 items-center justify-between">
              <div>
                <h4 className="font-display font-semibold text-white text-sm">¿Desea ver el posicionamiento GPS satelital o simular alarmas de ruta fiscalizada?</h4>
                <p className="text-xs text-slate-400 mt-1">Acceda al módulo de geolocalización integrada para pruebas funcionales.</p>
              </div>
              <button
                onClick={() => setActiveTab('gps')}
                className="px-4 py-2 bg-brand-celeste text-brand-navy font-bold text-xs rounded-xl hover:bg-brand-celeste/80 self-stretch md:self-auto flex items-center justify-center gap-1.5"
              >
                <Compass className="w-4 h-4" />
                Abrir Seguimiento Satelital GPS
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: SEGUIMIENTO GPS */}
        {activeTab === 'gps' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Soporte y Seguimiento Satelital SUTRAN</h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualización satelital homologada de nuestra flota de camiones. Al hacer clic en un contenedor de la lista izquierda, se actualizará el mapa y el transportista a cargo.
              </p>
            </div>

            <GpsTracker 
              onNotifyAdmin={(msg) => triggerNotification(msg)}
            />
          </div>
        )}

        {/* TAB 6: EIR DIGITAL */}
        {activeTab === 'eir' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Actas EIR Corrientes de Callao y Lima</h2>
              <p className="text-xs text-slate-400 mt-1">
                Simule el proceso de autoinspección de 6 caras del contenedor. Registre los raspones o abolladuras con el cursor y certifique su validez legal con firma digital.
              </p>
            </div>

            <EirDigitalTool 
              onEirCreated={(report) => {
                setEirReports([report, ...eirReports]);
                triggerNotification(`Acta EIR para ${report.containerCode} guardada y firmada por ${report.inspectorName}.`);
              }}
            />
          </div>
        )}

        {/* TAB 7: HISTORIAL */}
        {activeTab === 'historial' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Historial de Triangulaciones Completadas</h2>
              <p className="text-xs text-slate-400 mt-1">
                Lista de Street Turns completados con éxito durante el último semestre fiscal.
              </p>
            </div>

            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-4 bg-slate-900 border-b border-slate-800 text-white font-bold text-sm">
                Registro de fletamentos históricos - Últimos 3 matches
              </div>
              <div className="divide-y divide-slate-800">
                <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-slate-300">
                  <div>
                    <span className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">✓ TRANSACCIÓN COMPLETADA</span>
                    <h4 className="font-display font-bold text-white text-base mt-0.5">MSCU9412850 (40 HC) • Realizado el 10/06/2027</h4>
                    <p className="text-xs text-slate-400 mt-1">Impo: Aceros De Sol • Expo: Agroexportadora Trujillo SAC</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold block">Ahorro certificado</span>
                    <span className="text-lg font-bold text-emerald-400 font-display">US$ 210</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-slate-300">
                  <div>
                    <span className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">✓ TRANSACCIÓN COMPLETADA</span>
                    <h4 className="font-display font-bold text-white text-base mt-0.5">MAEU4102941 (20 DC) • Realizado el 04/06/2027</h4>
                    <p className="text-xs text-slate-400 mt-1">Impo: Llama Textiles SAC • Expo: Consorcio Mineral Lurín</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold block">Ahorro certificado</span>
                    <span className="text-lg font-bold text-emerald-400 font-display">US$ 210</span>
                  </div>
                </div>

                <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-slate-300">
                  <div>
                    <span className="text-xs text-emerald-400 font-mono font-bold uppercase tracking-wider">✓ TRANSACCIÓN COMPLETADA</span>
                    <h4 className="font-display font-bold text-white text-base mt-0.5">CMAU5581109 (40 HC) • Realizado el 28/05/2027</h4>
                    <p className="text-xs text-slate-400 mt-1">Impo: Corporación San José • Expo: Agroindustrias Ica SAC</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-bold block">Ahorro certificado</span>
                    <span className="text-lg font-bold text-emerald-400 font-display">US$ 210</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: REPORTES Y ESTADÍSTICAS */}
        {activeTab === 'reportes' && (
          <div className="space-y-6 text-left animate-fade-in">
            <div>
              <h2 className="text-2xl font-display font-bold text-white">Métricas de Sostenibilidad / Ahorro</h2>
              <p className="text-xs text-slate-400 mt-1">
                Visualización gráfica del flete evitado, huella de carbono mitigada y flujo monetario guardado gracias a la triangulación Street Turn.
              </p>
            </div>

            {/* Custom SVG Charts with beautiful tooltips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Savings Chart */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-display font-bold text-slate-200 uppercase tracking-widest mb-4">
                  Ahorros Acumulados ($USD) por Trimestre
                </h3>
                
                {/* Simulated Chart Bars */}
                <div className="h-64 flex items-end gap-6 pt-4 border-b border-l border-slate-800 pl-4 pb-2">
                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition">$1,280</span>
                    <div className="w-full bg-blue-900 border border-blue-700 rounded-t-lg transition-all duration-500 h-20 group-hover:bg-brand-celeste shrink-0" />
                    <span className="text-[10px] text-slate-500 font-mono font-bold mt-2">Q1 2026</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition">$2,140</span>
                    <div className="w-full bg-blue-850 border border-blue-650 rounded-t-lg transition-all duration-500 h-32 group-hover:bg-brand-celeste shrink-0" />
                    <span className="text-[10px] text-slate-500 font-mono font-bold mt-2">Q2 2026</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition">$3,920</span>
                    <div className="w-full bg-blue-800 border border-blue-600 rounded-t-lg transition-all duration-500 h-44 group-hover:bg-brand-celeste shrink-0" />
                    <span className="text-[10px] text-slate-500 font-mono font-bold mt-2">Q3 2026</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-brand-celeste font-bold animate-pulse font-bold">$6,180</span>
                    <div className="w-full bg-brand-celeste/90 border border-brand-celeste rounded-t-lg transition-all duration-500 h-56 group-hover:bg-brand-celeste shrink-0" />
                    <span className="text-[10px] text-brand-celeste font-mono font-bold mt-2 font-bold">Q4 2026</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  *Proyección calculada sobre un universo promedio de 14 operaciones mensuales en puerto Callao.
                </p>
              </div>

              {/* Box 2: CO2 Reduction */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-display font-bold text-slate-200 uppercase tracking-widest mb-4">
                  Huella de Carbono Mitigada (Telas de CO₂)
                </h3>

                <div className="h-64 flex items-end gap-6 pt-4 border-b border-l border-slate-800 pl-4 pb-2">
                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition">0.14 Tn</span>
                    <div className="w-full bg-emerald-950 border border-emerald-800 rounded-t-lg h-16 group-hover:bg-emerald-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-mono font-bold mt-2">Q1 2026</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition">0.28 Tn</span>
                    <div className="w-full bg-emerald-900 border border-emerald-700 rounded-t-lg h-28 group-hover:bg-emerald-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-mono font-bold mt-2">Q2 2026</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition">0.52 Tn</span>
                    <div className="w-full bg-emerald-850 border border-emerald-600 rounded-t-lg h-40 group-hover:bg-emerald-400 shrink-0" />
                    <span className="text-[10px] text-slate-500 font-mono font-bold mt-2">Q3 2026</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-emerald-400 font-bold font-bold">1.22 Tn</span>
                    <div className="w-full bg-emerald-500/80 border border-emerald-500 rounded-t-lg h-52 group-hover:bg-emerald-400 shrink-0" />
                    <span className="text-[10px] text-emerald-400 font-mono font-bold mt-2 font-bold">Q4 2026</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 text-center">
                  *Estándar de mitigación auditado bajo protocolo GHG y SUTRAN en Lima Metropolitana.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 9: PERFIL DE EMPRESA */}
        {activeTab === 'perfil' && (
          <div className="max-w-2xl mx-auto bg-slate-950/60 p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 text-left">
            <div>
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-brand-celeste" />
                Perfil Corporativo B2B
              </h2>
              <p className="text-xs text-slate-400 mt-1 border-b border-slate-800 pb-3">
                Gestione la identidad empresarial visible para los depósitos de vacíos de Lima y Callao.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Razón Social</label>
                  <input
                    type="text"
                    disabled
                    value="CORPORACIÓN IMPORTADORA PORT LINK PERÚ SAC"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">NÚMERO RUC</label>
                  <input
                    type="text"
                    disabled
                    value="20609341298"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Dirección Terminal Legal</label>
                <input
                  type="text"
                  disabled
                  value="Av. Néstor Gambetta N° 2415, Callao, Lima, Perú"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400"
                />
              </div>

              <div className="p-4 bg-blue-950/20 border border-blue-500/20 rounded-xl text-xs text-slate-300 leading-relaxed">
                <p className="font-bold text-white mb-1">ℹ️ Estado del Operador:</p>
                <p>Nuestra cuenta ha sido validada y homologada con <b>Dirección General de Aduanas de la SUNAT</b> para fletes de contenedores secos. Posee firma electrónica activa para ratificar EIR Digital en APM Terminals S.A. y DP World Callao SRL.</p>
              </div>

              <button
                type="button"
                onClick={() => alert('¡Ajustes guardados correctamente! Esta es una simulación del perfil corporativo de PORT LINK.')}
                className="w-full py-2.5 bg-brand-petroleum hover:bg-brand-navy text-white text-xs font-bold rounded-lg transition"
                id="btn-save-profile-sim"
              >
                Guardar Ajustes Corporativos
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
