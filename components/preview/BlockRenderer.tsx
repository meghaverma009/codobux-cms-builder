// BlockRenderer.tsx
// Picks the right preview component based on block type
import { Block } from '@/types/blocks';
import HeroBlockPreview from './blocks/HeroBlock';
import FeaturesBlockPreview from './blocks/FeaturesBlock';
import TestimonialsBlockPreview from './blocks/TestimonialsBlock';
import CTABlockPreview from './blocks/CTABlock';

export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero': return <HeroBlockPreview block={block} />;
    case 'features': return <FeaturesBlockPreview block={block} />;
    case 'testimonials': return <TestimonialsBlockPreview block={block} />;
    case 'cta': return <CTABlockPreview block={block} />;
    default: return null;
  }
}
