export type BlockType = 'hero' | 'features' | 'testimonials' | 'cta';

export interface HeroBlock {
  id: string;
  type: 'hero';
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
}

export interface FeaturesBlock {
  id: string;
  type: 'features';
  sectionTitle: string;
  cards: FeatureCard[];
}

export interface TestimonialsBlock {
  id: string;
  type: 'testimonials';
  quote: string;
  authorName: string;
}

export interface CTABlock {
  id: string;
  type: 'cta';
  heading: string;
  buttonText: string;
}

export type Block = HeroBlock | FeaturesBlock | TestimonialsBlock | CTABlock;

export interface CMSState {
  blocks: Block[];
  selectedBlockId: string | null;
}
