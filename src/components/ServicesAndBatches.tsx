import React, { useState } from 'react';
import { Save, Edit, RefreshCw, Trash2, Send, CheckSquare, PlusCircle } from 'lucide-react';

type TabType = 'SERVICE' | 'BATCH';

export interface BatchItem {
  id: string;
  name: string;
  timings: string;
  staffs: string;
  starting: string;
  price: string;
  candidates: string;
  remarks: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  methods: string;
  staffs: string;
  starting: string;
  price: string;
  candidates: string;
  remarks: string;
  batchId?: string;
}

const ServicesAndBatches: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('SERVICE');
  
  // State for populating forms
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<BatchItem | null>(null);

  const [batchList, setBatchList] = useState<BatchItem[]>([
    { id: '1', name: 'Morning Batch 1', timings: '10 AM - 12 PM', staffs: 'John Doe', starting: '2026-10-12', price: '$200', candidates: '15', remarks: 'Full' },
    { id: '2', name: 'Weekend Batch', timings: '2 PM - 5 PM', staffs: 'Jane Smith', starting: '2026-10-15', price: '$150', candidates: '20', remarks: 'Open' },
  ]);

  const [serviceList, setServiceList] = useState<ServiceItem[]>([
    { id: '1', name: 'Live Class', methods: 'Live', staffs: 'John Doe', starting: '2026-10-12', price: '$200', candidates: '15', remarks: 'Good', batchId: '1' },
    { id: '2', name: 'Online Class', methods: 'Video+AI', staffs: 'AI Bot', starting: '2026-10-15', price: '$150', candidates: '100', remarks: 'Auto', batchId: '2' },
    { id: '3', name: 'Live Camp Class', methods: 'Camp', staffs: 'Jane Smith', starting: '2026-10-20', price: '$300', candidates: '20', remarks: 'Weekend', batchId: '2' },
  ]);

  const handleRowClick = (item: any) => {
    if (activeTab === 'SERVICE') {
      setSelectedService(item as ServiceItem);
    } else {
      setSelectedBatch(item as BatchItem);
    }
  };

  const handleReset = () => {
    if (activeTab === 'SERVICE') {
      setSelectedService(null);
    } else {
      setSelectedBatch(null);
    }
  };

  const handleDelete = () => {
    const confirmation = window.confirm("SECURITY OVERRIDE: Do you have explicit admin authorization to delete this record? This action is irreversible.");
    if (confirmation) {
       if (activeTab === 'SERVICE' && selectedService) {
         setServiceList(prev => prev.filter(s => s.id !== selectedService.id));
         setSelectedService(null);
       } else if (activeTab === 'BATCH' && selectedBatch) {
         setBatchList(prev => prev.filter(b => b.id !== selectedBatch.id));
         setSelectedBatch(null);
       }
       alert("Record Deleted.");
    }
  };

  const handleSave = () => {
    if (activeTab === 'SERVICE') {
       if (!selectedService || !selectedService.name || !selectedService.batchId) {
         alert("Validation Error: Please provide a name and select a mandatory batch slot.");
         return;
       }
       if (selectedService.id && selectedService.id !== 'new') {
         setServiceList(prev => prev.map(s => s.id === selectedService.id ? selectedService : s));
         alert("Service updated and staff assignment linked.");
       } else {
         const newService = { ...selectedService, id: Math.random().toString(36).substring(2, 9), candidates: '0' };
         setServiceList(prev => [...prev, newService]);
         alert("New Service saved and staff assignment linked.");
       }
       setSelectedService(null);
    } else {
       if (!selectedBatch || !selectedBatch.name) {
         alert("Validation Error: Please provide a batch name.");
         return;
       }
       if (selectedBatch.id && selectedBatch.id !== 'new') {
         setBatchList(prev => prev.map(b => b.id === selectedBatch.id ? selectedBatch : b));
         alert("Batch updated successfully.");
       } else {
         const newBatch = { ...selectedBatch, id: Math.random().toString(36).substring(2, 9), candidates: '0' };
         setBatchList(prev => [...prev, newBatch]);
         alert("New Batch saved successfully. It is now available for linking.");
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
          Create New Service
        </button>
        <button 
          onClick={() => { setActiveTab('BATCH'); setSelectedBatch(null); }}
          className={`px-4 py-2 font-bold text-sm transition-colors ${activeTab === 'BATCH' ? 'text-brand-700 border-b-2 border-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Create Batch
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-brand-900 mb-6 border-b border-slate-100 pb-2">
          {activeTab === 'SERVICE' ? 'Service / Training Package Details' : 'Batch / Time-Slot Details'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">
              {activeTab === 'SERVICE' ? 'Service / Education Path Name' : 'New Batch Name'}
            </label>
            <input 
              type="text" 
              className="border border-slate-300 rounded p-2 text-sm" 
              placeholder={activeTab === 'SERVICE' ? 'e.g. Premium IELTS Camp' : 'Batch Name'} 
              value={activeTab === 'SERVICE' ? (selectedService?.name || '') : (selectedBatch?.name || '')}
              onChange={(e) => activeTab === 'SERVICE' 
                ? setSelectedService(prev => prev ? {...prev, name: e.target.value} : { id: 'new', name: e.target.value, methods: '', staffs: '', starting: '', price: '', candidates: '', remarks: '' })
                : setSelectedBatch(prev => prev ? {...prev, name: e.target.value} : { id: 'new', name: e.target.value, timings: '', staffs: '', starting: '', price: '', candidates: '', remarks: '' })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">
              {activeTab === 'SERVICE' ? 'Training Method' : 'Timings (Slots)'}
            </label>
            <input 
              type="text" 
              className="border border-slate-300 rounded p-2 text-sm" 
              placeholder={activeTab === 'SERVICE' ? 'e.g. Hybrid, Online' : 'e.g., 10 AM - 12 PM'} 
              value={activeTab === 'SERVICE' ? (selectedService?.methods || '') : (selectedBatch?.timings || '')}
              onChange={(e) => activeTab === 'SERVICE' 
                ? setSelectedService(prev => prev ? {...prev, methods: e.target.value} : { id: 'new', name: '', methods: e.target.value, staffs: '', starting: '', price: '', candidates: '', remarks: '' })
                : setSelectedBatch(prev => prev ? {...prev, timings: e.target.value} : { id: 'new', name: '', timings: e.target.value, staffs: '', starting: '', price: '', candidates: '', remarks: '' })
              }
            />
          </div>

          {activeTab === 'SERVICE' && (
             <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-brand-600">Select Batch Slot (Required)</label>
                <div className="flex gap-2">
                  <select 
                    className="flex-1 border border-brand-300 rounded p-2 text-sm bg-brand-50"
                    value={selectedService?.batchId || ''}
                    onChange={(e) => setSelectedService(prev => prev ? {...prev, batchId: e.target.value} : { id: 'new', name: '', methods: '', staffs: '', starting: '', price: '', candidates: '', remarks: '', batchId: e.target.value })}
                  >
                    <option value="">-- Mandatory: Link Batch --</option>
                    {batchList.map(b => (
                      <option key={b.id} value={b.id}>{b.name} ({b.timings})</option>
                    ))}
                  </select>
                  <button onClick={() => { setActiveTab('BATCH'); setSelectedBatch(null); }} className="bg-slate-100 p-2 rounded text-slate-600 hover:bg-slate-200" title="Create New Batch"><PlusCircle className="w-5 h-5"/></button>
                </div>
             </div>
          )}
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">Select Staffs (Tasks Linked)</label>
            <select 
              className="border border-slate-300 rounded p-2 text-sm bg-slate-50"
              value={activeTab === 'SERVICE' ? (selectedService?.staffs || '') : (selectedBatch?.staffs || '')}
              onChange={(e) => activeTab === 'SERVICE' 
                ? setSelectedService(prev => prev ? {...prev, staffs: e.target.value} : { id: 'new', name: '', methods: '', staffs: e.target.value, starting: '', price: '', candidates: '', remarks: '' })
                : setSelectedBatch(prev => prev ? {...prev, staffs: e.target.value} : { id: 'new', name: '', timings: '', staffs: e.target.value, starting: '', price: '', candidates: '', remarks: '' })
              }
            >
              <option value="">None (Allot AI)</option>
              <option value="John Doe">John Doe (Direct Delegation)</option>
              <option value="Jane Smith">Jane Smith</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">Starting From</label>
            <input 
              type="date" 
              className="border border-slate-300 rounded p-2 text-sm" 
              value={activeTab === 'SERVICE' ? (selectedService?.starting || '') : (selectedBatch?.starting || '')}
              onChange={(e) => activeTab === 'SERVICE' 
                ? setSelectedService(prev => prev ? {...prev, starting: e.target.value} : { id: 'new', name: '', methods: '', staffs: '', starting: e.target.value, price: '', candidates: '', remarks: '' })
                : setSelectedBatch(prev => prev ? {...prev, starting: e.target.value} : { id: 'new', name: '', timings: '', staffs: '', starting: e.target.value, price: '', candidates: '', remarks: '' })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-600">Price Config</label>
            <input 
              type="text" 
              className="border border-slate-300 rounded p-2 text-sm" 
              placeholder="$ 0.00" 
              value={activeTab === 'SERVICE' ? (selectedService?.price || '') : (selectedBatch?.price || '')}
              onChange={(e) => activeTab === 'SERVICE' 
                ? setSelectedService(prev => prev ? {...prev, price: e.target.value} : { id: 'new', name: '', methods: '', staffs: '', starting: '', price: e.target.value, candidates: '', remarks: '' })
                : setSelectedBatch(prev => prev ? {...prev, price: e.target.value} : { id: 'new', name: '', timings: '', staffs: '', starting: '', price: e.target.value, candidates: '', remarks: '' })
              }
            />
          </div>

          <div className="flex flex-col gap-1 lg:col-span-3">
            <label className="text-xs font-semibold text-slate-600">Remarks, Details & Suggestion</label>
            <input 
              type="text" 
              className="border border-slate-300 rounded p-2 text-sm" 
              placeholder="Full details..." 
              value={activeTab === 'SERVICE' ? (selectedService?.remarks || '') : (selectedBatch?.remarks || '')}
              onChange={(e) => activeTab === 'SERVICE' 
                ? setSelectedService(prev => prev ? {...prev, remarks: e.target.value} : { id: 'new', name: '', methods: '', staffs: '', starting: '', price: '', candidates: '', remarks: e.target.value })
                : setSelectedBatch(prev => prev ? {...prev, remarks: e.target.value} : { id: 'new', name: '', timings: '', staffs: '', starting: '', price: '', candidates: '', remarks: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-end pt-4 border-t border-slate-100">
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-bold rounded hover:bg-slate-200">
            <Edit className="w-4 h-4" /> RESET
          </button>
          <button onClick={handleDelete} disabled={(activeTab === 'SERVICE' && !selectedService) || (activeTab === 'BATCH' && !selectedBatch)} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-bold rounded hover:bg-red-100 border border-red-200 disabled:opacity-50">
            <Trash2 className="w-4 h-4" /> DELETE(*)
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 text-sm font-bold rounded hover:bg-brand-100 border border-brand-200">
            <RefreshCw className="w-4 h-4" /> UPDATE
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-bold rounded hover:bg-brand-700 shadow">
            <Save className="w-4 h-4" /> SAVE PACKAGE
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-hidden flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">
            List of {activeTab === 'SERVICE' ? 'Services' : 'Batch'} (Click to View/Edit)
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Name</th>
                <th className="px-4 py-3">{activeTab === 'SERVICE' ? 'Methods' : 'Timings'}</th>
                {activeTab === 'SERVICE' && <th className="px-4 py-3">Linked Batch</th>}
                <th className="px-4 py-3">Staffs</th>
                <th className="px-4 py-3">Starting</th>
                <th className="px-4 py-3">Candidates</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 rounded-tr-lg">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'SERVICE' ? (
                serviceList.map((item) => {
                  const linkedBatch = batchList.find(b => b.id === item.batchId);
                  return (
                    <tr key={item.id} onClick={() => handleRowClick(item)} className={`cursor-pointer hover:bg-brand-50 transition-colors ${selectedService?.id === item.id ? 'bg-brand-50 ring-1 ring-brand-200' : ''}`}>
                      <td className="px-4 py-3 font-semibold text-brand-700">{item.name}</td>
                      <td className="px-4 py-3 text-slate-600">{item.methods}</td>
                      <td className="px-4 py-3 text-slate-600 font-medium text-xs">{linkedBatch?.name || 'Unlinked'}</td>
                      <td className="px-4 py-3 text-slate-600">{item.staffs}</td>
                      <td className="px-4 py-3 text-slate-600">{item.starting}</td>
                      <td className="px-4 py-3 text-slate-600">{item.candidates}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.price}</td>
                      <td className="px-4 py-3 text-slate-500 max-w-[150px] truncate">{item.remarks}</td>
                    </tr>
                  )
                })
              ) : (
                batchList.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item)} className={`cursor-pointer hover:bg-brand-50 transition-colors ${selectedBatch?.id === item.id ? 'bg-brand-50 ring-1 ring-brand-200' : ''}`}>
                    <td className="px-4 py-3 font-semibold text-brand-700">{item.name}</td>
                    <td className="px-4 py-3 text-slate-600">{item.timings}</td>
                    <td className="px-4 py-3 text-slate-600">{item.staffs}</td>
                    <td className="px-4 py-3 text-slate-600">{item.starting}</td>
                    <td className="px-4 py-3 text-slate-600">{item.candidates}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{item.price}</td>
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