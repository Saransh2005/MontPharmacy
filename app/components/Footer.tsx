import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Mont<span className="text-teal-500">Pharmacy</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Trusted by millions. We provide 100% genuine medicines, baby care, and lifestyle products delivered to your doorstep.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-teal-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-teal-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-teal-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-teal-500 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-teal-500 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-500 transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-teal-500 transition-colors">Our Medicines</Link></li>
              <li><Link href="/blog" className="hover:text-teal-500 transition-colors">Health Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Legal & Help</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/privacy" className="hover:text-teal-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-teal-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-teal-500 transition-colors">Refund Policy</Link></li>
              <li><Link href="/support" className="hover:text-teal-500 transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={20} className="text-teal-500 shrink-0" />
                <span>123 Health Street, Medical Hub, New Delhi, India - 110001</span>
              </li>
              <li className="flex gap-3">
                <Phone size={20} className="text-teal-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3">
                <Mail size={20} className="text-teal-500 shrink-0" />
                <span>support@montpharmacy.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 MontPharmacy. All rights reserved.</p>
          <p>Designed for Quality Healthcare.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;