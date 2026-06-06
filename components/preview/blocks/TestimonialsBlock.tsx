import { TestimonialsBlock } from "@/types/blocks";

export default function TestimonialsBlockPreview({
  block,
}: {
  block: TestimonialsBlock;
}) {
  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
            Testimonials
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>

          <p className="max-w-2xl mx-auto text-slate-500">
            Trusted by startups, agencies and growing businesses around
            the world.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 shadow-sm hover:shadow-lg transition-all">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6 text-yellow-400 text-xl">
              ⭐ ⭐ ⭐ ⭐ ⭐
            </div>

            {/* Quote Icon */}
            <div className="text-7xl text-indigo-100 text-center leading-none mb-4">
              "
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-center text-xl md:text-2xl font-medium text-slate-700 leading-relaxed italic mb-10">
              {block.quote ||
                "This platform completely transformed the way our team builds landing pages."}
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                {(block.authorName || "A").charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  {block.authorName || "Author Name"}
                </p>

                <p className="text-sm text-slate-500">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}