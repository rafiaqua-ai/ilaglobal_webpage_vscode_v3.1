import { BookOpen, Stethoscope, Languages, Play, ArrowRight, Sparkles, Bot, Zap, Cpu, CheckCircle2 } from 'lucide-react'

const programs = [
  {
    icon: Languages,
    title: 'German Language',
    description: 'Comprehensive A1–C2 German language courses with native instructors, interactive sessions, and Goethe/ÖSD exam preparation.',
    features: ['Live & online classes', 'Certified instructors', 'Exam preparation'],
    action: 'language-trainer' as const,
    cta: 'Start AI Sample Class',
  },
  {
    icon: BookOpen,
    title: 'Ausbildung Programs',
    description: 'Dual vocational training pathways in Germany — earn while you learn with structured apprenticeships across in-demand industries.',
    features: ['Paid apprenticeships', 'Industry partnerships', 'Pathway to employment'],
    action: 'eligibility' as const,
    cta: 'Check Eligibility',
  },
  {
    icon: Stethoscope,
    title: 'Medical / DemTest Prep',
    description: 'Specialized preparation for medical licensing exams including DemTest, FSP, and Kenntnisprüfung for healthcare professionals.',
    features: ['Clinical case studies', 'Language medical modules', 'Mock examinations'],
    action: 'eligibility' as const,
    cta: 'Check Eligibility',
  },
]

export default function EducationSection() {
  const handleAction = (action: 'language-trainer' | 'eligibility') => {
    if (action === 'language-trainer') {
      window.dispatchEvent(new CustomEvent('open-language-trainer'))
    } else {
      document.getElementById('eligibility')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="education" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative Methodology Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/30 -skew-x-12 translate-x-1/2 -z-10" />
      
      <div className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Cpu className="w-3 h-3" />
            AI-Driven Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-6 tracking-tight">
            Advanced Learning <span className="text-brand-600">Framework</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-12">
            Experience our revolutionary 24/7 IntelliCoach AI™ training system combined with expert curriculum frameworks designed to meet international standards.
          </p>

          {/* Methodology Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { icon: Bot, label: "24/7 AI Mentoring", desc: "Interactive doubt solving" },
              { icon: Zap, label: "Adaptive Pace", desc: "Speeds up with you" },
              { icon: Sparkles, label: "Smart Modules", desc: "Structured for success" },
              { icon: CheckCircle2, label: "Live Tracking", desc: "Monitor your progress" }
            ].map((m, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <m.icon className="w-6 h-6 text-brand-600 mb-2" />
                <div className="font-bold text-slate-900 text-sm">{m.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map(({ icon: Icon, title, description, features, action, cta }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 card-hover flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-brand-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleAction(action)}
                className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-colors ${
                  action === 'language-trainer'
                    ? 'bg-brand-700 text-white hover:bg-brand-800'
                    : 'border-2 border-brand-200 text-brand-700 hover:bg-brand-50'
                }`}
              >
                {action === 'language-trainer' ? <Play className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
