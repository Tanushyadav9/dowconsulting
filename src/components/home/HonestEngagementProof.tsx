import Link from "next/link";
import {
  FileText,
  Workflow,
  ClipboardList,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Search,
  Users,
  Award,
  Layers,
  Clock,
  Lock,
} from "lucide-react";

export function HonestEngagementProof() {
  const workflowStages = [
    {
      step: "01",
      title: "Information Collection",
      leadRole: "Information Coordinator",
      description:
        "Structured intake capture covering enterprise profile, business stage, operational parameters, and founder briefs. All materials held under strict confidentiality.",
    },
    {
      step: "02",
      title: "Market & Field Research",
      leadRole: "Research Analyst",
      description:
        "Secondary research, competitive benchmarking, category dynamics, and channel structure analysis tailored to your industry sector.",
    },
    {
      step: "03",
      title: "Strategic Consultation",
      leadRole: "Consulting Specialist & Lead Advisor",
      description:
        "Direct consultation to evaluate strategic options, review findings, test assumptions, and align on actionable priorities.",
    },
    {
      step: "04",
      title: "Report Preparation",
      leadRole: "Consulting Team",
      description:
        "Drafting the comprehensive written diagnostic deliverable, synthesizing research observations into clear strategic roadmaps.",
    },
    {
      step: "05",
      title: "Owner Review & Approval",
      leadRole: "Niraj Kumar (Lead Strategic Advisor)",
      description:
        "Mandatory quality review gate. Niraj Kumar reviews all analytical findings and strategic recommendations before client dispatch.",
    },
    {
      step: "06",
      title: "Delivered to Client",
      leadRole: "Client Deliverables Vault",
      description:
        "Deliverable released directly into the private client portal with secure download and post-delivery debrief coordination.",
    },
  ];

  const deliverableHeadings = [
    {
      module: "Section 1",
      heading: "Executive Advisory Summary",
      subheadings: [
        "Core engagement brief & strategic context",
        "Key diagnostic findings & critical observations",
        "Strategic priority matrix",
      ],
    },
    {
      module: "Section 2",
      heading: "Market Landscape & Category Dynamics",
      subheadings: [
        "Sector macro-environment & relevant trends",
        "Competitive landscape & alternative positioning",
        "Identified market entry or expansion barriers",
      ],
    },
    {
      module: "Section 3",
      heading: "Target Customer Segmentation & Value Proposition",
      subheadings: [
        "Ideal customer profiles (ICP) & decision drivers",
        "Value positioning relative to competing alternatives",
        "Pricing & unit-economic feasibility review",
      ],
    },
    {
      module: "Section 4",
      heading: "Go-to-Market & Channel Architecture",
      subheadings: [
        "Recommended primary and secondary distribution channels",
        "Sales sequencing & partner enablement outline",
        "Customer acquisition model & touchpoints",
      ],
    },
    {
      module: "Section 5",
      heading: "Operational, Regulatory & Execution Risks",
      subheadings: [
        "Operational scaling bottlenecks & supply dependencies",
        "Statutory, regulatory, or licensing considerations",
        "Risk mitigation & contingency recommendations",
      ],
    },
    {
      module: "Section 6",
      heading: "Phased Implementation Roadmap & Next Steps",
      subheadings: [
        "Phase-gated 30-60-90 day milestone milestones",
        "Resource allocation & key personnel requirements",
        "Immediate operational actions for founder leadership",
      ],
    },
  ];

  const intakeRequirements = [
    {
      title: "1. Enterprise Profile & Business Stage",
      desc: "Current stage (idea, early-stage, or operating), industry domain, team size, and operating setup.",
    },
    {
      title: "2. Strategic Scope & Focus Service",
      desc: "Specific service requirement (GTM Strategy, Market Research, Expansion Strategy, or New Business Start).",
    },
    {
      title: "3. Primary Objectives & Challenges",
      desc: "The critical bottlenecks, growth targets, or strategic questions you need addressed.",
    },
    {
      title: "4. Geographic Coordinates & Market Focus",
      desc: "Target cities, regions, or customer segments of strategic interest.",
    },
    {
      title: "5. Operational & Commercial Context",
      desc: "Current capacity, sales channels, known competitors, and available capital runway where applicable.",
    },
    {
      title: "6. Scheduling & Contact Preferences",
      desc: "WhatsApp or Google Meet preference, preferred timeline urgency, and designated coordinator contact.",
    },
  ];

  return (
    <div className="space-y-20">
      {/* 1. How an Engagement Works (Matching Section 3 Case Workflow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#111B27] border border-[#C9A24B]/30 text-xs text-[#C9A24B] font-bold uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5" />
            <span>Advisory Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
            How an Engagement Works
          </h2>
          <p className="text-sm text-[#5A6472] leading-relaxed">
            Every client engagement follows a structured 6-stage operational workflow. Different specialists handle information collection, market research, and consultation under the supervision of Niraj Kumar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowStages.map((stage) => (
            <div
              key={stage.step}
              className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E8F0] shadow-sm hover:border-[#1B2838] transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#C9A24B] tracking-tight">
                    {stage.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#F7F6F3] text-[#1B2838] border border-[#E2E8F0]">
                    {stage.leadRole}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#1B2838]">{stage.title}</h3>
                <p className="text-xs text-[#5A6472] leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F7F6F3] flex items-center gap-1.5 text-[11px] text-[#8C96A5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>Tracked in client portal &amp; audit log</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Sample Deliverable Outline (Illustrative Report Structure) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111B27] border border-[#2A3D54] rounded-2xl p-8 sm:p-12 text-[#F7F6F3] shadow-xl space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A3D54] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1B2838] border border-[#2A3D54] text-[10px] font-bold uppercase tracking-wider text-[#C9A24B]">
                <FileText className="w-3.5 h-3.5" />
                <span>Illustrative Report Structure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F6F3]">
                Sample Deliverable Outline
              </h2>
              <p className="text-xs sm:text-sm text-[#8C96A5] leading-relaxed">
                The typical structure of a DOW Consulting written strategic deliverable. Each deliverable is customized to the specific client engagement, industry sector, and enterprise stage.
              </p>
            </div>

            <div className="p-3 bg-[#1B2838] border border-[#2A3D54] rounded text-[11px] text-[#C9A24B] max-w-xs shrink-0">
              <strong>Compliance Notice:</strong> Illustrative outline for reference only. Contains zero company names, figures, financial metrics, or outcome claims.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverableHeadings.map((item) => (
              <div
                key={item.module}
                className="bg-[#1B2838] border border-[#2A3D54] rounded-xl p-6 space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-[#8C96A5]">
                  <span className="font-bold text-[#C9A24B] uppercase tracking-wider">
                    {item.module}
                  </span>
                  <span>Diagnostic Module</span>
                </div>
                <h4 className="font-bold text-sm text-[#F7F6F3]">{item.heading}</h4>
                <ul className="space-y-2 pt-2 border-t border-[#2A3D54]/80 text-xs text-[#CBD5E1]">
                  {item.subheadings.map((sub, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C9A24B] mt-0.5">•</span>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-[#1B2838] rounded-lg p-4 border border-[#2A3D54] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8C96A5]">
            <div className="flex items-center gap-2 text-[#E2E8F0]">
              <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0" />
              <span>Deliverables are formatted as formal diagnostic PDF reports delivered via secure client vault.</span>
            </div>
            <Link
              href="/intake"
              className="text-[#C9A24B] hover:underline font-bold flex items-center gap-1 shrink-0"
            >
              <span>Submit Enterprise Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. What We'll Need From You (Intake Preparation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 border border-amber-200 text-[#8C6A1E] text-xs font-bold uppercase tracking-wider">
            <ClipboardList className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Intake Preparation Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B2838]">
            What We&apos;ll Need From You
          </h2>
          <p className="text-sm text-[#5A6472] leading-relaxed">
            To prepare a structured diagnostic proposal and relevant research, our advisory team requires specific parameters about your enterprise during initial intake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {intakeRequirements.map((req, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E2E8F0] shadow-sm space-y-2 hover:border-[#1B2838] transition-colors"
            >
              <h4 className="font-bold text-sm text-[#1B2838]">{req.title}</h4>
              <p className="text-xs text-[#5A6472] leading-relaxed">{req.desc}</p>
            </div>
          ))}
        </div>

        {/* Confidentiality & Start Intake Callout */}
        <div className="mt-8 bg-[#F7F6F3] border border-[#E2E8F0] rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5A6472]">
              <strong className="text-[#1B2838] block text-sm">Strict Confidentiality &amp; NDA Protocol</strong>
              <span>
                All submitted data is encrypted, restricted strictly to assigned advisory staff under least privilege, and never shared.
              </span>
            </div>
          </div>

          <Link
            href="/intake"
            className="shrink-0 inline-flex items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Proceed to Intake Questionnaire</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A24B]" />
          </Link>
        </div>
      </section>
    </div>
  );
}
