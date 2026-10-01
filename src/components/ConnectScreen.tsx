import React, { useState } from 'react';
import { CommunityPost, Expert } from '../types';
import { MOCK_COMMUNITY_POSTS, MOCK_EXPERTS } from '../data/mockData';
import {
  Users,
  UserCheck,
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  ShieldCheck,
  Star,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Search,
  MessageCircle
} from 'lucide-react';

export const ConnectScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'experts'>('feed');
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [experts] = useState<Expert[]>(MOCK_EXPERTS);

  // New Post Form State
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      author: 'You (Uganda Farmer)',
      authorRole: 'Verified Agricultural Member',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      isVerified: true,
      timeAgo: 'Just now',
      content: newPostContent,
      likes: 1,
      commentsCount: 0,
      tags: newPostTags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setPosts([post, ...posts]);
    setNewPostContent('');
    setNewPostTags('');
  };

  const handleLikePost = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">AgriConnect Uganda</h1>
            <p className="text-xs text-emerald-100 mt-0.5">
              Agricultural communities, direct farmer discussions, and verified agronomy experts.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-black/20 p-1 rounded-xl backdrop-blur-md border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'feed' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('experts')}
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'experts' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Experts</span>
          </button>
        </div>
      </div>

      {/* COMMUNITY FEED TAB */}
      {activeTab === 'feed' && (
        <div className="space-y-5">
          {/* Post Creation Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Start an Agricultural Discussion</h3>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                rows={3}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Ask fellow farmers in Uganda about seed availability, pest treatments, crop yields, or market demands..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <input
                  type="text"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  placeholder="Tags (e.g. Maize, Pests, Wakiso)"
                  className="w-full sm:w-64 p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newPostContent.trim()}
                  className="w-full sm:w-auto px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Post to AgriConnect
                </button>
              </div>
            </form>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-emerald-300" />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-sm font-bold text-slate-900">{post.author}</span>
                        {post.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">{post.authorRole} • {post.timeAgo}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed">{post.content}</p>

                {post.image && (
                  <div className="rounded-xl overflow-hidden h-52 bg-slate-100">
                    <img src={post.image} alt="Discussion" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Row */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center space-x-1.5 hover:text-emerald-700 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes} Likes</span>
                  </button>

                  <div className="flex items-center space-x-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} Comments</span>
                  </div>

                  <button className="flex items-center space-x-1 hover:text-slate-800">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VERIFIED EXPERTS DIRECTORY TAB */}
      {activeTab === 'experts' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Verified Uganda Agricultural Experts</h2>
              <p className="text-xs text-slate-500">Consult with senior agronomists, veterinary doctors, and soil scientists.</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {experts.length} Verified Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experts.map((exp) => (
              <div key={exp.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-emerald-300 transition-colors">
                <div className="flex items-start space-x-3">
                  <img src={exp.avatar} alt={exp.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="text-sm font-bold text-slate-900">{exp.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs font-semibold text-emerald-800">{exp.title}</p>
                    <div className="mt-1 flex items-center space-x-2 text-[11px] text-slate-500">
                      <span className="flex items-center space-x-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{exp.rating} ({exp.reviewsCount})</span>
                      </span>
                      <span>• {exp.experienceYears} Years Exp</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                  <p className="font-bold text-slate-700">Specialization:</p>
                  <p className="text-slate-600">{exp.specialization}</p>
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-slate-500">Available: {exp.availableDays}</span>
                  <a
                    href={`tel:${exp.phone}`}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Expert</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
