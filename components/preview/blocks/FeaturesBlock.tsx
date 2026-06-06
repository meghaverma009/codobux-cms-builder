import { FeaturesBlock } from "@/types/blocks";

const ICONS = ["⚡", "🚀", "🛡️", "🎨", "📊", "🔗"];

export default function FeaturesBlockPreview({
  block,
}: {
  block: FeaturesBlock;
}) {
  return (
    <section className="py-12 px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
            Features
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {block.sectionTitle || "Why Choose Our Platform"}
          </h2>

          <p className="max-w-2xl mx-auto text-slate-500">
            Powerful tools and features designed to help teams build,
            collaborate and launch products faster.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {block.cards.map((card, index) => (
            <div
              key={card.id}
              className="
                bg-white
                rounded-2xl
                p-8
                shadow-sm
                border
                border-slate-200
                hover:shadow-xl
                hover:-translate-y-2
                transition-all
                duration-300
                group
              "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-xl
                  bg-indigo-100
                  flex
                  items-center
                  justify-center
                  text-2xl
                  mb-6
                  group-hover:bg-indigo-600
                  transition-all
                "
              >
                <span className="group-hover:text-white">
                  {ICONS[index % ICONS.length]}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {card.title || "Feature Title"}
              </h3>

              <p className="text-slate-500 leading-relaxed">
                {card.description ||
                  "Describe how this feature helps users achieve their goals faster and more efficiently."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}