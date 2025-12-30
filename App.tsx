import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar, MobileNav } from './components/Sidebar';
import { Home } from './views/Home';
import { RoseModel } from './views/RoseModel';
import { Evidence } from './views/Evidence';
import { Monitoring } from './views/Monitoring';
import { InteractiveCase } from './views/InteractiveCase';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Componente de barrera de error para evitar pantalla blanca
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("LMS Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-slate-800 flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-xl font-bold mb-4">Algo salió mal al cargar el contenido.</h2>
          <p className="mb-4">Por favor, recarga la página o contacta al administrador del curso.</p>
          <pre className="bg-slate-100 p-4 rounded text-left text-xs overflow-auto max-w-lg mx-auto w-full border border-slate-200">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors shadow-lg"
          >
            Recargar Página
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden w-full">
          {/* Sidebar - Sticky on Desktop */}
          <Sidebar />
          
          <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0 relative z-0">
            <div className="max-w-7xl mx-auto p-4 md:p-8 w-full h-full">
               <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/rose" element={<RoseModel />} />
                 <Route path="/protocols" element={<Evidence />} />
                 <Route path="/monitoring" element={<Monitoring />} />
                 <Route path="/simulation" element={<InteractiveCase />} />
                 {/* Catch-all route: redirects any unknown path back to Home */}
                 <Route path="*" element={<Navigate to="/" replace />} />
               </Routes>
            </div>
          </main>
          
          {/* Mobile Navigation - Fixed Bottom */}
          <MobileNav />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;