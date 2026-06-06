'use client';
import { useCMSStore } from '@/store/useCMSStore';
import { Block } from '@/types/blocks';
import { cn } from '@/lib/utils';

// icons and labels per block type
const BLOCK_ICONS: Record<string, React.ReactNode> = {
  hero: (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="5" r="2.5" />
      <path d="M2 15c0-3.314 2.686-6 6-6s6 2.686 6 6" strokeLinecap="round" />
    </svg>
  ),
  features: (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M9.04.852A.8.8 0 019.6 1.6v4h3.2a.8.8 0 01.656 1.258l-5.6 8A.8.8 0 016.4 14.4v-4H3.2a.8.8 0 01-.656-1.258l5.6-8A.8.8 0 019.04.852z" />
    </svg>
  ),
  testimonials: (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.8">
      <path d="M1.6 4A1.6 1.6 0 013.2 2.4h9.6A1.6 1.6 0 0114.4 4v5.6a1.6 1.6 0 01-1.6 1.6H4.8L1.6 14V4z" strokeLinejoin="round" />
    </svg>
  ),
  cta: (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="6.4" />
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="8" cy="8" r="0.8" fill="currentColor" />
    </svg>
  ),
};

const ICON_COLORS: Record<string, string> = {
  hero: 'text-indigo-500 bg-indigo-50',
  features: 'text-amber-500 bg-amber-50',
  testimonials: 'text-emerald-500 bg-emerald-50',
  cta: 'text-rose-500 bg-rose-50',
};

const BLOCK_LABELS: Record<string, string> = {
  hero: 'Hero',
  features: 'Features',
  testimonials: 'Testimonial',
  cta: 'CTA',
};

// gets a short subtitle to display under the block name
function getBlockSubtitle(block: Block): string {
  switch (block.type) {
    case 'hero': return block.title || 'No title';
    case 'features': return block.sectionTitle || 'Feature section';
    case 'testimonials': return block.authorName || 'No author';
    case 'cta': return block.heading || 'No heading';
    default: return '';
  }
}

function BlockItem({ block, index, total }: { block: Block; index: number; total: number }) {
  const { selectedBlockId, selectBlock, removeBlock, moveBlock, duplicateBlock } = useCMSStore();
  const isSelected = selectedBlockId === block.id;

  return (
    <div
      onClick={() => selectBlock(block.id)}
      className={cn(
        'group flex items-center gap-2.5 p-2.5 rounded-lg cursor-pointer border transition-all select-none',
        isSelected
          ? 'bg-indigo-50 border-indigo-200 shadow-sm'
          : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
      )}
    >
      {/* drag handle — visual only for now */}
      <span className="flex-shrink-0 text-slate-300 cursor-grab active:cursor-grabbing">
        <svg viewBox="0 0 8 16" className="w-2 h-4 fill-current">
          <circle cx="2" cy="3" r="1.2" /><circle cx="6" cy="3" r="1.2" />
          <circle cx="2" cy="8" r="1.2" /><circle cx="6" cy="8" r="1.2" />
          <circle cx="2" cy="13" r="1.2" /><circle cx="6" cy="13" r="1.2" />
        </svg>
      </span>

      {/* type icon */}
      <span className={cn('flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md', ICON_COLORS[block.type])}>
        {BLOCK_ICONS[block.type]}
      </span>

      {/* block name + subtitle */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium truncate', isSelected ? 'text-indigo-700' : 'text-slate-700')}>
          {BLOCK_LABELS[block.type]}
        </p>
        <p className="text-xs text-slate-400 truncate">{getBlockSubtitle(block)}</p>
      </div>

      {/* action buttons — visible on hover */}
      <div
        className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          disabled={index === 0}
          onClick={() => moveBlock(block.id, 'up')}
          title="Move up"
          className="p-1 rounded hover:bg-slate-200 disabled:opacity-25 text-slate-500 transition-colors"
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3 fill-current">
            <path d="M6 2l4 6H2l4-6z" />
          </svg>
        </button>

        <button
          disabled={index === total - 1}
          onClick={() => moveBlock(block.id, 'down')}
          title="Move down"
          className="p-1 rounded hover:bg-slate-200 disabled:opacity-25 text-slate-500 transition-colors"
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3 fill-current">
            <path d="M6 10L2 4h8l-4 6z" />
          </svg>
        </button>

        <button
          onClick={() => duplicateBlock(block.id)}
          title="Duplicate"
          className="p-1 rounded hover:bg-blue-100 text-slate-500 hover:text-blue-600 transition-colors"
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <path d="M2 9V2h7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => removeBlock(block.id)}
          title="Delete"
          className="p-1 rounded hover:bg-red-100 text-slate-500 hover:text-red-500 transition-colors"
        >
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function BlockList() {
  const blocks = useCMSStore((s) => s.blocks);

  if (blocks.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 text-sm">
        <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-slate-100 flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-slate-300" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="14" height="14" rx="2" />
            <path d="M7 10h6M10 7v6" strokeLinecap="round" />
          </svg>
        </div>
        <p className="font-medium text-slate-500">No blocks yet</p>
        <p className="text-xs mt-0.5">Add one from the menu above</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {blocks.map((block, i) => (
        <BlockItem key={block.id} block={block} index={i} total={blocks.length} />
      ))}
    </div>
  );
}