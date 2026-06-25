/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Container, Operation, PremiumPlan } from './types';

export const INITIAL_CONTAINERS: Container[] = [
  {
    id: 'c1',
    naviera: 'MSC',
    code: 'MSCU4587124',
    type: '40 HC',
    emptyDate: '15/09/2027',
    location: 'Callao',
    status: 'Disponible',
    companyName: 'Aceros del Pacífico S.A.',
    priceEstimated: 210,
    savingsEstimated: 210
  },
  {
    id: 'c2',
    naviera: 'MAERSK',
    code: 'MAEU8732148',
    type: '20 DC',
    emptyDate: '16/09/2027',
    location: 'Ventanilla',
    status: 'Próxima liberación',
    companyName: 'Perú Agro Export SRL',
    priceEstimated: 195,
    savingsEstimated: 210
  },
  {
    id: 'c3',
    naviera: 'CMA CGM',
    code: 'CMAU6543211',
    type: '40 HC',
    emptyDate: '17/09/2027',
    location: 'Callao',
    status: 'Programado',
    companyName: 'Corporación Pesquera San José',
    priceEstimated: 220,
    savingsEstimated: 210
  },
  {
    id: 'c4',
    naviera: 'ONE',
    code: 'OOCU5123479',
    type: '40 HC',
    emptyDate: '18/09/2027',
    location: 'Lurín',
    status: 'En tránsito',
    companyName: 'Importadora Sol Líder',
    priceEstimated: 180,
    savingsEstimated: 210
  },
  {
    id: 'c5',
    naviera: 'Hapag-Lloyd',
    code: 'HLXU7468523',
    type: '20 DC',
    emptyDate: '19/09/2027',
    location: 'Callao',
    status: 'Disponible próximamente',
    companyName: 'Llama Textiles SAC',
    priceEstimated: 200,
    savingsEstimated: 210
  }
];

export const NAVIERA_LOGOS: Record<string, string> = {
  'MSC': '🚢',
  'MAERSK': '🌀',
  'CMA CGM': '🔵',
  'ONE': '💖',
  'Hapag-Lloyd': '🔶',
  'DEFAULT': '⚓'
};

export const INITIAL_OPERATIONS: Operation[] = [
  {
    id: 'op-001',
    containerId: 'c1',
    containerCode: 'MSCU4587124',
    naviera: 'MSC',
    type: '40 HC',
    importer: 'Aceros del Pacífico S.A. (Impo)',
    exporter: 'Agrícola del Sur SAC (Expo)',
    status: 'Verificación EIR',
    progress: 40,
    driverName: 'Juan Carlos Mendoza',
    plateNumber: 'C8X-942',
    currentCoord: { lat: -12.0431, lng: -77.1245 }, // Callao Terminal
    gpsAlert: false,
    savingsUsd: 210,
    co2SavedTon: 0.06,
    kilometersAvoided: 95,
    dateCreated: '15/09/2027'
  },
  {
    id: 'op-002',
    containerId: 'c2',
    containerCode: 'MAEU8732148',
    naviera: 'MAERSK',
    type: '20 DC',
    importer: 'Perú Agro Export SRL',
    exporter: 'Hilanderías Nazca',
    status: 'En Tránsito',
    progress: 75,
    driverName: 'Oscar Lizárraga',
    plateNumber: 'V4P-801',
    currentCoord: { lat: -11.9642, lng: -77.1085 }, // Ventanilla Route
    gpsAlert: false,
    savingsUsd: 210,
    co2SavedTon: 0.08,
    kilometersAvoided: 130,
    dateCreated: '16/09/2027'
  },
  {
    id: 'op-003',
    containerId: 'c4',
    containerCode: 'OOCU5123479',
    naviera: 'ONE',
    type: '40 HC',
    importer: 'Importadora Sol Líder',
    exporter: 'Algodonera Textil Lurín',
    status: 'Confirmada',
    progress: 10,
    driverName: 'Mateo Portillo',
    plateNumber: 'F5T-241',
    currentCoord: { lat: -12.2882, lng: -76.8712 }, // Lurín Route
    gpsAlert: false,
    savingsUsd: 210,
    co2SavedTon: 0.05,
    kilometersAvoided: 80,
    dateCreated: '18/09/2027'
  }
];

export const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'basic',
    name: 'PORT BASIC',
    tagline: 'Triangulación con Autoinspección y EIR Digital Corriente',
    description: 'Perfecto para operaciones estándar con transportista de confianza.',
    includes: [
      'Match digital entre empresas.',
      'Inspección visual desde aplicación móvil.',
      'Fotografías de las seis caras del contenedor.',
      'EIR Digital automático.',
      'Firma digital de conformidad.'
    ]
  },
  {
    id: 'smart',
    name: 'SMART TURN',
    tagline: 'Triangulación con GPS y monitoreo en tiempo real certificado',
    description: 'Ideal para mercadería de alto valor o cronogramas exigentes.',
    includes: [
      'Todo lo de Port Basic.',
      'Seguimiento GPS en tiempo real.',
      'Alertas de desvío de ruta o geocercas.',
      'Trazabilidad completa de punta a punta.',
      'Firma digital georreferenciada en punto de vaciado.'
    ]
  },
  {
    id: 'premium',
    name: 'PORT PREMIUM',
    tagline: 'Inspección certificada por inspectores expertos IICL',
    description: 'Máximo respaldo legal y técnico contra disputas por daños structurales.',
    includes: [
      'Todo lo de Smart Turn y Port Basic.',
      'Inspector técnico certificado por la IICL.',
      'Certificado formal de aptitud estructural del contenedor.',
      'Seguro complementario de responsabilidad civil ante siniestros.',
      'Mayor respaldo técnico y legal en aduanas.'
    ]
  }
];

export const TARGET_GROUPS = [
  { name: 'Agencias de carga', desc: 'Optimiza la logística tercerizada agilizando matches y reduciendo sobrestadía.' },
  { name: 'Agencias de aduana', desc: 'Garantiza liberaciones prontas y evita fletes muertos de contenedores vacíos.' },
  { name: 'Operadores logísticos', desc: 'Sincroniza transportes de importación con exportación en tiempo récord.' },
  { name: 'Importadores', desc: 'Evita multas por devolución tardía descargando rápido e iniciando Street Turns.' },
  { name: 'Exportadores', desc: 'Consigue contenedores secos e inspeccionados listos sin demoras de terminal.' },
  { name: 'Empresas de transporte', desc: 'Minimiza viajes en vacío a depósitos, mejorando márgenes y desgaste de flota.' }
];

export const TIMELINE_STEPS = [
  {
    id: 1,
    title: 'Publicación',
    text: 'El importador publica el contenedor que tiene en su poder con fecha de vaciado.'
  },
  {
    id: 2,
    title: 'Match Inteligente',
    text: 'PORT LINK encuentra un match con un exportador cercano que necesita el mismo tipo de equipo.'
  },
  {
    id: 3,
    title: 'Inspección & EIR',
    text: 'Se realiza la inspección digital con fotos móviles, autorizando el EIR Digital.'
  },
  {
    id: 4,
    title: 'Traslado Directo',
    text: 'El transporte traslada el contenedor directamente desde el importador hacia el exportador sin pasar por depósitos.'
  },
  {
    id: 5,
    title: 'Retorno Portuario',
    text: 'Tras cargarse, el contenedor retorna consolidado al mismo u otro terminal portuario (APM Terminals o DP World).'
  }
];
