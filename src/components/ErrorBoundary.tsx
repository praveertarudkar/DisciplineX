import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home, ShieldAlert, Zap, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-zinc-100">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="w-full max-w-md glass-panel p-10 space-y-10 relative overflow-hidden border-red-500/20 shadow-2xl shadow-red-900/40 text-center"
          >
            {/* Background Effects */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-red-500/5 rounded-full blur-3xl opacity-50"></div>

            <div className="relative space-y-6">
              <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-red-900/40">
                <ShieldAlert className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-red-500">
                  <AlertTriangle className="w-4 h-4 fill-red-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Critical System Failure</span>
                  <AlertTriangle className="w-4 h-4 fill-red-500" />
                </div>
                <h3 className="text-3xl font-black tracking-tighter uppercase italic text-white">The Forge Cracked</h3>
              </div>
            </div>

            <div className="relative space-y-4">
              <p className="text-sm font-bold italic tracking-tight text-zinc-400 leading-snug bg-zinc-900/50 p-4 rounded-xl border border-white/5 font-mono">
                {this.state.error?.message || 'Unknown forge error occurred.'}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Even the strongest steel can break. <br />
                Reignite the forge to continue your journey.
              </p>
            </div>

            <div className="pt-6 relative space-y-4">
              <button 
                onClick={this.handleRetry}
                className="w-full btn-primary bg-red-600 hover:bg-red-500 text-white py-5 flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-red-500/20"
              >
                Reignite Forge
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full btn-secondary py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest"
              >
                <Home className="w-4 h-4" />
                Return Home
              </button>
            </div>

            <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed relative">
              "Failure is not the end, <br />
              it's the beginning of a stronger forge."
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
