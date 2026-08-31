import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Do Reports – ताज्या मराठी बातम्या",
  description:
    "Learn about Do Reports – Maharashtra's trusted digital news platform. Discover our vision, ethos, culture, and mission to deliver accurate, impactful Marathi news.",
};

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

/* ── Page Component ──────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════════════════
          HERO — Minimalist Light Editorial Masthead
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-b from-gray-50/70 via-white to-white border-b border-gray-100 overflow-hidden">
        {/* Subtle ambient light accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#cd0442] opacity-[0.025] blur-[140px]" />
          <div className="absolute top-[30%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#f72e06] opacity-[0.02] blur-[120px]" />
        </div>

        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="pt-8 pb-5">
            <div className="flex items-center gap-2 text-[12px] tracking-wider text-gray-400 uppercase font-medium">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-semibold">About Us</span>
            </div>
          </div>

          {/* Hero content */}
          <div className="pt-10 pb-20 md:pt-16 md:pb-28 max-w-[860px]">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-red-50/80 border border-red-100/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#cd0442] animate-pulse" />
              <span className="text-[12px] font-bold tracking-wide text-[#cd0442] uppercase">
                Est. 2026 · Maharashtra, India
              </span>
            </div>

            <h1 className="text-[clamp(2.4rem,5.5vw,4.25rem)] font-extrabold tracking-[-0.035em] leading-[1.08] text-[#090909] mb-7">
              Journalism that{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#cd0442] via-[#f72e06] to-[#b10150] bg-clip-text text-transparent">
                  empowers
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#cd0442] via-[#f72e06] to-[#b10150] opacity-30 rounded-full" />
              </span>{" "}
              Maharashtra.
            </h1>

            <p className="text-[17px] md:text-[20px] leading-[1.7] text-gray-600 font-normal max-w-[680px]">
              We deliver accurate, concise, and impactful news to readers across the state — built from the ground up for speed, transparency, and digital-first clarity.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT US — Our Story
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start">
          {/* Left — label & headline */}
          <div className="lg:sticky lg:top-32">
            <Overline text="About Us" />
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#090909] tracking-[-0.025em] leading-[1.12] mb-6">
              Built on the foundation of truth
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#cd0442] to-[#f72e06] rounded-full" />
          </div>

          {/* Right — editorial body */}
          <div className="space-y-6">
            <p className="text-[17px] leading-[1.8] text-gray-600">
              Do Reports was born from a simple yet powerful idea — every citizen 
              of Maharashtra deserves access to reliable, unbiased, and timely news 
              in their own language.
            </p>
            <p className="text-[17px] leading-[1.8] text-gray-600">
              What started as a small digital initiative in the heart of Kalyan-Dombivli 
              has grown into one of the region&apos;s most trusted news platforms, serving 
              lakhs of Marathi-speaking readers across all 36 districts.
            </p>
            <p className="text-[17px] leading-[1.8] text-gray-600">
              Our reporters are embedded in the communities they cover — from KDMC 
              wards to state assembly corridors — giving voice to stories that matter 
              most to the people of Maharashtra. We go beyond headlines. We embrace 
              the digital era with a mobile-first approach, ensuring our news reaches 
              you wherever you are.
            </p>

            {/* Inline features */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { title: "Digital-First", desc: "Mobile-optimized news built for speed and clarity." },
                { title: "Community Voices", desc: "Stories rooted in the communities we serve." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-5 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors duration-300"
                >
                  <h4 className="text-[14px] font-bold text-[#090909] mb-1.5">{item.title}</h4>
                  <p className="text-[13px] leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Thin divider */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="h-px bg-gray-100" />
      </div>

      {/* ═══════════════════════════════════════════════════════
          OUR VISION
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Left — content */}
          <div>
            <Overline text="Our Vision" />
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#090909] tracking-[-0.025em] leading-[1.12] mb-8">
              Empowering every citizen through informed journalism
            </h2>
            <p className="text-[17px] leading-[1.8] text-gray-600 mb-8">
              We envision a Maharashtra where every citizen has access to truthful, 
              well-researched, and timely news — empowering them to make informed 
              decisions about their lives, their communities, and their democracy. 
              We strive to become the most trusted digital news platform in the 
              Marathi-speaking world.
            </p>

            <div className="space-y-4">
              {[
                "Democratize access to information",
                "Bridge the urban-rural news divide",
                "Champion grassroots local journalism",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <div className="w-6 h-6 rounded-full border-2 border-[#cd0442]/20 flex items-center justify-center group-hover:bg-[#cd0442] group-hover:border-[#cd0442] transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#cd0442] group-hover:bg-white transition-colors duration-300" />
                  </div>
                  <span className="text-[15px] font-medium text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — pull quote */}
          <div className="lg:mt-16">
            <div className="relative p-8 md:p-10 border-l-[3px] border-[#cd0442] bg-gray-50/60 rounded-r-2xl">
              <div className="text-[64px] leading-none text-[#cd0442]/10 font-serif absolute -top-4 left-4">&ldquo;</div>
              <p className="text-[20px] md:text-[22px] font-semibold text-[#090909] leading-[1.5] tracking-[-0.01em] relative z-10">
                A well-informed citizen is the strongest pillar of democracy.
              </p>
              <p className="text-[13px] text-gray-400 font-medium mt-4 uppercase tracking-wider">
                — Do Reports Editorial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR ETHOS — Full-width dark band
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#090909] text-white overflow-hidden">
        {/* Ambient light */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#cd0442] opacity-[0.04] blur-[160px]" />
        </div>

        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <OverlineDark text="Our Ethos" />
            <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-[-0.025em] leading-[1.12] mb-5">
              The principles that guide every story
            </h2>
            <p className="text-[16px] text-white/40 leading-relaxed max-w-[560px] mx-auto font-light">
              Every headline we write, every source we cite, and every story we 
              publish is held to these unwavering standards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
            {[
              {
                num: "01",
                title: "Truth Above All",
                desc: "We verify facts rigorously before publication. No sensationalism, no clickbait, no compromise.",
              },
              {
                num: "02",
                title: "People First",
                desc: "Our journalism centers the lives, concerns, and aspirations of ordinary citizens.",
              },
              {
                num: "03",
                title: "Radical Transparency",
                desc: "We openly share editorial processes and maintain clear boundaries between news, opinion, and ads.",
              },
              {
                num: "04",
                title: "Compassionate Reporting",
                desc: "We report with empathy — especially on stories involving vulnerable communities and victims.",
              },
              {
                num: "05",
                title: "Fearless Accountability",
                desc: "We hold the powerful accountable, asking the tough questions that matter to readers.",
              },
              {
                num: "06",
                title: "Inclusive Coverage",
                desc: "We represent all of Maharashtra — every district, every community, every voice.",
              },
            ].map((ethos) => (
              <div
                key={ethos.num}
                className="bg-[#090909] p-8 md:p-10 group hover:bg-white/[0.02] transition-colors duration-500"
              >
                <span className="text-[12px] font-mono font-bold text-[#f72e06]/50 tracking-wider mb-5 block">
                  {ethos.num}
                </span>
                <h3 className="text-[18px] font-bold text-white mb-3 tracking-[-0.01em]">
                  {ethos.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-white/40 font-light">
                  {ethos.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR CULTURE
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <Overline text="Our Culture" />
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#090909] tracking-[-0.025em] leading-[1.12] mb-6">
              Where passion meets purpose
            </h2>
            <p className="text-[17px] leading-[1.8] text-gray-600">
              Our newsroom is driven by curiosity, collaboration, and a deep 
              respect for the craft of journalism. We foster an environment where 
              bold ideas are welcomed and diverse perspectives are celebrated.
            </p>
          </div>

          {/* Right — numbered list */}
          <div className="space-y-0">
            {[
              {
                title: "Collaborative Newsroom",
                desc: "Reporters, editors, and designers work shoulder-to-shoulder in a fast-paced, idea-driven environment where the best story wins.",
              },
              {
                title: "Continuous Learning",
                desc: "From digital storytelling workshops to investigative journalism masterclasses — great journalism demands constant growth.",
              },
              {
                title: "Innovation at Heart",
                desc: "Multimedia storytelling, data-driven reports, and new formats — we constantly experiment to deliver news in the most engaging way.",
              },
              {
                title: "Work-Life Harmony",
                desc: "Great journalism comes from well-rested, inspired minds. We respect our team's time and encourage sustainable work.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="flex items-start gap-6 py-8 border-b border-gray-100 last:border-b-0 group"
              >
                <span className="text-[36px] md:text-[42px] font-extrabold text-gray-100 leading-none tracking-[-0.04em] group-hover:text-[#cd0442]/15 transition-colors duration-500 select-none shrink-0 w-14 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1">
                  <h4 className="text-[16px] font-bold text-[#090909] mb-2 group-hover:text-[#cd0442] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-[14px] leading-[1.7] text-gray-500 font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR MISSION — Cinematic banner
      ═══════════════════════════════════════════════════════ */}
      <section className="max-w-[1100px] mx-auto px-5 sm:px-8 pb-24 md:pb-32">
        <div className="relative overflow-hidden rounded-[20px] bg-[#090909] border border-white/[0.06]">
          {/* Ambient */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[30%] right-0 w-[50%] h-[80%] rounded-full bg-[#f72e06] opacity-[0.06] blur-[120px]" />
            <div className="absolute bottom-0 left-[10%] w-[40%] h-[50%] rounded-full bg-[#b10150] opacity-[0.05] blur-[100px]" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 text-center">
            <OverlineDark text="Our Mission" />
            <h2 className="text-[32px] md:text-[46px] font-extrabold text-white tracking-[-0.03em] leading-[1.1] mb-6 max-w-[700px] mx-auto">
              To deliver news that matters, when it matters most
            </h2>
            <p className="text-[16px] md:text-[17px] text-white/40 leading-[1.8] max-w-[580px] mx-auto mb-12 font-light">
              Empowering the people of Maharashtra with accurate, timely, and 
              meaningful coverage — from urban professionals to rural communities.
            </p>

            {/* Mission pillars */}
            <div className="grid sm:grid-cols-3 gap-px max-w-[600px] mx-auto bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.06]">
              {[
                { value: "Accuracy", sub: "Fact-checked reporting" },
                { value: "Speed", sub: "Real-time coverage" },
                { value: "Impact", sub: "Stories that create change" },
              ].map((pill) => (
                <div
                  key={pill.value}
                  className="bg-[#090909] px-6 py-7 text-center hover:bg-white/[0.02] transition-colors duration-300"
                >
                  <div className="text-[15px] font-bold text-white mb-1 tracking-[-0.01em]">
                    {pill.value}
                  </div>
                  <div className="text-[11px] text-white/30 font-medium uppercase tracking-wider">
                    {pill.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          JOIN US — Social Media
      ═══════════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">
            {/* Left */}
            <div className="lg:sticky lg:top-32">
              <Overline text="Join Us" />
              <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#090909] tracking-[-0.025em] leading-[1.12] mb-6">
                Be part of the conversation
              </h2>
              <p className="text-[17px] leading-[1.8] text-gray-600 mb-8">
                Follow us across platforms for breaking news, exclusive stories, 
                and behind-the-scenes updates. Help us build a more informed Maharashtra.
              </p>

              {/* CTA */}
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[14px] font-semibold text-[#090909] mb-1">
                  Have a news tip or story?
                </p>
                <p className="text-[13px] text-gray-500 mb-4">
                  Reach out to our editorial team — we&apos;d love to hear from you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#090909] text-white text-[13px] font-semibold rounded-lg hover:bg-[#cd0442] transition-colors duration-300"
                >
                  Contact Us
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right — social cards */}
            <div className="space-y-3">
              {[
                {
                  name: "Facebook",
                  handle: "@doreports",
                  desc: "Daily news updates, live coverage, and community discussions.",
                  icon: FacebookIcon,
                  color: "#1877F2",
                  href: "#",
                },
                {
                  name: "X (Twitter)",
                  handle: "@doreports26",
                  desc: "Breaking news alerts, quick takes, and real-time commentary.",
                  icon: XIcon,
                  color: "#090909",
                  href: "https://x.com/doreports26",
                },
                {
                  name: "Instagram",
                  handle: "@doreportsnews",
                  desc: "Visual stories, behind-the-scenes, and photo journalism.",
                  icon: InstagramIcon,
                  color: "#E4405F",
                  href: "https://www.instagram.com/doreportsnews",
                },
                {
                  name: "YouTube",
                  handle: "@doreports",
                  desc: "In-depth video reports, interviews, and documentary features.",
                  icon: YoutubeIcon,
                  color: "#FF0000",
                  href: "https://www.youtube.com/@doreports-i1z",
                },
                {
                  name: "WhatsApp",
                  handle: "Channel",
                  desc: "News delivered directly to your phone — join our channel.",
                  icon: WhatsappIcon,
                  color: "#25D366",
                  href: "#",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-5 rounded-xl border border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/50 transition-all duration-300"
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${social.color}0D` }}
                  >
                    <social.icon
                      className="w-5 h-5"
                      style={{ color: social.color }}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[15px] font-bold text-[#090909]">
                        {social.name}
                      </span>
                      <span
                        className="text-[12px] font-semibold"
                        style={{ color: social.color }}
                      >
                        {social.handle}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-400 leading-relaxed truncate">
                      {social.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#090909] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Reusable Sub-components ─────────────────────────────── */

function Overline({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-6 h-[2px] bg-[#cd0442] rounded-full" />
      <span className="text-[11px] font-bold text-[#cd0442] uppercase tracking-[0.2em]">
        {text}
      </span>
    </div>
  );
}

function OverlineDark({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span className="w-6 h-[2px] bg-[#f72e06]/40 rounded-full" />
      <span className="text-[11px] font-bold text-[#f72e06] uppercase tracking-[0.2em]">
        {text}
      </span>
      <span className="w-6 h-[2px] bg-[#f72e06]/40 rounded-full" />
    </div>
  );
}
