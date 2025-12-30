import { ProtocolData, RosePhase, RosePhaseInfo, MonitoringTool } from './types';

export const PROTOCOLS: ProtocolData[] = [
  {
    name: "Régimen Liberal",
    population: "Pacientes quirúrgicos adultos generales",
    hemoGoals: "Reposición de déficits preoperatorios y pérdidas estimadas ('tercer espacio').",
    perfusionIndicators: "PAM, Gasto Cardíaco, Diuresis.",
    monitoring: "Estándar no invasiva, balance de fluidos.",
    outcomes: "Aumento riesgo sobrecarga, edema tisular/órganos, peores resultados."
  },
  {
    name: "Régimen Restrictivo (Balance Cero)",
    population: "Pérdida de sangre < 1L",
    hemoGoals: "Reponer solo perdidas (~3 mL/kg/h), mantener peso basal.",
    perfusionIndicators: "Peso corporal, balance neto, creatinina.",
    monitoring: "Continua intraoperatoria, medición pérdidas.",
    outcomes: "Mejores resultados en algunos estudios, riesgo de AKI si hay hipovolemia."
  },
  {
    name: "Terapia Dirigida por Objetivos (GDFT)",
    population: "Alto riesgo / Cirugía mayor invasiva",
    hemoGoals: "Optimización VS, IC, DO2 > 600 ml/min/m2.",
    perfusionIndicators: "Lactato, SvcO2, Variabilidad Vol. Sistólico (VVS).",
    monitoring: "Doppler esofágico, análisis onda pulso, catéter arteria pulmonar.",
    outcomes: "Menos complicaciones, estancia más corta, retorno temprano a vía oral."
  },
  {
    name: "Protocolos ERAS / ACERTO",
    population: "Cirugía digestiva y abdominal mayor",
    hemoGoals: "Euvolemia, evitar sobrecarga salina, reducir resistencia insulina.",
    perfusionIndicators: "Respuesta estrés metabólico, glucosa, fx gastrointestinal.",
    monitoring: "Parámetros clínicos, POCUS.",
    outcomes: "Menos complicaciones, menor estancia y costos."
  },
  {
    name: "Modelo ROSE",
    population: "Críticos postoperatorio o shock séptico",
    hemoGoals: "Transición: Reanimación agresiva -> Des-reanimación (balance negativo).",
    perfusionIndicators: "Agua pulmonar extravascular (EVLWI), Permeabilidad vascular.",
    monitoring: "Termodilución transpulmonar (PiCCO), Eco/POCUS.",
    outcomes: "Prevención edema pulmonar y síndrome compartimental, facilita destete ventilador."
  }
];

export const ROSE_INFO: Record<RosePhase, RosePhaseInfo> = {
  [RosePhase.Resuscitation]: {
    id: RosePhase.Resuscitation,
    title: "Resucitación",
    subtitle: "Salvar la vida",
    goal: "Restauración rápida del volumen intravascular y perfusión tisular.",
    action: "Administración de fluidos en bolos rápidos. Uso temprano de vasopresores en sepsis.",
    monitoring: ["PA invasiva", "Examen clínico", "Lactato", "SvcO2"],
    fluids: "Cristaloides balanceados (1ª elección). Hemoderivados si hay trauma/sangrado.",
    description: "Fase inicial en pacientes con shock. El objetivo es corregir la hipoperfusión letal. Se prioriza la presión de perfusión sobre el balance hídrico."
  },
  [RosePhase.Optimization]: {
    id: RosePhase.Optimization,
    title: "Optimización",
    subtitle: "Rescatar órganos",
    goal: "Optimización continua del volumen y perfusión tisular para asegurar oxigenación.",
    action: "Reto de fluidos controlado. Evaluar 'Fluid Responsiveness'.",
    monitoring: ["Índices Dinámicos (VVS, PPV)", "Gasto Cardíaco", "Eco (POCUS)", "PLR (Elevación Pasiva de Piernas)"],
    fluids: "Fluidos de mantenimiento + Bolos solo si hay respuesta positiva.",
    description: "El paciente ya no está en shock inminente, pero inestable. Se busca optimizar el DO2. Solo administrar fluidos si el paciente es 'respondedor' (aumento del VS > 10-15%)."
  },
  [RosePhase.Stabilization]: {
    id: RosePhase.Stabilization,
    title: "Estabilización",
    subtitle: "Soporte de órganos",
    goal: "Mantenimiento. Evitar sobrecarga hídrica (Fluid Creep).",
    action: "Fluidos solo para cubrir pérdidas y nutrición. No más bolos de rutina.",
    monitoring: ["Balance hídrico acumulado", "Peso diario", "Edema tisular"],
    fluids: "Fluidos de mantenimiento hipotónicos balanceados/Nutrición enteral/parenteral.",
    description: "Punto de inflexión. El paciente está estable. El riesgo de acumulación de fluidos supera el beneficio de dar más volumen. Atención al 'Fluid Creep' (medicamentos, diluciones)."
  },
  [RosePhase.Evacuation]: {
    id: RosePhase.Evacuation,
    title: "Evacuación",
    subtitle: "Recuperación",
    goal: "Eliminación del fluido intersticial acumulado. Balance negativo.",
    action: "Restricción de fluidos. Uso de diuréticos o terapia de reemplazo renal si es necesario.",
    monitoring: ["Diuresis", "Función renal", "Resolución de edema"],
    fluids: "Minimizar entrada. Promover salida.",
    description: "Fase de des-reanimación. Se busca movilizar el fluido del tercer espacio y excretarlo. Ocurre espontáneamente si el glicocálix se recupera, o requiere ayuda farmacológica."
  }
};

export const MONITORING_TOOLS: MonitoringTool[] = [
  {
    name: "Elevación Pasiva de Piernas (PLR)",
    type: "Dinámico",
    description: "Autotransfusión de ~300ml de sangre venosa al levantar las piernas 45°. Simula una carga de volumen reversible.",
    pros: ["Muy sensible y específico", "Reversible (no sobrecarga)", "Útil en ventilación espontánea y arritmias"],
    cons: ["Requiere medición de flujo/GC en tiempo real", "No válida si hay hipertensión intraabdominal severa"]
  },
  {
    name: "Variabilidad de Presión de Pulso (PPV)",
    type: "Dinámico",
    description: "Variación de la presión arterial durante el ciclo respiratorio en ventilación mecánica.",
    pros: ["Fácil si hay línea arterial", "Buen predictor en condiciones ideales"],
    cons: ["Requiere volumen tidal >8ml/kg", "Ritmo sinusal obligatorio", "Tórax cerrado", "No interacción respiratoria espontánea"]
  },
  {
    name: "Presión Venosa Central (PVC)",
    type: "Estático",
    description: "Presión en la vena cava superior/aurícula derecha.",
    pros: ["Fácil de medir si hay catéter central", "Útil solo en extremos (muy bajo o muy alto)"],
    cons: ["NO predice respuesta a fluidos", "Influenciada por presión intratorácica", "Pobre correlación con volumen intravascular real"]
  },
  {
    name: "Ultrasonido / VExUS",
    type: "Imagen",
    description: "Evaluación de la congestión venosa (Vena Cava, Hepática, Porta, Renal).",
    pros: ["No invasivo", "Evalúa sobrecarga (lado derecho)", "Ayuda a decidir cuándo PARAR fluidos"],
    cons: ["Operador dependiente", "Requiere entrenamiento"]
  }
];