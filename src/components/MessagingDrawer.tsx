import React, { useState, useEffect } from 'react';
import { ChatMessage, Conversation } from '../types';
import { MessagingService } from '../services/messagingService';
import { X, Send, Paperclip, MessageCircle, ShieldCheck } from 'lucide-react';

interface MessagingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  currentUserName: string;
  initialParticipant?: { id: string; name: string } | null;
}

export const MessagingDrawer: React.FC<MessagingDrawerProps> = ({
  isOpen,
  onClose,
  currentUserId,
  currentUserName,
  initialParticipant
}) => {
  if (!isOpen) return null;

  const [conversations, setConversations] = useState<Conversation[]>(() => MessagingService.getConversations());
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (initialParticipant) {
      const conv = MessagingService.createConversation(
        initialParticipant.id,
        initialParticipant.name,
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        'Verified Seller',
        true
      );
      setConversations(MessagingService.getConversations());
      setActiveConv(conv);
    } else if (conversations.length > 0 && !activeConv) {
      setActiveConv(conversations[0]);
    }
  }, [initialParticipant]);

  useEffect(() => {
    if (activeConv) {
      setMessages(MessagingService.getMessages(activeConv.id));
    }
  }, [activeConv]);

  const handleSend = () => {
    if (!text.trim() || !activeConv) return;
    const msg = MessagingService.sendMessage(activeConv.id, currentUserId, currentUserName, text);
    setMessages([...messages, msg]);
    setText('');
    setConversations(MessagingService.getConversations());
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white max-w-md w-full h-full shadow-2xl flex flex-col justify-between text-xs">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-emerald-800 text-white">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-sm">Direct Messages</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Conversation Header */}
          {activeConv ? (
            <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center space-x-3">
              <img src={activeConv.participantAvatar} alt={activeConv.participantName} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <div className="font-bold text-slate-900 flex items-center space-x-1">
                  <span>{activeConv.participantName}</span>
                  {activeConv.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <span className="text-[10px] text-slate-500">{activeConv.participantRole}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 text-slate-400 text-center">Select or start a conversation</div>
          )}

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.senderId === currentUserId
                      ? 'bg-emerald-700 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-900 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-70 block text-right mt-1">{m.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          {activeConv && (
            <div className="p-3 border-t border-slate-200 flex items-center gap-2 bg-slate-50">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none"
              />
              <button onClick={handleSend} className="p-2.5 bg-emerald-700 text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
