import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, Cookie, Users, Lock, Bell, Mail, FileText, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | थोडक्यात News",
  description:
    "Read the Privacy Policy of थोडक्यात (Thodkyaat) News. Learn how we collect, use, and protect your personal information when you visit our website.",
};

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "advertising", label: "Advertising" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  const effectiveDate = "August 28, 2026";
  const lastUpdated = "August 28, 2026";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#0B4A99] via-[#0d3d7a] to-[#091f3f] text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full bg-[#ffc20e] opacity-[0.04] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full bg-[#0B4A99] opacity-[0.08] blur-[80px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
          <div className="flex items-center gap-2 text-[13px] text-white/60 mb-6">
            <Link href="/" className="hover:text-[#ffc20e] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#ffc20e] font-medium">Privacy Policy</span>
          </div>

          <div className="flex items-start gap-5">
            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 items-center justify-center shrink-0">
              <Shield className="w-8 h-8 text-[#ffc20e]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                Privacy Policy
              </h1>
              <p className="text-white/70 text-[15px] max-w-2xl leading-relaxed">
                Your privacy is important to us. This policy explains how
                <span className="text-[#ffc20e] font-semibold"> थोडक्यात (Thodkyaat) </span>
                collects, uses, and safeguards your personal information when you visit our news platform.
              </p>
              <div className="flex flex-wrap gap-4 mt-5 text-[12px] text-white/50">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Effective Date: {effectiveDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Last Updated: {lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar / Table of Contents */}
          <aside className="lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-[80px]">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-gradient-to-r from-[#0B4A99] to-[#0d3d7a] text-white">
                  <h3 className="text-[14px] font-bold tracking-wide uppercase">
                    Table of Contents
                  </h3>
                </div>
                <nav className="p-3">
                  <ul className="flex flex-col gap-0.5">
                    {sections.map((section, i) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-[#0B4A99]/5 hover:text-[#0B4A99] transition-colors group"
                        >
                          <span className="w-6 h-6 rounded-md bg-gray-100 group-hover:bg-[#0B4A99]/10 flex items-center justify-center text-[11px] font-bold text-gray-400 group-hover:text-[#0B4A99] transition-colors">
                            {i + 1}
                          </span>
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="flex-1 min-w-0">
            <div className="prose prose-gray max-w-none">
              {/* Section 1: Introduction */}
              <section id="introduction" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Shield className="w-5 h-5" />} title="1. Introduction" />
                <div className="policy-content">
                  <p>
                    Welcome to <strong>थोडक्यात (Thodkyaat)</strong>, a digital news platform operated by{" "}
                    <strong>Implant Media Pvt. Ltd.</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are committed to
                    protecting and respecting your privacy in accordance with the{" "}
                    <strong>Information Technology Act, 2000</strong> and the{" "}
                    <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>{" "}
                    of India.
                  </p>
                  <p>
                    This Privacy Policy describes how we collect, use, process, disclose, and safeguard the information
                    you provide when you visit our website{" "}
                    <strong>thodkyaat.com</strong> (the &quot;Website&quot;) and any associated services, applications, or
                    content delivered by us (collectively, the &quot;Services&quot;).
                  </p>
                  <p>
                    By accessing or using our Services, you acknowledge that you have read, understood, and agree to be
                    bound by this Privacy Policy. If you do not agree with the terms outlined herein, please discontinue
                    use of our Services immediately.
                  </p>
                </div>
              </section>

              {/* Section 2: Information We Collect */}
              <section id="information-we-collect" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Eye className="w-5 h-5" />} title="2. Information We Collect" />
                <div className="policy-content">
                  <p>
                    We may collect and process the following categories of information when you interact with our
                    Services:
                  </p>

                  <h4 className="text-[16px] font-bold text-gray-800 mt-6 mb-3">
                    a) Information You Provide Directly
                  </h4>
                  <ul>
                    <li>
                      <strong>Contact Information:</strong> Name, email address, phone number, and other details you
                      submit when you contact us, subscribe to our newsletter, or participate in surveys.
                    </li>
                    <li>
                      <strong>Comments & Feedback:</strong> Information you provide when you post comments on articles,
                      submit feedback, or participate in interactive features.
                    </li>
                    <li>
                      <strong>Account Data:</strong> If you register for an account, we may collect your username,
                      password (stored in encrypted form), display name, and profile preferences.
                    </li>
                  </ul>

                  <h4 className="text-[16px] font-bold text-gray-800 mt-6 mb-3">
                    b) Information Collected Automatically
                  </h4>
                  <ul>
                    <li>
                      <strong>Device Information:</strong> IP address, browser type and version, operating system,
                      device type, screen resolution, and unique device identifiers.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> Pages visited, time spent on pages, clickstream data, referring/exit
                      pages, date and time of access, and scrolling behavior.
                    </li>
                    <li>
                      <strong>Location Data:</strong> Approximate geographic location derived from your IP address
                      (city or region level only; we do not track precise GPS location).
                    </li>
                    <li>
                      <strong>Log Data:</strong> Server logs that record requests made to our web servers, including
                      timestamps, URLs requested, and HTTP response codes.
                    </li>
                  </ul>

                  <h4 className="text-[16px] font-bold text-gray-800 mt-6 mb-3">
                    c) Information from Third-Party Sources
                  </h4>
                  <ul>
                    <li>
                      <strong>Social Media:</strong> If you interact with our content through third-party social media
                      platforms (Facebook, Instagram, X, YouTube), we may receive limited profile information in
                      accordance with your privacy settings on those platforms.
                    </li>
                    <li>
                      <strong>Analytics Providers:</strong> We receive aggregated data from analytics services about
                      traffic patterns and user demographics.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3: How We Use Your Information */}
              <section id="how-we-use" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Users className="w-5 h-5" />} title="3. How We Use Your Information" />
                <div className="policy-content">
                  <p>We use the collected information for the following purposes:</p>
                  <ul>
                    <li>
                      <strong>Content Delivery:</strong> To provide, personalize, and improve our news content and
                      editorial recommendations based on your reading habits and interests.
                    </li>
                    <li>
                      <strong>Communication:</strong> To send you breaking news alerts, newsletters, editorial updates,
                      and respond to your inquiries or support requests.
                    </li>
                    <li>
                      <strong>Analytics & Improvement:</strong> To analyze user behavior and traffic patterns, helping
                      us improve website functionality, user experience, and content strategy.
                    </li>
                    <li>
                      <strong>Advertising:</strong> To display relevant advertisements based on your interests and
                      browsing behavior, and to measure ad performance.
                    </li>
                    <li>
                      <strong>Security:</strong> To detect, prevent, and address technical issues, fraud, abuse, or
                      violations of our Terms of Service.
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes,
                      or governmental requests.
                    </li>
                    <li>
                      <strong>Research:</strong> To conduct editorial research, audience analysis, and internal
                      reporting to better serve our readers.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 4: Cookies & Tracking */}
              <section id="cookies" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Cookie className="w-5 h-5" />} title="4. Cookies & Tracking Technologies" />
                <div className="policy-content">
                  <p>
                    Our Website uses cookies and similar tracking technologies to enhance your browsing experience and
                    gather information about how you use our Services.
                  </p>

                  <h4 className="text-[16px] font-bold text-gray-800 mt-6 mb-3">Types of Cookies We Use</h4>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[14px] mt-4">
                      <thead>
                        <tr className="bg-[#0B4A99]/5">
                          <th className="text-left px-4 py-3 font-bold text-gray-800 border border-gray-200">
                            Cookie Type
                          </th>
                          <th className="text-left px-4 py-3 font-bold text-gray-800 border border-gray-200">
                            Purpose
                          </th>
                          <th className="text-left px-4 py-3 font-bold text-gray-800 border border-gray-200">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700 border border-gray-200">
                            Essential Cookies
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">
                            Necessary for website functionality, security, and session management
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">Session / 1 year</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-700 border border-gray-200">
                            Analytics Cookies
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">
                            Help us understand how visitors use the site (e.g., Google Analytics)
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">Up to 2 years</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-gray-700 border border-gray-200">
                            Advertising Cookies
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">
                            Used to deliver relevant ads and measure campaign effectiveness
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">Up to 2 years</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-700 border border-gray-200">
                            Preference Cookies
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">
                            Remember your preferences such as language and display settings
                          </td>
                          <td className="px-4 py-3 text-gray-600 border border-gray-200">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-4">
                    You can manage your cookie preferences through your browser settings. Please note that disabling
                    certain cookies may affect the functionality of our Website. Most browsers allow you to:
                  </p>
                  <ul>
                    <li>View what cookies are stored and delete them individually</li>
                    <li>Block third-party cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies</li>
                    <li>Delete all cookies when you close your browser</li>
                  </ul>
                </div>
              </section>

              {/* Section 5: Third-Party Services */}
              <section id="third-party" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Users className="w-5 h-5" />} title="5. Third-Party Services" />
                <div className="policy-content">
                  <p>
                    We may use the following third-party services that collect, monitor, and analyze user data. Each
                    service has its own privacy policy governing the use of your information:
                  </p>
                  <ul>
                    <li>
                      <strong>Google Analytics:</strong> Web analytics service that tracks and reports website traffic.
                      Google may use the data collected to contextualize and personalize ads in its own advertising
                      network.
                    </li>
                    <li>
                      <strong>Google AdSense / Ad Manager:</strong> Advertising services that may use cookies and web
                      beacons to serve ads based on your prior visits to our site or other websites.
                    </li>
                    <li>
                      <strong>Social Media Plugins:</strong> Buttons and widgets from Facebook, Instagram, X (Twitter),
                      YouTube, and WhatsApp that may collect your IP address, browser information, and set cookies to
                      enable the plugins to function properly.
                    </li>
                    <li>
                      <strong>CDN & Hosting Services:</strong> We use content delivery networks and cloud hosting
                      services that may process server-level data such as IP addresses and request headers.
                    </li>
                    <li>
                      <strong>Email Service Providers:</strong> For sending newsletters and notifications, we may use
                      third-party email services that track open rates, click-through rates, and subscriber engagement.
                    </li>
                  </ul>
                  <p>
                    We do not control these third-party services and are not responsible for their privacy practices. We
                    encourage you to review the privacy policies of any third-party service you interact with through
                    our Website.
                  </p>
                </div>
              </section>

              {/* Section 6: Advertising */}
              <section id="advertising" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Bell className="w-5 h-5" />} title="6. Advertising" />
                <div className="policy-content">
                  <p>
                    We may display advertisements on our Website through third-party advertising partners, including
                    but not limited to Google AdSense. These partners may use cookies and similar technologies to
                    collect information about your visits to our Website and other websites in order to serve
                    advertisements that are relevant to your interests.
                  </p>
                  <p>
                    <strong>Personalized Advertising:</strong> You may see ads tailored to your browsing behavior and
                    interests. You can opt out of personalized advertising by visiting:
                  </p>
                  <ul>
                    <li>
                      <strong>Google Ad Settings:</strong> <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#0B4A99] hover:underline">adssettings.google.com</a>
                    </li>
                    <li>
                      <strong>Network Advertising Initiative:</strong> <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-[#0B4A99] hover:underline">optout.networkadvertising.org</a>
                    </li>
                    <li>
                      <strong>Digital Advertising Alliance:</strong> <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#0B4A99] hover:underline">optout.aboutads.info</a>
                    </li>
                  </ul>
                  <p>
                    Please note that opting out of personalized advertising does not mean you will no longer see
                    advertisements on our Website; it means the ads you see will be less relevant to your interests.
                  </p>
                </div>
              </section>

              {/* Section 7: Data Security */}
              <section id="data-security" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Lock className="w-5 h-5" />} title="7. Data Security" />
                <div className="policy-content">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal
                    information against unauthorized access, alteration, disclosure, or destruction. These measures
                    include:
                  </p>
                  <ul>
                    <li>
                      <strong>Encryption:</strong> We use SSL/TLS encryption to protect data transmitted between your
                      browser and our servers.
                    </li>
                    <li>
                      <strong>Access Controls:</strong> Access to personal information is restricted to authorized
                      personnel who require it for legitimate business purposes.
                    </li>
                    <li>
                      <strong>Regular Audits:</strong> We conduct periodic security reviews and vulnerability
                      assessments to maintain data integrity.
                    </li>
                    <li>
                      <strong>Secure Infrastructure:</strong> Our systems are hosted on secure cloud infrastructure
                      with industry-standard firewalls and intrusion detection systems.
                    </li>
                  </ul>
                  <p>
                    However, no method of transmission over the Internet or method of electronic storage is 100%
                    secure. While we strive to use commercially acceptable means to protect your personal information,
                    we cannot guarantee its absolute security. In the event of a data breach, we will notify affected
                    users and relevant authorities as required by applicable law.
                  </p>
                </div>
              </section>

              {/* Section 8: Your Rights */}
              <section id="your-rights" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Users className="w-5 h-5" />} title="8. Your Rights" />
                <div className="policy-content">
                  <p>
                    Depending on your jurisdiction, you may have the following rights regarding your personal
                    information:
                  </p>
                  <ul>
                    <li>
                      <strong>Right to Access:</strong> You have the right to request a copy of the personal
                      information we hold about you.
                    </li>
                    <li>
                      <strong>Right to Correction:</strong> You can request that we correct any inaccurate or
                      incomplete personal information.
                    </li>
                    <li>
                      <strong>Right to Deletion:</strong> You may request the deletion of your personal information,
                      subject to certain legal exceptions and retention requirements.
                    </li>
                    <li>
                      <strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may
                      withdraw consent at any time without affecting the lawfulness of prior processing.
                    </li>
                    <li>
                      <strong>Right to Object:</strong> You may object to the processing of your personal data for
                      direct marketing purposes.
                    </li>
                    <li>
                      <strong>Right to Data Portability:</strong> You may request that we provide your personal data in
                      a structured, commonly used, and machine-readable format.
                    </li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the details provided in the &quot;Contact
                    Us&quot; section below. We will respond to your request within 30 business days.
                  </p>
                </div>
              </section>

              {/* Section 9: Children's Privacy */}
              <section id="children" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Shield className="w-5 h-5" />} title="9. Children's Privacy" />
                <div className="policy-content">
                  <p>
                    Our Services are intended for general audiences and are not directed at children under the age of
                    13. We do not knowingly collect personal information from children under 13. If we become aware that
                    we have inadvertently collected personal information from a child under 13, we will take immediate
                    steps to delete such information from our records.
                  </p>
                  <p>
                    If you are a parent or guardian and believe that your child has provided us with personal
                    information, please contact us immediately so that we can take appropriate action.
                  </p>
                </div>
              </section>

              {/* Section 10: Changes to This Policy */}
              <section id="changes" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<FileText className="w-5 h-5" />} title="10. Changes to This Policy" />
                <div className="policy-content">
                  <p>
                    We reserve the right to update or modify this Privacy Policy at any time. When we make changes, we
                    will:
                  </p>
                  <ul>
                    <li>
                      Update the &quot;Last Updated&quot; date at the top of this page.
                    </li>
                    <li>
                      Post the revised policy on our Website with clear indication of the changes made.
                    </li>
                    <li>
                      For material changes, we may notify you through a prominent notice on our Website or via email
                      (if you have subscribed to our communications).
                    </li>
                  </ul>
                  <p>
                    Your continued use of our Services after any modifications to this Privacy Policy constitutes your
                    acceptance of the updated terms. We encourage you to review this page periodically to stay informed
                    about how we protect your information.
                  </p>
                </div>
              </section>

              {/* Section 11: Contact Us */}
              <section id="contact" className="mb-8 scroll-mt-24">
                <SectionHeading icon={<Mail className="w-5 h-5" />} title="11. Contact Us" />
                <div className="policy-content">
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                    practices, please contact us:
                  </p>

                  <div className="bg-gradient-to-br from-[#0B4A99]/5 to-[#ffc20e]/5 border border-[#0B4A99]/10 rounded-xl p-6 mt-4">
                    <div className="flex flex-col gap-3 text-[14px]">
                      <div>
                        <span className="font-bold text-gray-800">Company:</span>{" "}
                        <span className="text-gray-600">Implant Media Pvt. Ltd.</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">Website:</span>{" "}
                        <span className="text-gray-600">थोडक्यात (Thodkyaat)</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">Email:</span>{" "}
                        <a
                          href="mailto:contact@thodkyaat.com"
                          className="text-[#0B4A99] hover:underline"
                        >
                          contact@thodkyaat.com
                        </a>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">Address:</span>{" "}
                        <span className="text-gray-600">Maharashtra, India</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-[13px] text-gray-500 italic">
                    We are committed to resolving any privacy-related complaints and will work with you to address your
                    concerns in a timely and appropriate manner.
                  </p>
                </div>
              </section>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

/* Reusable section heading component */
function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-[#0B4A99]/10">
      <div className="w-10 h-10 rounded-xl bg-[#0B4A99]/10 flex items-center justify-center text-[#0B4A99]">
        {icon}
      </div>
      <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 tracking-tight">{title}</h2>
    </div>
  );
}
