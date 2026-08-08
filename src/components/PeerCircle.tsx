import React, { useState } from 'react';
import { Users, Heart, MessageSquare, ShieldCheck, Send, Sparkles } from 'lucide-react';

interface CircleMessage {
  id: string;
  author: string;
  avatarBg: string;
  content: string;
  timeAgo: string;
  supportCount: number;
  hasSupported?: boolean;
  tag: 'Exam Stress' | 'Late Study' | 'Need Encouragement' | 'Victory';
}

export const PeerCircle: React.FC = () => {
  const [messages, setMessages] = useState<CircleMessage[]>([
    {
      id: 'p-1',
      author: 'Kind Student',
      avatarBg: 'bg-emerald-600',
      content: 'Pulling an all-nighter for organic chem. Remember to drink water everyone.',
      timeAgo: '12m ago',
      supportCount: 8,
      tag: 'Late Study',
    },
    {
      id: 'p-2',
      author: 'Anonymous Peer',
      avatarBg: 'bg-indigo-600',
      content: 'Feeling overwhelmed by college apps today. Taking a 5 minute box breath.',
      timeAgo: '45m ago',
      supportCount: 14,
      tag: 'Exam Stress',
    },
    {
      id: 'p-3',
      author: 'Mindful Learner',
      avatarBg: 'bg-amber-600',
      content: 'Just finished my math presentation. We can get through this semester together.',
      timeAgo: '2h ago',
      supportCount: 22,
      tag: 'Victory',
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [selectedTag, setSelectedTag] = useState<'Exam Stress' | 'Late Study' | 'Need Encouragement' | 'Victory'>('Need Encouragement');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newPost: CircleMessage = {
      id: 'p-' + Date.now(),
      author: 'Anonymous Student',
      avatarBg: 'bg-[#36533a]',
      content: inputMsg.trim(),
      timeAgo: 'Just now',
      supportCount: 1,
      hasSupported: true,
      tag: selectedTag,
    };

    setMessages([newPost, ...messages]);
    setInputMsg('');
  };

  const handleSupport = (id: string) => {
    setMessages(
      messages.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            supportCount: m.hasSupported ? m.supportCount - 1 : m.supportCount + 1,
            hasSupported: !m.hasSupported,
          };
        }
        return m;
      })
    );
  };

  return (
    <div className="w-full glass-card rounded-3xl p-5 border border-white/70 my-6 shadow-sm">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full glass-chip flex items-center justify-center text-[#36533a]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2d4531]">Anonymous Peer Circle</h4>
            <p className="text-[11px] font-semibold text-[#5a6b5d]">Safe, moderated student check-in space</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[10px] font-bold border border-emerald-300">
          <ShieldCheck className="w-3 h-3" /> Moderated
        </span>
      </div>

      {/* Post Form */}
      <form onSubmit={handleSend} className="mb-4 flex flex-col gap-2">
        <div className="flex gap-1.5 flex-wrap text-[10px] font-bold">
          {(['Exam Stress', 'Late Study', 'Need Encouragement', 'Victory'] as const).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-2.5 py-1 rounded-full border transition-all ${
                selectedTag === tag
                  ? 'bg-[#36533a] text-white border-[#36533a]'
                  : 'glass-chip text-[#36533a] hover:bg-white/60'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            placeholder="Share a gentle encouraging note anonymously..."
            className="w-full pl-3 pr-10 py-2.5 bg-white/60 rounded-xl border border-white/80 text-xs font-medium text-[#191c1c] focus:outline-none focus:ring-2 focus:ring-[#4a654e]/40"
          />
          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className="absolute right-2 top-2 p-1 text-[#36533a] hover:text-[#273d2a] disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Circle Posts Feed */}
      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {messages.map((item) => (
          <div key={item.id} className="p-3 glass-card rounded-2xl border border-white/80 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-full ${item.avatarBg} text-white text-[9px] font-bold flex items-center justify-center`}>
                  {item.author.charAt(0)}
                </div>
                <span className="font-bold text-[#2d4531] text-[11px]">{item.author}</span>
                <span className="text-[10px] text-[#5a6b5d] font-semibold">• {item.timeAgo}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full glass-chip text-[9px] font-bold text-[#36533a]">
                {item.tag}
              </span>
            </div>

            <p className="text-[#191c1c] font-medium text-xs mb-2 leading-relaxed">{item.content}</p>

            <button
              onClick={() => handleSupport(item.id)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all flex items-center gap-1.5 border ${
                item.hasSupported
                  ? 'bg-rose-500/15 text-rose-800 border-rose-300'
                  : 'glass-chip text-[#5a6b5d] hover:bg-white/60'
              }`}
            >
              <Heart className={`w-3 h-3 ${item.hasSupported ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{item.supportCount} Hugs & Support</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
