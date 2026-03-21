import { motion } from 'motion/react';
import { Flame, Sparkles, Zap, Target, ShieldCheck } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zinc-950 text-zinc-100">
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute -inset-10 bg-emerald-600/20 rounded-full blur-3xl animate-pulse"></div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex flex-col items-center space-y-8"
        >
          <div className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-900/40 animate-bounce">
            <Flame className="w-14 h-14 text-white fill-white" />
          </div>

          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-500">
              <Sparkles className="w-4 h-4 fill-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Igniting the Forge</span>
              <Sparkles className="w-4 h-4 fill-emerald-500" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">StreakForge</h1>
          </div>

          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  repeatType: "reverse" 
                }}
                className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-12 text-center space-y-2">
        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
          "The pain of discipline is far less <br />
          than the pain of regret."
        </p>
      </div>
    </div>
  );
}
