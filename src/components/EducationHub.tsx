import React, { useState } from 'react';
import LibraryAndClassRoom from './LibraryAndClassRoom';
import ServicesAndBatches from './ServicesAndBatches';
import CourseCreator from './CourseCreator';
import AICourseCreator from './AICourseCreator';
import { BookOpen, Calendar, PlusCircle, Sparkles, Users, UserCheck, CheckSquare, Settings } from 'lucide-react';

const EducationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('LIBRARY & CLASS ROOM');

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

  const renderContent = () => {
    switch (activeTab) {
      case 'LIBRARY & CLASS ROOM':
        return <LibraryAndClassRoom />;
      case 'SERVICES & BATCHES':
        return <ServicesAndBatches />;
      case 'COURSE CREATOR':
        return <CourseCreator />;
      case 'AI COURSE CREATOR':
        return <AICourseCreator />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-700 mb-2">{activeTab}</h2>
            <p className="text-sm text-center max-w-md">
              This module is currently under development. The complete functional components for this section will be integrated here shortly.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[calc(100vh-12rem)] bg-slate-50 relative overflow-hidden rounded-xl border border-slate-200">
      
      {/* Education Hub - Master Navigation Header */}
      <div className="bg-brand-900 border-b border-brand-800 shadow-sm z-10 sticky top-0 overflow-x-auto no-scrollbar">
        <div className="flex px-2 py-2 md:px-4 md:py-3 gap-2 min-w-max">
          {navigationItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === item 
                  ? 'bg-accent-500 text-brand-900 shadow-sm' 
                  : 'text-brand-100 hover:bg-brand-800 hover:text-white'
              }`}
            >
              {item === 'LIBRARY & CLASS ROOM' && <BookOpen className="w-4 h-4" />}
              {item === 'SERVICES & BATCHES' && <Calendar className="w-4 h-4" />}
              {item === 'COURSE CREATOR' && <PlusCircle className="w-4 h-4" />}
              {item === 'AI COURSE CREATOR' && <Sparkles className="w-4 h-4" />}
              {item === 'Task Delegation' && <CheckSquare className="w-4 h-4" />}
              {item === 'STAFF & ATTENDANCE' && <Users className="w-4 h-4" />}
              {item === 'STUDENT ATTN' && <UserCheck className="w-4 h-4" />}
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Area */}
      <div className="flex-1 w-full bg-slate-50 overflow-y-auto no-scrollbar relative">
        <div className="w-full h-full">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EducationHub;