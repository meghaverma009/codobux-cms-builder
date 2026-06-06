import { CTABlock } from "@/types/blocks";

export default function CTABlockPreview({
  block,
}: {
  block: CTABlock;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 px-8">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-6">
          Ready To Launch?
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          {block.heading || "Ready to get started?"}
        </h2>

        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
          Build, customize and launch your landing pages faster with reusable content blocks and live preview editing.
        </p>

        {block.buttonText && (
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 hover:scale-105">
            {block.buttonText}
          </button>
        )}
      </div>
    </section>
  );
}