import { useState, useEffect } from 'react';
import { 
  Star, BrainCircuit, Play, ArrowRight, Zap, MessageCircle, 
  Crown, Briefcase, GraduationCap, Gift, Code, 
  Layers, BookOpen, Search, CheckCircle2, LayoutGrid, List,
  Filter, Sparkles, Clock, Award, ChevronRight, Eye, ShieldCheck,
  Building2, Users, FileText, ExternalLink
} from 'lucide-react';
import { 
  getGlobalCourses, getGlobalPaths, getGlobalCategories,
  GlobalCourse, GlobalPath, GlobalCategory 
} from '../lib/db';

const benefitItems = [
  { icon: Briefcase, title: "Work While You Study", highlight: "Junior Consultant", desc: "with verified monthly stipend.", link: "#learn-while-earn" },
  { icon: Gift, title: "Reward Plan", highlight: "Cashback Rewards", desc: "per cleared module & peer referrals.", link: "#rewards" },
  { icon: Search, title: "Job Hunting", highlight: "Direct Placement", desc: "with European recruiter network.", link: "#jobs-page" },
  { icon: GraduationCap, title: "€0 Cost German Uni", highlight: "100% Free Tuition", desc: "in funded public universities.", link: "#study-abroad" }
];

export default function EducationPage() {
  const [courses, setCourses] = useState<GlobalCourse[]>([]);
  const [paths, setPaths] = useState<GlobalPath[]>([]);
  const [categories, setCategories] = useState<GlobalCategory[]>([]);
  const [activeNav, setActiveNav] = useState('');
  
  // Filtering & View States for Blocks / Catalog Section
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'line'>('grid');

  const loadData = () => {
    const courseData = getGlobalCourses();
    const pathData = getGlobalPaths();
    const catData = getGlobalCategories();
    setCourses(courseData);
    setPaths(pathData);
    setCategories(catData);
    if (courseData.length > 0 && !activeNav) {
      setActiveNav(`course-${courseData[0].id}`);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('ilas-courses-changed', loadData);
    window.addEventListener('ilas-paths-changed', loadData);
    window.addEventListener('ilas-categories-changed', loadData);
    return () => {
      window.removeEventListener('ilas-courses-changed', loadData);
      window.removeEventListener('ilas-paths-changed', loadData);
      window.removeEventListener('ilas-categories-changed', loadData);
    };
  }, []);

  const navigateTo = (url: string) => { 
    window.location.hash = url; 
  };

  const openCourseDemo = (courseName?: string) => { 
    window.dispatchEvent(new CustomEvent('open-language-trainer', { detail: { course: courseName } })); 
  };

  const scrollTo = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // 1. Sequential Main View Courses (sorted by displayPosition: 1, 2, 3...)
  const mainViewCourses = courses
    .filter(c => c.viewType === 'Main View' || c.viewType === 'Both' || (!c.viewType && (c.displayPosition || 0) <= 3))
    .sort((a, b) => (a.displayPosition || 99) - (b.displayPosition || 99));

  // 2. Catalog / Blocks View Courses (filtered by category, sub-category, search)
  const allAvailableCategories = Array.from(new Set([
    ...categories.map(c => c.name),
    ...courses.map(c => c.category).filter(Boolean) as string[]
  ]));

  const availableSubCategories = Array.from(new Set([
    ...(selectedCategory === 'All' 
      ? categories.flatMap(c => c.subCategories || []) 
      : (categories.find(c => c.name === selectedCategory)?.subCategories || [])),
    ...(courses
      .filter(c => selectedCategory === 'All' || c.category === selectedCategory)
      .map(c => c.subCategory)
      .filter(Boolean) as string[])
  ]));

  const filteredBlockCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'All' || course.subCategory === selectedSubCategory;
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.subtitle && course.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.subCategory && course.subCategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (course.top_title && course.top_title.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      
      {/* 1. HERO HEADER */}
      <section className="bg-slate-950 text-white py-20 px-6 rounded-b-[3rem] shadow-2xl mb-6">
        <div className="container-max mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Star className="w-4 h-4 text-amber-400" /> Education Hub Framework
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">All Courses &amp; Global Certifications</h1>
          <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Adaptive sequential pathways, official European certifications, and direct career placements.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => navigateTo('#applications?tab=Education')} 
              className="px-9 py-4 bg-brand-600 hover:bg-brand-500 font-black rounded-xl text-base transition-all shadow-lg cursor-pointer"
            >
              Enroll in a Course
            </button>
            <button 
              onClick={() => scrollTo('catalog-blocks')} 
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-base transition-all border border-white/20 cursor-pointer backdrop-blur-md"
            >
              Browse Catalog Blocks ({courses.length})
            </button>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STICKY SUB-NAVIGATION BAR */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 mb-10 transition-all duration-300 shadow-2xs">
        <div className="container-max mx-auto px-6 flex items-center justify-start md:justify-center gap-3 md:gap-6 overflow-x-auto hide-scrollbar">
          {mainViewCourses.map((course, idx) => (
            <button
              key={course.id}
              onClick={() => scrollTo(`course-${course.id}`)}
              className={`text-xs md:text-sm font-bold pb-1.5 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeNav === `course-${course.id}`
                  ? 'text-brand-600 border-b-2 border-brand-600' 
                  : 'text-slate-600 hover:text-slate-900 border-b-2 border-transparent'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-700 text-[10px] flex items-center justify-center font-black">
                {idx + 1}
              </span>
              <span>{course.name}</span>
            </button>
          ))}

          <button
            onClick={() => scrollTo('catalog-blocks')}
            className={`text-xs md:text-sm font-bold pb-1.5 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeNav === 'catalog-blocks' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-indigo-600 hover:text-indigo-800 border-b-2 border-transparent'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Catalog Blocks &amp; Certifications</span>
          </button>
        </div>
      </div>

      <div className="container-max mx-auto px-6 space-y-24 pb-20">
        
        {/* 3. DYNAMIC SEQUENTIAL EXPANSION (Renders every Main View Course in position order) */}
        {mainViewCourses.map((course, index) => {
          const matchingPaths = paths
            .filter(p => p.linkedCourseId === course.id || p.id === course.pathId || p.linkedCourseName === course.name)
            .sort((a, b) => (a.position || 99) - (b.position || 99));
          const displayPathItems = matchingPaths.length > 0 
            ? matchingPaths 
            : (paths.length > 0 
                ? [...paths].sort((a, b) => (a.position || 99) - (b.position || 99)) 
                : [{ id: `def-${course.id}`, name: course.methods || 'Standard Adaptive Plan', methods: 'AI + Adaptive Tutoring', starting: '', ending: '', remarks: '' }]);

          return (
            <section 
              key={course.id} 
              id={`course-${course.id}`} 
              className="scroll-mt-32 pt-6 border-b border-slate-200/80 pb-20 last:border-b-0"
            >
              {/* Course Header Banner */}
              <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-[11px] font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200 shadow-2xs">
                    Position #{index + 1} • {course.top_title || course.category || 'Specialized Track'}
                  </span>
                  {course.subCategory && (
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {course.subCategory}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-1 mb-2">{course.name}</h2>
                <p className="text-slate-600 text-base">{course.subtitle || 'Comprehensive enterprise-level education & certification framework.'}</p>
              </div>

              {/* Two-Column Layout: Delivery Paths & Guaranteed Benefits */}
              <div className="grid lg:grid-cols-12 gap-8 items-start mb-8">
                
                {/* Dynamically Fetched Paths Column */}
                <div className="lg:col-span-6 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-600" />
                      Delivery Paths &amp; Methods ({displayPathItems.length})
                    </span>
                    {displayPathItems.length > 3 && (
                      <span className="text-[10px] text-brand-600 font-bold bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">
                        ↕️ Scroll to view all
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 rounded-2xl">
                    {displayPathItems.map((pathItem, pIdx) => {
                      const isActive = pIdx === 0 || pathItem.id === course.pathId;
                      const pathTitle = pathItem.name || course.methods;
                      const pathMethod = pathItem.methods || 'Standard Adaptive Plan';
                      
                      return (
                        <div 
                          key={pathItem.id || pIdx} 
                          className={`bg-white p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs transition-all ${
                            isActive ? 'border-2 border-brand-500 bg-brand-50/10' : 'border-slate-200 hover:border-brand-300'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isActive ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <BrainCircuit className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                              <div className="font-bold text-slate-900 text-sm sm:text-base truncate">{pathTitle}</div>
                              <div className="text-[11px] text-slate-500 truncate">{pathMethod}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            <button 
                              onClick={() => scrollTo(`specs-${course.id}`)} 
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1"
                            >
                              <BookOpen className="w-3.5 h-3.5" /> Details
                            </button>
                            <button 
                              onClick={() => openCourseDemo(course.name)} 
                              className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                            >
                              <Play className="w-3.5 h-3.5" /> Course Demo
                            </button>
                            <button 
                              onClick={() => navigateTo(`#applications?course=${encodeURIComponent(course.name)}&path=${encodeURIComponent(pathTitle)}`)} 
                              className="px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all shadow-xs"
                            >
                              Enroll
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Guaranteed Benefits Card */}
                <div className="lg:col-span-6 bg-slate-900 p-7 sm:p-8 rounded-3xl text-white shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
                    <h3 className="text-xl font-black text-white">Guaranteed Career Benefits</h3>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                      Standard Guarantee
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {benefitItems.map((b) => (
                      <div 
                        key={b.title} 
                        onClick={() => navigateTo(b.link)} 
                        className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                          <b.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">{b.title}</h4>
                          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                            <span className="text-amber-400 font-bold">{b.highlight}</span> {b.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Dynamic Syllabus & Module Breakdown Block */}
              {course.courseStructure && (
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-200/80 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-black uppercase tracking-wider text-indigo-700 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-600" /> Syllabus &amp; Module Progression
                    </h4>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                      {course.chapter || 'Full'} Chapters
                    </span>
                  </div>
                  <div className="whitespace-pre-line text-slate-700 text-sm leading-relaxed p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-200">
                    {course.courseStructure}
                  </div>
                </div>
              )}

              {/* Clickable Detailed Course Breakdown Specifications */}
              <div id={`specs-${course.id}`} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-black uppercase tracking-wider text-brand-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-brand-600" /> Course Specifications &amp; Overview
                  </h4>
                  <button 
                    onClick={() => navigateTo(`#course-${course.id}`)}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Standalone Specs Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Chapters &amp; Units</div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">{course.chapter} Chapters</div>
                    <div className="text-xs text-slate-500 mt-1">Full curriculum handouts included</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Course Duration</div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">{course.duration}</div>
                    <div className="text-xs text-slate-500 mt-1">Flexible pacing available</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Course Fee</div>
                    <div className="text-lg font-black text-emerald-600 mt-0.5">{course.fee}</div>
                    <div className="text-xs text-slate-500 mt-1">Includes certification vouchers</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Assigned Faculty</div>
                    <div className="text-sm font-black text-slate-900 mt-0.5 truncate">{course.staff || 'Certified Instructor'}</div>
                    <div className="text-xs text-slate-500 mt-1">Verified academic practitioner</div>
                  </div>
                </div>
              </div>

              {/* ILA Companion Promotion Footer */}
              <div className="bg-slate-950 p-7 sm:p-9 rounded-3xl text-white border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="text-amber-400 font-black uppercase text-xs mb-1.5 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" /> Royal Lifetime Mentorship
                  </div>
                  <h3 className="text-2xl font-black text-amber-100">ILA Companion AI &amp; Counselor</h3>
                  <p className="text-slate-300 text-sm mt-1 max-w-xl">
                    24/7 intelligent tutoring assistant, mock exam simulation evaluations, and real-time German career counseling.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button 
                    onClick={() => openCourseDemo(course.name)} 
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs whitespace-nowrap cursor-pointer transition-all border border-white/20"
                  >
                    Course Demo
                  </button>
                  <button 
                    onClick={() => navigateTo('#ilas-with-you')} 
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs whitespace-nowrap cursor-pointer transition-all shadow-md"
                  >
                    Access Companion Now →
                  </button>
                </div>
              </div>

            </section>
          );
        })}

        {/* 4. BLOCKS VIEW & DYNAMIC CATEGORY / SUB-CATEGORY FILTERING SECTION */}
        <section id="catalog-blocks" className="scroll-mt-32 border-t-2 border-slate-200/80 pt-16">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-indigo-700 uppercase bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
              Interactive Course Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 mb-2">
              All Courses &amp; Specialized Certifications
            </h2>
            <p className="text-slate-600 text-base">
              Filter by academic taxonomy, toggle between Grid and Line views, or open dedicated standalone specification pages.
            </p>
          </div>

          {/* DYNAMIC FILTER & CONTROLS TOOLBAR */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm mb-10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Primary Category Filter Dropdown */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-brand-600" />
                  <span>Category</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedSubCategory('All');
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value="All">All Categories ({allAvailableCategories.length})</option>
                  {allAvailableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Sub-Category Filter Dropdown */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-brand-600" />
                  <span>Sub-Category</span>
                </label>
                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value="All">All Sub-Categories ({availableSubCategories.length})</option>
                  {availableSubCategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Real-Time Keyword Search Input */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span>Search Courses</span>
                </label>
                <input
                  type="text"
                  placeholder="Search by title, topic, tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              {/* View Switcher: Grid View vs Line View */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1.5">
                  Display View Layout
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid View</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('line')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                      viewMode === 'line'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Line View</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Active Results Summary & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-500">
                Showing <span className="text-slate-900 font-extrabold">{filteredBlockCourses.length}</span> of {courses.length} Courses
                {selectedCategory !== 'All' && ` • Category: ${selectedCategory}`}
                {selectedSubCategory !== 'All' && ` • Sub-Category: ${selectedSubCategory}`}
              </span>

              {(selectedCategory !== 'All' || selectedSubCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSubCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-brand-600 hover:text-brand-800 font-bold underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>

          {/* DYNAMIC BLOCKS RENDERING (Grid View vs Line View) */}
          {filteredBlockCourses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-800">No courses found matching your criteria</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Try resetting the category filter or searching for a different keyword.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSelectedSubCategory('All'); setSearchQuery(''); }}
                className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW RENDERING */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlockCourses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-brand-400 hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-100">
                        {course.category || 'Certification'}
                      </span>
                      {course.subCategory && (
                        <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded truncate max-w-[140px]">
                          {course.subCategory}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-black text-lg text-slate-900 group-hover:text-brand-700 transition-colors">
                        {course.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {course.subtitle || 'Official certification track with enterprise project coursework.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Duration</span>
                        <span className="font-black text-slate-800">{course.duration}</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Chapters</span>
                        <span className="font-black text-slate-800">{course.chapter} Ch</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl text-center">
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Fee</span>
                        <span className="font-black text-emerald-600">{course.fee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => openCourseDemo(course.name)}
                      className="flex-1 py-2.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Course Demo</span>
                    </button>
                    <button
                      onClick={() => navigateTo(`#course-${course.id}`)}
                      className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* LINE (LIST) VIEW RENDERING */
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
              {filteredBlockCourses.map((course) => (
                <div 
                  key={course.id}
                  className="p-5 hover:bg-slate-50/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 flex items-center justify-center shrink-0 font-black text-xs mt-0.5">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                          {course.category || 'Program'}
                        </span>
                        {course.subCategory && (
                          <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">
                            {course.subCategory}
                          </span>
                        )}
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          {course.fee}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900 group-hover:text-brand-700 transition-colors">
                        {course.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xl">
                        {course.subtitle || 'Verified certification and delivery pathways.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    <span className="text-xs font-bold text-slate-500 hidden lg:inline mr-2">
                      ⏱️ {course.duration} • 📖 {course.chapter} Chapters
                    </span>
                    <button
                      onClick={() => openCourseDemo(course.name)}
                      className="px-3.5 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Course Demo</span>
                    </button>
                    <button
                      onClick={() => navigateTo(`#course-${course.id}`)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <span>View Specs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </div>
  );
}