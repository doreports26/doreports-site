import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Scale,
  FileText,
  Globe,
  ExternalLink,
  ShieldAlert,
  MessageSquare,
  PenTool,
  Gavel,
  ChevronRight,
  Mail,
  Clock,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer | Do Reports",
  description:
    "Read the Disclaimer of Do Reports. Understand the terms regarding the use of information published on our news website.",
};

const sections = [
  { id: "general", label: "General Disclaimer" },
  { id: "editorial", label: "Editorial & News Content" },
  { id: "accuracy", label: "Accuracy of Information" },
  { id: "opinions", label: "Opinions & Views" },
  { id: "external-links", label: "External Links" },
  { id: "professional-advice", label: "Not Professional Advice" },
  { id: "sponsored", label: "Sponsored Content" },
  { id: "user-content", label: "User-Generated Content" },
  { id: "copyright", label: "Copyright & Intellectual Property" },
  { id: "media", label: "Images & Multimedia" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "governing-law", label: "Governing Law" },
  { id: "changes", label: "Changes to Disclaimer" },
  { id: "contact", label: "Contact Us" },
];

export default function DisclaimerPage() {
  const effectiveDate = "August 28, 2026";
  const lastUpdated = "August 28, 2026";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#1c1e29] via-[#15171f] to-[#0a0a0f] text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-[60%] h-[60%] rounded-full bg-[#f58220] opacity-[0.04] blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full bg-[#ffc20e] opacity-[0.06] blur-[80px]" />
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
            <span className="text-[#ffc20e] font-medium">Disclaimer</span>
          </div>

          <div className="flex items-start gap-5">
            <div className="hidden md:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 items-center justify-center shrink-0">
              <AlertTriangle className="w-8 h-8 text-[#ffc20e]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                Disclaimer
              </h1>
              <p className="text-white/70 text-[15px] max-w-2xl leading-relaxed">
                Please read this disclaimer carefully before using the{" "}
                <span className="text-[#ffc20e] font-semibold">Do Reports</span> website.
                By accessing and using our Services, you acknowledge and accept the terms outlined below.
              </p>
              <div className="flex flex-wrap gap-4 mt-5 text-[12px] text-white/50">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Effective Date: {effectiveDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Last Updated: {lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice Banner */}
      <div className="bg-[#ffc20e]/10 border-b border-[#ffc20e]/20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#f58220] shrink-0 mt-0.5" />
            <p className="text-[13px] text-gray-700 leading-relaxed">
              <strong className="text-gray-900">Important:</strong> The information provided on this website is for
              general informational purposes only. All news, articles, and content are published in good faith.{" "}
              <strong>Do Reports</strong> makes no representations or warranties of any kind about the
              completeness, accuracy, reliability, or availability of the information.
            </p>
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
                <div className="px-5 py-4 bg-gradient-to-r from-[#1c1e29] to-[#15171f] text-white">
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
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-[#f58220]/5 hover:text-[#f58220] transition-colors group"
                        >
                          <span className="w-6 h-6 rounded-md bg-gray-100 group-hover:bg-[#f58220]/10 flex items-center justify-center text-[11px] font-bold text-gray-400 group-hover:text-[#f58220] transition-colors">
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
              {/* Section 1: General Disclaimer */}
              <section id="general" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<AlertTriangle className="w-5 h-5" />} title="1. General Disclaimer" />
                <div className="policy-content">
                  <p>
                    The information contained on the <strong>Do Reports</strong> website, operated by{" "}
                    <strong>Do Reports</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), is provided for
                    general informational and news purposes only. All news articles, reports, features, editorials, and
                    any other content published on this website are offered on an &quot;as is&quot; and &quot;as available&quot; basis.
                  </p>
                  <p>
                    While we strive to provide accurate, up-to-date, and reliable information, we make no
                    representations or warranties of any kind, express or implied, about the completeness, accuracy,
                    reliability, suitability, or availability with respect to the website or the information, products,
                    services, or related graphics contained on the website for any purpose.
                  </p>
                  <p>
                    Any reliance you place on such information is therefore strictly at your own risk. In no event will
                    we be liable for any loss or damage including, without limitation, indirect or consequential loss or
                    damage, or any loss or damage whatsoever arising from the use of, or loss of use of, data or
                    profits arising out of, or in connection with, the use of this website.
                  </p>
                </div>
              </section>

              {/* Section 2: Editorial & News Content */}
              <section id="editorial" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<PenTool className="w-5 h-5" />} title="2. Editorial & News Content" />
                <div className="policy-content">
                  <p>
                    Do Reports is a news and media platform that publishes news articles, breaking news alerts,
                    investigative reports, opinion pieces, feature stories, and editorial content covering topics
                    including but not limited to:
                  </p>
                  <ul>
                    <li>Local news from Kalyan-Dombivli (KDMC) and surrounding regions</li>
                    <li>Maharashtra state politics and governance</li>
                    <li>National and international affairs</li>
                    <li>Education, welfare, and social development</li>
                    <li>Entertainment, sports, and lifestyle</li>
                    <li>Business, economy, and market trends</li>
                  </ul>

                  <p>
                    Our editorial team follows journalistic standards to verify facts and sources. However, in the
                    fast-paced nature of news reporting:
                  </p>
                  <ul>
                    <li>
                      <strong>Breaking news</strong> may be published based on preliminary information and updated as
                      more details become available.
                    </li>
                    <li>
                      <strong>Sources</strong> may provide information that is later corrected or retracted. We publish
                      corrections and clarifications promptly when errors are identified.
                    </li>
                    <li>
                      <strong>Headlines and summaries</strong> are written for brevity and may not capture the full
                      nuance of a story. Readers are encouraged to read the complete article.
                    </li>
                    <li>
                      <strong>Translations</strong> between English and Marathi may involve editorial judgment, and
                      nuances of the original language may not always be fully preserved.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Accuracy of Information */}
              <section id="accuracy" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Scale className="w-5 h-5" />} title="3. Accuracy of Information" />
                <div className="policy-content">
                  <p>
                    We take reasonable efforts to ensure the accuracy of information published on our website. However:
                  </p>
                  <ul>
                    <li>
                      News stories and data such as <strong>gold rates, stock prices, weather forecasts, election
                      results, government schemes, and lottery results</strong> are sourced from third-party providers
                      and official announcements. We cannot guarantee their accuracy at the time of reading as such
                      data may change rapidly.
                    </li>
                    <li>
                      Statistical data, dates, names, designations, and figures are reported based on available
                      sources. Human error in transcription or translation is possible despite our best efforts.
                    </li>
                    <li>
                      <strong>Archived content</strong> may not reflect the most current situation or developments.
                      Readers should verify time-sensitive information from official and authoritative sources.
                    </li>
                    <li>
                      We do not warrant that the website will be error-free, uninterrupted, or free of viruses or other
                      harmful components.
                    </li>
                  </ul>

                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mt-4">
                    <p className="text-[14px] text-amber-800 font-medium mb-1">⚠️ Note on Financial Information</p>
                    <p className="text-[13px] text-amber-700">
                      Any financial data, including gold rates, share prices, mutual fund values, or cryptocurrency
                      prices mentioned on this website, is for informational purposes only and should not be treated as
                      financial or investment advice. Always consult a qualified financial advisor before making
                      investment decisions.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Opinions & Views */}
              <section id="opinions" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<MessageSquare className="w-5 h-5" />} title="4. Opinions & Views" />
                <div className="policy-content">
                  <p>
                    Our website may feature opinion columns, editorials, guest articles, expert commentary, and analysis
                    pieces. Please note:
                  </p>
                  <ul>
                    <li>
                      <strong>Opinions expressed by columnists, contributors, and guest writers</strong> are their own
                      and do not necessarily reflect the editorial position, views, or policies of Do Reports.
                    </li>
                    <li>
                      <strong>Editorial opinions</strong> marked as such represent the collective view of our editorial
                      board and are clearly distinguished from news reporting.
                    </li>
                    <li>
                      <strong>Expert analysis and commentary</strong> are provided for context and perspective. They
                      should not be treated as definitive conclusions or professional advice.
                    </li>
                    <li>
                      <strong>Quotes and statements</strong> attributed to public figures, officials, or other
                      individuals are reported as received and may represent their personal views.
                    </li>
                  </ul>
                  <p>
                    We respect the diversity of viewpoints and encourage constructive discourse. The publication of any
                    opinion does not constitute endorsement by the Company.
                  </p>
                </div>
              </section>

              {/* Section 5: External Links */}
              <section id="external-links" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<ExternalLink className="w-5 h-5" />} title="5. External Links" />
                <div className="policy-content">
                  <p>
                    Our website may contain links to third-party websites, platforms, and resources that are not owned
                    or controlled by us. These links are provided for your convenience and informational purposes only.
                  </p>
                  <ul>
                    <li>
                      We have <strong>no control over the content, privacy policies, or practices</strong> of any
                      third-party websites and assume no responsibility for them.
                    </li>
                    <li>
                      The inclusion of any link does not imply our <strong>endorsement, recommendation, or
                      approval</strong> of the linked website, its content, or its operators.
                    </li>
                    <li>
                      We are not liable for any damage or loss caused or alleged to be caused by or in connection with
                      the use of or reliance on any content, goods, or services available on or through any linked
                      third-party site.
                    </li>
                    <li>
                      External links may become broken or outdated over time. We do not guarantee that all external
                      links will be functional at all times.
                    </li>
                  </ul>
                  <p>
                    We strongly advise you to read the terms and conditions and privacy policies of any third-party
                    websites that you visit through links on our platform.
                  </p>
                </div>
              </section>

              {/* Section 6: Not Professional Advice */}
              <section id="professional-advice" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<ShieldAlert className="w-5 h-5" />} title="6. Not Professional Advice" />
                <div className="policy-content">
                  <p>
                    The content on this website is published for general informational and news reporting purposes. It
                    should <strong>not</strong> be construed as:
                  </p>
                  <ul>
                    <li>
                      <strong>Legal Advice:</strong> News about laws, court judgments, government orders, or legal
                      developments is for awareness only. Consult a qualified legal professional for advice specific to
                      your situation.
                    </li>
                    <li>
                      <strong>Financial or Investment Advice:</strong> Reports on stock markets, gold rates, real
                      estate, or government schemes do not constitute investment recommendations. Seek advice from
                      certified financial planners or advisors.
                    </li>
                    <li>
                      <strong>Medical or Health Advice:</strong> Health-related news or articles are informational and
                      should not replace professional medical consultation. Always seek the advice of qualified health
                      providers.
                    </li>
                    <li>
                      <strong>Tax or Accounting Advice:</strong> Coverage of tax policies, budget announcements, or
                      fiscal measures is for news purposes only. Consult a chartered accountant or tax professional.
                    </li>
                    <li>
                      <strong>Educational or Career Guidance:</strong> News about admissions, exam results, or
                      educational policies is reported for awareness. Verify details from official educational
                      institutions and boards.
                    </li>
                  </ul>
                  <p>
                    Readers should always seek appropriate professional counsel before taking any action based on the
                    information published on this website.
                  </p>
                </div>
              </section>

              {/* Section 7: Sponsored Content */}
              <section id="sponsored" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Globe className="w-5 h-5" />} title="7. Sponsored & Advertorial Content" />
                <div className="policy-content">
                  <p>
                    Our website may contain sponsored articles, advertorials, promotional content, or paid
                    partnerships. Such content will be clearly marked with labels such as &quot;Sponsored&quot;,
                    &quot;Advertorial&quot;, &quot;Promoted&quot;, or &quot;Paid Partnership&quot;.
                  </p>
                  <ul>
                    <li>
                      <strong>Sponsored content</strong> represents the views and messaging of the sponsoring entity
                      and does not necessarily reflect our editorial views.
                    </li>
                    <li>
                      We strive to ensure that sponsored content is clearly distinguishable from our editorial content,
                      but readers should exercise their own judgment.
                    </li>
                    <li>
                      Any claims, offers, or representations made in sponsored content are the sole responsibility of
                      the advertiser. We are not liable for any issues arising from advertised products or services.
                    </li>
                    <li>
                      Display advertisements, banner ads, and programmatic ads are served by third-party ad networks
                      and do not constitute our endorsement of the advertised products or services.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 8: User-Generated Content */}
              <section id="user-content" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<MessageSquare className="w-5 h-5" />} title="8. User-Generated Content" />
                <div className="policy-content">
                  <p>
                    Our website may allow users to post comments, feedback, and other user-generated content. Regarding
                    such content:
                  </p>
                  <ul>
                    <li>
                      <strong>Views expressed in user comments</strong> are solely those of the individual users and do
                      not represent our views, opinions, or editorial position.
                    </li>
                    <li>
                      We <strong>do not pre-screen all user content</strong> but reserve the right to remove, edit, or
                      refuse to publish any content that violates our community guidelines, is defamatory, abusive,
                      obscene, or otherwise objectionable.
                    </li>
                    <li>
                      Users are solely responsible for the content they post and may be held legally liable for comments
                      that are defamatory, infringing, or unlawful.
                    </li>
                    <li>
                      By posting content on our platform, you grant us a non-exclusive, royalty-free, worldwide license
                      to use, reproduce, modify, and display your content in connection with our Services.
                    </li>
                  </ul>
                  <p>
                    If you believe any user-generated content on our website infringes your rights or is otherwise
                    objectionable, please contact us for prompt review and appropriate action.
                  </p>
                </div>
              </section>

              {/* Section 9: Copyright & Intellectual Property */}
              <section id="copyright" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<FileText className="w-5 h-5" />} title="9. Copyright & Intellectual Property" />
                <div className="policy-content">
                  <p>
                    All content on this website, including but not limited to text, articles, graphics, logos,
                    photographs, videos, audio clips, icons, software, and overall design, is the property of{" "}
                    <strong>Do Reports</strong> or its content suppliers and is protected by Indian and
                    international copyright, trademark, and intellectual property laws.
                  </p>
                  <ul>
                    <li>
                      <strong>Unauthorized reproduction, distribution, modification, or republication</strong> of any
                      content from this website without prior written consent is strictly prohibited.
                    </li>
                    <li>
                      You may share links to our articles on social media platforms and personal communications,
                      provided proper attribution is given to Do Reports.
                    </li>
                    <li>
                      <strong>Fair use</strong> excerpts (brief quotes with proper attribution and a link to the
                      original article) are permitted for commentary, criticism, and news reporting purposes.
                    </li>
                    <li>
                      Systematic scraping, automated data collection, or bulk downloading of content from this website
                      is expressly prohibited.
                    </li>
                    <li>
                      Our brand name &quot;Do Reports&quot;, logo, and associated visual identity are trademarks of Do Reports
                      and may not be used without written authorization.
                    </li>
                  </ul>
                  <p>
                    If you believe your copyrighted work has been used on our website without authorization, please
                    contact us with the relevant details for prompt investigation.
                  </p>
                </div>
              </section>

              {/* Section 10: Images & Multimedia */}
              <section id="media" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Globe className="w-5 h-5" />} title="10. Images & Multimedia" />
                <div className="policy-content">
                  <p>Images, photographs, and multimedia content used on this website may include:</p>
                  <ul>
                    <li>
                      <strong>Original content</strong> created by our editorial and photography team.
                    </li>
                    <li>
                      <strong>Licensed content</strong> from stock photo agencies and wire services, used under
                      appropriate licenses.
                    </li>
                    <li>
                      <strong>Public domain or Creative Commons content</strong> used with proper attribution as
                      required by the respective licenses.
                    </li>
                    <li>
                      <strong>User-submitted content</strong> published with the submitter&apos;s consent and proper credit.
                    </li>
                    <li>
                      <strong>Screenshots, social media embeds, and press releases</strong> used for news reporting
                      purposes under fair use/fair dealing provisions.
                    </li>
                  </ul>
                  <p>
                    If you are the owner or authorized representative of any image or multimedia content used on our
                    website and believe it has been used without proper authorization or attribution, please contact us
                    immediately. We will promptly investigate and take appropriate action, including removal or proper
                    credit, as warranted.
                  </p>
                </div>
              </section>

              {/* Section 11: Limitation of Liability */}
              <section id="liability" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<ShieldAlert className="w-5 h-5" />} title="11. Limitation of Liability" />
                <div className="policy-content">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-4">
                    <p className="text-[14px] text-red-800 font-medium mb-1">⚠️ Important Legal Notice</p>
                    <p className="text-[13px] text-red-700">
                      Please read this section carefully as it limits the liability of Do Reports and its
                      affiliates.
                    </p>
                  </div>

                  <p>
                    To the fullest extent permitted by applicable law, Do Reports, its directors, officers,
                    employees, agents, contributors, and affiliated entities shall not be liable for:
                  </p>
                  <ul>
                    <li>
                      Any <strong>direct, indirect, incidental, special, consequential, or punitive damages</strong>{" "}
                      arising out of or relating to your use of, or inability to use, the website or its content.
                    </li>
                    <li>
                      Any <strong>errors, omissions, or inaccuracies</strong> in the content, regardless of the cause,
                      including but not limited to technical errors, typographical mistakes, or outdated information.
                    </li>
                    <li>
                      Any <strong>personal injury, property damage, or financial loss</strong> resulting from your
                      access to or use of our website.
                    </li>
                    <li>
                      Any <strong>unauthorized access to or use of our servers</strong> and/or any personal or financial
                      information stored therein.
                    </li>
                    <li>
                      Any <strong>interruption or cessation of transmission</strong> to or from our website.
                    </li>
                    <li>
                      Any <strong>bugs, viruses, or trojan horses</strong> that may be transmitted to or through our
                      website by any third party.
                    </li>
                    <li>
                      Any <strong>actions taken or decisions made</strong> based on the information or content available
                      on this website.
                    </li>
                  </ul>
                  <p>
                    This limitation of liability applies whether the alleged liability is based on contract, tort,
                    negligence, strict liability, or any other basis, even if we have been advised of the possibility of
                    such damage.
                  </p>
                </div>
              </section>

              {/* Section 12: Indemnification */}
              <section id="indemnification" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Scale className="w-5 h-5" />} title="12. Indemnification" />
                <div className="policy-content">
                  <p>
                    You agree to indemnify, defend, and hold harmless Do Reports, its directors, officers,
                    employees, agents, and affiliates from and against any and all claims, damages, obligations, losses,
                    liabilities, costs, and expenses (including but not limited to attorney&apos;s fees) arising from:
                  </p>
                  <ul>
                    <li>Your use of and access to our website and Services.</li>
                    <li>Your violation of any terms outlined in this Disclaimer.</li>
                    <li>Your violation of any third-party right, including any copyright, property, or privacy right.</li>
                    <li>
                      Any claim that content you submitted caused damage to a third party.
                    </li>
                  </ul>
                  <p>
                    This defense and indemnification obligation will survive the termination of your use of the website
                    and these terms.
                  </p>
                </div>
              </section>

              {/* Section 13: Governing Law */}
              <section id="governing-law" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<Gavel className="w-5 h-5" />} title="13. Governing Law & Jurisdiction" />
                <div className="policy-content">
                  <p>
                    This Disclaimer and any disputes arising out of or relating to it shall be governed by and construed
                    in accordance with the <strong>laws of India</strong>, without regard to conflict of law principles.
                  </p>
                  <p>
                    Any legal action, suit, or proceeding arising out of or relating to this Disclaimer or the use of
                    our website shall be instituted exclusively in the courts located in{" "}
                    <strong>Mumbai, Maharashtra, India</strong>, and you consent to the personal jurisdiction of such
                    courts. You waive any objection to venue or jurisdiction in such courts.
                  </p>
                  <p>
                    If any provision of this Disclaimer is found to be invalid or unenforceable by a court of competent
                    jurisdiction, the remaining provisions shall continue in full force and effect.
                  </p>
                </div>
              </section>

              {/* Section 14: Changes to Disclaimer */}
              <section id="changes" className="mb-12 scroll-mt-24">
                <SectionHeading icon={<FileText className="w-5 h-5" />} title="14. Changes to This Disclaimer" />
                <div className="policy-content">
                  <p>
                    We reserve the right to modify, update, or replace any part of this Disclaimer at our sole
                    discretion and at any time. Changes will be effective immediately upon posting on this page.
                  </p>
                  <ul>
                    <li>
                      The &quot;Last Updated&quot; date at the top of this page will reflect the most recent revision.
                    </li>
                    <li>
                      We may, but are not obligated to, notify users of material changes through website announcements
                      or other communication channels.
                    </li>
                    <li>
                      Your continued use of the website after any changes constitutes your acceptance of the revised
                      Disclaimer.
                    </li>
                  </ul>
                  <p>
                    We recommend reviewing this Disclaimer periodically to stay informed of any updates or changes.
                  </p>
                </div>
              </section>

              {/* Section 15: Contact Us */}
              <section id="contact" className="mb-8 scroll-mt-24">
                <SectionHeading icon={<Mail className="w-5 h-5" />} title="15. Contact Us" />
                <div className="policy-content">
                  <p>
                    If you have any questions, concerns, or require clarification regarding this Disclaimer, or if you
                    believe any content on our website is inaccurate, infringes your rights, or requires correction,
                    please contact us:
                  </p>

                  <div className="bg-gradient-to-br from-[#1c1e29]/5 to-[#f58220]/5 border border-gray-200 rounded-xl p-6 mt-4">
                    <div className="flex flex-col gap-3 text-[14px]">
                      <div>
                        <span className="font-bold text-gray-800">Company:</span>{" "}
                        <span className="text-gray-600">Do Reports</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">Website:</span>{" "}
                        <span className="text-gray-600">Do Reports</span>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">Email:</span>{" "}
                        <a
                          href="mailto:contact@doreports.in"
                          className="text-[#cd0442] hover:underline font-semibold"
                        >
                          contact@doreports.in
                        </a>
                      </div>
                      <div>
                        <span className="font-bold text-gray-800">Address:</span>{" "}
                        <span className="text-gray-600">Maharashtra, India</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-[13px] text-gray-500 italic">
                    We value feedback from our readers and are committed to maintaining the highest standards of
                    journalistic integrity. Every concern brought to our attention is taken seriously and addressed
                    promptly.
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
    <div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-[#f58220]/20">
      <div className="w-10 h-10 rounded-xl bg-[#f58220]/10 flex items-center justify-center text-[#f58220]">
        {icon}
      </div>
      <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 tracking-tight">{title}</h2>
    </div>
  );
}
