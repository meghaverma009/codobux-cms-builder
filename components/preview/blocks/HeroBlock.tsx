import { HeroBlock } from "@/types/blocks";

export default function HeroBlockPreview({
  block,
}: {
  block: HeroBlock;
}) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero-banner.jpeg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative max-w-7xl mx-auto px-8 py-28">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {block.title || "Build Better Digital Experiences"}
          </h1>

          <p className="text-lg text-gray-500 mb-6">
            {block.subtitle ||
              "Create stunning landing pages with reusable content blocks and real-time preview."}
          </p>

          {block.buttonText && (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-semibold transition shadow-lg">
              {block.buttonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}