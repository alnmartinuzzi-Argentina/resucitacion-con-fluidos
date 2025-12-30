import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, FileText, Stethoscope, PlayCircle } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Inicio' },
    { to: '/rose', icon: Activity, label: 'Modelo ROSE' },
    { to: '/protocols', icon: FileText, label: 'Evidencia y Protocolos' },
    { to: '/monitoring', icon: Stethoscope, label: 'Monitorización' },
    { to: '/simulation', icon: PlayCircle, label: 'Caso Interactivo' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto shrink-0 z-40">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent leading-tight">
          RESUCITACIÓN CON FLUIDOS
        </h1>
        <p className="text-xs text-slate-400 mt-2">Gestión Óptima de Fluidos</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-6 border-t border-slate-800 text-xs text-slate-500">
        <p>Basado en consensos internacionales y modelo ROSE.</p>
      </div>
    </aside>
  );
};

export const MobileNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white border-t border-slate-800 z-50 flex justify-around p-2">
      <NavLink to="/" className={({isActive}) => `p-2 rounded ${isActive ? 'text-teal-400' : 'text-slate-400'}`}>
        <LayoutDashboard size={24} />
      </NavLink>
      <NavLink to="/rose" className={({isActive}) => `p-2 rounded ${isActive ? 'text-teal-400' : 'text-slate-400'}`}>
        <Activity size={24} />
      </NavLink>
      <NavLink to="/protocols" className={({isActive}) => `p-2 rounded ${isActive ? 'text-teal-400' : 'text-slate-400'}`}>
        <FileText size={24} />
      </NavLink>
      <NavLink to="/monitoring" className={({isActive}) => `p-2 rounded ${isActive ? 'text-teal-400' : 'text-slate-400'}`}>
        <Stethoscope size={24} />
      </NavLink>
       <NavLink to="/simulation" className={({isActive}) => `p-2 rounded ${isActive ? 'text-teal-400' : 'text-slate-400'}`}>
        <PlayCircle size={24} />
      </NavLink>
    </div>
  );
}