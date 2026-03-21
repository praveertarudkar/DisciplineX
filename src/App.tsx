import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, updateDoc, collection, query, where, orderBy, limit, addDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import StreakStart from './components/StreakStart';
import StreakTracker from './components/StreakTracker';
import Stats from './components/Stats';
import Community from './components/Community';
import Settings from './components/Settings';
import BadgeUnlockModal from './components/BadgeUnlockModal';
import BadgeUnlockNotification from './components/BadgeUnlockNotification';
import RelapseAnalysis from './components/RelapseAnalysis';
import { UserProfile, Streak, BADGES, Badge } from './types';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeStreak, setActiveStreak] = useState<Streak | null>(null);
  const [allStreaks, setAllStreaks] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modals/Notifications
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [showBadgeNotification, setShowBadgeNotification] = useState<Badge | null>(null);
  const [relapseAnalysis, setRelapseAnalysis] = useState<{ reason: string; tips: string[] } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
        setProfile(null);
        setActiveStreak(null);
        setAllStreaks([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Listen to profile
    const profileUnsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        setProfile(data);
      }
    }, (err) => console.error("Profile error:", err));

    // Listen to streaks
    const streaksQuery = query(
      collection(db, 'streaks'),
      where('userId', '==', user.uid),
      orderBy('startDate', 'desc')
    );

    const streaksUnsub = onSnapshot(streaksQuery, (snap) => {
      const streaks = snap.docs.map(d => ({ id: d.id, ...d.data() } as Streak));
      setAllStreaks(streaks);
      const active = streaks.find(s => s.status === 'active');
      setActiveStreak(active || null);
      setLoading(false);
    }, (err) => console.error("Streaks error:", err));

    return () => {
      profileUnsub();
      streaksUnsub();
    };
  }, [user]);

  // Badge Checking Logic
  useEffect(() => {
    if (!activeStreak || !profile) return;

    const days = Math.floor((Date.now() - activeStreak.startDate) / (24 * 3600 * 1000));
    const newBadges = BADGES.filter(b => days >= b.threshold && !profile.badges.includes(b.id));

    if (newBadges.length > 0) {
      const badgeToUnlock = newBadges[0];
      const updatedBadges = [...profile.badges, badgeToUnlock.id];
      
      updateDoc(doc(db, 'users', profile.uid), {
        badges: updatedBadges
      }).then(() => {
        setUnlockedBadge(badgeToUnlock);
        setShowBadgeNotification(badgeToUnlock);
      });
    }
  }, [activeStreak, profile]);

  const startStreak = async (startDate: number) => {
    if (!user) return;
    const streakData: Omit<Streak, 'id'> = {
      userId: user.uid,
      startDate,
      status: 'active',
      duration: 0
    };
    await addDoc(collection(db, 'streaks'), streakData);
  };

  const handleRelapse = async (reason: string) => {
    if (!user || !activeStreak || !profile) return;

    const duration = Date.now() - activeStreak.startDate;
    const days = Math.floor(duration / (24 * 3600 * 1000));

    // Update active streak to relapsed
    await updateDoc(doc(db, 'streaks', activeStreak.id), {
      status: 'relapsed',
      endDate: Date.now(),
      relapseReason: reason,
      duration
    });

    // Update profile stats
    await updateDoc(doc(db, 'users', user.uid), {
      totalRelapses: profile.totalRelapses + 1,
      longestStreak: Math.max(profile.longestStreak, days)
    });

    // AI Analysis
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I just relapsed in my discipline streak. The reason was: "${reason}". 
        Provide 3 short, powerful, and actionable tips to prevent this specific trigger next time. 
        Format as a JSON array of strings.`,
        config: { responseMimeType: "application/json" }
      });
      const tips = JSON.parse(response.text);
      setRelapseAnalysis({ reason, tips });
    } catch (err) {
      console.error("AI Analysis error:", err);
    }
  };

  if (loading) return <Loading />;
  if (!user) return <Auth />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return activeStreak ? (
          <StreakTracker startDate={activeStreak.startDate} onReset={handleRelapse} />
        ) : (
          <StreakStart onStart={startStreak} />
        );
      case 'stats':
        return <Stats streaks={allStreaks} />;
      case 'community':
        return <Community userProfile={profile} currentStreakDays={activeStreak ? Math.floor((Date.now() - activeStreak.startDate) / (24 * 3600 * 1000)) : 0} />;
      case 'settings':
        return <Settings profile={profile} />;
      case 'streak':
        return activeStreak ? (
          <StreakTracker startDate={activeStreak.startDate} onReset={handleRelapse} />
        ) : (
          <StreakStart onStart={startStreak} />
        );
      default:
        return <StreakStart onStart={startStreak} />;
    }
  };

  return (
    <ErrorBoundary>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userPhoto={profile?.photoURL}
      >
        {renderContent()}
      </Layout>

      <AnimatePresence>
        {unlockedBadge && (
          <BadgeUnlockModal 
            badge={unlockedBadge} 
            onClose={() => setUnlockedBadge(null)} 
          />
        )}
        {showBadgeNotification && (
          <BadgeUnlockNotification 
            badge={showBadgeNotification} 
            onClose={() => setShowBadgeNotification(null)} 
          />
        )}
        {relapseAnalysis && (
          <RelapseAnalysis 
            reason={relapseAnalysis.reason} 
            tips={relapseAnalysis.tips} 
            onClose={() => setRelapseAnalysis(null)} 
          />
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}
