"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

/* ── Social Media Icons ──────────────────────────────────── */

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14-3.443 0-5.643 2.15-5.643 5.92V9.5H6.5v4h2.5v10.5h5V13.5z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.031 0C5.405 0 0 5.405 0 12.031c0 2.128.556 4.195 1.611 6.012L.373 24l6.115-1.602a11.96 11.96 0 0 0 5.543 1.353h.005c6.623 0 12.029-5.406 12.029-12.031C24.065 5.405 18.654 0 12.031 0Zm0 21.737h-.003a9.927 9.927 0 0 1-5.06-1.378l-.363-.215-3.766.987.997-3.67-.236-.376a9.92 9.92 0 0 1-1.522-5.321c0-5.485 4.463-9.948 9.954-9.948 5.488 0 9.949 4.463 9.949 9.948 0 5.487-4.461 9.948-9.95 9.948Zm5.46-7.48c-.299-.151-1.771-.875-2.046-.975-.274-.1-.474-.151-.674.151-.2.301-.773.975-.948 1.176-.174.201-.349.225-.648.075-.299-.151-1.264-.466-2.408-1.488-.89-.794-1.492-1.775-1.666-2.076-.174-.301-.019-.464.131-.614.135-.135.299-.35.449-.525.15-.175.2-.301.299-.5.1-.201.05-.375-.025-.525-.075-.151-.674-1.625-.923-2.225-.241-.582-.487-.503-.674-.513-.174-.008-.374-.008-.574-.008a1.1 1.1 0 0 0-.799.375c-.299.301-1.148 1.125-1.148 2.744s1.173 3.181 1.336 3.4c.162.226 2.316 3.535 5.611 4.958 2.65 1.145 3.447 1.05 4.07 1.05.733 0 2.369-.968 2.706-1.905.337-.937.337-1.743.237-1.918-.1-.175-.374-.275-.673-.425Z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mb-3">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#cd0442] font-semibold">Contact Us</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Contact Us
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            Have a question, feedback, or a breaking news tip? Get in touch with our team using the form below or through our direct contact channels.
          </p>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Details & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Reach out to our editorial desk for queries, press releases, story leads, or business partnerships.
              </p>
            </div>

            {/* Direct Contact List */}
            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-[#cd0442] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email Us</h3>
                  <a
                    href="mailto:contact@doreports.in"
                    className="text-sm text-gray-600 hover:text-[#cd0442] transition-colors"
                  >
                    contact@doreports.in
                  </a>
                </div>
              </div>

              {/* WhatsApp / Tip line */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">WhatsApp / News Tips</h3>
                  <a
                    href="https://whatsapp.com/channel/doreports"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    Join our WhatsApp Channel
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Location</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Kalyan-Dombivli & Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Follow Us on Social Media
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com/doreports"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1877F2] hover:border-[#1877F2] transition-colors shadow-sm"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/doreports26"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors shadow-sm"
                >
                  <XIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/doreportsnews?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#E4405F] hover:border-[#E4405F] transition-colors shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@doreports-i1z"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#FF0000] hover:border-[#FF0000] transition-colors shadow-sm"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://whatsapp.com/channel/doreports"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Channel"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#25D366] hover:border-[#25D366] transition-colors shadow-sm"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Standard Clean Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Send Us a Message
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Fill in the details below and we will respond as soon as possible.
              </p>

              {isSubmitted ? (
                <div className="py-10 px-4 text-center">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Thank You! Your message has been sent.
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
                    Our team will review your message and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                      setIsSubmitted(false);
                    }}
                    className="px-5 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-[#cd0442] transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cd0442]/20 focus:border-[#cd0442] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cd0442]/20 focus:border-[#cd0442] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cd0442]/20 focus:border-[#cd0442] transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Subject of your message"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cd0442]/20 focus:border-[#cd0442] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#cd0442]/20 focus:border-[#cd0442] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#cd0442] hover:bg-[#b10150] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
