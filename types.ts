export interface ProtocolData {
  name: string;
  population: string;
  hemoGoals: string;
  perfusionIndicators: string;
  monitoring: string;
  outcomes: string;
}

export enum RosePhase {
  Resuscitation = 'R',
  Optimization = 'O',
  Stabilization = 'S',
  Evacuation = 'E',
}

export interface RosePhaseInfo {
  id: RosePhase;
  title: string;
  subtitle: string;
  goal: string;
  action: string;
  monitoring: string[];
  fluids: string;
  description: string;
}

export interface MonitoringTool {
  name: string;
  type: 'Dinámico' | 'Estático' | 'Imagen';
  description: string;
  pros: string[];
  cons: string[];
}