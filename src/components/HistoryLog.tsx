import { Streak } from '../types';
import { format } from 'date-fns';
import { Flame, AlertTriangle, Calendar, Clock, ChevronRight, History } from 'lucide-react';

interface HistoryLogProps {
  streaks: Streak[];
}

export default function HistoryLog({ streaks }: HistoryLogProps) {
  const sortedStreaks = [...streaks].sort((a, b) => b.startDate - a.startDate);

  if (sortedStreaks.length === 0) {
    return (
      <div className="glass-panel p-10 text-center space-y-4 border-white/5">
        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto border border-white/5">
          <History className="w-6 h-6 text-zinc-600" />
        </div>
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">No history yet. Start your first streak.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedStreaks.map((streak) => {
        const days = Math.floor((streak.duration || (Date.now() - streak.startDate)) / (24 * 3600 * 1000));
        const isActive = streak.status === 'active';

        return (
          <div 
            key={streak.id}
            className={`glass-panel p-5 flex items-center gap-5 border-white/5 hover:border-white/10 transition-all group ${isActive ? 'border-emerald-500/20 bg-emerald-500/5' : ''}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg transition-all ${isActive ? 'bg-emerald-500 text-white animate-pulse' : 'bg-zinc-900 text-zinc-500 group-hover:bg-zinc-800'}`}>
              {isActive ? <Flame className="w-6 h-6 fill-white" /> : <AlertTriangle className="w-6 h-6" />}
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm tracking-tight">
                  {isActive ? 'Active Streak' : 'Relapsed Streak'}
                </h4>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-500' : 'text-zinc-500'}`}>
                  {days} Days
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {format(streak.startDate, 'MMM d, yyyy')}
                </div>
                {!isActive && streak.endDate && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {format(streak.endDate, 'MMM d')}
                  </div>
                )}
              </div>

              {!isActive && streak.relapseReason && (
                <p className="text-[10px] text-zinc-400 italic mt-1 line-clamp-1">
                  "{streak.relapseReason}"
                </p>
              )}
            </div>

            <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-all" />
          </div>
        );
      })}
    </div>
  );
}
