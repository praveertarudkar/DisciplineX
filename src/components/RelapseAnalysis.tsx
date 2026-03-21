import { motion } from 'motion/react';
import { Sparkles, X, Zap, Target, ShieldCheck, ArrowRight } from 'lucide-react';

interface RelapseAnalysisProps {
  reason: string;
  tips: string[];
  onClose: () => void;
}

export default function RelapseAnalysis({ reason, tips, onClose }: RelapseAnalysisProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-md glass-panel p-10 space-y-10 relative overflow-hidden border-emerald-500/20 shadow-2xl shadow-emerald-900/40"
      >
        {/* Background Effects */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl opacity-50"></div>

        <div className="flex justify-between items-start relative">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-900/40">
            <Sparkles className="w-8 h-8 text-white fill-white" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div className="space-y-2 relative">
          <h3 className="text-3xl font-black tracking-tighter uppercase italic">AI Forge Insights</h3>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Analyzing your relapse trigger: <span className="text-emerald-500">"{reason}"</span></p>
        </div>

        <div className="space-y-6 relative">
          {tips.map((tip, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="flex gap-5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500 font-black text-xs group-hover:bg-emerald-500 group-hover:text-white transition-all">
                0{index + 1}
              </div>
              <p className="flex-1 text-sm text-zinc-300 font-medium leading-relaxed pt-2">
                {tip}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="pt-4 relative">
          <button 
            onClick={onClose}
            className="w-full btn-primary py-5 flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-emerald-500/20"
          >
            Return to Forge
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed relative">
          "The master has failed more times <br />
          than the beginner has even tried."
        </p>
      </motion.div>
    </motion.div>
  );
}
