import { Streak } from '../types';
import { motion } from 'motion/react';
import { TrendingUp, Calendar, Zap, Target, Flame, Sparkles, Trophy, Activity, History } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';
import HistoryLog from './HistoryLog';

interface StatsProps {
  streaks: Streak[];
}

export default function Stats({ streaks }: StatsProps) {
  // Prepare chart data for the last 7 days
  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayName = format(date, 'EEE');
    
    // Check if any streak was active on this day
    const wasActive = streaks.some(s => {
      const start = new Date(s.startDate);
      const end = s.endDate ? new Date(s.endDate) : new Date();
      return date >= start && date <= end;
    });

    return {
      name: dayName,
      active: wasActive ? 1 : 0,
    };
  });

  const totalDisciplinedDays = streaks.reduce((acc, s) => {
    const duration = (s.endDate || Date.now()) - s.startDate;
    return acc + Math.floor(duration / (24 * 3600 * 1000));
  }, 0);

  const averageStreak = streaks.length > 0 
    ? Math.floor(totalDisciplinedDays / streaks.length) 
    : 0;

  const longestStreak = streaks.reduce((max, s) => {
    const duration = (s.endDate || Date.now()) - s.startDate;
    const days = Math.floor(duration / (24 * 3600 * 1000));
    return Math.max(max, days);
  }, 0);

  return (
    <div className="space-y-10 pb-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-900/40">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">The Analytics</h2>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Visualize your path to mastery.</p>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="glass-panel p-8 space-y-6 border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-emerald-500">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Weekly Activity</span>
          </div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Last 7 Days</div>
        </div>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <Bar dataKey="active" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.active ? '#10b981' : '#18181b'} 
                    className={entry.active ? 'drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : ''}
                  />
                ))}
              </Bar>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-zinc-900 border border-white/10 px-3 py-2 rounded-lg shadow-xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
                          {payload[0].value ? 'Disciplined' : 'No Data'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-6 space-y-4 border-white/5">
          <div className="flex items-center gap-2 text-blue-500">
            <Calendar className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Total Days</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black italic tracking-tighter">{totalDisciplinedDays}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Days Disciplined</div>
          </div>
        </div>
        <div className="glass-panel p-6 space-y-4 border-white/5">
          <div className="flex items-center gap-2 text-purple-500">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Average Streak</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black italic tracking-tighter">{averageStreak}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Days Average</div>
          </div>
        </div>
      </div>

      {/* History Log */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-500 ml-2">
          <History className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Streak History</span>
        </div>
        <HistoryLog streaks={streaks} />
      </div>

      <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
        "Numbers don't lie. <br />
        <span className="text-zinc-700">Your discipline is being forged in data."</span>
      </p>
    </div>
  );
}
