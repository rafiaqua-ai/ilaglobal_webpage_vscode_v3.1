import React, { useState, useEffect } from 'react';
import { Save, Edit, RefreshCw, Trash2, Send, CheckSquare, PlusCircle, Clock } from 'lucide-react';
import { getGlobalServices, setGlobalServices, getGlobalBatches, setGlobalBatches, GlobalService, GlobalBatch } from '../lib/db';

type TabType = 'SERVICE' | 'BATCH';

const ServicesAndBatches: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('SERVICE');
  
  // State for populating forms
  const [selectedService, setSelectedService] = useState<GlobalService | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<GlobalBatch | null>(null);

  const [batchList, setBatchList] = useState<GlobalBatch[]>([]);
  const [serviceList, setServiceList] = useState<GlobalService[]>([]);

  useEffect(() => {
    const loadData = () => {
      setBatchList(getGlobalBatches());
      setServiceList(getGlobalServices());
    };
    loadData();
    window.addEventListener('ilas-services-changed', loadData);
    window.addEventListener('ilas-batches-changed', loadData);
    return () => {
      window.removeEventListener('ilas-services-changed', loadData);
      window.removeEventListener('ilas-batches-changed', loadData);
    };
  }, []);

  // Form Temp States for Timeslots
  const [newTimeSlot, setNewTimeSlot] = useState('');

  const handleRowClick = (item: any) => {
    if (activeTab === 'SERVICE') {
      setSelectedService(item as GlobalService);
    } else {
      setSelectedBatch(item as GlobalBatch);
      setNewTimeSlot('');
    }
  };

  const handleReset = () => {
    if (activeTab === 'SERVICE') {
      setSelectedService(null);
    } else {
      setSelectedBatch(null);
      setNewTimeSlot('');
    }
  };

  const handleDelete = () => {
    const confirmation = window.confirm("SECURITY OVERRIDE: Do you have explicit admin authorization to delete this record? This action is irreversible.");
    if (confirmation) {
       if (activeTab === 'SERVICE' && selectedService) {
         const updated = serviceList.filter(s => s.id !== selectedService.id);
         setGlobalServices(updated);
         setSelectedService(null);
       } else if (activeTab === 'BATCH' && selectedBatch) {
         const updated = batchList.filter(b => b.id !== selectedBatch.id);
         setGlobalBatches(updated);
         setSelectedBatch(null);
       }
       alert("Record Deleted.");
    }
  };

  const handleAddTimeSlot = () => {
    if (!newTimeSlot) return;
    setSelectedBatch(prev => {
       const batch = prev || { id: 'new', name: '', timings: [], starting: '', remarks: '' };
       return { ...batch, timings: [...batch.timings, newTimeSlot] };
    });
    setNewTimeSlot('');
  };

  const handleRemoveTimeSlot = (index: number) => {
    setSelectedBatch(prev => {
       if (!prev) return prev;
       const newTimings = [...prev.timings];
       newTimings.splice(index, 1);
       return { ...prev, timings: newTimings };
    });
  };

  const handleSave = () => {
    if (activeTab === 'SERVICE') {
       if (!selectedService || !selectedService.name || !selectedService.methods) {
         alert("Validation Error: Please provide Name and Method.");
         return;
       }
       if (selectedService.id && selectedService.id !== 'new') {
         const updated = serviceList.map(s => s.id === selectedService.id ? selectedService : s);
         setGlobalServices(updated);
         alert("Service updated.");
       } else {
         const newService = { ...selectedService, id: Math.random().toString(36).substring(2, 9) };
         const updated = [...serviceList, newService];
         setGlobalServices(updated);
         alert("New Service appended to directory.");
       }
       setSelectedService(null);
    } else {
       if (!selectedBatch || !selectedBatch.name) {
         alert("Validation Error: Please provide a batch name.");
         return;
       }
       if (selectedBatch.id && selectedBatch.id !== 'new') {
         const updated = batchList.map(b => b.id === selectedBatch.id ? selectedBatch : b);
         setGlobalBatches(updated);
         alert("Batch updated successfully.");
       } else {
         const newBatch = { ...selectedBatch, id: Math.random().toString(36).substring(2, 9) };
         const updated = [...batchList, newBatch];
         setGlobalBatches(updated);
         alert("New Batch appended successfully.");
       }
       setSelectedBatch(null);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 w-full flex flex-col gap-6 bg-slate-50 font-sans min-h-screen">
      
      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => { setActiveTab('SERVICE'); setSelectedService(null); }}
          className={`px-4 py-2 font-bold text-sm transition-colors ${activeTab === 'SERVICE' ? 'text-brand-700 border-b-2 border-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Create New Service Path
        </button>
        <button 
          onClick={() => { setActiveTab('BATCH'); setSelectedBatch(null); setNewTimeSlot(''); }}
          className={`px-4 py-2 font-bold text-sm transition-colors ${activeTab === 'BATCH' ? 'text-brand-700 border-b-2 border-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Create Batch Slots
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-brand-900 mb-6 border-b border-slate-100 pb-2">
          {activeTab === 'SERVICE' ? 'Essential Service Path Config' : 'Batch & Time-Slot Config'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* SERVICE TAB FORM */}
          {activeTab === 'SERVICE' && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">Service / Education Path Name</label>
                <input 
                  type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="e.g. Premium IELTS Path" 
                  value={selectedService?.name || ''}
                  onChange={(e) => setSelectedService(prev => prev ? {...prev, name: e.target.value} : { id: 'new', name: e.target.value, methods: '', starting: '', ending: '', remarks: '' })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">Training Method</label>
                <input 
                  type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="e.g. Hybrid, Online" 
                  value={selectedService?.methods || ''}
                  onChange={(e) => setSelectedService(prev => prev ? {...prev, methods: e.target.value} : { id: 'new', name: '', methods: e.target.value, starting: '', ending: '', remarks: '' })}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-semibold text-slate-600">Starting From</label>
                  <input 
                    type="date" className="border border-slate-300 rounded p-2 text-sm" 
                    value={selectedService?.starting || ''}
                    onChange={(e) => setSelectedService(prev => prev ? {...prev, starting: e.target.value} : { id: 'new', name: '', methods: '', starting: e.target.value, ending: '', remarks: '' })}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-semibold text-slate-600">Ending / Valid Till (Opt)</label>
                  <input 
                    type="date" className="border border-slate-300 rounded p-2 text-sm" 
                    value={selectedService?.ending || ''}
                    onChange={(e) => setSelectedService(prev => prev ? {...prev, ending: e.target.value} : { id: 'new', name: '', methods: '', starting: '', ending: e.target.value, remarks: '' })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Remarks & Details</label>
                <input 
                  type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="Full details..." 
                  value={selectedService?.remarks || ''}
                  onChange={(e) => setSelectedService(prev => prev ? {...prev, remarks: e.target.value} : { id: 'new', name: '', methods: '', starting: '', ending: '', remarks: e.target.value })}
                />
              </div>
            </>
          )}

          {/* BATCH TAB FORM */}
          {activeTab === 'BATCH' && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">New Batch Name</label>
                <input 
                  type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="Batch Name" 
                  value={selectedBatch?.name || ''}
                  onChange={(e) => setSelectedBatch(prev => prev ? {...prev, name: e.target.value} : { id: 'new', name: e.target.value, timings: [], starting: '', remarks: '' })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600">Starting Date</label>
                <input 
                  type="date" className="border border-slate-300 rounded p-2 text-sm" 
                  value={selectedBatch?.starting || ''}
                  onChange={(e) => setSelectedBatch(prev => prev ? {...prev, starting: e.target.value} : { id: 'new', name: '', timings: [], starting: e.target.value, remarks: '' })}
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-brand-700 flex items-center gap-1">
                   <Clock className="w-3.5 h-3.5" /> Interactive Time Slots Config
                </label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="time" className="border border-slate-300 rounded p-2 text-sm bg-slate-50 w-32" 
                    onChange={(e) => setNewTimeSlot(prev => `${e.target.value} - ${prev.split(' - ')[1] || ''}`)}
                  />
                  <span className="self-center font-bold text-slate-400">TO</span>
                  <input 
                    type="time" className="border border-slate-300 rounded p-2 text-sm bg-slate-50 w-32" 
                    onChange={(e) => setNewTimeSlot(prev => `${prev.split(' - ')[0] || ''} - ${e.target.value}`)}
                  />
                  <button onClick={handleAddTimeSlot} className="px-4 py-2 bg-indigo-100 text-indigo-700 font-bold text-xs rounded hover:bg-indigo-200">
                    ADD SLOT +
                  </button>
                </div>
                
                {/* Render Selected Slots */}
                <div className="flex flex-wrap gap-2">
                  {selectedBatch?.timings?.map((time, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                       <span>{time}</span>
                       <button onClick={() => handleRemoveTimeSlot(idx)} className="text-red-500 hover:text-red-700">x</button>
                    </div>
                  ))}
                  {(!selectedBatch?.timings || selectedBatch.timings.length === 0) && <span className="text-xs text-slate-400 italic">No slots added. Provide timeslots above.</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-semibold text-slate-600">Batch Remarks</label>
                <input 
                  type="text" className="border border-slate-300 rounded p-2 text-sm" placeholder="Details..." 
                  value={selectedBatch?.remarks || ''}
                  onChange={(e) => setSelectedBatch(prev => prev ? {...prev, remarks: e.target.value} : { id: 'new', name: '', timings: [], starting: '', remarks: e.target.value })}
                />
              </div>
            </>
          )}

        </div>

        {/* Global Save Controls */}
        <div className="flex flex-wrap items-center gap-3 justify-end pt-4 border-t border-slate-100">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded hover:bg-slate-200">
            <Edit className="w-4 h-4" /> RESET
          </button>
          <button onClick={handleDelete} disabled={(activeTab === 'SERVICE' && !selectedService) || (activeTab === 'BATCH' && !selectedBatch)} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded hover:bg-red-100 border border-red-200 disabled:opacity-50">
            <Trash2 className="w-4 h-4" /> DELETE(*)
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-bold rounded hover:bg-brand-700 shadow">
            <Save className="w-4 h-4" /> SAVE RECORD
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            Directory of {activeTab === 'SERVICE' ? 'Services' : 'Batch Slots'} (Click to Edit)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Name</th>
                <th className="px-4 py-3">{activeTab === 'SERVICE' ? 'Methods' : 'Allocated Slots'}</th>
                <th className="px-4 py-3">Starting</th>
                {activeTab === 'SERVICE' && <th className="px-4 py-3">Ending</th>}
                <th className="px-4 py-3 rounded-tr-lg">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'SERVICE' ? (
                serviceList.map((item) => (
                    <tr key={item.id} onClick={() => handleRowClick(item)} className={`cursor-pointer hover:bg-brand-50 transition-colors ${selectedService?.id === item.id ? 'bg-brand-50 ring-1 ring-brand-200' : ''}`}>
                      <td className="px-4 py-3 font-semibold text-brand-700">{item.name}</td>
                      <td className="px-4 py-3 text-slate-600">{item.methods}</td>
                      <td className="px-4 py-3 text-slate-600">{item.starting}</td>
                      <td className="px-4 py-3 text-slate-600">{item.ending || '-'}</td>
                      <td className="px-4 py-3 text-slate-500 max-w-[150px] truncate">{item.remarks}</td>
                    </tr>
                ))
              ) : (
                batchList.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item)} className={`cursor-pointer hover:bg-brand-50 transition-colors ${selectedBatch?.id === item.id ? 'bg-brand-50 ring-1 ring-brand-200' : ''}`}>
                    <td className="px-4 py-3 font-semibold text-brand-700">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.timings.join(', ') || 'No Time Set'}</td>
                    <td className="px-4 py-3 text-slate-600">{item.starting}</td>
                    <td className="px-4 py-3 text-slate-500 max-w-[150px] truncate">{item.remarks}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ServicesAndBatches;