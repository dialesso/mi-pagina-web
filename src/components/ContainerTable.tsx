/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Container } from '../types';
import { INITIAL_CONTAINERS, NAVIERA_LOGOS } from '../data';
import { Search, Filter, Anchor, AlertCircle, PlusCircle, CheckCircle2 } from 'lucide-react';

interface ContainerTableProps {
  onActionClick: (container: Container) => void;
  actionText?: string;
}

export default function ContainerTable({ onActionClick, actionText = 'Iniciar Street Turn' }: ContainerTableProps) {
  const [containers, setContainers] = useState<Container[]>(INITIAL_CONTAINERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNaviera, setSelectedNaviera] = useState('Todas');
  const [selectedLocation, setSelectedLocation] = useState('Todas');

  const filteredContainers = containers.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNaviera = selectedNaviera === 'Todas' || c.naviera === selectedNaviera;
    const matchesLocation = selectedLocation === 'Todas' || c.location === selectedLocation;
    return matchesSearch && matchesNaviera && matchesLocation;
  });

  const getStatusStyle = (status: Container['status']) => {
    switch (status) {
      case 'Disponible':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Próxima liberación':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Programado':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'En tránsito':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Disponible próximamente':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const getNavieraLogo = (naviera: string) => {
    return NAVIERA_LOGOS[naviera] || NAVIERA_LOGOS['DEFAULT'];
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Table header tools */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h3 className="text-xl font-display font-bold text-brand-navy">
            Tablero de Contenedores Disponibles
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Revisión en tiempo real de equipos importados autorizados para Street Turn en Lima y Callao.
          </p>
        </div>
        
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-brand-celeste/10 text-brand-petroleum border border-brand-celeste/20 rounded-full animate-pulse">
            ● Actualizado hace 4 min
          </span>
        </div>
      </div>

      <div className="p-6 border-b border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por código de contenedor o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-celeste/50 focus:border-brand-celeste bg-slate-50/50"
            id="search-container-code"
          />
        </div>

        {/* Naviera Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedNaviera}
            onChange={(e) => setSelectedNaviera(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-celeste/50"
            id="filter-naviera"
          >
            <option value="Todas">Todas las Navieras</option>
            <option value="MSC">MSC</option>
            <option value="MAERSK">MAERSK</option>
            <option value="CMA CGM">CMA CGM</option>
            <option value="ONE">ONE</option>
            <option value="Hapag-Lloyd">Hapag-Lloyd</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex items-center gap-2">
          <Anchor className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-brand-celeste/50"
            id="filter-location"
          >
            <option value="Todas">Todas las Ubicaciones</option>
            <option value="Callao">Callao</option>
            <option value="Ventanilla">Ventanilla</option>
            <option value="Lurín">Lurín</option>
          </select>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <th className="py-4 px-6">Naviera</th>
              <th className="py-4 px-6">Contenedor</th>
              <th className="py-4 px-6">Tipo</th>
              <th className="py-4 px-6">Fecha de Vaciado</th>
              <th className="py-4 px-6">Ubicación</th>
              <th className="py-4 px-6">Estado</th>
              <th className="py-4 px-6 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredContainers.length > 0 ? (
              filteredContainers.map((container) => (
                <tr 
                  key={container.id} 
                  className="hover:bg-slate-50/80 transition-all duration-150 group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-lg shadow-sm border border-slate-100">
                        {getNavieraLogo(container.naviera)}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900">{container.naviera}</p>
                        <p className="text-[10px] text-slate-400">{container.companyName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono font-semibold text-slate-800">
                    {container.code}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                      {container.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {container.emptyDate}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1 text-slate-700">
                      <span className="text-slate-400 font-bold">📍</span>
                      <span>{container.location}, Perú</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(container.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {container.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onActionClick(container)}
                      className="px-3 py-1.5 bg-brand-navy hover:bg-brand-celeste text-white hover:text-brand-navy text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-brand-celeste/20 group-hover:scale-[1.03] active:scale-[0.98]"
                      id={`btn-match-${container.code}`}
                    >
                      {actionText}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <AlertCircle className="w-10 h-10 text-slate-300 mb-2" />
                    <p className="font-medium text-slate-600">No se encontraron equipos</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Prueba a modificar los filtros o el término de búsqueda actual.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Savings Summary Banner in Footer */}
      <div className="bg-brand-navy p-4 text-white text-xs md:text-sm flex flex-col md:flex-row justify-between items-center px-6 gap-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-brand-celeste">💡</span>
          <p className="text-slate-300 font-medium">
            ¿Sabías que reutilizar un contenedor con <b className="text-brand-celeste">Street Turn</b> evita fletes de hasta US$380 y reduce 250kg de CO₂?
          </p>
        </div>
        <a 
          href="#pricing"
          className="text-brand-celeste hover:underline font-bold tracking-tight inline-flex items-center gap-1 justify-center whitespace-nowrap"
        >
          Ver planes de certificación <span>→</span>
        </a>
      </div>
    </div>
  );
}
