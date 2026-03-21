import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserProfile, CommunityPost } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Heart, MessageSquare, Flame, Sparkles, User, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CommunityProps {
  userProfile: UserProfile | null;
  currentStreakDays: number;
}

export default function Community({ userProfile, currentStreakDays }: CommunityProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snap) => {
      const p = snap.docs.map(d => ({ id: d.id, ...d.data() } as CommunityPost));
      setPosts(p);
      setLoading(false);
    }, (err) => console.error("Posts error:", err));

    return () => unsubscribe();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !userProfile) return;

    const postData: Omit<CommunityPost, 'id'> = {
      userId: userProfile.uid,
      username: userProfile.displayName,
      content: newPost,
      streakDays: currentStreakDays,
      likes: [],
      createdAt: Date.now()
    };

    await addDoc(collection(db, 'posts'), postData);
    setNewPost('');
  };

  const toggleLike = async (post: CommunityPost) => {
    if (!auth.currentUser) return;
    const postRef = doc(db, 'posts', post.id);
    const isLiked = post.likes.includes(auth.currentUser.uid);

    if (isLiked) {
      await updateDoc(postRef, { likes: arrayRemove(auth.currentUser.uid) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(auth.currentUser.uid) });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-blue-900/40">
          <Share2 className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">The Brotherhood</h2>
          <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs">You are not alone in this forge.</p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-2 text-blue-500 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Share Your Progress</span>
        </div>
        <form onSubmit={handlePost} className="space-y-4">
          <textarea 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share a motivational thought or your current struggle..."
            className="w-full bg-zinc-900 border border-white/10 rounded-2xl p-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px] transition-all"
            maxLength={280}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <Flame className="w-3 h-3 text-emerald-500 fill-emerald-500" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{currentStreakDays} Days</span>
            </div>
            <button 
              type="submit"
              disabled={!newPost.trim()}
              className="btn-primary bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-6 flex items-center gap-2 disabled:opacity-50"
            >
              Post <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 space-y-4 border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userId}`} 
                      alt="User" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{post.username}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      {formatDistanceToNow(post.createdAt)} ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <Flame className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                  <span className="text-[10px] font-black text-emerald-500">{post.streakDays}</span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                {post.content}
              </p>

              <div className="flex items-center gap-6 pt-2">
                <button 
                  onClick={() => toggleLike(post)}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${post.likes.includes(auth.currentUser?.uid || '') ? 'text-red-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  <Heart className={`w-4 h-4 ${post.likes.includes(auth.currentUser?.uid || '') ? 'fill-red-500' : ''}`} />
                  {post.likes.length}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300">
                  <MessageSquare className="w-4 h-4" />
                  Discuss
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
