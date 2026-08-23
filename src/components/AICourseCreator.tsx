import React, { useState } from 'react';
import { Save, Edit, RefreshCw, Trash2, Send, CheckSquare, Search, Book, Video, Image as ImageIcon, Headphones, Music, BookOpen } from 'lucide-react';

const AICourseCreator: React.FC = () => {
  const [processingState, setProcessingState] = useState<'IDLE' | 'PROCESSING' | 'COMPLETED'>('IDLE');

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

  const handleSearch = () => {
    setProcessingState('PROCESSING');
    setTimeout(() => {
      setProcessingState('COMPLETED');
    }, 2000); // Simulate AI processing delay
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Master Navigation Header */}
      <header className="bg-brand-900 text-white shadow-md sticky top-0 z-50">
        <div className="flex overflow-x-auto no-scrollbar items-center px-4 py-3 gap-6 text-sm font-medium whitespace-nowrap">
          {navigationItems.map(item => (
            <button key={item} className={`hover:text-brand-300 transition-colors ${item === 'AI COURSE CREATOR' ? 'text-accent-400 border-b-2 border-accent-400' : ''}`}>
              {item}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full flex flex-col gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-indigo-900 mb-6 border-b border-indigo-100 pb-2 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-600" /> AI Course Generator
          </h2>
          
          {/* Inputs Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">COURSE NAME</label>
              <input type="text" className="border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500" placeholder="e.g. Kids German Basics" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">NO OF CHAPTERS</label>
              <input type="number" className="border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500" placeholder="e.g. 15" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">CLASS DURATION</label>
              <input type="text" className="border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500" placeholder="e.g. 45 Mins/Day" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">NO OF STRATEGY</label>
              <input type="number" className="border border-slate-300 rounded p-2 text-sm focus:ring-1 focus:ring-indigo-500" placeholder="e.g. 3" />
            </div>
          </div>

          {/* Material Selection */}
          <div className="mb-6 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100">
            <h3 className="text-sm font-bold text-indigo-900 mb-3">AI Media Search Parameters</h3>
            <div className="flex flex-wrap gap-4">
              {['BOOKS', 'ONLINE MATERIALS', 'VIDEOS', 'IMAGES', 'AUDIOS', 'SONGS'].map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked={type === 'VIDEOS' || type === 'SONGS'} />
                  <span className="text-xs font-semibold text-slate-700">{type}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
                <span className="text-xs font-bold text-indigo-700">ORGANISE MATERIALS FOR CLASS ON S1</span>
              </label>
            </div>
          </div>

          {/* Search Action */}
          <div className="flex justify-center mb-6">
            <button 
              onClick={handleSearch}
              disabled={processingState === 'PROCESSING'}
              className={`px-8 py-3 rounded-full font-bold text-white shadow-md transition-all flex items-center gap-2 ${
                processingState === 'PROCESSING' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
              }`}
            >
              <Search className={`w-5 h-5 ${processingState === 'PROCESSING' ? 'animate-spin' : ''}`} />
              {processingState === 'PROCESSING' ? 'PROCESSING AI MATCHES...' : 'SEARCH COURSE'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {processingState === 'COMPLETED' && (
          <div className="bg-white rounded-xl shadow-sm border border-indigo-200 p-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-indigo-900">Kids German Basics (AI Generated)</h2>
                <div className="flex gap-4 mt-2 text-xs font-semibold text-slate-500">
                  <span>Source: Multiple Libraries</span>
                  <span>Chapters: 15</span>
                  <span>Duration: 45 Mins</span>
                  <span>Strategies: 3 Applied</span>
                </div>
              </div>
              <button className="py-2 px-4 bg-brand-600 text-white text-xs font-bold rounded hover:bg-brand-700 shadow-sm flex items-center justify-center gap-2 transition-transform hover:scale-105">
                <BookOpen className="w-4 h-4"/> ADD TO LIBRARY <span className="opacity-80">(AI Class)</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-slate-200 p-3 rounded-lg flex flex-col gap-1">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm"><Book className="w-4 h-4"/> Books / Texts</div>
                <span className="text-xs text-slate-500">12 Sections Extracted</span>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg flex flex-col gap-1">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm"><Video className="w-4 h-4"/> Videos</div>
                <span className="text-xs text-slate-500">8 Curated Clips Linked</span>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg flex flex-col gap-1">
                <div className="flex items-center gap-2 text-pink-700 font-bold text-sm"><ImageIcon className="w-4 h-4"/> Images</div>
                <span className="text-xs text-slate-500">45 Flashcards Generated</span>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg flex flex-col gap-1">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm"><Headphones className="w-4 h-4"/> Audios</div>
                <span className="text-xs text-slate-500">Pronunciation Guide Added</span>
              </div>
              <div className="border border-slate-200 p-3 rounded-lg flex flex-col gap-1 bg-amber-50">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm"><Music className="w-4 h-4"/> Songs</div>
                <span className="text-xs text-slate-500">Alphabet & Numbers Songs Linked</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 justify-end pt-4 border-t border-slate-100">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded hover:bg-slate-200">
                <Edit className="w-4 h-4" /> EDIT
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded hover:bg-red-100 border border-red-200">
                <Trash2 className="w-4 h-4" /> DELETE(*)
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-sm font-bold rounded hover:bg-brand-100 border border-brand-200">
                <RefreshCw className="w-4 h-4" /> UPDATE
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-bold rounded hover:bg-brand-700 shadow">
                <Save className="w-4 h-4" /> SAVE
              </button>
              <div className="h-6 w-px bg-slate-300 mx-1"></div>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700">
                <CheckSquare className="w-3 h-3" /> SEND APPROVAL
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700">
                <Send className="w-3 h-3" /> SEND UPDATE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICourseCreator;