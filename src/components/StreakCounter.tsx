import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, RotateCcw, AlertTriangle } from 'lucide-react';
import { differenceInSeconds, formatDuration, intervalToDuration } from 'date-fns';

interface StreakCounterProps {
  startDate: number;
  onReset: (reason: string) => void;
}

export default function StreakCounter({ startDate, onReset }: StreakCounterProps) {
  const [now, setNow] = useState(Date.now());
  const [showResetModal, setShowResetModal] = useState(false);
  const [relapseReason, setRelapseReason] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const duration = intervalToDuration({
    start: startDate,
    end: now
  });

  const totalSeconds = differenceInSeconds(now, startDate);
  const days = Math.floor(totalSeconds / (24 * 3600));

  const handleReset = () => {
    if (!relapseReason.trim()) return;
    onReset(relapseReason);
    setShowResetModal(false);
    setRelapseReason('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-64 h-64 rounded-full border-4 border-emerald-500/20 flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-xl shadow-2xl shadow-emerald-500/10">
            <Flame className="w-12 h-12 text-emerald-500 fill-emerald-500/20 mb-2" />
            <span className="text-6xl font-bold tracking-tighter">{days}</span>
            <span className="text-zinc-500 font-medium uppercase tracking-widest text-xs mt-1">Days</span>
          </div>
          
          {/* Pulsing ring */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
          />
        </motion.div>

        <div className="mt-8 grid grid-cols-3 gap-8 text-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{duration.hours || 0}</span>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Hours</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{duration.minutes || 0}</span>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Minutes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{duration.seconds || 0}</span>
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Seconds</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={() => setShowResetModal(true)}
          className="btn-danger flex items-center gap-2 group"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          Reset Streak
        </button>
      </div>

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-8 w-full max-w-md space-y-6"
          >
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Confirm Reset</h3>
            </div>
            
            <p className="text-zinc-400">
              Are you sure you want to reset your streak? Be honest with yourself. Log the reason for your relapse below.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Reason for relapse</label>
              <textarea 
                value={relapseReason}
                onChange={(e) => setRelapseReason(e.target.value)}
                placeholder="What triggered this? (e.g., Stress, Boredom, Social pressure)"
                className="w-full bg-zinc-800 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[100px]"
              />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowResetModal(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleReset}
                disabled={!relapseReason.trim()}
                className="flex-1 btn-danger bg-red-600 text-white disabled:opacity-50"
              >
                Reset Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
