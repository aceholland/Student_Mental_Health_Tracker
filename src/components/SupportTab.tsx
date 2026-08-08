import React from 'react';
import { ShieldAlert, PhoneCall, MessageSquareText, ExternalLink, HeartHandshake } from 'lucide-react';

const helplines = [
  {
    name: '988 Suicide & Crisis Lifeline',
    contact: '988',
    desc: 'Free, confidential support for crisis and emotional distress.',
    href: 'tel:988',
  },
  {
    name: 'Crisis Text Line',
    contact: 'Text HOME to 741741',
    desc: 'Text-based support from a trained crisis counselor.',
    href: 'sms:741741?body=HOME',
  },
  {
    name: 'The Trevor Project',
    contact: '1-866-488-7386',
    desc: 'Support for LGBTQ young people in moments of crisis.',
    href: 'tel:18664887386',
  },
  {
    name: 'International Helplines',
    contact: 'findahelpline.com',
    desc: 'Support options across more than 130 countries.',
    href: 'https://findahelpline.com/',
    isExternal: true,
  },
];

export const SupportTab: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-5 pt-20 pb-32 flex flex-col items-center">
      <div className="w-full mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-chip text-[#2d4531] text-xs font-bold mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-[#36533a]" />
          <span>Support & crisis resources</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#2d4531] tracking-tight font-['Quicksand']">
          You are not alone.
        </h2>
        <p className="text-sm font-medium text-[#455448] mt-1">
          Confidential, immediate support is available whenever you need it.
        </p>
      </div>

      <section className="w-full glass-card rounded-[32px] p-6 md:p-7 border border-white/70 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#36533a] text-white flex items-center justify-center shadow-md">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2d4531]">Immediate help</h3>
            <p className="text-xs font-semibold text-[#5a6b5d]">Reach out in the moment. Support is available 24/7.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {helplines.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target={item.isExternal ? '_blank' : '_self'}
              rel="noreferrer"
              className="group block rounded-2xl border border-[#dfe8df] bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-[#1f2f22] mb-1">{item.name}</div>
                  <div className="text-xs font-bold text-[#36533a]">{item.contact}</div>
                  <p className="mt-1 text-[11px] font-medium text-[#4f6051] leading-relaxed">{item.desc}</p>
                </div>
                <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf3ee] text-[#36533a]">
                  {item.isExternal ? <ExternalLink className="w-4 h-4" /> : item.name.includes('Text') ? <MessageSquareText className="w-4 h-4" /> : <PhoneCall className="w-4 h-4" />}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
