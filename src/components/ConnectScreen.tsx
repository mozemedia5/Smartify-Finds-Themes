import React, { useState } from 'react';
import { CommunityPost, Expert, UserRole, UserProfile, ChatMessage } from '../types';
import { MOCK_COMMUNITY_POSTS, MOCK_EXPERTS } from '../data/mockData';
import {
  Users,
  UserCheck,
  MessageSquare,
  ThumbsUp,
  Share2,
  ShieldCheck,
  Star,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  X,
  Search,
  Bot
} from 'lucide-react';

interface ConnectScreenProps {
  currentUserRole?: UserRole;
  userProfile?: UserProfile | null;
}

export const ConnectScreen: React.FC<ConnectScreenProps> = ({
  currentUserRole = 'farmer',
  userProfile
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'feed' | 'experts'>('chat');
  const [posts, setPosts] = useState<CommunityPost[]>(MOCK_COMMUNITY_POSTS);
  const [experts] = useState<Expert[]>(MOCK_EXPERTS);

  // Live Chat State
  const [chatFilterRole, setChatFilterRole] = useState<'all' | 'expert' | 'buyer' | 'farmer'>('all');
  const [selectedChatUser, setSelectedChatUser] = useState<Expert | null>(MOCK_EXPERTS[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: '1',
      senderName: 'Dr. Emmanuel Mugisha',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      text: 'Jambo! I am Dr. Emmanuel Mugisha, Senior Agronomist. How can I assist with your crop diseases or farm management today?',
      timestamp: '10:14 AM'
    }
  ]);
  const [chatInputText, setChatInputText] = useState('');

  // New Post Form State
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim() || !selectedChatUser) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      senderId: userProfile?.id || 'usr_me',
      senderName: userProfile?.name || 'You',
      text: chatInputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true
    };

    setChatMessages(prev => [...prev, userMsg]);
    const currentTxt = chatInputText;
    setChatInputText('');

    // Simulated reply from expert/buyer/seller
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'msg_reply_' + Date.now(),
        senderId: selectedChatUser.id,
        senderName: selectedChatUser.name,
        senderAvatar: selectedChatUser.avatar,
        text: `Thanks for contacting regarding "${currentTxt}". I am available to consult or trade produce in ${selectedChatUser.location}. Let me know if you would like a direct phone call.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      author: userProfile?.name || 'You (Uganda Farmer)',
      authorRole: userProfile?.jobTitle || 'Verified Agricultural Member',
      authorAvatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
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
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">AgriConnect Uganda</h1>
            <p className="text-xs text-emerald-100 mt-0.5">
              Live chat & direct connections with experts, buyers, and sellers across Uganda.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-black/20 p-1.5 rounded-2xl backdrop-blur-md border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'chat' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Live Chat</span>
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'feed' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('experts')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center space-x-1.5 ${
              activeTab === 'experts' ? 'bg-white text-emerald-900 shadow-sm' : 'text-emerald-100 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Experts</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE CHAT WITH EXPERTS, BUYERS & SELLERS */}
      {activeTab === 'chat' && (
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[520px]">
          {/* Chat Contacts List Column */}
          <div className="border-r border-slate-200 p-4 space-y-3 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Connect Contacts</h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">Online</span>
            </div>

            {/* Filter Pill Switcher */}
            <div className="flex items-center space-x-1 text-[11px] font-bold">
              {(['all', 'expert', 'buyer', 'farmer'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setChatFilterRole(r)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    chatFilterRole === r ? 'bg-emerald-700 text-white' : 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Contacts Cards */}
            <div className="space-y-2 max-h-[420px] overflow-y-auto">
              {experts.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setSelectedChatUser(exp)}
                  className={`w-full p-3 rounded-2xl text-left flex items-start space-x-3 transition-all ${
                    selectedChatUser?.id === exp.id
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-800'
                  }`}
                >
                  <img src={exp.avatar} alt={exp.name} className="w-10 h-10 rounded-xl object-cover border border-white/40 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-extrabold truncate">{exp.name}</p>
                      <ShieldCheck className={`w-3.5 h-3.5 ${selectedChatUser?.id === exp.id ? 'text-emerald-200' : 'text-emerald-600'}`} />
                    </div>
                    <p className={`text-[10px] truncate ${selectedChatUser?.id === exp.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {exp.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Chat Conversation Area */}
          <div className="md:col-span-2 flex flex-col h-full bg-slate-50/30">
            {selectedChatUser ? (
              <>
                {/* Chat Top Bar */}
                <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={selectedChatUser.avatar} alt={selectedChatUser.name} className="w-10 h-10 rounded-xl object-cover border border-emerald-300" />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h3 className="text-xs font-extrabold text-slate-900">{selectedChatUser.name}</h3>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <p className="text-[10px] text-slate-500">{selectedChatUser.title} • {selectedChatUser.location}</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${selectedChatUser.phone}`}
                    className="p-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-700 hover:text-white rounded-xl transition-colors text-xs font-bold flex items-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Call</span>
                  </a>
                </div>

                {/* Chat Message Window */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[340px]">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start space-x-2 max-w-md ${
                        msg.isSelf ? 'ml-auto flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.isSelf
                          ? 'bg-emerald-700 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                      }`}>
                        <p>{msg.text}</p>
                        <span className={`block text-[9px] mt-1 text-right ${
                          msg.isSelf ? 'text-emerald-200' : 'text-slate-400'
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder={`Message ${selectedChatUser.name}...`}
                    className="flex-1 p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                  <button
                    type="submit"
                    disabled={!chatInputText.trim()}
                    className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl shadow-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Select a contact from the list to start live chat.
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMMUNITY FEED TAB */}
      {activeTab === 'feed' && (
        <div className="space-y-5">
          {/* Post Creation Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
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
              <div key={post.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3">
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
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex items-center justify-between">
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
              <div key={exp.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 hover:border-emerald-300 transition-colors">
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
                  <button
                    onClick={() => {
                      setSelectedChatUser(exp);
                      setActiveTab('chat');
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center space-x-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Live Chat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
