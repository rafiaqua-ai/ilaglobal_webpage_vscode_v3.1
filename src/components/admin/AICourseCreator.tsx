import React, { useState, useEffect } from 'react';
import { 
  Save, Edit, RefreshCw, Trash2, Send, CheckSquare, Search, 
  Book, Video, Image as ImageIcon, Headphones, Music, BookOpen, 
  Sparkles, CheckCircle2, Play, ArrowRight, Shield, Zap, 
  Sliders, Layers, Award
} from 'lucide-react';
import { 
  getGlobalCourses, setGlobalCourses, getGlobalCategories, 
  GlobalCourse, GlobalCategory, AICoursePayload 
} from '../../lib/db';

interface AICourseCreatorProps {
  onNavigateTab?: (tabName: string) => void;
}

const AICourseCreator: React.FC<AICourseCreatorProps> = ({ onNavigateTab }) => {
  const [courseName, setCourseName] = useState('Kids German Basics (AI Generated)');
  const [category, setCategory] = useState('German Language');
  const [numChapters, setNumChapters] = useState(15);
  const [duration, setDuration] = useState('45 Mins/Day');
  const [numStrategies, setNumStrategies] = useState(3);
  const [aiTutorPersona, setAiTutorPersona] = useState('Intelli-Coach AI (Autonomous Digital Tutor)');
  
  const [selectedMedia, setSelectedMedia] = useState<string[]>([
    'BOOKS', 'ONLINE MATERIALS', 'VIDEOS', 'IMAGES', 'AUDIOS', 'SONGS'
  ]);
  
  const [availableCategories, setAvailableCategories] = useState<GlobalCategory[]>([]);
  const [processingState, setProcessingState] = useState<'IDLE' | 'PROCESSING' | 'COMPLETED'>('IDLE');
  const [generatedPayload, setGeneratedPayload] = useState<AICoursePayload | null>(null);

  useEffect(() => {
    setAvailableCategories(getGlobalCategories());
  }, []);

  const toggleMedia = (mediaType: string) => {
    setSelectedMedia(prev => 
      prev.includes(mediaType) 
        ? prev.filter(m => m !== mediaType) 
        : [...prev, mediaType]
    );
  };

  const handleGenerateAICourse = () => {
    setProcessingState('PROCESSING');
    
    setTimeout(() => {
      const payload: AICoursePayload = {
        curriculumOverview: `Automated AI multimodal syllabus generated for "${courseName}" incorporating ${numChapters} chapters, adaptive whiteboard drill synthesis, and 24/7 AI tutor conversational feedback.`,
        sourceLibraries: ['Goethe CEFR Standard Digital Repository', 'Open German Educational Corpus', 'Studio d Multimedia Archive', 'Intelli-Coach Speech Synthesis Engine'],
        strategiesApplied: [
          'Micro-learning 15-minute spaced repetition',
          'Interactive Whiteboard drill with instant syntax validation',
          'Bimodal audio-visual phonetics calibration'
        ],
        aiTutorPersona: aiTutorPersona,
        generatedWhiteboardNotes: `• Module Focus: Daily Survival Sentences & Phonetic Patterns\n• Rule: Verb occupies Position 2 in declarative German main clauses (V2 Word Order).\n• Interactive drill: Practice greeting forms (Guten Morgen vs. Schönen Tag).`,
        sampleExercise: {
          question: 'Which greeting is formally used in German professional meetings before 11:00 AM?',
          options: ['Guten Abend', 'Guten Morgen', 'Gute Nacht', 'Tschüss'],
          correctAnswer: 'Guten Morgen',
          explanation: '"Guten Morgen" is the formal greeting for morning hours until midday in professional German.'
        },
        customChapters: [
          {
            id: 'intro',
            title: '1. Intro: Welcome & AI Course Calibration',
            type: 'intro',
            duration: '05:00',
            status: 'Completed',
            subtitles: [
              {
                id: 's1',
                title: '1.1 Autonomous AI Instructor Welcome',
                timestamp: '00:00',
                seconds: 0,
                status: 'Complete',
                topic: `${courseName} - Interactive Orientation`,
                notes: `Welcome to the AI classroom. Intelli-Coach AI adapts content in real-time based on learner pace.`,
                keyRules: `• Active voice responses enhance pronunciation confidence.`,
                practicePrompt: `Repeat the greeting aloud after the AI tutor.`
              },
              {
                id: 's2',
                title: '1.2 Learning Objectives & Flashcard Drills',
                timestamp: '03:15',
                seconds: 195,
                status: 'In Progress',
                topic: `Core Terminology & Strategy Breakdown`,
                notes: `Reviewing vocabulary decks, song mnemonics, and adaptive grammar rules.`,
                keyRules: `• Master core nouns with definite articles (der/die/das).`,
                practicePrompt: `Complete the matching exercise on the interactive whiteboard.`
              }
            ]
          },
          {
            id: 'c1',
            title: '2. Alphabet, Phonetics & Survival Greetings',
            type: 'video',
            duration: '12:00',
            status: 'Ready',
            subtitles: [
              {
                id: 's3',
                title: '2.1 Vowel Sounds & Umlauts (ä, ö, ü)',
                timestamp: '00:00',
                seconds: 0,
                status: 'Ready',
                topic: `Phonetics & Audio Calibration`,
                notes: `Precision audio waveforms demonstrating mouth shape for German Umlauts.`,
                keyRules: `• Umlauts shift pronunciation significantly.`,
                practicePrompt: `Record your audio pronunciation for AI score evaluation.`
              }
            ]
          },
          {
            id: 'c2',
            title: '3. Numbers, Time & Daily Routine Songs',
            type: 'song',
            duration: '08:30',
            status: 'Ready'
          },
          {
            id: 'c3',
            title: '4. Essential Food, Animals & Picture Cards',
            type: 'picture',
            duration: '15:00',
            status: 'Ready'
          }
        ]
      };

      setGeneratedPayload(payload);
      setProcessingState('COMPLETED');
    }, 1200);
  };

  // Add to Library and immediately Launch Test Classroom
  const handleAddToLibraryAndTest = () => {
    const existingCourses = getGlobalCourses();
    
    const newAICourse: GlobalCourse = {
      id: `ai-${Date.now()}`,
      name: courseName.trim(),
      top_title: 'AI Generated Classroom',
      subtitle: `Instant AI-Powered Path: ${numChapters} Interactive Modules with Curated Media & Live Synthetic Tutor`,
      show_in_sub_nav: true,
      displayPosition: 0,
      staff: aiTutorPersona,
      chapter: numChapters.toString(),
      duration: duration,
      methods: 'Instant AI Streaming [No Batch Required]',
      materials: `AI Generated Media (${selectedMedia.join(', ')})`,
      fee: '$0 (Test Run)',
      students: '1 (Active Test Session)',
      category: category,
      subCategory: 'AI Adaptive Learning',
      libraryType: 'AI',
      courseStructure: `Chapter 1: AI Orientation & Vocabulary Builder\nChapter 2: Interactive Video Lecture & Pronunciation Lab\nChapter 3: Whiteboard Exercises & Rapid Quizzes`,
      aiPayload: generatedPayload || undefined,
      enrolledStudentsList: [
        { id: 's-test', name: 'Super Admin (Live Tester)', email: 'admin@ilas.global', status: 'In Class', joinedAt: 'Just Now', attendanceScore: 100 }
      ]
    };

    // Save into central courses DB
    const updatedCourses = [newAICourse, ...existingCourses.filter(c => c.id !== newAICourse.id)];
    setGlobalCourses(updatedCourses);
    
    // Store active course ID for immediate test classroom loading
    localStorage.setItem('ilas_active_library_course_id', newAICourse.id);

    // Dispatch event
    window.dispatchEvent(new CustomEvent('ilas-courses-changed'));

    // Navigate to Library & Classroom
    if (onNavigateTab) {
      onNavigateTab('LIBRARY & CLASS ROOM');
    } else {
      window.dispatchEvent(new CustomEvent('ilas-navigate-tab', { detail: { tab: 'LIBRARY & CLASS ROOM', courseId: newAICourse.id } }));
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full flex flex-col gap-6 animate-in fade-in font-sans">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-brand-900 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-700/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" /> Autonomous AI Curriculum Engine
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">AI Course Creator & Instant Classroom Pipeline</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Generate complete AI course payloads with multimodal videos, flashcards, synthetic audios, songs, and adaptive whiteboard drills. Connect directly to the Library & Classroom for instant test-running without batch scheduling.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNavigateTab ? onNavigateTab('LIBRARY & CLASS ROOM') : window.dispatchEvent(new CustomEvent('ilas-navigate-tab', { detail: { tab: 'LIBRARY & CLASS ROOM' } }))}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-2xl transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-300" /> Open Library
          </button>
        </div>
      </div>

      {/* Generator Configuration Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 space-y-6">
        <h2 className="text-lg font-black text-indigo-950 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sliders className="w-5 h-5 text-indigo-600" /> AI Course Search & Synthesis Parameters
        </h2>
        
        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700">COURSE NAME *</label>
            <input 
              type="text" 
              className="border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50" 
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g. Kids German Basics" 
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700">PRIMARY CATEGORY</label>
            <select
              className="border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {availableCategories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
              <option value="German Language">German Language</option>
              <option value="IELTS & English">IELTS & English</option>
              <option value="Software & Coding">Software & Coding</option>
              <option value="AI & Robotics">AI & Robotics</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700">NO. OF CHAPTERS</label>
            <input 
              type="number" 
              min={1}
              max={50}
              className="border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50" 
              value={numChapters}
              onChange={(e) => setNumChapters(parseInt(e.target.value) || 1)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-700">CLASS DURATION</label>
            <input 
              type="text" 
              className="border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50" 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 45 Mins/Day" 
            />
          </div>

          <div className="flex flex-col gap-1 lg:col-span-2">
            <label className="text-xs font-bold text-slate-700">AI DIGITAL TUTOR PERSONA</label>
            <input 
              type="text" 
              className="border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-indigo-900 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50" 
              value={aiTutorPersona}
              onChange={(e) => setAiTutorPersona(e.target.value)}
              placeholder="e.g. Intelli-Coach German Lead" 
            />
          </div>

          <div className="flex flex-col gap-1 lg:col-span-2">
            <label className="text-xs font-bold text-slate-700">STRATEGY ALGORITHM COUNT</label>
            <input 
              type="number" 
              min={1}
              max={10}
              className="border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 bg-slate-50/50" 
              value={numStrategies}
              onChange={(e) => setNumStrategies(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>

        {/* Media Selection Parameters */}
        <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-100 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> AI Multimodal Media Search Parameters
            </h3>
            <span className="text-[10px] text-indigo-700 font-bold">
              {selectedMedia.length} Media Channels Active
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { id: 'BOOKS', label: 'Books / Text', icon: Book },
              { id: 'ONLINE MATERIALS', label: 'Online Materials', icon: BookOpen },
              { id: 'VIDEOS', label: 'Curated Video Clips', icon: Video },
              { id: 'IMAGES', label: 'Flashcards & Visuals', icon: ImageIcon },
              { id: 'AUDIOS', label: 'Synthesized Audios', icon: Headphones },
              { id: 'SONGS', label: 'Educational Songs', icon: Music },
            ].map(item => {
              const Icon = item.icon;
              const isChecked = selectedMedia.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleMedia(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                    isChecked 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isChecked ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <button 
            onClick={handleGenerateAICourse}
            disabled={processingState === 'PROCESSING' || !courseName.trim()}
            className={`px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-white shadow-lg transition-all flex items-center gap-2.5 cursor-pointer ${
              processingState === 'PROCESSING' 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] shadow-indigo-200'
            }`}
          >
            <Sparkles className={`w-4 h-4 text-amber-300 ${processingState === 'PROCESSING' ? 'animate-spin' : ''}`} />
            {processingState === 'PROCESSING' ? 'SYNTHESIZING AI PAYLOAD & MEDIA...' : 'GENERATE AI COURSE PAYLOAD'}
          </button>
        </div>
      </div>

      {/* Generated AI Results Section */}
      {processingState === 'COMPLETED' && generatedPayload && (
        <div className="bg-white rounded-3xl shadow-sm border-2 border-indigo-300 p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                  ✓ Payload Ready
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase">
                  ⚡ Autonomous Stream
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">{courseName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{generatedPayload.curriculumOverview}</p>
            </div>

            {/* Direct Connect to Library & Classroom */}
            <button 
              onClick={handleAddToLibraryAndTest}
              className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer shrink-0"
            >
              <Play className="w-4 h-4 fill-white"/> ADD TO LIBRARY & TEST RUN CLASS →
            </button>
          </div>

          {/* Media Breakdown Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-xs"><Book className="w-4 h-4"/> Text Lessons</div>
              <div className="text-base font-black text-slate-900">{numChapters} Modules</div>
              <span className="text-[10px] text-slate-400">Structured CEFR syntax</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs"><Video className="w-4 h-4"/> Video Clips</div>
              <div className="text-base font-black text-slate-900">8 Curated Clips</div>
              <span className="text-[10px] text-slate-400">Synced subtitles</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold text-xs"><ImageIcon className="w-4 h-4"/> Flashcards</div>
              <div className="text-base font-black text-slate-900">45 Visual Cards</div>
              <span className="text-[10px] text-slate-400">Mnemonics included</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs"><Headphones className="w-4 h-4"/> Audio Waves</div>
              <div className="text-base font-black text-slate-900">Native Audio</div>
              <span className="text-[10px] text-slate-400">Pronunciation tuning</span>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs"><Music className="w-4 h-4"/> Songs & Melodies</div>
              <div className="text-base font-black text-amber-950">4 Mnemonics</div>
              <span className="text-[10px] text-amber-700">Rhythm memory</span>
            </div>
          </div>

          {/* Whiteboard Notes Preview */}
          <div className="bg-slate-900 text-white p-4 md:p-5 rounded-2xl border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Synthesized Whiteboard Canvas Notes:
              </span>
              <span className="text-[10px]">Auto-Generated Drill</span>
            </div>
            <pre className="whitespace-pre-wrap text-slate-300 text-xs font-sans">
              {generatedPayload.generatedWhiteboardNotes}
            </pre>
          </div>

          {/* Interactive Test Question */}
          {generatedPayload.sampleExercise && (
            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-2 text-xs">
              <div className="font-bold text-indigo-950">Sample Interactive Whiteboard Question:</div>
              <p className="font-semibold text-slate-800">{generatedPayload.sampleExercise.question}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {generatedPayload.sampleExercise.options.map((opt, oIdx) => (
                  <div key={oIdx} className="p-2 bg-white rounded-xl border border-slate-200 font-bold text-slate-700 text-center">
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 font-medium">
              Ready to stream in Library & Classroom without creating manual batches.
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleGenerateAICourse}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-Synthesize
              </button>

              <button 
                onClick={handleAddToLibraryAndTest}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Launch Test Class
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AICourseCreator;