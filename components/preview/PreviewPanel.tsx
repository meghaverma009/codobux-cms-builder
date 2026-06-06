// ─── PreviewPanel.tsx ────────────────────────────────────────────────────────
'use client';
import { useCMSStore } from '@/store/useCMSStore';
import BlockRenderer from './BlockRenderer';

export default function PreviewPanel() {
  const blocks = useCMSStore((s) => s.blocks);

  return (
    <div className="h-full overflow-y-auto bg-slate-100">
      {blocks.length === 0 ? (
        // empty state
        <div className="h-full flex items-center justify-center text-center p-8">
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-slate-300" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 9h18M9 21V9" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium text-sm">Your page preview appears here</p>
            <p className="text-slate-400 text-xs mt-1">Add blocks from the left panel to get started</p>
          </div>
        </div>
      ) : (
        <div className="min-h-full bg-white shadow-sm">
          {blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}