import { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, Calendar, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface StreakStartProps {
  onStart: (startDate: number) => void;
}

export default function StreakStart({ onStart }: StreakStartProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().split(' ')[0].slice(0, 5));
  const [isCommitted, setIsCommitted] = useState(false);

  const handleStart = () => {
    const startDateTime = new Date(`${date}T${time}`).getTime();
    onStart(startDateTime);
  };

  return (
    <div className="glass-panel p-10 space-y-10 relative overflow-hidden group border-white/10 hover:border-white/20 transition-all">
      {/* Background Effects */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-1000"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-1000"></div>

      <div className="relative flex flex-col items-center text-center space-y-8">
        <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-900/40 group-hover:scale-110 transition-transform duration-500">
          <Flame className="w-10 h-10 text-white fill-white" />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-black tracking-tighter uppercase italic">Forge Your Streak</h3>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">When did your journey of discipline begin?</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-1 text-left">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Start Time</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setIsCommitted(!isCommitted)}
          className={`w-full p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${isCommitted ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-zinc-900 border-white/5 hover:border-white/10'}`}
        >
          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isCommitted ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'}`}>
            {isCommitted && <ShieldCheck className="w-4 h-4 text-white" />}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-200">I commit to absolute discipline</p>
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mt-0.5">I will not break this streak for any reason.</p>
          </div>
        </div>

        <button 
          onClick={handleStart}
          disabled={!isCommitted}
          className="w-full btn-primary py-5 flex items-center justify-center gap-3 font-black uppercase tracking-widest shadow-emerald-500/20 disabled:opacity-50 disabled:grayscale transition-all"
        >
          Ignite the Forge
          <Zap className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
