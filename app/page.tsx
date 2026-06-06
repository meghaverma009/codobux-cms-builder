'use client';
import { useEffect, useRef, useState } from 'react';
import { useCMSStore } from '@/store/useCMSStore';
import BlockList from '@/components/editor/BlockList';
import BlockEditor from '@/components/editor/BlockEditor';
import AddBlockMenu from '@/components/editor/AddBlockMenu';
import PreviewPanel from '@/components/preview/PreviewPanel';

export default function HomePage() {
  const { loadFromLocalStorage, exportJSON, importJSON, blocks } = useCMSStore();
  const fileRef = useRef<HTMLInputElement>(null);
  // on mobile we toggle between "editor" and "preview" panels
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const handleExport = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'page-blocks.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        importJSON(event.target.result);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };


  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">

      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white font-bold text-sm sm:text-base">C</span>
          </div>
          {/* full title on sm+ */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-800 leading-tight">CMS Builder</h1>
            <p className="text-xs text-slate-500">
              {blocks.length} block{blocks.length !== 1 ? 's' : ''}
            </p>
          </div>
          {/* compact title on mobile */}
          <h1 className="text-base font-bold text-slate-800 sm:hidden">CMS Builder</h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-indigo-600 px-2 sm:px-3 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            <span className="hidden sm:inline">↑ Import</span>
            <span className="sm:hidden">↑</span>
          </button>

          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

          <button
            onClick={handleExport}
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-indigo-600 px-2 sm:px-3 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            <span className="hidden sm:inline">↓ Export</span>
            <span className="sm:hidden">↓</span>
          </button>
        </div>
      </header>

      {/* Mobile tab switcher — only visible below lg breakpoint */}
      <div className="flex lg:hidden border-b border-slate-200 bg-white flex-shrink-0">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            mobileTab === 'editor'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
            mobileTab === 'preview'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — full width on mobile, fixed 340px on desktop */}
        <aside
          className={`
            w-full lg:w-[340px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0
            ${mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'}
          `}
        >
          {/* Add block button */}
          <div className="p-4 border-b border-slate-200">
            <AddBlockMenu />
          </div>

          {/* Block list */}
          <div className="border-b border-slate-200">
            <div className="px-4 py-2.5 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Page Blocks
              </h2>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {blocks.length}
              </span>
            </div>
            <div className="max-h-[260px] sm:max-h-[300px] overflow-y-auto px-3 pb-3">
              <BlockList />
            </div>
          </div>

          {/* Block settings */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2.5 border-b border-slate-200 sticky top-0 bg-white z-10">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Block Settings
              </h2>
            </div>
            <div className="p-4">
              <BlockEditor />
            </div>
          </div>
        </aside>

        {/* Preview — hidden on mobile when editor tab is active */}
        <main
          className={`
            flex-1 flex flex-col overflow-hidden min-w-0
            ${mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'}
          `}
        >
          {/* Fake browser chrome bar */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-white border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-mono bg-slate-100 px-2.5 py-1 rounded hidden sm:block">
                preview — live
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Preview
            </div>
          </div>

          {/* Preview content */}
          <div className="flex-1 overflow-auto">
            {blocks.length === 0 ? (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-slate-300" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="M3 9h18M9 21V9" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-slate-700">No blocks yet</h2>
                  <p className="text-slate-400 mt-1 text-sm">
                    Add a Hero, Features, Testimonial or CTA block to start building.
                  </p>
                </div>
              </div>
            ) : (
              <PreviewPanel />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}