import React from 'react';
import { PhoneCall, ShieldAlert, Heart, ExternalLink, LifeBuoy, Sparkles } from 'lucide-react';

export const CrisisPanel: React.FC = () => {
  const helplines = [
    {
      name: '988 Suicide & Crisis Lifeline',
      contact: '988',
      desc: 'Free, confidential 24/7 support (US & Canada)',
      href: 'tel:988',
    },
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      desc: 'Connect with a crisis counselor 24/7',
      href: 'sms:741741?body=HOME',
    },
    {
      name: 'The Trevor Project',
      contact: '1-866-488-7386',
      desc: 'LGBTQ youth support line',
      href: 'tel:18664887386',
    },
    {
      name: 'International Helplines',
      contact: 'findahelpline.com',
      desc: 'Free crisis support in over 130 countries',
      href: 'https://findahelpline.com/',
      isExternal: true,
    },
  ];

  return (
    <div className="w-full glass-card rounded-3xl p-5 border border-emerald-500/30 bg-emerald-50/20 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-emerald-800">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-emerald-900">Student Support & Crisis Resources</h4>
          <p className="text-[11px] font-semibold text-emerald-700">You are never alone. Confidential help is available 24/7.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
        {helplines.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target={item.isExternal ? '_blank' : '_self'}
            rel="noreferrer"
            className="p-3 rounded-2xl glass-card bg-white/70 hover:bg-white border border-emerald-200 text-left transition-all flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                {item.name}
              </div>
              <div className="text-xs font-bold text-emerald-700 mt-0.5">{item.contact}</div>
              <div className="text-[10px] font-medium text-slate-600">{item.desc}</div>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:text-emerald-600 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};
