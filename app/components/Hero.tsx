import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">

        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            <ShieldCheck size={14} />
            Trusted Healthcare
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Quality Medicines, <br />
            <span className="text-teal-600">Delivered to You.</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
            MontPharmacy brings you 100% genuine medicines directly from our manufacturing units. Safe, reliable, and fast delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/products" className="flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-200">
              Order Medicines
              <ArrowRight size={18} />
            </Link>

            <Link href="/about" className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-all">
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Side: Image Placeholder (Abhi ke liye colored box) */}
        <div className="flex-1 relative w-full max-w-lg">
          <div className="relative bg-teal-200 rounded-2xl overflow-hidden aspect-square shadow-2xl flex items-center justify-center">
            <span className="text-teal-800 font-bold text-xl opacity-50">
              [ Medicine Image Here ]
            </span>
            {/* Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-300 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;