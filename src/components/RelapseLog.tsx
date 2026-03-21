import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, X, Send, Sparkles, Zap, Target } from 'lucide-react';

interface RelapseLogProps {
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function RelapseLog({ onClose, onConfirm }: RelapseLogProps) {
  const [reason, setReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    setIsConfirming(true);
  };

  const commonReasons = [
    "Stress & Anxiety",
    "Boredom",
    "Social Pressure",
    "Tiredness",
    "Emotional Triggers",
    "Lack of Focus"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-md glass-panel p-8 space-y-8 border-red-500/20 shadow-2xl shadow-red-900/40"
      >
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-red-900/40">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-black tracking-tighter uppercase italic">Relapse Log</h3>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Be honest with yourself. Why did you break?</p>
        </div>

        {!isConfirming ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {commonReasons.map((r) => (
                <button 
                  key={r}
                  type="button"
                  onClick={() => setReason(r)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${reason === r ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/10'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Detailed Reason</label>
              <textarea 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe the trigger in detail..."
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 min-h-[120px] transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={!reason.trim()}
              className="w-full btn-danger py-4 flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-red-500/20 disabled:opacity-50"
            >
              Log Relapse & Reset
              <Target className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-8 text-center py-4">
            <div className="space-y-4">
              <p className="text-lg font-bold italic tracking-tight text-zinc-200">
                "A relapse is not the end, it's a lesson. <br />
                The forge is waiting for you to return."
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                Are you ready to start fresh and forge a stronger discipline?
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsConfirming(false)}
                className="flex-1 btn-secondary py-4 font-black uppercase tracking-widest"
              >
                Back
              </button>
              <button 
                onClick={() => onConfirm(reason)}
                className="flex-1 btn-danger py-4 font-black uppercase tracking-widest"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
