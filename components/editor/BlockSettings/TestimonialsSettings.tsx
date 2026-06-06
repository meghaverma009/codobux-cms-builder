'use client';
import { TestimonialsBlock } from '@/types/blocks';
import { useCMSStore } from '@/store/useCMSStore';
import Textarea from '@/components/ui/Textarea';
import Input from '@/components/ui/Input';

export default function TestimonialsSettings({ block }: { block: TestimonialsBlock }) {
  const updateBlock = useCMSStore((s) => s.updateBlock);

  return (
    <div className="space-y-4">
      <Textarea
        label="Quote"
        value={block.quote}
        onChange={(e) => updateBlock(block.id, { quote: e.target.value })}
        placeholder="Enter testimonial quote..."
        rows={4}
      />
      <Input
        label="Author Name"
        value={block.authorName}
        onChange={(e) => updateBlock(block.id, { authorName: e.target.value })}
        placeholder="e.g. Jane Doe, CEO at Acme"
      />
    </div>
  );
}
