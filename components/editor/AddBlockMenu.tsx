'use client';
import { useState, useRef, useEffect } from 'react';
import { useCMSStore } from '@/store/useCMSStore';
import { BlockType } from '@/types/blocks';

const BLOCK_OPTIONS: { type: BlockType; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    type: 'hero',
    label: 'Hero',
    icon: (
      // person/hero silhouette icon
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10" cy="6" r="3" />
        <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" strokeLinecap="round" />
      </svg>
    ),
    desc: 'Title, subtitle & CTA button',
  },
  {
    type: 'features',
    label: 'Features',
    icon: (
      // lightning bolt
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
      </svg>
    ),
    desc: 'Grid of feature cards',
  },
  {
    type: 'testimonials',
    label: 'Testimonial',
    icon: (
      // chat bubble
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 3V5z" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'Quote with author info',
  },
  {
    type: 'cta',
    label: 'CTA',
    icon: (
      // target/bullseye
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
        <circle cx="10" cy="10" r="8" />
        <circle cx="10" cy="10" r="4" />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
    desc: 'Call-to-action section',
  },
];

// color configs per block type
const ICON_COLORS: Record<string, string> = {
  hero: 'text-indigo-500 bg-indigo-50',
  features: 'text-amber-500 bg-amber-50',
  testimonials: 'text-emerald-500 bg-emerald-50',
  cta: 'text-rose-500 bg-rose-50',
};

export default function AddBlockMenu() {
  const [open, setOpen] = useState(false);
  const addBlock = useCMSStore((s) => s.addBlock);
  const menuRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleAdd = (type: BlockType) => {
    addBlock(type);
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border-2 border-dashed border-indigo-300 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 hover:border-indigo-400 transition-all"
      >
        <span className="text-lg leading-none">+</span>
        Add Block
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Choose block type</p>
          </div>

          {BLOCK_OPTIONS.map(({ type, label, icon, desc }) => (
            <button
              key={type}
              onClick={() => handleAdd(type)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
            >
              {/* icon badge */}
              <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg ${ICON_COLORS[type]}`}>
                {icon}
              </span>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors">{label}</p>
                <p className="text-xs text-slate-400 truncate">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}