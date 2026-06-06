'use client';
import { CTABlock } from '@/types/blocks';
import { useCMSStore } from '@/store/useCMSStore';
import Input from '@/components/ui/Input';

export default function CTASettings({ block }: { block: CTABlock }) {
  const updateBlock = useCMSStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">
      <Input
        label="Heading"
        value={block.heading}
        onChange={(e) => updateBlock(block.id, { heading: e.target.value })}
        placeholder="e.g. Ready to get started?"
      />
      <Input
        label="Button Text"
        value={block.buttonText}
        onChange={(e) => updateBlock(block.id, { buttonText: e.target.value })}
        placeholder="e.g. Sign Up Free"
      />
    </div>
  );
}
