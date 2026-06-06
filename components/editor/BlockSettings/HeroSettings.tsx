'use client';
import { HeroBlock } from '@/types/blocks';
import { useCMSStore } from '@/store/useCMSStore';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

export default function HeroSettings({ block }: { block: HeroBlock }) {
  const updateBlock = useCMSStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">
      <Input
        label="Title"
        value={block.title}
        onChange={(e) => updateBlock(block.id, { title: e.target.value })}
        placeholder="Hero title..."
      />
      <Textarea
        label="Subtitle"
        value={block.subtitle}
        onChange={(e) => updateBlock(block.id, { subtitle: e.target.value })}
        placeholder="Hero subtitle..."
      />
      <Input
        label="Button Text"
        value={block.buttonText}
        onChange={(e) => updateBlock(block.id, { buttonText: e.target.value })}
        placeholder="e.g. Get Started"
      />
    </div>
  );
}
