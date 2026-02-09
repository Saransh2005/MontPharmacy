import { Award, Users, Globe, Activity } from "lucide-react";

export default function About() {
  return (
    <main className="bg-white">
      
      {/* 1. Header Banner */}
      <section className="bg-teal-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About MontPharmacy</h1>
        <p className="text-teal-200 text-lg max-w-2xl mx-auto">
          Innovating for a healthier tomorrow. We are a leading pharmaceutical company dedicated to global wellness.
        </p>
      </section>

      {/* 2. Our Story & Mission */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">
              Who We Are
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Founded in 2010, <span className="font-bold text-teal-700">MontPharmacy</span> has grown from a small laboratory to a global healthcare provider. We specialize in manufacturing high-quality generic medicines, skincare, and wellness products.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our mission is simple: <strong>To make quality healthcare affordable for everyone.</strong> We follow strict WHO-GMP guidelines to ensure every tablet and syrup is 100% safe.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-teal-700 text-2xl">15+</h4>
                <p className="text-sm text-slate-500">Years of Excellence</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h4 className="font-bold text-teal-700 text-2xl">5M+</h4>
                <p className="text-sm text-slate-500">Happy Patients</p>
              </div>
            </div>
          </div>

          {/* Image / Visual Placeholder */}
          <div className="relative h-80 bg-teal-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg">
            <span className="text-teal-800 font-bold opacity-40 text-xl">
              [ Company Building / Lab Image ]
            </span>
          </div>

        </div>
      </section>

      {/* 3. Why Choose Us (Features) */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Why Choose MontPharmacy?</h2>
            <p className="text-slate-500 mt-2">We prioritize Quality, Safety, and Trust.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Certified Quality</h3>
              <p className="text-sm text-slate-500">WHO-GMP & ISO certified manufacturing units.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Expert Team</h3>
              <p className="text-sm text-slate-500">Led by top scientists and pharmacists.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Global Presence</h3>
              <p className="text-sm text-slate-500">Exporting to over 20+ countries worldwide.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity size={24} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">24/7 Support</h3>
              <p className="text-sm text-slate-500">Always here to answer your health queries.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}