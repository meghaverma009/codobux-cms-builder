# CMS Builder

A CMS-style Landing Page Builder built with Next.js App Router, TypeScript, Zustand, and Tailwind CSS.

The application allows users to dynamically create, edit, reorder, duplicate, and manage landing page content blocks with instant live preview updates.

---

## Features

### Dynamic Block Management

- Add new content blocks dynamically
- Edit content inside blocks
- Reorder blocks
- Delete blocks
- Duplicate existing blocks

### Live Preview

- Real-time preview updates
- No page refresh required
- Responsive editing experience

### Persistence

- Automatic localStorage saving
- JSON Export
- JSON Import

### Reusable Architecture

- Modular component structure
- Reusable UI components
- Easy to add new block types

---

## Supported Block Types

| Block Type   | Fields                       |
| ------------ | ---------------------------- |
| Hero         | Title, Subtitle, Button Text |
| Features     | Section Title, Feature Cards |
| Testimonials | Quote, Author Name           |
| CTA          | Heading, Button Text         |

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Zustand
- Tailwind CSS
- LocalStorage

---

## Project Structure

```text
codobux-cms-builder/

├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── editor/
│   │   ├── AddBlockMenu.tsx
│   │   ├── BlockList.tsx
│   │   ├── BlockEditor.tsx
│   │   └── BlockSettings/
│   │       ├── HeroSettings.tsx
│   │       ├── FeaturesSettings.tsx
│   │       ├── TestimonialsSettings.tsx
│   │       └── CTASettings.tsx
│   │
│   ├── preview/
│   │   ├── PreviewPanel.tsx
│   │   ├── BlockRenderer.tsx
│   │   └── blocks/
│   │       ├── HeroBlock.tsx
│   │       ├── FeaturesBlock.tsx
│   │       ├── TestimonialsBlock.tsx
│   │       └── CTABlock.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Textarea.tsx
│
├── store/
│   └── useCMSStore.ts
│
├── types/
│   └── blocks.ts
│
├── lib/
│   └── utils.ts
│
├── public/
│
├── README.md
├── AI_WORKFLOW.md
└── package.json
```

---

## State Management

The application uses Zustand for centralized state management.

### State Structure

```ts
{
  blocks: Block[];
  selectedBlockId: string | null;
}
```

### Store Actions

- addBlock()
- updateBlock()
- removeBlock()
- moveBlock()
- duplicateBlock()
- selectBlock()
- exportJSON()
- importJSON()
- loadFromLocalStorage()

All updates are automatically persisted to localStorage.

---

## Persistence Strategy

### Auto Save

Every state change is automatically stored in:

```text
localStorage -> cms-blocks
```

### Export

Users can export all page data as a JSON file.

### Import

Previously exported JSON files can be imported and restored.

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

Application runs on:

```text
http://localhost:3000
```

---

## Bonus Features Implemented

- Block Duplication
- JSON Import
- JSON Export
- Local Storage Persistence
- Responsive Layout

---

## Author

Megha Verma
