/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Container {
  id: string;
  naviera: string;
  code: string;
  type: '40 HC' | '20 DC' | '40 DC' | '20 RF';
  emptyDate: string;
  location: string;
  status: 'Disponible' | 'Sugerido' | 'Próxima liberación' | 'Programado' | 'En tránsito' | 'Disponible próximamente' | 'Retornado';
  priceEstimated?: number;
  savingsEstimated?: number;
  companyName: string;
}

export interface EIRReport {
  id: string;
  inspectorName: string;
  date: string;
  containerCode: string;
  // true = undamaged / correct, false = damaged / report issues
  sidesCondition: {
    front: boolean;
    back: boolean;
    left: boolean;
    right: boolean;
    top: boolean;
    bottom: boolean;
  };
  notes: string;
  signature: string;
  certifiedIICL: boolean;
}

export interface Operation {
  id: string;
  containerId: string;
  containerCode: string;
  naviera: string;
  type: string;
  importer: string;
  exporter: string;
  status: 'Confirmada' | 'En Match' | 'Verificación EIR' | 'En Tránsito' | 'Completado';
  progress: number; // 0 to 100
  driverName?: string;
  plateNumber?: string;
  currentCoord?: { lat: number; lng: number };
  gpsAlert?: boolean;
  savingsUsd: number;
  co2SavedTon: number;
  kilometersAvoided: number;
  dateCreated: string;
  eirReport?: EIRReport;
}

export interface PremiumPlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
}
