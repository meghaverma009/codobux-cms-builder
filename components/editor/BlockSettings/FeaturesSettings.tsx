'use client';
import { FeaturesBlock } from '@/types/blocks';
import { useCMSStore } from '@/store/useCMSStore';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

export default function FeaturesSettings({ block }: { block: FeaturesBlock }) {
  const { updateBlock, addFeatureCard, updateFeatureCard, removeFeatureCard } = useCMSStore();

  return (
    <div className="space-y-5">
      <Input
        label="Section Title"
        value={block.sectionTitle}
        onChange={(e) => updateBlock(block.id, { sectionTitle: e.target.value })}
        placeholder="e.g. Our Features"
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Feature Cards</span>
          <Button size="sm" variant="secondary" onClick={() => addFeatureCard(block.id)}>
            + Add Card
          </Button>
        </div>

        {block.cards.map((card, i) => (
          <div key={card.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-400 font-medium">Card {i + 1}</span>
              <button
                onClick={() => removeFeatureCard(block.id, card.id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
            <Input
              placeholder="Feature title"
              value={card.title}
              onChange={(e) => updateFeatureCard(block.id, card.id, { title: e.target.value })}
            />
            <Textarea
              placeholder="Feature description"
              value={card.description}
              onChange={(e) => updateFeatureCard(block.id, card.id, { description: e.target.value })}
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
