import { motion, AnimatePresence } from 'motion/react';
import { Award, X, Sparkles } from 'lucide-react';
import { Badge } from '../types';

interface BadgeUnlockNotificationProps {
  badge: Badge;
  onClose: () => void;
}

export default function BadgeUnlockNotification({ badge, onClose }: BadgeUnlockNotificationProps) {
  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[80] w-full max-w-sm px-4"
    >
      <div className="glass-panel p-4 flex items-center gap-4 border-amber-500/30 bg-amber-500/10 shadow-2xl shadow-amber-900/40">
        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
          {badge.icon}
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="flex items-center gap-1.5 text-amber-500">
            <Sparkles className="w-3 h-3 fill-amber-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em]">New Achievement</span>
          </div>
          <h4 className="font-black text-sm tracking-tight uppercase italic">{badge.name}</h4>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Unlocked at {badge.threshold} days</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-zinc-500" />
        </button>
      </div>
    </motion.div>
  );
}
