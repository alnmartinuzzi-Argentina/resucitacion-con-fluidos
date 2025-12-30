import React, { useState } from 'react';
import { Activity, ArrowRight, RotateCcw } from 'lucide-react';

interface Stage {
  id: string;
  question: string;
  options: { label: string; next: string; correct?: boolean; feedback?: string }[];
  phase?: string;
  recommendation?: string;
}

const STAGES: Record<string, Stage> = {
  start: {
    id: 'start',
    question: 'Paciente masculino de 65 años ingresa a UCI post-operatorio de peritonitis por perforación colónica. PA 85/50, FC 115, Lactato 4.5 mmol/L. Piel moteada.',
    options: [
      { label: 'El paciente está estable, solo observar.', next: 'wrong_1', correct: false },
      { label: 'El paciente está en Shock/Hipoperfusión.', next: 'shock_path', correct: true },
    ]
  },
  wrong_1: {
    id: 'wrong_1',
    question: 'Incorrecto. La hipotensión, taquicardia, lactato elevado y piel moteada son signos claros de hipoperfusión tisular crítica.',
    options: [{ label: 'Reevaluar', next: 'start' }]
  },
  shock_path: {
    id: 'shock_path',
    question: '¿En qué fase del modelo ROSE se encuentra y cuál es la prioridad?',
    phase: 'RESUSCITATION (R)',
    options: [
      { label: 'Fase O: Optimizar Gasto Cardíaco.', next: 'wrong_r', correct: false },
      { label: 'Fase R: Resucitación. Salvar la vida y restaurar perfusión.', next: 'step_r_action', correct: true }
    ]
  },
  wrong_r: {
    id: 'wrong_r',
    question: 'Aún no. La fase de Optimización es cuando el paciente ya no tiene riesgo vital inminente. Este paciente está hipotenso y acidótico.',
    options: [{ label: 'Volver', next: 'shock_path' }]
  },
  step_r_action: {
    id: 'step_r_action',
    question: '¿Qué fluido administraría como primera línea?',
    phase: 'RESUSCITATION (R)',
    options: [
      { label: 'Coloides Sintéticos (Hidroxietilalmidón)', next: 'wrong_fluid', correct: false },
      { label: 'Cristaloides Balanceados (Ringer Lactato / Plasmalyte)', next: 'step_o', correct: true, feedback: 'Correcto. Los cristaloides balanceados son la elección. Evitar solución salina 0.9% en grandes volúmenes para prevenir acidosis hiperclorémica.' }
    ]
  },
  wrong_fluid: {
    id: 'wrong_fluid',
    question: 'Los coloides sintéticos no muestran beneficio y pueden dañar el riñón. La albúmina tiene indicaciones específicas (sepsis severa tras cristaloides), pero no es primera línea.',
    options: [{ label: 'Intentar de nuevo', next: 'step_r_action' }]
  },
  step_o: {
    id: 'step_o',
    question: 'Tras 2L de fluidos y Noradrenalina, la PA es 90/50. Lactato baja a 3.0. ¿Qué acción realizaría para optimizar la perfusión?',
    phase: 'OPTIMIZATION (O)',
    recommendation: 'El paciente sigue inestable pero "rescatado" del paro inminente. Necesitamos asegurar perfusión de órganos.',
    options: [
      { label: 'Dar fluidos basados en PVC', next: 'wrong_monitoring', correct: false },
      { label: 'Evaluar respuesta a fluidos con maniobras dinámicas (PLR)', next: 'step_s', correct: true }
    ]
  },
  wrong_monitoring: {
    id: 'wrong_monitoring',
    question: 'La PVC es un marcador estático y no predice si el corazón bombeará más sangre al recibir más volumen. Use índices dinámicos.',
    options: [{ label: 'Corregir', next: 'step_o' }]
  },
  step_s: {
    id: 'step_s',
    question: 'Día 2. Paciente estable. Sin vasopresores. Balance acumulado +5 Litros. Edema generalizado. ¿Qué debe hacer?',
    phase: 'STABILIZATION (S)',
    options: [
      { label: 'Seguir con fluidos de mantenimiento estándar', next: 'step_e', correct: true, feedback: 'Cuidado con el "Fluid Creep". Solo lo necesario para nutrición y electrolitos.' },
      { label: 'Forzar diuresis inmediatamente', next: 'wrong_early_e', correct: false }
    ]
  },
  wrong_early_e: {
    id: 'wrong_early_e',
    question: 'Si el paciente aún requiere estabilización hemodinámica, forzar diuresis prematuramente puede causar inestabilidad. Primero asegure la estabilidad (Fase S).',
    options: [{ label: 'Volver', next: 'step_s' }]
  },
  step_e: {
    id: 'step_e',
    question: 'Día 5. Paciente recuperándose. Edema persiste. Oxigenación empeora por congestión pulmonar. ¿Conducta?',
    phase: 'EVACUATION (E)',
    options: [
      { label: 'Restricción de fluidos y Diuréticos (Balance Negativo)', next: 'finish', correct: true },
      { label: 'Mantener fluidos para función renal', next: 'wrong_e', correct: false }
    ]
  },
  wrong_e: {
    id: 'wrong_e',
    question: 'La sobrecarga de fluidos (FAS) está dañando los pulmones. Es hora de la fase de Evacuación.',
    options: [{ label: 'Corregir', next: 'step_e' }]
  },
  finish: {
    id: 'finish',
    question: '¡Excelente! Ha completado el ciclo ROSE correctamente, llevando al paciente desde el shock hasta la recuperación evitando la sobrecarga.',
    options: [
      { label: 'Reiniciar Caso', next: 'start' }
    ]
  }
};

export const InteractiveCase: React.FC = () => {
  const [currentStageId, setCurrentStageId] = useState('start');
  const stage = STAGES[currentStageId];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulación Clínica</h2>
        <p className="text-slate-600">
          Toma decisiones basadas en el estado del paciente y el modelo ROSE.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {stage.phase && (
          <div className="bg-slate-900 text-teal-400 text-xs font-bold px-6 py-2 uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} />
            Fase Actual: {stage.phase}
          </div>
        )}
        
        <div className="p-8">
          <h3 className="text-xl font-medium text-slate-800 mb-6 leading-relaxed">
            {stage.question}
          </h3>
          
          {stage.recommendation && (
            <div className="mb-6 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg border border-blue-100">
              💡 {stage.recommendation}
            </div>
          )}

          <div className="space-y-3">
            {stage.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStageId(option.next)}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all flex items-center justify-between group"
              >
                <span className="text-slate-700 font-medium group-hover:text-teal-900">{option.label}</span>
                <ArrowRight size={18} className="text-slate-300 group-hover:text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
        
        {stage.id === 'finish' && (
          <div className="p-8 bg-emerald-50 text-center">
            <RotateCcw size={48} className="mx-auto text-emerald-600 mb-4 cursor-pointer hover:rotate-180 transition-transform" onClick={() => setCurrentStageId('start')} />
            <p className="text-emerald-800 font-medium">Simulación Completada</p>
          </div>
        )}
      </div>
    </div>
  );
};