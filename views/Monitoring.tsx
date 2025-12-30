import React from 'react';
import { MONITORING_TOOLS } from '../constants';
import { BarChart2, ThumbsUp, ThumbsDown } from 'lucide-react';

export const Monitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Herramientas de Monitorización</h2>
        <p className="text-slate-600">
          La evidencia actual prioriza las <strong>variables dinámicas</strong> (respuesta a una precarga) sobre las estáticas (como la PVC) para guiar la fluidoterapia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {MONITORING_TOOLS.map((tool, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${tool.type === 'Dinámico' ? 'bg-teal-100 text-teal-700' : tool.type === 'Estático' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                <BarChart2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{tool.name}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wide">
                  {tool.type}
                </span>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6 flex-grow">{tool.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm mt-auto">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <h4 className="flex items-center gap-2 font-bold text-emerald-700 mb-2">
                  <ThumbsUp size={14} /> Ventajas
                </h4>
                <ul className="list-disc list-inside text-emerald-900 space-y-1">
                  {tool.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="bg-rose-50 p-3 rounded-lg">
                <h4 className="flex items-center gap-2 font-bold text-rose-700 mb-2">
                  <ThumbsDown size={14} /> Limitaciones
                </h4>
                <ul className="list-disc list-inside text-rose-900 space-y-1">
                  {tool.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};