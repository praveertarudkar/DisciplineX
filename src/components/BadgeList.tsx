import { BADGES } from '../types';
import { Trophy, Lock } from 'lucide-react';

interface BadgeListProps {
  unlockedBadges: string[];
}

export default function BadgeList({ unlockedBadges }: BadgeListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {BADGES.map((badge) => {
        const isUnlocked = unlockedBadges.includes(badge.id);
        return (
          <div 
            key={badge.id}
            className={`glass-panel p-5 flex items-center gap-5 transition-all ${isUnlocked ? 'border-amber-500/30 bg-amber-500/5' : 'opacity-50 grayscale'}`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${isUnlocked ? 'bg-amber-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
              {isUnlocked ? badge.icon : <Lock className="w-6 h-6" />}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm tracking-tight">{badge.name}</h4>
                {isUnlocked && <span className="text-[8px] font-black uppercase tracking-widest text-amber-500">Unlocked</span>}
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">{badge.description}</p>
              <div className="pt-2">
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isUnlocked ? 'bg-amber-500' : 'bg-zinc-700'}`} 
                    style={{ width: isUnlocked ? '100%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
