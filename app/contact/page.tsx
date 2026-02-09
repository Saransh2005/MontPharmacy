import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800">Get in Touch</h1>
        <p className="text-slate-500 mt-2">Have a question? We'd love to hear from you.</p>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Contact Information */}
          <div className="md:w-1/3 bg-teal-900 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-teal-100 mb-8 leading-relaxed">
                Fill up the form and our team will get back to you within 24 hours. For medical emergencies, please visit the nearest hospital.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-teal-400 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-sm">Phone</p>
                    <p className="text-teal-100 text-sm">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="text-teal-400 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-sm">Email</p>
                    <p className="text-teal-100 text-sm">support@montpharmacy.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="text-teal-400 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-sm">Headquarters</p>
                    <p className="text-teal-100 text-sm">
                      123 Medical Hub, Industrial Area,<br />
                      New Delhi, India - 110001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-teal-400 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-sm">Business Hours</p>
                    <p className="text-teal-100 text-sm">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Circle */}
            <div className="relative mt-12">
               <div className="w-32 h-32 bg-teal-800 rounded-full opacity-50 absolute -bottom-20 -right-20"></div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
                <select className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Partnership / Distribution</option>
                  <option>Complaint</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Message</label>
                <textarea rows={4} placeholder="Type your message here..." className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"></textarea>
              </div>

              {/* Submit Button */}
              <button className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors flex items-center gap-2">
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}