'use client';

import { create } from 'zustand';
import { Block, BlockType, CMSState, FeatureCard } from '@/types/blocks';
import { generateId } from '@/lib/utils';

interface CMSActions {
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
  duplicateBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  addFeatureCard: (blockId: string) => void;
  updateFeatureCard: (blockId: string, cardId: string, updates: Partial<FeatureCard>) => void;
  removeFeatureCard: (blockId: string, cardId: string) => void;
  exportJSON: () => string;
  importJSON: (json: string) => void;
  loadFromLocalStorage: () => void;
}

const DEFAULT_BLOCKS: Block[] = [
  {
    id: generateId(),
    type: 'hero',
    title: 'Welcome to Our Product',
    subtitle: 'The fastest way to build and launch your ideas.',
    buttonText: 'Get Started',
  },
];

function saveToLocalStorage(blocks: Block[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cms-blocks', JSON.stringify(blocks));
  }
}

export const useCMSStore = create<CMSState & CMSActions>((set, get) => ({
  blocks: DEFAULT_BLOCKS,
  selectedBlockId: DEFAULT_BLOCKS[0].id,

  addBlock: (type) => {
    let newBlock: Block;
    const id = generateId();
    switch (type) {
      case 'hero':
        newBlock = { id, type, title: 'New Hero Section', subtitle: 'Your subtitle here', buttonText: 'Click Me' };
        break;
      case 'features':
        newBlock = {
          id, type, sectionTitle: 'Our Features',
        cards: [
  {
    id: generateId(),
    title: 'Lightning Fast',
    description: 'Optimized performance for a smooth and responsive user experience.',
  },
  {
    id: generateId(),
    title: 'Secure Platform',
    description: 'Built with modern security practices to keep your data protected.',
  },
  {
    id: generateId(),
    title: 'Easy Customization',
    description: 'Quickly customize content blocks and layouts without coding.',
  },
],
        };
        break;
      case 'testimonials':
        newBlock = { id, type, quote: 'This product changed everything for us.', authorName: 'Jane Doe' };
        break;
      case 'cta':
        newBlock = { id, type, heading: 'Ready to get started?', buttonText: 'Sign Up Free' };
        break;
    }
    set((state) => {
      const blocks = [...state.blocks, newBlock];
      saveToLocalStorage(blocks);
      return { blocks, selectedBlockId: id };
    });
  },

  removeBlock: (id) => {
    set((state) => {
      const blocks = state.blocks.filter((b) => b.id !== id);
      const selectedBlockId = state.selectedBlockId === id ? (blocks[0]?.id ?? null) : state.selectedBlockId;
      saveToLocalStorage(blocks);
      return { blocks, selectedBlockId };
    });
  },

  updateBlock: (id, updates) => {
    set((state) => {
      const blocks = state.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)) as Block[];
      saveToLocalStorage(blocks);
      return { blocks };
    });
  },

  moveBlock: (id, direction) => {
    set((state) => {
      const blocks = [...state.blocks];
      const idx = blocks.findIndex((b) => b.id === id);
      if (direction === 'up' && idx > 0) {
        [blocks[idx - 1], blocks[idx]] = [blocks[idx], blocks[idx - 1]];
      } else if (direction === 'down' && idx < blocks.length - 1) {
        [blocks[idx], blocks[idx + 1]] = [blocks[idx + 1], blocks[idx]];
      }
      saveToLocalStorage(blocks);
      return { blocks };
    });
  },

  duplicateBlock: (id) => {
    set((state) => {
      const idx = state.blocks.findIndex((b) => b.id === id);
      if (idx === -1) return state;
      const original = state.blocks[idx];
      const copy = { ...original, id: generateId() };
      const blocks = [...state.blocks.slice(0, idx + 1), copy, ...state.blocks.slice(idx + 1)] as Block[];
      saveToLocalStorage(blocks);
      return { blocks, selectedBlockId: copy.id };
    });
  },

  selectBlock: (id) => set({ selectedBlockId: id }),

  addFeatureCard: (blockId) => {
    set((state) => {
      const blocks = state.blocks.map((b) => {
        if (b.id === blockId && b.type === 'features') {
          return { ...b, cards: [...b.cards, { id: generateId(), title: 'New Feature', description: 'Description here.' }] };
        }
        return b;
      }) as Block[];
      saveToLocalStorage(blocks);
      return { blocks };
    });
  },

  updateFeatureCard: (blockId, cardId, updates) => {
    set((state) => {
      const blocks = state.blocks.map((b) => {
        if (b.id === blockId && b.type === 'features') {
          return { ...b, cards: b.cards.map((c) => (c.id === cardId ? { ...c, ...updates } : c)) };
        }
        return b;
      }) as Block[];
      saveToLocalStorage(blocks);
      return { blocks };
    });
  },

  removeFeatureCard: (blockId, cardId) => {
    set((state) => {
      const blocks = state.blocks.map((b) => {
        if (b.id === blockId && b.type === 'features') {
          return { ...b, cards: b.cards.filter((c) => c.id !== cardId) };
        }
        return b;
      }) as Block[];
      saveToLocalStorage(blocks);
      return { blocks };
    });
  },

  exportJSON: () => JSON.stringify(get().blocks, null, 2),

  importJSON: (json) => {
    try {
      const blocks = JSON.parse(json) as Block[];
      saveToLocalStorage(blocks);
      set({ blocks, selectedBlockId: blocks[0]?.id ?? null });
    } catch {
      alert('Invalid JSON');
    }
  },

  loadFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cms-blocks');
      if (saved) {
        try {
          const blocks = JSON.parse(saved) as Block[];
          set({ blocks, selectedBlockId: blocks[0]?.id ?? null });
        } catch { /* ignore */ }
      }
    }
  },
}));
