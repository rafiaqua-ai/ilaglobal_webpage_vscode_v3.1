import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize, Heart, MessageCircle, Settings, MonitorPlay, Hand, SkipBack, SkipForward, Menu, X, Share2, Command, Search, Image as ImageIcon, Music, Video, FileText } from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  status: 'Complete' | 'In Progress' | 'Locked';
  type?: 'text' | 'video' | 'picture' | 'song';
}

const LibraryAndClassRoom: React.FC = () => {
  const [libraryType, setLibraryType] = useState<'TUTOR' | 'AI'>('TUTOR');
  
  const tutorChapters: Chapter[] = [
    { id: 1, title: 'INTRO', status: 'Complete', type: 'text' },
    { id: 2, title: 'FUNDAMENTALS', status: 'In Progress', type: 'text' },
    { id: 3, title: 'ADVANCED CONCEPTS', status: 'Locked', type: 'text' },
    { id: 4, title: 'PRACTICE SET 1', status: 'Locked', type: 'text' },
    { id: 5, title: 'CONTENT', status: 'Locked', type: 'text' },
  ];

  const aiChapters: Chapter[] = [
    { id: 1, title: 'INTRO', status: 'Complete', type: 'text' },
    { id: 13, title: 'VIDEOS', status: 'In Progress', type: 'video' },
    { id: 14, title: 'PICTURES', status: 'Locked', type: 'picture' },
    { id: 15, title: 'SONGS', status: 'Locked', type: 'song' },
  ];

  const chapters = libraryType === 'TUTOR' ? tutorChapters : aiChapters;
  const [isPlaying, setIsPlaying] = useState(false);

  const navigationItems = [
    'HOD DB',
    'LIBRARY & CLASS ROOM',
    'WALKIN ENROLLING',
    'ONLINE ENQUIRY',
    'SERVICES & BATCHES',
    'COURSE CREATOR',
    'AI COURSE CREATOR',
    'Task Delegation',
    'STAFF & ATTENDANCE',
    'STUDENT ATTN',
    'EXAM REST'
  ];

  const courseBlocks = [
    { title: 'SAP', desc: 'Enterprise Resource Planning' },
    { title: 'Social Media', desc: 'Marketing Strategies' },
    { title: 'Software Training', desc: 'Full Stack Development' },
    { title: 'German Language', desc: 'A1 to C2 Levels' },
    { title: 'IELTS', desc: 'English Proficiency' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Master Navigation Header */}
      <header className="bg-brand-900 text-white shadow-md sticky top-0 z-50">
        <div className="flex overflow-x-auto no-scrollbar items-center px-4 py-3 gap-6 text-sm font-medium whitespace-nowrap">
          {navigationItems.map(item => (
            <button key={item} className={`hover:text-brand-300 transition-colors ${item === 'LIBRARY & CLASS ROOM' ? 'text-accent-400 border-b-2 border-accent-400' : ''}`}>
              {item}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 p-4 gap-4 max-w-7xl mx-auto w-full">
        
        {/* Library Sidebar (Left) */}
        <aside className="w-full lg:w-64 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 bg-brand-50 border-b border-brand-100 flex flex-col gap-3">
            <div>
              <h2 className="font-bold text-brand-900 text-lg">Course Name</h2>
              <p className="text-sm text-brand-700">Book Name</p>
            </div>
            
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-brand-200">
              <button 
                onClick={() => setLibraryType('TUTOR')}
                className={`flex-1 text-xs font-bold py-1.5 rounded-md ${libraryType === 'TUTOR' ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                TUTOR LIBRARY
              </button>
              <button 
                onClick={() => setLibraryType('AI')}
                className={`flex-1 text-xs font-bold py-1.5 rounded-md ${libraryType === 'AI' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                AI CLASS LIBRARY
              </button>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center justify-between">
              Chapters 
              {libraryType === 'AI' && <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">AI Gen</span>}
            </h3>
            <div className="space-y-3">
              {chapters.map((chapter) => (
                <div key={chapter.id} className={`p-3 rounded-lg border flex flex-col gap-2 ${chapter.status === 'Locked' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-brand-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-slate-700 flex items-center gap-1.5">
                      {chapter.type === 'video' ? <Video className="w-3.5 h-3.5 text-indigo-500" /> : 
                       chapter.type === 'picture' ? <ImageIcon className="w-3.5 h-3.5 text-pink-500" /> :
                       chapter.type === 'song' ? <Music className="w-3.5 h-3.5 text-purple-500" /> :
                       <FileText className="w-3.5 h-3.5 text-brand-500" />
                      }
                      {chapter.id}. {chapter.title}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      chapter.status === 'Complete' ? 'bg-green-100 text-green-700' :
                      chapter.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {chapter.status}
                    </span>
                  </div>
                  {chapter.status === 'Complete' && (
                    <button className="flex items-center gap-1 text-[11px] text-brand-600 hover:text-brand-700 font-bold bg-brand-50 self-start px-2 py-1 rounded">
                      <MonitorPlay className="w-3 h-3" /> Saved Video / Play
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Center Area */}
        <main className="flex-1 flex flex-col gap-4">
          
          {/* Main Video & AI Screen */}
          <div className="bg-black rounded-xl aspect-video flex flex-col relative overflow-hidden shadow-md">
            {/* Display Area */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="z-0 flex flex-col items-center gap-2 opacity-50">
                {libraryType === 'AI' ? <Search className="w-12 h-12 text-indigo-400" /> : <Play className="w-12 h-12 text-white" />}
                <p className="text-white text-sm">
                  {libraryType === 'AI' ? 'AI Interactive Media Area' : 'Text Explanation / Video Area'}
                </p>
              </div>
            </div>
            
            {/* Bottom Controls */}
            <div className="absolute bottom-0 w-full p-4 z-20 flex flex-col gap-2">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/30 rounded-full cursor-pointer">
                <div className="w-1/3 h-full bg-brand-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between text-white mt-1">
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-brand-400">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <span className="text-xs font-medium">12:34 / 45:00</span>
                  <Volume2 className="w-5 h-5 hover:text-brand-400 cursor-pointer" />
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs hover:text-brand-400"><Share2 className="w-4 h-4"/> Share Demo</button>
                  <button className="flex items-center gap-1 text-xs hover:text-brand-400"><Command className="w-4 h-4"/> Command</button>
                  <button className="flex items-center gap-1 text-xs hover:text-brand-400 border border-white/30 px-2 py-1 rounded text-white bg-white/10">Ask Doubts by Text</button>
                  <Heart className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                  <span className="text-xs font-bold border border-white/50 px-1 rounded cursor-pointer hover:text-brand-400">CC</span>
                  <Settings className="w-5 h-5 hover:text-brand-400 cursor-pointer" />
                  <Maximize className="w-5 h-5 hover:text-brand-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
          
        </main>

        {/* Tutor & Chapter Right Panel */}
        <aside className="w-full lg:w-72 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          <div className={`p-4 text-white flex justify-between items-center ${libraryType === 'AI' ? 'bg-indigo-900' : 'bg-slate-800'}`}>
            <div className="flex flex-col">
              <span className="text-xs font-medium opacity-80">Touch to Pause</span>
              <span className="text-sm font-bold">Ask Voice</span>
            </div>
            <div className="flex gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 ${libraryType === 'AI' ? 'bg-indigo-700 border-indigo-400' : 'bg-slate-600 border-brand-500'}`}>
                <span className="text-[10px] font-bold">{libraryType === 'AI' ? 'AI Bot' : 'Tutor'}</span>
              </div>
              <button className={`p-2 rounded-lg transition ${libraryType === 'AI' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-brand-600 hover:bg-brand-500'}`}>
                <Hand className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4 flex-1 flex flex-col gap-4 bg-slate-50">
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Sub-titles</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm p-2 bg-white rounded border border-slate-200 shadow-sm">
                  <span className="text-slate-700 font-medium">1.1 Introduction</span>
                  <span className="text-[10px] text-green-600 font-bold">Complete</span>
                </div>
                <div className={`flex justify-between items-center text-sm p-2 rounded shadow-sm ${libraryType === 'AI' ? 'bg-indigo-50 border-indigo-200' : 'bg-brand-50 border-brand-200'}`}>
                  <span className={`font-medium ${libraryType === 'AI' ? 'text-indigo-700' : 'text-brand-700'}`}>1.2 Core Topic</span>
                  <span className="text-[10px] text-blue-600 font-bold">In Progress</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-slate-100 rounded border border-slate-200 opacity-60">
                  <span className="text-slate-500">1.3 Summary</span>
                  <span className="text-[10px] text-slate-500">Locked</span>
                </div>
              </div>
            </div>
            
            <div className="mt-auto bg-white border border-slate-200 rounded-lg p-3 h-48 flex flex-col">
              <h4 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Chat History</h4>
              <div className="flex-1 overflow-y-auto space-y-2">
                <div className={`p-2 rounded-lg text-xs w-11/12 ${libraryType === 'AI' ? 'bg-indigo-50 text-indigo-900' : 'bg-brand-50 text-brand-900'}`}>
                  What is the main topic today?
                </div>
                <div className="bg-slate-100 p-2 rounded-lg text-xs text-slate-700 w-11/12 ml-auto">
                  We are discussing fundamentals.
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Course Blocks Grid (Bottom) */}
      <div className="w-full max-w-7xl mx-auto p-4 mb-8">
        <h3 className="font-bold text-slate-800 text-lg mb-4">Course Previews</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {courseBlocks.map(block => (
            <div key={block.title} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="h-12 w-12 bg-brand-100 rounded-lg mb-3 flex items-center justify-center text-brand-600 font-bold">
                {block.title.charAt(0)}
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">{block.title}</h4>
              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{block.desc}</p>
              <button className="text-[10px] font-bold text-brand-600 flex items-center gap-1 group-hover:text-brand-700">
                Preview & Benefits <SkipForward className="w-3 h-3"/>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LibraryAndClassRoom;