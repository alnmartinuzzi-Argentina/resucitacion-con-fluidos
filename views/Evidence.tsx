import React from 'react';
import { PROTOCOLS } from '../constants';

export const Evidence: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Protocolos y Evidencia</h2>
        <p className="text-slate-600">
          Comparativa de las principales estrategias de fluidoterapia, sus indicaciones y resultados clínicos esperados según la literatura actual.
        </p>
      </div>

      <div className="grid gap-6">
        {PROTOCOLS.map((protocol, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center flex-wrap gap-2">
              <h3 className="text-lg font-bold text-slate-800">{protocol.name}</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-teal-100 text-teal-800 rounded-full">
                {protocol.population.split(' ').slice(0, 4).join(' ')}...
              </span>
            </div>
            <div className="p-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Objetivos Hemodinámicos</h4>
                <p className="text-slate-600">{protocol.hemoGoals}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Indicadores Perfusión</h4>
                <p className="text-slate-600">{protocol.perfusionIndicators}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Técnicas Monitorización</h4>
                <p className="text-slate-600">{protocol.monitoring}</p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100">
                <h4 className="font-semibold text-slate-800 mb-1">Resultados Clínicos</h4>
                <p className="text-slate-600 italic">{protocol.outcomes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};