import { motion } from 'motion/react';
import { Trophy, X, Sparkles, Award, Zap, ArrowRight, Share2 } from 'lucide-react';
import { Badge } from '../types';

interface BadgeUnlockModalProps {
  badge: Badge;
  onClose: () => void;
}

export default function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 50, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50, rotate: 5 }}
        className="w-full max-w-md glass-panel p-12 space-y-10 relative overflow-hidden border-amber-500/30 shadow-2xl shadow-amber-900/40 text-center"
      >
        {/* Background Effects */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-50"></div>

        <div className="relative space-y-6">
          <div className="w-24 h-24 bg-amber-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-amber-900/40 text-5xl animate-bounce">
            {badge.icon}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-500">
              <Sparkles className="w-4 h-4 fill-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Achievement Unlocked</span>
              <Sparkles className="w-4 h-4 fill-amber-500" />
            </div>
            <h3 className="text-4xl font-black tracking-tighter uppercase italic text-white">{badge.name}</h3>
          </div>
        </div>

        <div className="relative space-y-4">
          <p className="text-lg font-bold italic tracking-tight text-zinc-300 leading-snug">
            "{badge.description}"
          </p>
          <div className="flex justify-center gap-4">
            <div className="px-4 py-2 bg-zinc-900 rounded-xl border border-white/5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{badge.threshold} Day Streak</span>
            </div>
          </div>
        </div>

        <div className="pt-6 relative space-y-4">
          <button 
            onClick={onClose}
            className="w-full btn-primary bg-amber-500 hover:bg-amber-400 text-white py-5 flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-amber-500/20"
          >
            Claim Reward
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full btn-secondary py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest">
            <Share2 className="w-4 h-4" />
            Share Progress
          </button>
        </div>

        <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed relative">
          "The forge rewards the disciplined. <br />
          Keep building your legacy."
        </p>
      </motion.div>
    </motion.div>
  );
}
