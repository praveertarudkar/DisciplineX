import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Trophy, TrendingUp, Calendar, Sparkles, User, Settings, LayoutDashboard, Share2, Zap, Target } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userPhoto?: string;
}

export default function Layout({ children, activeTab, setActiveTab, userPhoto }: LayoutProps) {
  const NavItem = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex flex-col items-center gap-1.5 transition-all relative ${isActive ? 'text-emerald-500' : 'text-zinc-500 hover:text-zinc-300'}`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive ? 'bg-emerald-500/10 shadow-lg shadow-emerald-500/5 border border-emerald-500/20' : 'bg-transparent'}`}>
          <Icon className={`w-6 h-6 ${isActive ? 'fill-emerald-500' : ''}`} />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest leading-none ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {label}
        </span>
        {isActive && (
          <motion.div 
            layoutId="nav-indicator"
            className="absolute -bottom-2 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"
          />
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-md mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Flame className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="space-y-0.5">
              <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">StreakForge</h1>
              <div className="flex items-center gap-1.5 text-emerald-500">
                <Sparkles className="w-3 h-3 fill-emerald-500" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">Mastery Path</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('settings')}
            className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden hover:border-white/20 transition-all"
          >
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <User className="w-5 h-5 text-zinc-500" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 pt-28 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5 pb-8 pt-4">
        <div className="max-w-md mx-auto px-10 flex items-center justify-between">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Forge" />
          <NavItem id="stats" icon={TrendingUp} label="Stats" />
          <NavItem id="community" icon={Share2} label="Brother" />
          <NavItem id="settings" icon={Settings} label="Armory" />
        </div>
      </nav>

      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
}
