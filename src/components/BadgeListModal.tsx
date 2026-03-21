import { motion } from 'motion/react';
import { Trophy, X, Award, Zap, ArrowRight, Share2 } from 'lucide-react';
import BadgeList from './BadgeList';

interface BadgeListModalProps {
  unlockedBadges: string[];
  onClose: () => void;
}

export default function BadgeListModal({ unlockedBadges, onClose }: BadgeListModalProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-md glass-panel p-8 space-y-8 relative overflow-hidden border-amber-500/20 shadow-2xl shadow-amber-900/40 flex flex-col max-h-[80vh]"
      >
        <div className="flex justify-between items-start">
          <div className="w-14 h-14 bg-amber-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-900/40">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-black tracking-tighter uppercase italic">Achievement Forge</h3>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Your legacy of discipline and strength.</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <BadgeList unlockedBadges={unlockedBadges} />
        </div>

        <div className="pt-4">
          <button 
            onClick={onClose}
            className="w-full btn-primary bg-amber-500 hover:bg-amber-400 text-white py-4 flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-amber-500/20"
          >
            Return to Forge
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
