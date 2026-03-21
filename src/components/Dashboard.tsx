import { useState, useEffect } from 'react';
import { UserProfile, Streak, BADGES } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Trophy, TrendingUp, Calendar, Sparkles, ChevronRight, Award, Zap, Target } from 'lucide-react';
import StreakTracker from './StreakTracker';
import StreakStart from './StreakStart';
import BadgeListModal from './BadgeListModal';

interface DashboardProps {
  profile: UserProfile | null;
  activeStreak: Streak | null;
  onStartStreak: (startDate: number) => void;
  onResetStreak: (reason: string) => void;
}

export default function Dashboard({ profile, activeStreak, onStartStreak, onResetStreak }: DashboardProps) {
  const [showBadges, setShowBadges] = useState(false);
  const [quote, setQuote] = useState("Discipline is the bridge between goals and accomplishment.");

  useEffect(() => {
    // In a real app, this could be an AI call or a random selection
    const quotes = [
      "Discipline is the bridge between goals and accomplishment.",
      "The pain of discipline is far less than the pain of regret.",
      "He who conquers himself is the mightiest warrior.",
      "Small disciplines repeated with consistency lead to great achievements.",
      "Your future self is either thanking you or blaming you."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const nextBadge = BADGES.find(b => !profile?.badges.includes(b.id));
  const currentDays = activeStreak ? Math.floor((Date.now() - activeStreak.startDate) / (24 * 3600 * 1000)) : 0;
  const progressToNext = nextBadge ? Math.min(100, (currentDays / nextBadge.threshold) * 100) : 100;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">The Forge</h2>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Welcome back, {profile?.displayName}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-white/5">
          <Sparkles className="w-3 h-3 text-emerald-500 fill-emerald-500" />
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Level 1 Warrior</span>
        </div>
      </div>

      {/* Main Streak Card */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          {activeStreak ? (
            <StreakTracker startDate={activeStreak.startDate} onReset={onResetStreak} />
          ) : (
            <StreakStart onStart={onStartStreak} />
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-5 space-y-4 border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center gap-2 text-amber-500">
            <Trophy className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Longest Streak</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black italic tracking-tighter">{profile?.longestStreak || 0}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Days Disciplined</div>
          </div>
        </div>
        <div className="glass-panel p-5 space-y-4 border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center gap-2 text-red-500">
            <Target className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Total Relapses</span>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black italic tracking-tighter">{profile?.totalRelapses || 0}</div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Lessons Learned</div>
          </div>
        </div>
      </div>

      {/* Progress to Next Badge */}
      {nextBadge && (
        <button 
          onClick={() => setShowBadges(true)}
          className="glass-panel p-6 w-full text-left space-y-4 border-white/5 hover:border-white/10 transition-all group"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-emerald-500">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Next Achievement</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-xl border border-white/5">
              {nextBadge.icon}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-end">
                <h4 className="font-bold text-sm tracking-tight">{nextBadge.name}</h4>
                <span className="text-[10px] font-black text-zinc-500">{currentDays}/{nextBadge.threshold} Days</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Motivation Quote */}
      <div className="glass-panel p-8 relative overflow-hidden group border-white/5">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Zap className="w-24 h-24 text-white fill-white" />
        </div>
        <div className="relative space-y-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Daily Motivation</span>
          </div>
          <p className="text-lg font-bold italic tracking-tight text-zinc-200 leading-snug">
            "{quote}"
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showBadges && (
          <BadgeListModal 
            unlockedBadges={profile?.badges || []} 
            onClose={() => setShowBadges(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
