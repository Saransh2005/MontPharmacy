"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setStatus("submitting");
    try {
      const response = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        }
      );
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="_replyto"
                    required
                    className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Partnership / Distribution</option>
                  <option>Complaint</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-600 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              {status === "success" && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2">
                  <CheckCircle size={20} />
                  <span>Message sent! We&apos;ll get back to you within 24 hours.</span>
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                  Something went wrong. Please try again later.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}