import React, { useState } from 'react';
import { ROSE_INFO } from '../constants';
import { RosePhase } from '../types';
import { ArrowRight, CheckCircle2, AlertOctagon, Activity } from 'lucide-react';

export const RoseModel: React.FC = () => {
  const [activePhase, setActivePhase] = useState<RosePhase>(RosePhase.Resuscitation);

  const phaseColors = {
    [RosePhase.Resuscitation]: 'bg-red-500',
    [RosePhase.Optimization]: 'bg-orange-500',
    [RosePhase.Stabilization]: 'bg-teal-500',
    [RosePhase.Evacuation]: 'bg-blue-500',
  };

  const currentInfo = ROSE_INFO[activePhase];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">El Concepto ROSE</h2>
        <p className="text-slate-600">
          Un marco temporal y dinámico para la gestión de fluidos. Las necesidades del paciente cambian radicalmente desde el ingreso en shock hasta la recuperación.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {Object.values(ROSE_INFO).map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={`p-3 md:p-4 rounded-xl transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 border-2 ${
              activePhase === phase.id
                ? `border-${phaseColors[phase.id].replace('bg-', '')} shadow-lg scale-105 bg-white`
                : 'border-transparent bg-white hover:bg-slate-50 text-slate-400'
            }`}
          >
            <div
              className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-2xl ${phaseColors[phase.id]}`}
            >
              {phase.id}
            </div>
            <span className={`font-bold text-xs md:text-sm ${activePhase === phase.id ? 'text-slate-800' : ''}`}>
              {phase.title}
            </span>
          </button>
        ))}
      </div>

      {/* Detail Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden min-h-[500px] flex flex-col md:flex-row animate-fade-in">
        <div className={`p-6 md:w-1/3 ${phaseColors[activePhase]} text-white flex flex-col justify-between`}>
          <div>
            <h3 className="text-5xl font-bold opacity-20 mb-4">{activePhase}</h3>
            <h2 className="text-3xl font-bold mb-2">{currentInfo.title}</h2>
            <p className="text-xl font-medium opacity-90">{currentInfo.subtitle}</p>
          </div>
          <div className="mt-8">
            <h4 className="font-semibold uppercase tracking-wider text-xs opacity-75 mb-2">Objetivo Principal</h4>
            <p className="text-lg leading-snug">{currentInfo.goal}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 md:w-2/3 space-y-6">
          <div>
            <h4 className="flex items-center gap-2 text-slate-800 font-bold text-lg mb-3">
              <Activity size={20} className="text-teal-600" />
              Estrategia y Acción
            </h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
              {currentInfo.action}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-3 uppercase tracking-wide">
                <CheckCircle2 size={18} className="text-emerald-600" />
                Fluidos Recomendados
              </h4>
              <p className="text-sm text-slate-600">{currentInfo.fluids}</p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-3 uppercase tracking-wide">
                <AlertOctagon size={18} className="text-amber-600" />
                Monitorización Clave
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {currentInfo.monitoring.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
             <p className="text-slate-500 italic text-sm">
               "{currentInfo.description}"
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};