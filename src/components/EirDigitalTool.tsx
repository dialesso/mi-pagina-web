/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { Container, EIRReport } from '../types';
import { INITIAL_CONTAINERS } from '../data';
import { Check, Clipboard, ShieldAlert, CheckCircle2, Download, RefreshCw, PenTool, UserCheck } from 'lucide-react';

interface EirProps {
  preselectedContainerCode?: string;
  onEirCreated?: (report: EIRReport) => void;
}

type ContainerSide = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

export default function EirDigitalTool({ preselectedContainerCode = '', onEirCreated }: EirProps) {
  const [selectedCode, setSelectedCode] = useState(preselectedContainerCode || INITIAL_CONTAINERS[0].code);
  const [inspectorName, setInspectorName] = useState('Alejandro Meza');
  const [companyName, setCompanyName] = useState('Terminal Marítimo del Callao');
  const [notes, setNotes] = useState('');
  const [isIiclCertified, setIsIiclCertified] = useState(true);
  
  // Custom checklist
  const [checks, setChecks] = useState({
    clean: true,
    noOdor: true,
    locksTight: true,
    noRustLevel3: true,
    woodFloorOk: true,
    drySealed: true
  });

  // Sides condition: true = Approved (No damage), false = Observed (Has damage)
  const [sides, setSides] = useState<Record<ContainerSide, boolean>>({
    front: true,
    back: true,
    left: true,
    right: true,
    top: true,
    bottom: true
  });

  const [signatureText, setSignatureText] = useState('');
  const [isSigned, setIsSigned] = useState(false);
  const [createdReport, setCreatedReport] = useState<EIRReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSide = (side: ContainerSide) => {
    setSides(prev => ({
      ...prev,
      [side]: !prev[side]
    }));
  };

  const handleToggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const currentContainer = INITIAL_CONTAINERS.find(c => c.code === selectedCode) || INITIAL_CONTAINERS[0];

  const handleGenerateEir = (e: FormEvent) => {
    e.preventDefault();
    if (!signatureText.trim()) {
      alert('Por favor redacte su firma digital para certificar el acta.');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const newReport: EIRReport = {
        id: `EIR-${Math.floor(100000 + Math.random() * 900000)}`,
        inspectorName,
        date: new Date().toLocaleDateString('es-PE'),
        containerCode: selectedCode,
        sidesCondition: { ...sides },
        notes: notes || 'Contenedor estructuralmente apto para carga general seca. No se aprecian golpes severos ni deformidades críticas secundarias.',
        signature: signatureText,
        certifiedIICL: isIiclCertified
      };
      setCreatedReport(newReport);
      setIsGenerating(false);
      setIsSigned(true);
      if (onEirCreated) {
        onEirCreated(newReport);
      }
    }, 1200);
  };

  const resetTool = () => {
    setCreatedReport(null);
    setIsSigned(false);
    setSelectedCode(INITIAL_CONTAINERS[0].code);
    setNotes('');
    setSignatureText('');
    setSides({
      front: true,
      back: true,
      left: true,
      right: true,
      top: true,
      bottom: true
    });
  };

  const sideLabel = (side: ContainerSide): string => {
    switch (side) {
      case 'front': return 'Frente (Puertas)';
      case 'back': return 'Posterior (Testera)';
      case 'left': return 'Lateral Izquierdo';
      case 'right': return 'Lateral Derecho';
      case 'top': return 'Techo (Cielo)';
      case 'bottom': return 'Piso (Chasis)';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-brand-navy text-white">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-brand-celeste/20 text-brand-celeste border border-brand-celeste/30 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
              SaaS Operational Core
            </span>
            <h3 className="text-2xl font-display font-bold mt-1.5 flex items-center gap-2">
              <Clipboard className="w-6 h-6 text-brand-celeste" />
              Equivalente de Inspección Recíproca (EIR Digital)
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Garantiza la trazabilidad del estado físico del contenedor mediante autoinspección fotográfica móvil del transportista.
            </p>
          </div>
          {createdReport && (
            <button
              onClick={resetTool}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 transition"
              id="btn-new-inspection"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Nueva Inspección
            </button>
          )}
        </div>
      </div>

      {!createdReport ? (
        <form onSubmit={handleGenerateEir} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Section Left: Inspection Form details */}
          <div className="lg:col-span-5 space-y-5">
            <h4 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2">
              1. Datos Generales de la Inspección
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Seleccionar Contenedor a Inspeccionar
              </label>
              <select
                value={selectedCode}
                onChange={(e) => setSelectedCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-celeste/50 focus:border-brand-celeste"
                id="eir-select-container"
              >
                {INITIAL_CONTAINERS.map(c => (
                  <option key={c.id} value={c.code}>
                    {c.code} ({c.naviera} - {c.type}) • {c.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Inspector Firma
                </label>
                <input
                  type="text"
                  required
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"
                  id="eir-inspector-name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Depósito/Empresa
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"
                  id="eir-company-name"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isIiclCertified}
                  onChange={(e) => setIsIiclCertified(e.target.checked)}
                  className="w-4.5 h-4.5 rounded text-brand-petroleum border-slate-300 focus:ring-brand-celeste"
                  id="eir-iicl-cert"
                />
                <div>
                  <p className="text-xs font-bold text-brand-navy">Certificación Normativa IICL-6</p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Validar bajo estándares del Institute of International Container Lessors para envíos internacionales.
                  </p>
                </div>
              </label>
            </div>

            <h4 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2 pt-2">
              2. Checklist de Condición Estándar
            </h4>

            <div className="space-y-2">
              <label className="flex items-center gap-2.5 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={checks.clean}
                  onChange={() => handleToggleCheck('clean')}
                  className="w-4 h-4 text-brand-celeste rounded border-slate-300 focus:ring-brand-celeste"
                />
                <span>El interior del contenedor está barrido, limpio y sin clavos salientes.</span>
              </label>
              
              <label className="flex items-center gap-2.5 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={checks.noOdor}
                  onChange={() => handleToggleCheck('noOdor')}
                  className="w-4 h-4 text-brand-celeste rounded border-slate-300 focus:ring-brand-celeste"
                />
                <span>Libre de olores nocivos, humedad excesiva o rastro de moho.</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={checks.locksTight}
                  onChange={() => handleToggleCheck('locksTight')}
                  className="w-4 h-4 text-brand-celeste rounded border-slate-300 focus:ring-brand-celeste"
                />
                <span>Gualderas de goma herméticas y barras de cierre operativas.</span>
              </label>

              <label className="flex items-center gap-2.5 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={checks.woodFloorOk}
                  onChange={() => handleToggleCheck('woodFloorOk')}
                  className="w-4 h-4 text-brand-celeste rounded border-slate-300 focus:ring-brand-celeste"
                />
                <span>Piso interior de madera multicapa libre de rajaduras profundas.</span>
              </label>
            </div>
          </div>

          {/* Section Right: Container Side Map Graphic (Interactive) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-2">
                3. Mapa de Daños Estructurales (Haga clic para observar lados)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Representación de las 6 caras del contenedor. Seleccione la cara para reportar golpes, cortes o raspaduras.
              </p>
            </div>

            {/* Container visualization layout */}
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center relative min-h-[300px]">
              
              {/* Box Perspective view */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-md relative z-10">
                
                {/* Ceiling / Techo */}
                <div className="col-span-3 flex justify-center">
                  <button
                    type="button"
                    onClick={() => toggleSide('top')}
                    className={`px-4 py-2.5 rounded-lg border text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                      sides.top 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                        : 'bg-rose-500/20 border-rose-500 text-rose-400 ring-2 ring-rose-500/40 animate-pulse'
                    }`}
                  >
                    ⬆️ Techo (Cielo): {sides.top ? 'SIN DAÑOS' : 'OBSERVADO'}
                  </button>
                </div>

                {/* Left side, Front/Doors, Right side */}
                <button
                  type="button"
                  onClick={() => toggleSide('left')}
                  className={`p-4 rounded-lg border text-xs font-bold transition-all duration-300 h-28 flex flex-col justify-between ${
                    sides.left 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                      : 'bg-rose-500/20 border-rose-500 text-rose-400 ring-2 ring-rose-500/40 animate-pulse'
                  }`}
                >
                  <span className="text-left font-mono">⬅️ LI</span>
                  <span className="text-center font-display uppercase tracking-tighter">Lateral Izq.</span>
                  <span className="text-right text-[9px] font-normal">{sides.left ? 'Apto' : 'Dañado'}</span>
                </button>

                {/* Doors / Front */}
                <button
                  type="button"
                  onClick={() => toggleSide('front')}
                  className={`p-4 rounded-lg border text-xs font-bold bg-slate-900 transition-all duration-300 h-28 flex flex-col justify-between relative ${
                    sides.front 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : 'bg-rose-500/30 border-rose-500 text-rose-400 ring-2 ring-rose-500/40 animate-pulse'
                  }`}
                >
                  <span className="text-center font-mono">🚪 FRENTE</span>
                  <div className="flex justify-center gap-1 my-1">
                    <span className="w-1.5 h-6 bg-slate-700 rounded-sm inline-block" />
                    <span className="w-1.5 h-6 bg-slate-700 rounded-sm inline-block" />
                  </div>
                  <span className="text-center text-[9px] uppercase tracking-wider">{sides.front ? 'Puertas OK' : 'Fallas'}</span>
                </button>

                {/* Right Side */}
                <button
                  type="button"
                  onClick={() => toggleSide('right')}
                  className={`p-4 rounded-lg border text-xs font-bold transition-all duration-300 h-28 flex flex-col justify-between ${
                    sides.right 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                      : 'bg-rose-500/20 border-rose-500 text-rose-400 ring-2 ring-rose-500/40 animate-pulse'
                  }`}
                >
                  <span className="text-right font-mono">LD ➡️</span>
                  <span className="text-center font-display uppercase tracking-tighter">Lateral Der.</span>
                  <span className="text-left text-[9px] font-normal">{sides.right ? 'Apto' : 'Dañado'}</span>
                </button>

                {/* Back side panel */}
                <div className="col-span-3 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => toggleSide('back')}
                    className={`px-4 py-2.5 rounded-lg border text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                      sides.back 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                        : 'bg-rose-500/20 border-rose-500 text-rose-400 ring-2 ring-rose-500/40 animate-pulse'
                    }`}
                  >
                    ⬇️ Posterior (Testera): {sides.back ? 'APTO' : 'A OBSERVAR'}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSide('bottom')}
                    className={`px-4 py-2.5 rounded-lg border text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                      sides.bottom 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                        : 'bg-rose-500/20 border-rose-500 text-rose-400 ring-2 ring-rose-500/40 animate-pulse'
                    }`}
                  >
                    🏗️ Piso (Chasis): {sides.bottom ? 'APTO' : 'RAYADO'}
                  </button>
                </div>
              </div>

              {/* Box wireframe visual backdrop */}
              <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center pointer-events-none">
                <p className="text-[120px] font-mono text-slate-800 opacity-[0.03] select-none font-bold">40HC</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-normal">
                <b>Nota Técnica de Responsabilidad:</b> La omisión de golpes observados puede eximir al seguro de cubrir siniestros posteriores de humedad. Recomendamos declarar toda abolladura mayor a 1 pulgadas.
              </p>
            </div>

            {/* Note text field */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Observaciones Adicionales
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Indique abolladuras leves, raspones menores de pintura o cualquier otro detalle..."
                rows={2}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-celeste/50 focus:border-brand-celeste"
                id="eir-notes"
              />
            </div>

            {/* Signature Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Escribir Firma Digital de Conformidad
              </label>
              <div className="relative">
                <PenTool className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Escriba su nombre completo para rubricar (Ej. Alejandro Meza S.)"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-celeste bg-slate-50"
                  id="eir-signature-text"
                />
              </div>
              {signatureText.trim() && (
                <div className="mt-2 text-right">
                  <span className="font-sans italic text-xl text-neutral-800 tracking-wider bg-amber-50 px-3 py-1 rounded border border-amber-200 inline-block">
                    ✍️ {signatureText}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 bg-brand-navy hover:bg-brand-celeste disabled:bg-slate-400 text-white hover:text-brand-navy font-bold rounded-xl transition duration-200 flex items-center justify-center gap-2"
              id="btn-submit-eir"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Certificando EIR en blockchain...
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  Generar y Certificar Acta EIR Digital
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Document view */
        <div className="p-8 bg-slate-50">
          <div className="bg-white border-2 border-slate-300 md:p-8 p-4 rounded-xl shadow-inner max-w-4xl mx-auto space-y-6 relative overflow-hidden">
            
            {/* Stamp of Certification */}
            <div className="absolute right-6 top-6 w-32 h-32 border-4 border-dashed border-emerald-500/30 text-emerald-500/30 rounded-full flex flex-col items-center justify-center rotate-12 select-none pointer-events-none">
              <span className="text-[10px] uppercase font-bold tracking-widest text-center">PORT LINK</span>
              <span className="text-lg font-black uppercase text-center">APROBADO</span>
              <span className="text-[8px] text-center">CALLAO PERÚ</span>
            </div>

            {/* Header Document */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-slate-200 pb-6 gap-4">
              <div>
                <h1 className="text-2xl font-bold font-display text-brand-navy tracking-tight uppercase">
                  ACTA DE INSPECCIÓN EIR DIGITAL
                </h1>
                <p className="text-xs text-slate-500 font-mono">
                  ID CONFORMIDAD: {createdReport.id} • HASH: 0x7e81...{createdReport.id.split('-')[1]}
                </p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded border border-emerald-200 max-w-xs block">
                  ✓ CERTIFICACIÓN COMPLETA
                </span>
                <p className="text-xs text-slate-500 mt-1">Fecha de Emisión: {createdReport.date}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-400 tracking-wider uppercase">INFORMACIÓN DEL EQUIPO</h5>
                <p className="text-sm font-semibold text-slate-900">
                  Código Contenedor: <span className="font-mono text-brand-petroleum font-bold">{createdReport.containerCode}</span>
                </p>
                <p className="text-sm text-slate-700">
                  Tipo de Unidad: <span className="font-semibold">{currentContainer.type} Standard Seco</span>
                </p>
                <p className="text-sm text-slate-700">
                  Línea Naviera: <span className="font-semibold text-brand-navy">{currentContainer.naviera}</span>
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-400 tracking-wider uppercase">DETALLES DEL INSPECTOR</h5>
                <p className="text-sm text-slate-900">
                  Inspector: <span className="font-semibold">{createdReport.inspectorName}</span>
                </p>
                <p className="text-sm text-slate-700">
                  Organización: <span className="font-semibold">{companyName}</span>
                </p>
                <p className="text-sm text-slate-700">
                  Normatividad: <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2 rounded">
                    {createdReport.certifiedIICL ? 'Estándar Internacional IICL-6' : 'Estándar Local Sol Cart'}
                  </span>
                </p>
              </div>
            </div>

            {/* Damage report list */}
            <div>
              <h5 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-3">CONFORMIDAD DE CARAS DEL CONTENEDOR</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(Object.keys(sides) as ContainerSide[]).map((side) => {
                  const isOk = sides[side];
                  return (
                    <div 
                      key={side} 
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-semibold ${
                        isOk 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                          : 'bg-rose-50 border-rose-300 text-rose-800'
                      }`}
                    >
                      <span className="uppercase">{sideLabel(side)}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                        {isOk ? 'APTO' : 'OBSERVADO'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Checklist items list */}
            <div className="space-y-2 pt-2">
              <h5 className="text-xs font-bold text-slate-500 tracking-wider uppercase">PRUEBAS DE HERMETICIDAD Y LIMPIEZA</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Interior completamente barrido e higienizado.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sin aberturas, libre del pase de luz.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Bisagras engrasadas e impermeabilización completa.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Planchas estructurales sin deformación critica.</span>
                </div>
              </div>
            </div>

            {/* Notes Section inside Document */}
            <div>
              <h5 className="text-xs font-bold text-slate-500 tracking-wider uppercase mb-1">OBSERVACIONES DE CAMPO</h5>
              <p className="text-xs text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed font-sans mt-1">
                {createdReport.notes}
              </p>
            </div>

            {/* Signature layout in Document */}
            <div className="flex justify-between items-end border-t border-slate-200 pt-6">
              <div>
                <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">RECONOCIMIENTO DIGITAL</p>
                <p className="text-xs text-slate-600 mt-1">Firma electrónica geolocalizada en Callao terminal.</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Dispositivo ID: PORTLINK-APP-v41</p>
              </div>

              <div className="text-center">
                <div className="px-4 py-1.5 border-b border-slate-400 text-2xl font-mono text-zinc-800 italic shrink-0">
                  {createdReport.signature}
                </div>
                <p className="text-xs font-bold text-slate-700 mt-1">{createdReport.inspectorName}</p>
                <p className="text-[10px] text-slate-400">Inspector Residente</p>
              </div>
            </div>
            
          </div>

          {/* Action buttons inside result */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => {
                alert('Su reporte EIR Digital ha sido descargado exitosamente como un PDF de comprobación.');
              }}
              className="px-5 py-2.5 bg-brand-petroleum hover:bg-brand-navy text-white font-bold rounded-lg flex items-center gap-2 transition"
              id="btn-download-eir-pdf"
            >
              <Download className="w-4 h-4" />
              Descargar Reporte PDF
            </button>
            <button
              onClick={resetTool}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg flex items-center gap-2 transition"
              id="btn-reset-eir"
            >
              Realizar Otra Inspección
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
