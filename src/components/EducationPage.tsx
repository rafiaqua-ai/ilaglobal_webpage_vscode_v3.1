import { useState, useEffect } from 'react';
import { 
  Star, BrainCircuit, Play, ArrowRight, Zap, MessageCircle, 
  Crown, Briefcase, GraduationCap, Gift, Code, 
  Layers, BookOpen, Search, CheckCircle2 
} from 'lucide-react';
import { getGlobalCourses, GlobalCourse } from '../lib/db';

const benefitItems = [
  { icon: Briefcase, title: "Work While You Study", highlight: "Junior Consultant", desc: "with verified monthly stipend.", link: "#learn-while-earn" },
  { icon: Gift, title: "Reward Plan", highlight: "Cashback Rewards", desc: "per cleared module & peer referrals.", link: "#rewards" },
  { icon: Search, title: "Job Hunting", highlight: "Direct Placement", desc: "with European recruiter network.", link: "#jobs" },
  { icon: GraduationCap, title: "€0 Cost German Uni", highlight: "100% Free Tuition", desc: "in funded public universities.", link: "#study-abroad" }
];

const fastTrackCourses = [
  { name: "Advanced Excel & Financials", tag: "Finance" },
  { name: "Bookkeeping & Tally Prime", tag: "Accounts" },
  { name: "Digital Marketing & SEO", tag: "Growth" },
  { name: "Python for Automation", tag: "Tech" },
  { name: "SAP Fundamentals & ERP", tag: "Enterprise" },
  { name: "Agile & Scrum Operations", tag: "Management" },
  { name: "Corporate Client CRM", tag: "Sales" },
  { name: "UI/UX & Product Design", tag: "Design" },
  { name: "Business Data Analytics", tag: "Analytics" },
  { name: "Medical Terminology (FSP)", tag: "Healthcare" }
];

const courseSections = [
  {
    id: 'german-language',
    title: 'German Language Training',
    subtitle: 'Adaptive pacing for Goethe, Telc & clinical career pathways.',
    tag: 'Goethe & Telc Standard',
    tabName: 'German Education',
    courses: [
      { title: 'Intelli-Coach AI', icon: BrainCircuit, active: true },
      { title: 'Video + AI Masterclass', icon: Play, active: false },
      { title: 'Expert Native Tutors', icon: MessageCircle, active: false }
    ],
    levels: [
      { code: 'A1 Beginner', desc: 'Basic survival phrases, self-introductions, numbers, time & phonetics.' },
      { code: 'A2 Elementary', desc: 'Daily conversational exchange, workplace basics, directions & short routine sentences.' },
      { code: 'B1 Intermediate', desc: 'Independent language usage, travel communication, emails & Goethe B1 mocks.' },
      { code: 'B2 Professional', desc: 'Clinical/Technical terminology, fluent workplace debates & Goethe B2 mastery.' }
    ]
  },
  {
    id: 'ielts-prep',
    title: 'IELTS & English Proficiency',
    subtitle: 'Target Band 8.0+ strategies with AI essay evaluations and live mock speaking.',
    tag: 'Band 8.0+ Target',
    tabName: 'IELTS Education',
    courses: [
      { title: 'Intelli-Coach IELTS™', icon: BrainCircuit, active: true },
      { title: 'Video + AI Test Prep', icon: Play, active: false },
      { title: 'Expert Band 8.5+ Tutors', icon: MessageCircle, active: false }
    ],
    levels: [
      { code: 'Speaking Module', desc: 'Pronunciation accuracy, lexical resource expansion & 1-on-1 interview practice.' },
      { code: 'Writing (Task 1 & 2)', desc: 'Graph interpretation, essay structures, academic templates & grammar correction.' },
      { code: 'Reading Strategy', desc: 'Skimming, scanning, True/False/Not Given drills & timed test tactics.' },
      { code: 'Listening Module', desc: 'Multi-accent decoding (British/Aussie), note-taking precision & Cambridge mocks.' }
    ]
  },
  {
    id: 'software-tech',
    title: 'Software & Tech Programs',
    subtitle: 'Full-Stack engineering, cloud DevOps, and AI pair-programming.',
    tag: 'Enterprise Stacks',
    tabName: 'Tech Education',
    courses: [
      { title: 'AI Pair-Programming', icon: Code, active: true },
      { title: 'Full-Stack React & Node', icon: Layers, active: false },
      { title: 'Live Architect Cohorts', icon: MessageCircle, active: false }
    ],
    levels: [
      { code: 'Frontend UI', desc: 'HTML5, Tailwind CSS, TypeScript, React 19, Next.js & responsive mobile UI.' },
      { code: 'Backend & APIs', desc: 'Node.js, Express, Python REST APIs, PostgreSQL & secure auth architecture.' },
      { code: 'Cloud DevOps', desc: 'Git team workflows, Docker containers, CI/CD automated deployment & cloud hosting.' },
      { code: 'Live Capstone', desc: 'Build 3 enterprise-grade production apps for direct international placements.' }
    ]
  }
];

export default function EducationPage() {
  const [courses, setCourses] = useState<GlobalCourse[]>([]);
  const [activeNav, setActiveNav] = useState('');
  const [selectedJobCourse, setSelectedJobCourse] = useState(fastTrackCourses[0].name);

  useEffect(() => {
    const loadCourses = () => {
      const data = getGlobalCourses();
      setCourses(data);
      if (data.length > 0 && !activeNav) {
        setActiveNav(data[0].id);
      }
    };
    loadCourses();
    window.addEventListener('ilas-courses-changed', loadCourses);
    return () => window.removeEventListener('ilas-courses-changed', loadCourses);
  }, [activeNav]);

  const activeCourse = courses.find(c => c.id === activeNav) || courses[0];

  const navigateTo = (url: string) => { window.location.hash = url; };
  const openTrial = () => { window.dispatchEvent(new CustomEvent('open-language-trainer')); };

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      
      {/* 1. Hero */}
      <section className="bg-slate-950 text-white py-20 px-6 rounded-b-[3rem] shadow-2xl mb-6">
        <div className="container-max mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Star className="w-4 h-4 text-amber-400" /> Intelligent Education Framework
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Global Education & Career Redefined</h1>
          <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Adaptive learning paths and direct international corporate placements.
          </p>
          <button onClick={() => navigateTo('#applications?tab=Education')} className="px-9 py-4 bg-brand-600 hover:bg-brand-500 font-black rounded-xl text-base transition-all shadow-lg cursor-pointer">
            Enroll Now
          </button>
        </div>
      </section>

      {/* 2. Sleek Underline Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 mb-12 transition-all duration-300">
        <div className="container-max mx-auto px-6 flex justify-start md:justify-center gap-8 overflow-x-auto hide-scrollbar">
          {courses.map(course => (
            <button
              key={course.id}
              onClick={() => scrollTo(course.id)}
              className={`text-base font-bold pb-2 transition-all cursor-pointer whitespace-nowrap ${
                activeNav === course.id ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              {course.name}
            </button>
          ))}
          <button
              onClick={() => scrollTo('job-related-programs')}
              className={`text-base font-bold pb-2 transition-all cursor-pointer whitespace-nowrap ${
                activeNav === 'job-related-programs' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              Job-Related Certifications
          </button>
        </div>
      </div>

      {/* 3. Main Sections */}
      <div className="container-max mx-auto px-6 space-y-28 pb-20">
        
        {/* Render only active dynamic course */}
        {activeCourse && (
          <section id={activeCourse.id} className="scroll-mt-32 border-t border-slate-200 first:border-t-0 pt-10 first:pt-0">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">Featured Course</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-2">{activeCourse.name}</h2>
              <p className="text-slate-600 text-base">{activeCourse.subtitle || 'Comprehensive enterprise-level education & training framework.'}</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start mb-8">
              
              {/* Dynamic Path Methods */}
              <div className="lg:col-span-6 space-y-4">
                  <div className={`bg-white p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-all border-2 border-brand-500 bg-brand-50/10`}>
                    <div className="flex items-center gap-3.5">
                      <BrainCircuit className={`w-6 h-6 text-brand-600`} />
                      <div className="font-bold text-slate-900 text-base">{activeCourse.methods}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => scrollTo(`${activeCourse.id}-details`)} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Details
                      </button>
                      <button onClick={openTrial} className="px-3.5 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1">
                        <Play className="w-3.5 h-3.5" /> Free Trial
                      </button>
                      <button onClick={() => navigateTo(`#applications?tab=${encodeURIComponent(activeCourse.name)}`)} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all">
                        Enroll
                      </button>
                    </div>
                  </div>
              </div>

              {/* Guaranteed Benefits with Golden Highlights & Accurate Links */}
              <div className="lg:col-span-6 bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-xl font-black mb-6 border-b border-slate-800 pb-3">Guaranteed Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {benefitItems.map((b) => (
                    <div 
                      key={b.title} 
                      onClick={() => navigateTo(b.link)} 
                      className="flex items-start gap-4 p-3.5 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                        <b.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">{b.title}</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          <span className="text-amber-400 font-bold">{b.highlight}</span> {b.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Clickable Detailed Course Breakdown Cards */}
            <div id={`${activeCourse.id}-details`} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
              <h4 className="text-sm font-black uppercase tracking-wider text-brand-600 mb-5 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Dynamic Course Structure
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div 
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-100 hover:border-brand-300 transition-all cursor-pointer group"
                  >
                    <div className="font-black text-slate-900 group-hover:text-brand-700 text-base mb-1.5 flex items-center justify-between">
                      <span>Chapters</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeCourse.chapter} Chapters included</p>
                  </div>

                  <div 
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-100 hover:border-brand-300 transition-all cursor-pointer group"
                  >
                    <div className="font-black text-slate-900 group-hover:text-brand-700 text-base mb-1.5 flex items-center justify-between">
                      <span>Duration</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeCourse.duration}</p>
                  </div>

                  <div 
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-100 hover:border-brand-300 transition-all cursor-pointer group"
                  >
                    <div className="font-black text-slate-900 group-hover:text-brand-700 text-base mb-1.5 flex items-center justify-between">
                      <span>Course Fee</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeCourse.fee}</p>
                  </div>

                  <div 
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-100 hover:border-brand-300 transition-all cursor-pointer group"
                  >
                    <div className="font-black text-slate-900 group-hover:text-brand-700 text-base mb-1.5 flex items-center justify-between">
                      <span>Staff Assigned</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{activeCourse.staff}</p>
                  </div>
              </div>
            </div>

            {/* Ilas With You Companion */}
            <div className="bg-slate-950 p-8 sm:p-10 rounded-3xl text-white border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="text-amber-400 font-black uppercase text-xs mb-2 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" /> Royal Lifetime Mentorship
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-amber-100">Ilas With You Companion</h3>
                <p className="text-slate-300 text-sm mt-1 max-w-xl">24/7 Academic Mentor: Speaking Labs, Exam Simulations, and Career Roadmaps.</p>
              </div>
              <button onClick={() => navigateTo('#ilas-companion')} className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm whitespace-nowrap cursor-pointer transition-all">
                Access Companion Now →
              </button>
            </div>

          </section>
        )}

        {/* ================= JOB-RELATED PROGRAMS (Courses on Top -> Select Path Below) ================= */}
        <section id="job-related-programs" className="scroll-mt-32 border-t border-slate-200 pt-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">Career Fast-Track</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-2">Job-Ready Fast-Track Certifications</h2>
            <p className="text-slate-600 text-base">Select a specialized certification above, then choose your preferred learning path below.</p>
          </div>
          
          {/* 1. Ten Course Cards at the TOP */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
            {fastTrackCourses.map((course) => {
              const isSelected = selectedJobCourse === course.name;
              return (
                <div 
                  key={course.name} 
                  onClick={() => setSelectedJobCourse(course.name)}
                  className={`rounded-2xl p-5 border transition-all flex flex-col justify-between cursor-pointer group shadow-sm ${
                    isSelected 
                      ? 'border-2 border-brand-600 bg-brand-50/20 shadow-md ring-2 ring-brand-500/20' 
                      : 'bg-white border-slate-200 hover:border-brand-400 hover:shadow-md'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-100 mb-2.5 inline-block">
                      {course.tag}
                    </span>
                    <h4 className={`font-bold text-sm transition-colors ${isSelected ? 'text-brand-700 font-black' : 'text-slate-900 group-hover:text-brand-600'}`}>
                      {course.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mt-5 pt-2 border-t border-slate-100">
                    <span>{isSelected ? '✓ Selected' : 'Fast-Track'}</span>
                    <span className="text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center">Choose →</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. Select Your Learning Path BELOW the selected course */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-8">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Selected Certification</span>
                <h3 className="text-2xl font-black text-slate-900">{selectedJobCourse}</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> Ready for Intake
              </span>
            </div>

            <h4 className="text-base font-black text-slate-900 mb-5">Select Your Learning Path:</h4>
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl border-2 border-brand-500 bg-brand-50/10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center mb-4">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-base mb-1">Intelli-Coach AI Path</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">AI-driven modules, automated simulations, and practical exercises.</p>
                </div>
                <button 
                  onClick={() => navigateTo(`#applications?tab=Certification - ${selectedJobCourse} (Intelli-Coach AI)`)}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Enroll AI Path
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 hover:border-indigo-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
                    <Play className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-base mb-1">Video Masterclasses</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">High-definition on-demand structured lectures and case studies.</p>
                </div>
                <button 
                  onClick={() => navigateTo(`#applications?tab=Certification - ${selectedJobCourse} (Video Masterclass)`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
                >
                  Enroll Video Path
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-base mb-1">Live Mentor Cohorts</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">Live interactive workshops with enterprise industry practitioners.</p>
                </div>
                <button 
                  onClick={() => navigateTo(`#applications?tab=Certification - ${selectedJobCourse} (Live Cohort)`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-all"
                >
                  Enroll Live Path
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}