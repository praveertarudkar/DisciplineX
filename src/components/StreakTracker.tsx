import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, RotateCcw, AlertTriangle, X, Send, Sparkles, Zap, Target } from 'lucide-react';
import RelapseLog from './RelapseLog';

interface StreakTrackerProps {
  startDate: number;
  onReset: (reason: string) => void;
}

export default function StreakTracker({ startDate, onReset }: StreakTrackerProps) {
  const [now, setNow] = useState(Date.now());
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = now - startDate;
  const days = Math.floor(diff / (24 * 3600 * 1000));
  const hours = Math.floor((diff % (24 * 3600 * 1000)) / (3600 * 1000));
  const minutes = Math.floor((diff % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-1.5">
      <div className="text-5xl font-black italic tracking-tighter tabular-nums leading-none">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">
        {label}
      </div>
    </div>
  );

  return (
    <div className="glass-panel p-10 space-y-10 relative overflow-hidden group border-white/10 hover:border-white/20 transition-all">
      {/* Background Effects */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-1000"></div>

      <div className="relative flex flex-col items-center text-center space-y-8">
        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
          <Flame className="w-4 h-4 text-emerald-500 fill-emerald-500" />
          <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Active Streak</span>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-10">
          <TimeUnit value={days} label="Days" />
          <div className="text-3xl font-black text-zinc-800 self-start mt-1">:</div>
          <TimeUnit value={hours} label="Hours" />
          <div className="text-3xl font-black text-zinc-800 self-start mt-1">:</div>
          <TimeUnit value={minutes} label="Mins" />
          <div className="text-3xl font-black text-zinc-800 self-start mt-1">:</div>
          <TimeUnit value={seconds} label="Secs" />
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <span>Progress to Next Milestone</span>
            <span className="text-emerald-500">{(days % 7) + 1} / 7 Days</span>
          </div>
          <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((days % 7) / 7) * 100}%` }}
              className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            />
          </div>
        </div>

        <button 
          onClick={() => setShowResetModal(true)}
          className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-red-500 transition-colors group/btn"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
          Reset Streak
        </button>
      </div>

      <AnimatePresence>
        {showResetModal && (
          <RelapseLog 
            onClose={() => setShowResetModal(false)} 
            onConfirm={(reason) => {
              onReset(reason);
              setShowResetModal(false);
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
