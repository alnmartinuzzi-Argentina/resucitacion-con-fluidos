import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, Droplet } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Gestión de Fluidos en el Paciente Crítico</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
          La administración de fluidos intravenosos es una de las intervenciones más comunes pero complejas en la medicina crítica. 
          Un manejo inadecuado puede llevar al <strong>Síndrome de Acumulación de Fluidos (FAS)</strong>, daño al glicocálix endotelial y peores desenlaces.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/rose" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Explorar Modelo ROSE
          </Link>
          <Link to="/simulation" className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors">
            Caso Práctico
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
            <Droplet size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">El Glicocálix</h3>
          <p className="text-slate-600 text-sm">
            Una capa protectora en el endotelio. En sepsis o cirugía mayor, se daña, causando fuga capilar. La sobrecarga de fluidos empeora este daño, creando un círculo vicioso de edema e hipovolemia intravascular.
          </p>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
            <AlertTriangle size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Peligros de los Extremos</h3>
          <p className="text-slate-600 text-sm">
            Tanto la restricción excesiva (hipoperfusión, fallo renal) como la administración liberal (edema pulmonar, íleo, dehiscencia) son perjudiciales. La clave es la <strong>Euvolemia</strong> individualizada.
          </p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Fluid Creep</h3>
          <p className="text-slate-600 text-sm">
            La sobrecarga oculta. Gran parte del volumen diario proviene de dilución de medicamentos y nutrición, no solo de los bolos de reanimación. Debe cuantificarse rigurosamente.
          </p>
        </div>
      </div>
    </div>
  );
};