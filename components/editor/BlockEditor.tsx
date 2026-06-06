'use client';
import { useCMSStore } from '@/store/useCMSStore';
import HeroSettings from './BlockSettings/HeroSettings';
import FeaturesSettings from './BlockSettings/FeaturesSettings';
import TestimonialsSettings from './BlockSettings/TestimonialsSettings';
import CTASettings from './BlockSettings/CTASettings';
import { HeroBlock, FeaturesBlock, TestimonialsBlock, CTABlock } from '@/types/blocks';

export default function BlockEditor() {
  const { blocks, selectedBlockId } = useCMSStore();
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        {/* pencil icon */}
        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-slate-400" stroke="currentColor" strokeWidth="1.5">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-9 9A2 2 0 016 16H4v-2a2 2 0 01.586-1.414l9-9z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-600">Nothing selected</p>
        <p className="text-xs text-slate-400 mt-1">Click a block above to edit its content</p>
      </div>
    );
  }

  return (
    <div>
      {selectedBlock.type === 'hero' && <HeroSettings block={selectedBlock as HeroBlock} />}
      {selectedBlock.type === 'features' && <FeaturesSettings block={selectedBlock as FeaturesBlock} />}
      {selectedBlock.type === 'testimonials' && <TestimonialsSettings block={selectedBlock as TestimonialsBlock} />}
      {selectedBlock.type === 'cta' && <CTASettings block={selectedBlock as CTABlock} />}
    </div>
  );
}