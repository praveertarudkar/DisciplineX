import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc, deleteDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore';
import { UserProfile } from '../types';
import { motion } from 'motion/react';
import { LogOut, User, Bell, Shield, Trash2, ChevronRight, Moon, Smartphone, Globe, Info } from 'lucide-react';

interface SettingsProps {
  profile: UserProfile | null;
}

export default function Settings({ profile }: SettingsProps) {
  const handleLogout = () => signOut(auth);

  const handleResetData = async () => {
    if (!profile || !window.confirm('Are you absolutely sure? This will delete all your streaks and reset your progress forever.')) return;

    try {
      const batch = writeBatch(db);
      
      // Delete all streaks
      const streaksQuery = query(collection(db, 'streaks'), where('userId', '==', profile.uid));
      const streaksSnap = await getDocs(streaksQuery);
      streaksSnap.forEach(d => batch.delete(d.ref));

      // Reset profile
      const userRef = doc(db, 'users', profile.uid);
      batch.update(userRef, {
        longestStreak: 0,
        totalRelapses: 0,
        badges: ['starter']
      });

      await batch.commit();
      alert('Forge reset successful. Start fresh, warrior.');
    } catch (err) {
      console.error("Reset error:", err);
      alert('Failed to reset forge. Try again later.');
    }
  };

  const SettingsItem = ({ icon: Icon, label, value, onClick, danger }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-5 glass-panel border-white/5 hover:border-white/10 transition-all group ${danger ? 'hover:bg-red-500/5 hover:border-red-500/20' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${danger ? 'bg-red-500/10 text-red-500' : 'bg-zinc-900 text-zinc-400 group-hover:text-white'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className={`text-xs font-bold uppercase tracking-widest ${danger ? 'text-red-500' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{label}</p>
          {value && <p className="text-sm font-bold text-white mt-0.5 tracking-tight">{value}</p>}
        </div>
      </div>
      <ChevronRight className={`w-4 h-4 transition-all ${danger ? 'text-red-500' : 'text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1'}`} />
    </button>
  );

  return (
    <div className="space-y-10 pb-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-black/40 border border-white/5">
          <Shield className="w-8 h-8 text-zinc-400" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">The Armory</h2>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">Manage your discipline & security.</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Account & Profile</h3>
          <div className="space-y-2">
            <SettingsItem icon={User} label="Display Name" value={profile?.displayName} />
            <SettingsItem icon={Globe} label="Email Address" value={profile?.email} />
            <SettingsItem icon={Smartphone} label="Connected Devices" value="1 Active Device" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Preferences</h3>
          <div className="space-y-2">
            <SettingsItem icon={Bell} label="Notifications" value="Enabled" />
            <SettingsItem icon={Moon} label="Appearance" value="Dark Mode (Always)" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Support & Legal</h3>
          <div className="space-y-2">
            <SettingsItem icon={Info} label="About StreakForge" value="Version 1.0.0" />
            <SettingsItem icon={Shield} label="Privacy Policy" />
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="text-[10px] font-black text-red-500/50 uppercase tracking-[0.2em] ml-2">Danger Zone</h3>
          <div className="space-y-2">
            <SettingsItem icon={Trash2} label="Reset All Progress" onClick={handleResetData} danger />
            <SettingsItem icon={LogOut} label="Abandon Forge" onClick={handleLogout} danger />
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-relaxed">
        StreakForge © 2026 <br />
        <span className="text-zinc-700">Built for the disciplined.</span>
      </p>
    </div>
  );
}
