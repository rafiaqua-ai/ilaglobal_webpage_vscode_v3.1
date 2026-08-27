import { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Upload, 
  HeartHandshake, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Crown, 
  Gift, 
  Search, 
  ArrowRight, 
  Briefcase, 
  Globe, 
  Home, 
  Landmark, 
  FileText,
  Code
} from 'lucide-react';

export default function StudyAbroadPage() {
  const [activeNav, setActiveNav] = useState('public-universities');

  const navigateTo = (url: string) => { 
    window.location.hash = url; 
  };

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const benefitItems = [
    { icon: GraduationCap, title: "€0 Tuition Public Uni", highlight: "100% Free Tuition", desc: "in world-class German universities.", link: "#applications?tab=Study Abroad" },
    { icon: Briefcase, title: "Part-Time Work Rights", highlight: "20 Hrs/Week", desc: "legal student work allowance with good pay.", link: "#learn-while-earn" },
    { icon: TrendingUp, title: "18-Month Job Seeking Visa", highlight: "Post-Study Visa", desc: "to transition into European corporate jobs.", link: "#jobs" },
    { icon: Gift, title: "Reward Ecosystem", highlight: "Cashback Perks", desc: "per academic milestone & peer referrals.", link: "#rewards" }
  ];

  const complimentaryServices = [
    { icon: Home, title: "Accommodation & Pickup", desc: "Guaranteed student dorms, WG flatshare assistance, and airport reception upon arrival in Germany.", tag: "Arrival Care" },
    { icon: Landmark, title: "Blocked Account & Insurance", desc: "End-to-end guidance for Sperrkonto (Blocked Account) setup and TK/AOK public health insurance.", tag: "Finance & Health" },
    { icon: Briefcase, title: "Part-Time Job Assistance", desc: "Direct connecting with student job pools (20 hrs/week) to support monthly living expenses easily.", tag: "Student Income" },
    { icon: ShieldCheck, title: "21-Day Visa & APS Clearance", desc: "Fast-track APS document verification, embassy appointment booking, and visa file preparation.", tag: "Visa Processing" },
    { icon: FileText, title: "Uni-Assist & Attestation", desc: "Official German translation, certified document notarization, and error-free Uni-Assist submissions.", tag: "Documentation" },
    { icon: HeartHandshake, title: "Local Registration (Anmeldung)", desc: "In-person guidance for German city hall registration (Anmeldung) and local bank account opening.", tag: "Settlement Support" }
  ];

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      
      {/* 1. Compact Photogenic Hero Section */}
      <section className="relative bg-slate-950 text-white py-16 sm:py-20 px-6 rounded-b-[3rem] shadow-2xl mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay" />
        <div className="container-max mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md border border-white/15">
            <Compass className="w-4 h-4 text-amber-400" /> European Higher Education Gateway
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 leading-tight">
            Study in Germany & Europe with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">Ilas With You</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            End-to-end support for your international education. From university selection and APS visa clearance to part-time jobs and comfortable local settlement.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigateTo('#applications?tab=Study Abroad')} 
              className="px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-black rounded-xl text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              Explore Admissions <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigateTo('#applications?tab=Study Abroad')} 
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Upload className="w-4 h-4 text-emerald-400" /> Upload Documents
            </button>
          </div>
        </div>
      </section>

      {/* 2. Sleek Minimal Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 mb-12 transition-all duration-300">
        <div className="container-max mx-auto px-6 flex justify-start md:justify-center gap-8 overflow-x-auto hide-scrollbar">
          {[
            { id: 'public-universities', label: 'Public Universities (€0 Tuition)' },
            { id: 'private-universities', label: 'Private Universities' },
            { id: 'ausbildung-program', label: 'Ausbildung (Paid Dual Study)' },
            { id: 'complimentary-services', label: 'Other Support Services' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`text-base font-bold pb-2 transition-all cursor-pointer whitespace-nowrap ${
                activeNav === tab.id ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Main Body Sections */}
      <div className="container-max mx-auto px-6 space-y-28 pb-20">
        
        {/* ================= GERMAN PUBLIC UNIVERSITIES ================= */}
        <section id="public-universities" className="scroll-mt-32">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
              100% Free Tuition
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-2">German Public Universities</h2>
            <p className="text-slate-600 text-base">World-renowned state universities offering top-tier degrees with zero tuition fees across Germany.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start mb-8">
            
            {/* Left: Program Track Selection */}
            <div className="lg:col-span-6 space-y-4">
              {[
                { title: "TU9 Technical Universities", sub: "Top engineering, IT, AI & automotive research degrees with €0 tuition.", icon: Building2, active: true },
                { title: "Universities of Applied Sciences (FH)", sub: "Practical, industry-focused Bachelors & Masters with internship semesters.", icon: GraduationCap, active: false },
                { title: "English-Taught International Masters", sub: "Over 1,500+ tuition-free degree programs taught completely in English.", icon: Globe, active: false }
              ].map((uni, idx) => {
                const IconComponent = uni.icon;
                return (
                  <div 
                    key={uni.title} 
                    className={`bg-white p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all ${
                      idx === 0 ? 'border-2 border-brand-500 bg-brand-50/10' : 'border-slate-200 hover:border-brand-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <IconComponent className={`w-6 h-6 ${idx === 0 ? 'text-brand-600' : 'text-slate-500'}`} />
                      <div>
                        <div className="font-bold text-slate-900 text-base">{uni.title}</div>
                        <p className="text-xs text-slate-500 mt-0.5">{uni.sub}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => navigateTo('#applications?tab=Study Abroad')} 
                        className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
                      >
                        Check Eligibility
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Guaranteed Benefits */}
            <div className="lg:col-span-6 bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-black mb-6 border-b border-slate-800 pb-3">Guaranteed Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {benefitItems.map((b) => {
                  const BenefitIcon = b.icon;
                  return (
                    <div 
                      key={b.title} 
                      onClick={() => navigateTo(b.link)} 
                      className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                        <BenefitIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">{b.title}</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          <span className="text-amber-400 font-bold">{b.highlight}</span> {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quick Action Upload & Eligibility Prompts */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div 
              onClick={() => navigateTo('#applications?tab=Study Abroad')} 
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-500 transition-all cursor-pointer flex items-center gap-5 group shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Check Public Uni Requirements</h4>
                <p className="text-xs text-slate-500 mt-1">Get instant evaluation of your CGPA, German levels, and ECTS credits.</p>
              </div>
            </div>

            <div 
              onClick={() => navigateTo('#applications?tab=Study Abroad')} 
              className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-500 transition-all cursor-pointer flex items-center gap-5 group shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Upload Transcripts for Review</h4>
                <p className="text-xs text-slate-500 mt-1">Submit degree certificates & marksheets for preliminary APS checks.</p>
              </div>
            </div>
          </div>

          {/* Royal Ilas Companion Showcase */}
          <div className="bg-slate-950 p-8 sm:p-10 rounded-3xl text-white border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="text-amber-400 font-black uppercase text-xs mb-2 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" /> Royal Lifetime Mentorship
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-100">Ilas With You Companion</h3>
              <p className="text-slate-300 text-sm mt-1 max-w-xl">24/7 AI Academic Mentor: University Shortlisting, Course Matching, and Visa Assistance.</p>
            </div>
            <button onClick={() => navigateTo('#ilas-companion')} className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm whitespace-nowrap cursor-pointer transition-all">
              Access Companion Now →
            </button>
          </div>
        </section>

        {/* ================= GERMAN PRIVATE UNIVERSITIES ================= */}
        <section id="private-universities" className="scroll-mt-32 border-t border-slate-200 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-indigo-700 uppercase bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
              English Medium & Fast Track
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-2">German Private Universities</h2>
            <p className="text-slate-600 text-base">Specialized career-focused universities with flexible entry requirements, small class sizes, and corporate networking.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start mb-8">
            <div className="lg:col-span-6 space-y-4">
              {[
                { title: "Direct English-Medium Intake", sub: "No prior German language certificates required for initial bachelor & master entry.", icon: Globe },
                { title: "Work-Integrated Co-Op Degrees", sub: "Partner corporate internships built directly into the university curriculum.", icon: Briefcase },
                { title: "Flexible Intakes (March & October)", sub: "Multiple application windows throughout the year for fast visa processing.", icon: Building2 }
              ].map((uni, idx) => {
                const IconComponent = uni.icon;
                return (
                  <div 
                    key={uni.title} 
                    className={`bg-white p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all ${
                      idx === 0 ? 'border-2 border-indigo-500 bg-indigo-50/10' : 'border-slate-200 hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <IconComponent className={`w-6 h-6 ${idx === 0 ? 'text-indigo-600' : 'text-slate-500'}`} />
                      <div>
                        <div className="font-bold text-slate-900 text-base">{uni.title}</div>
                        <p className="text-xs text-slate-500 mt-0.5">{uni.sub}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigateTo('#applications?tab=Study Abroad')} 
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shrink-0"
                    >
                      Apply Now
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-black mb-6 border-b border-slate-800 pb-3">Key Private Uni Advantages</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-amber-400 mb-1">98% Placement Rate</h4>
                  <p className="text-xs text-slate-300">Direct hiring fairs with BMW, Siemens, SAP, and European tech firms.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-amber-400 mb-1">Fast Visa Clearances</h4>
                  <p className="text-xs text-slate-300">Fast-track admission letters for immediate embassy visa interviews.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-amber-400 mb-1">Scholarship Options</h4>
                  <p className="text-xs text-slate-300">Partial tuition waivers and merit-based grants for international students.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-amber-400 mb-1">Practical Classrooms</h4>
                  <p className="text-xs text-slate-300">Small batch sizes with direct mentor feedback from industry executives.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= AUSBILDUNG (PAID DUAL VOCATIONAL STUDY) ================= */}
        <section id="ausbildung-program" className="scroll-mt-32 border-t border-slate-200 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Earn While You Study
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-2">Ausbildung (Paid Vocational Training)</h2>
            <p className="text-slate-600 text-base">Germany's famous dual education system where you receive a guaranteed monthly salary (€1,000–€1,400/month) while mastering a profession.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start mb-8">
            <div className="lg:col-span-6 space-y-4">
              {[
                { title: "Nursing & Healthcare Ausbildung", sub: "High demand across German hospitals with guaranteed work contracts post-training.", icon: HeartHandshake },
                { title: "IT & Software Systems Ausbildung", sub: "Practical software development and network engineering in corporate IT teams.", icon: Code },
                { title: "Mechatronics & Hotel Management", sub: "Hands-on industrial engineering and hospitality management in top organizations.", icon: TrendingUp }
              ].map((aus, idx) => {
                const IconComponent = aus.icon;
                return (
                  <div 
                    key={aus.title} 
                    className={`bg-white p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all ${
                      idx === 0 ? 'border-2 border-emerald-500 bg-emerald-50/10' : 'border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <IconComponent className={`w-6 h-6 ${idx === 0 ? 'text-emerald-600' : 'text-slate-500'}`} />
                      <div>
                        <div className="font-bold text-slate-900 text-base">{aus.title}</div>
                        <p className="text-xs text-slate-500 mt-0.5">{aus.sub}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigateTo('#applications?tab=Study Abroad')} 
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shrink-0"
                    >
                      Apply Intake
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-xl font-black mb-6 border-b border-slate-800 pb-3">Ausbildung Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-emerald-400 mb-1">€1,000–€1,400 Stipend</h4>
                  <p className="text-xs text-slate-300">Guaranteed monthly salary from Day 1 to cover all living expenses.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-emerald-400 mb-1">Zero Tuition Fees</h4>
                  <p className="text-xs text-slate-300">No university tuition fees required for any vocational trade.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-emerald-400 mb-1">Direct Job Guarantee</h4>
                  <p className="text-xs text-slate-300">Over 95% of graduates transition immediately into full-time employer contracts.</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold text-base text-emerald-400 mb-1">PR Pathway</h4>
                  <p className="text-xs text-slate-300">Fast-track eligibility for Permanent Residency (PR) in Germany.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMPLIMENTARY & OTHER SUPPORT SERVICES ================= */}
        <section id="complimentary-services" className="scroll-mt-32 border-t border-slate-200 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
              End-to-End Assistance
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-2">Complimentary Support Services</h2>
            <p className="text-slate-600 text-base">We stand with you at every step—from initial document attestation and visa clearance to airport pickup and local accommodation.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {complimentaryServices.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-500 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 group-hover:scale-105 transition-transform">
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                        {service.tag}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-brand-600 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 mt-5">
                    <button 
                      onClick={() => navigateTo('#applications?tab=Study Abroad')} 
                      className="w-full py-2.5 bg-slate-50 hover:bg-brand-600 hover:text-white text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      Request Support <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explore All Services Action Bar */}
          <div className="bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-950 p-8 rounded-3xl text-white text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="text-left">
              <h3 className="text-2xl font-black text-white mb-1">Ready to Start Your European Journey?</h3>
              <p className="text-slate-300 text-xs sm:text-sm">Submit your preliminary details now for free counseling and university shortlisting.</p>
            </div>
            <button 
              onClick={() => navigateTo('#applications?tab=Study Abroad')} 
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all shadow-lg shadow-amber-500/20"
            >
              Explore All Services & Apply →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}