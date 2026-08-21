import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  BrainCircuit, 
  MessageCircle, 
  PhoneCall, 
  Info, 
  Target, 
  Zap, 
  Briefcase 
} from 'lucide-react';
import { ILAWithYouLogo } from './Hero';

interface CoursePageProps {
  courseTitle?: string;
  category?: string;
}

interface CoursePathTileProps {
  title: string;
  desc: string;
  icon: React.ElementType;
  colorClass: string;
  borderClass: string;
  onEnroll: () => void;
}

const IlasSlideshow = ({ courseTitle: _courseTitle }: { courseTitle: string }) => {
  const slides = [
    {
      q: "How do I apply for my German student/job seeker visa?",
      a: "I'll guide you through compiling your visa application portfolio. We will check your enrollment letter, block your bank account, and verify insurance, ensuring 99.99% document accuracy."
    },
    {
      q: "Where can I find student accommodation & part-time jobs?",
      a: "Our advanced matching engine searches local German student residences and links you with verified part-time/Ausbildung roles to help fully cover your monthly living expenses."
    },
    {
      q: "What is the most suitable course and career roadmap for me?",
      a: "Based on your technical profile and ambitions, I construct a personalized, certification-ready study pathway paired directly with enterprise-level project tasks."
    },
    {
      q: "How do I book tickets, open a blocked bank account, and get local German pickup?",
      a: "I provide interactive, step-by-step checklists for booking cost-effective flights, starting your blocked account, and coordinating your physical pickup when arriving at the airport."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 min-h-[350px] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs font-bold uppercase tracking-widest text-slate-500">Ilas Terminal</span>
        </div>
        
        <div className="space-y-4">
          <div className="bg-brand-50 text-brand-900 p-4 rounded-2xl rounded-br-sm text-sm ml-auto max-w-[85%] border border-brand-100 font-semibold animate-in fade-in slide-in-from-right-4 duration-300">
            {slides[currentIndex].q}
          </div>
          <div className="bg-slate-50 text-slate-700 p-4 rounded-2xl rounded-bl-sm text-sm mr-auto max-w-[90%] border border-slate-200 leading-relaxed animate-in fade-in slide-in-from-left-4 duration-300">
            {slides[currentIndex].a}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-100">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Tutorial</span>
      </div>
    </div>
  );
};

const CoursePathTile = ({ title, desc, icon: Icon, colorClass, borderClass, onEnroll }: CoursePathTileProps) => (
  <div className={`bg-white rounded-3xl p-8 border-2 ${borderClass} shadow-lg hover:shadow-2xl transition-all flex flex-col h-full relative group`}>
    <div className="absolute top-4 right-4 bg-brand-50 border border-brand-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
      <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
      <span className="text-[10px] font-black uppercase tracking-widest text-brand-700">Ilas With You</span>
    </div>
    
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colorClass}`}>
      <Icon className="w-7 h-7 text-white" />
    </div>
    
    <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">{desc}</p>
    
    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Adaptive Pace</div>
      <div className="text-sm font-black text-brand-600 italic">"Speed for Speed, Slow for Slow"</div>
    </div>
    
    <div className="flex flex-col gap-3 mt-auto">
      <button onClick={onEnroll} className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2">
        Enroll Now
        <ArrowRight className="w-4 h-4" />
      </button>
      <button onClick={() => window.dispatchEvent(new CustomEvent('open-language-trainer'))} className="w-full py-3 bg-white border-2 border-slate-200 hover:border-brand-300 text-slate-700 hover:text-brand-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
        <Play className="w-4 h-4" />
        Watch Free Trial
      </button>
    </div>
  </div>
);

export default function CoursePage({ courseTitle = "Professional Certification Course", category = "Professional Program" }: CoursePageProps) {
  const openRegistration = (_pkg: string) => {
    window.location.hash = '#applications?tab=Education';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseTitle]);

  return (
    <div className="pt-20 bg-slate-50 min-h-screen pb-20">
      
      {/* 1. Compact Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white h-[400px] lg:h-[500px] shadow-2xl flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-20" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/80 to-transparent" />
        </div>
        
        <div className="container-max px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-brand-300" />
              <span className="text-xs font-bold tracking-wide text-brand-100 uppercase">{category}</span>
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
              {courseTitle}
            </h1>
            
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mb-8 leading-relaxed font-medium">
              Experience our revolutionary 24/7 Intelli-Coach AI Trainer™ system combined with expert curriculum frameworks. Designed specifically for {courseTitle} mastery.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#methods" className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2">
                Discover Teaching Methods
                <ArrowRight className="w-4 h-4" />
              </a>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-language-trainer'))} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 backdrop-blur-md rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                <Play className="w-4 h-4" />
                Free Trial / Demo Classes
              </button>
              <button onClick={() => openRegistration('Direct Fast-Track')} className="px-6 py-3 bg-white text-brand-900 rounded-xl font-bold text-sm transition-all shadow-md">
                Enroll Now
              </button>
              <a href="#ilas-with-you" className="px-6 py-3 border-2 border-white/30 text-white hover:bg-white/10 rounded-xl font-bold text-sm transition-all flex items-center gap-2">
                Ilas With You
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Navigation */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-y border-slate-200 shadow-sm mb-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar py-3 gap-2 md:gap-4 justify-start md:justify-center">
            {[
              { id: 'german-language', label: 'German Language', href: '#course-german-language' },
              { id: 'ielts', label: 'IELTS', href: '#course-ielts' },
              { id: 'software-training', label: 'Software Training', href: '#course-software-engineering' },
              { id: 'job-related-programs', label: 'Job-Related Programs', href: '#course-job-related-programs' },
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 1: Path Selection */}
        <section id="path-selection">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Select Your Path</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Choose the learning methodology that fits your schedule and professional objectives.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <CoursePathTile 
              title="Intelli-Coach AI Trainer™" 
              desc="Proprietary 24/7 intelligent tutoring engine that analyzes your performance instantly and drives infinite practice scenarios."
              icon={BrainCircuit}
              colorClass="bg-brand-600"
              borderClass="border-brand-200"
              onEnroll={() => openRegistration('Intelli-Coach AI Trainer™')}
            />
            <CoursePathTile 
              title="Video + AI Training" 
              desc="Pre-recorded expert lectures paired with immediate AI-driven assessments to ensure you master every module."
              icon={Play}
              colorClass="bg-indigo-600"
              borderClass="border-indigo-200"
              onEnroll={() => openRegistration('Video + AI Training')}
            />
            <CoursePathTile 
              title="Human Training (Live)" 
              desc="Engage directly with certified instructors in live cohorts for nuanced correction and real-world mentoring."
              icon={MessageCircle}
              colorClass="bg-emerald-600"
              borderClass="border-emerald-200"
              onEnroll={() => openRegistration('Human Training (Live)')}
            />
          </div>
        </section>

        {/* Section 2: Course Details */}
        <section id="course-details" className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900">Syllabus & Course Breakdown</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0 mt-1" /> 
                <div>
                  <strong className="text-slate-900 text-lg block mb-1">Foundational Level (Beginner)</strong>
                  <span className="text-slate-600">Master the basics, understand core terminologies, and build a highly robust foundational architecture for advanced topics.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0 mt-1" /> 
                <div>
                  <strong className="text-slate-900 text-lg block mb-1">Intermediate Operations</strong>
                  <span className="text-slate-600">Complex scenario building, practical problem-solving strategies, and mid-level professional task executions.</span>
                </div>
              </li>
            </ul>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0 mt-1" /> 
                <div>
                  <strong className="text-slate-900 text-lg block mb-1">Advanced Mastery (Professional)</strong>
                  <span className="text-slate-600">Near-native fluency or expert-level technical execution, ready for international corporate deployment.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-500 shrink-0 mt-1" /> 
                <div>
                  <strong className="text-slate-900 text-lg block mb-1">Official Certification Prep</strong>
                  <span className="text-slate-600">Intense mock tests and strategic reviews tailored precisely to official international certification boards.</span>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Advantages of Learning Methods */}
        <section id="methods" className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-10 text-center">3 Advanced Learning Methods</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border-2 border-brand-500/30 hover:border-brand-500 transition-colors shadow-lg">
                <BrainCircuit className="w-10 h-10 text-brand-400 mb-6" />
                <h4 className="text-xl font-bold mb-3 text-brand-400">Adaptive Pace</h4>
                <p className="text-sm font-bold text-accent-400 mb-3 italic">"Speed for Speed, Slow for Slow"</p>
                <p className="text-slate-300 leading-relaxed text-sm">
                  The curriculum instantly speeds up when you grasp concepts quickly and automatically slows down to offer deeper explanations when you face challenges.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border-2 border-brand-500/30 hover:border-brand-500 transition-colors shadow-lg">
                <Target className="w-10 h-10 text-emerald-400 mb-6" />
                <h4 className="text-xl font-bold mb-3 text-emerald-400">Expert Framework</h4>
                <p className="text-sm font-bold text-accent-400 mb-3 italic">"Fully Trained Intelli-Coach Framework"</p>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Certified industry-standard modules perfectly blended with digital intelligence, guaranteeing your certifications are recognized globally.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border-2 border-brand-500/30 hover:border-brand-500 transition-colors shadow-lg">
                <Zap className="w-10 h-10 text-amber-400 mb-6" />
                <h4 className="text-xl font-bold mb-3 text-amber-400">24/7 Support</h4>
                <p className="text-sm font-bold text-accent-400 mb-3 italic">"Continuous Mentoring with Ilas With You"</p>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Never wait for an answer. Your intelligent companion provides instant doubt resolution and practice conversational interactions at any hour.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md p-8 rounded-3xl border-2 border-amber-500/50 hover:border-amber-400 transition-colors shadow-lg mt-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <Briefcase className="w-12 h-12 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-2xl font-black mb-2 text-amber-400">Work While You Study - Register for Jobs</h4>
                  <p className="text-sm font-bold text-white mb-2 italic">"Start earning immediately while you complete your certification"</p>
                  <p className="text-slate-300 leading-relaxed text-sm max-w-2xl">
                    Integrate your learning with our rewards plan and part-time job pathways. Connect your skills to real-world tasks and earn stipends from day one.
                  </p>
                </div>
              </div>
              <a href="#earn-learn" className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-brand-900 font-black rounded-xl transition-all shadow-lg shadow-amber-500/30 whitespace-nowrap">
                Register for Jobs
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => openRegistration('Adaptive Pace')} className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-600/30">
                Enroll Now
              </button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('open-language-trainer'))} className="px-8 py-3 bg-white/10 border-2 border-white/20 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                Watch Free Trial
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Ilas With You Integration */}
        <section id="ilas-with-you" className="mb-20">
          <div className="bg-gradient-to-br from-indigo-50 to-brand-50 rounded-[3rem] p-10 lg:p-16 border border-indigo-100 shadow-xl flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-8 inline-block">
                <ILAWithYouLogo light={false} size="lg" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Personalized Support for Your Career Path</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Ilas With You isn't just an AI; it is your deeply integrated professional mentor for {courseTitle}. It tracks your syllabus completion, provides instant mock evaluations, and connects your newly learned skills directly to international job opportunities.
              </p>
              <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0 text-indigo-600">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Dedicated Live Consultant Support</h4>
                  <p className="text-sm text-slate-500 mt-1">Included completely free with your program enrollment to help with visa and job mapping.</p>
                </div>
              </div>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-portal-login'))}
                className="w-full py-4 bg-brand-700 hover:bg-brand-800 text-white font-black text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group mb-4"
              >
                <span>Register with Ilas / Get Lifetime Companion Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="#earn-learn"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-brand-900 font-black text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Briefcase className="w-5 h-5" />
                <span>Register for Work While You Study</span>
              </a>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <IlasSlideshow courseTitle={courseTitle} />
            </div>
          </div>
        </section>

      </div>

    </div>
  );
}
