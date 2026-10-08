import React, { useState } from 'react';
import { UserRole, UserProfile, Expert, CommunityPost, Opportunity } from '../types';
import { MOCK_EXPERTS, MOCK_COMMUNITY_POSTS, MOCK_OPPORTUNITIES } from '../data/mockData';
import {
  Users,
  MessageSquare,
  Award,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Briefcase,
  Heart,
  Send,
  Plus,
  ExternalLink,
  Calendar,
  Building
} from 'lucide-react';

interface ConnectScreenProps {
  currentUserRole: UserRole;
  userProfile: UserProfile | null;
  onOpenMessageSeller?: (sellerId: string, sellerName: string) => void;
}

export const ConnectScreen: React.FC<ConnectScreenProps> = ({
  currentUserRole,
  userProfile,
  onOpenMessageSeller
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'experts' | 'opportunities'>('feed');

  // Posts State
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('General');

  // Expert State
  const [experts, setExperts] = useState<Expert[]>(MOCK_EXPERTS);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  // Opportunities State
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const post: CommunityPost = {
      id: `post_${Date.now()}`,
      author: userProfile?.name || 'Agri Member',
      authorRole: userProfile?.jobTitle || 'Verified Farmer',
      authorAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: userProfile?.isVerified || true,
      timeAgo: 'Just now',
      content: newPostContent,
      likes: 0,
      commentsCount: 0,
      tags: [newPostTag]
    };

    setPosts([post, ...posts]);
    setNewPostContent('');
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Agricultural Ecosystem & Network</h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
            Connect with agronomists, veterinary specialists, buyers, certified seed operators, and agricultural grant opportunities.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-700/50 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-emerald-500/30 text-xs font-bold">
          <Users className="w-4 h-4 text-emerald-300" />
          <span>Community Directory</span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'feed' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Community Discussions & Feed
        </button>
        <button
          onClick={() => setActiveTab('experts')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'experts' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Verified Agronomists & Specialists ({experts.length})
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'opportunities' ? 'bg-emerald-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Grants & Opportunities ({opportunities.length})
        </button>
      </div>

      {/* Tab 1: Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6 text-xs">
          {/* Post Creation Box */}
          <form onSubmit={handleCreatePost} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={userProfile?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                alt={userProfile?.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
              <textarea
                rows={2}
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share field insights, disease advisories, or query fellow growers..."
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              ></textarea>
            </div>

            <div className="flex justify-between items-center pt-1">
              <select
                value={newPostTag}
                onChange={(e) => setNewPostTag(e.target.value)}
                className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-bold"
              >
                <option value="General">General</option>
                <option value="Tomatoes">Tomatoes</option>
                <option value="Maize">Maize</option>
                <option value="PestControl">Pest Control</option>
                <option value="Poultry">Poultry</option>
              </select>

              <button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Discussion</span>
              </button>
            </div>
          </form>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-slate-900">{post.author}</span>
                        {post.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-[10px] text-slate-500">{post.authorRole} • {post.timeAgo}</p>
                    </div>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                    #{post.tags[0]}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed sm:text-xs">{post.content}</p>

                {post.image && (
                  <img src={post.image} alt="Post media" className="w-full aspect-[16/9] max-h-72 object-cover rounded-xl bg-slate-100" />
                )}

                <div className="flex items-center space-x-4 pt-2 border-t border-slate-100 text-slate-500">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center space-x-1 hover:text-rose-500 font-bold transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{post.likes} Likes</span>
                  </button>

                  <span className="flex items-center space-x-1 font-bold">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} Comments</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Experts */}
      {activeTab === 'experts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {experts.map((expert) => (
            <div key={expert.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={expert.avatar} alt={expert.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-slate-900 text-sm">{expert.name}</h3>
                      {expert.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-700">{expert.title}</p>
                    <p className="text-[10px] text-slate-400 flex items-center mt-0.5">
                      <MapPin className="w-3 h-3 mr-0.5" />
                      {expert.location} • {expert.experienceYears} Years Exp.
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 line-clamp-2">{expert.bio}</p>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Consultation Fee:</span>
                  <span className="font-bold text-slate-900">{expert.consultationFee || 'Standard Rate'}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`https://wa.me/${expert.whatsapp}?text=Hello%20${encodeURIComponent(expert.name)},%20I%20would%20like%20to%20consult%20you%20regarding%20my%20farm.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-center flex items-center justify-center space-x-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Consult Expert</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Opportunities */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4 text-xs">
          {opportunities.map((opp) => (
            <div key={opp.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-md text-[10px]">
                    {opp.type}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 mt-1">{opp.title}</h3>
                  <p className="text-[11px] text-slate-500">{opp.organization} • Deadline: {opp.deadline}</p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">{opp.description}</p>

              <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                <span className="text-slate-400 font-medium flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {opp.location}
                </span>

                <a
                  href={opp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
