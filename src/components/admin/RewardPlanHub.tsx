import { useState } from 'react';
import { 
  Trophy, 
  Gift, 
  DollarSign, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  Plus, 
  TrendingUp, 
  ShieldCheck, 
  Percent, 
  Clock, 
  Search, 
  Download,
  AlertCircle
} from 'lucide-react';

interface ReferralRecord {
  id: string;
  referrerName: string;
  referrerEmail: string;
  referrerRole: 'Student' | 'Partner' | 'Consultant' | 'Employee';
  candidateName: string;
  vertical: 'Education Hub' | 'Study Abroad' | 'Work and Study' | 'Visa and Services' | 'Jobs and Career';
  commissionAmount: number;
  pointsEarned: number;
  status: 'Pending Verification' | 'Approved by Marketing' | 'Approved by Accounts' | 'Paid Out' | 'Rejected';
  date: string;
}

interface TierRule {
  id: string;
  tierName: string;
  minReferrals: number;
  bonusMultiplier: string;
  baseReward: string;
  color: string;
}

export default function RewardPlanHub() {
  const [activeTab, setActiveTab] = useState<'referrals' | 'matrix' | 'policy' | 'finance_sync'>('referrals');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const [referrals, setReferrals] = useState<ReferralRecord[]>([
    {
      id: 'REF-801',
      referrerName: 'Rohan Sharma',
      referrerEmail: 'rohan.s@gmail.com',
      referrerRole: 'Student',
      candidateName: 'Aditya Verma',
      vertical: 'Education Hub',
      commissionAmount: 3500,
      pointsEarned: 350,
      status: 'Approved by Accounts',
      date: '2026-08-24'
    },
    {
      id: 'REF-802',
      referrerName: 'Global Bridge Consultants',
      referrerEmail: 'contact@globalbridge.eu',
      referrerRole: 'Partner',
      candidateName: 'Meera Nambiar',
      vertical: 'Study Abroad',
      commissionAmount: 12000,
      pointsEarned: 1200,
      status: 'Pending Verification',
      date: '2026-08-25'
    },
    {
      id: 'REF-803',
      referrerName: 'Dr. Klaus Mueller',
      referrerEmail: 'dr.klaus@charite.de',
      referrerRole: 'Consultant',
      candidateName: 'Dr. Priya Sundaram',
      vertical: 'Jobs and Career',
      commissionAmount: 18000,
      pointsEarned: 1800,
      status: 'Paid Out',
      date: '2026-08-20'
    },
    {
      id: 'REF-804',
      referrerName: 'Ananya Deshmukh',
      referrerEmail: 'ananya.d@outlook.com',
      referrerRole: 'Student',
      candidateName: 'Kavita Joshi',
      vertical: 'Work and Study',
      commissionAmount: 5000,
      pointsEarned: 500,
      status: 'Approved by Marketing',
      date: '2026-08-26'
    },
    {
      id: 'REF-805',
      referrerName: 'Apex EU Mobility',
      referrerEmail: 'partners@apexeu.com',
      referrerRole: 'Partner',
      candidateName: 'Sanjay Reddy',
      vertical: 'Visa and Services',
      commissionAmount: 9000,
      pointsEarned: 900,
      status: 'Pending Verification',
      date: '2026-08-27'
    }
  ]);

  const [tierRules, setTierRules] = useState<TierRule[]>([
    { id: '1', tierName: 'Bronze Associate', minReferrals: 1, bonusMultiplier: '1.0x (Standard)', baseReward: '₹2,500 – ₹5,000', color: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: '2', tierName: 'Silver Growth Partner', minReferrals: 5, bonusMultiplier: '1.25x (+25% Payout)', baseReward: '₹6,000 – ₹10,000', color: 'bg-slate-200 text-slate-900 border-slate-400' },
    { id: '3', tierName: 'Gold Elite Ambassador', minReferrals: 15, bonusMultiplier: '1.50x (+50% Payout)', baseReward: '₹12,000 – ₹20,000', color: 'bg-yellow-100 text-yellow-900 border-yellow-400' },
    { id: '4', tierName: 'Platinum Institutional Lead', minReferrals: 30, bonusMultiplier: '2.0x (Double Commission)', baseReward: 'Custom Contract Share', color: 'bg-purple-100 text-purple-900 border-purple-400' }
  ]);

  const handleUpdateStatus = (id: string, newStatus: ReferralRecord['status']) => {
    setReferrals(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const filteredReferrals = referrals.filter(item => {
    const matchesSearch = item.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPaidOut = referrals.filter(r => r.status === 'Paid Out').reduce((acc, r) => acc + r.commissionAmount, 0);
  const totalPendingAccounts = referrals.filter(r => r.status === 'Approved by Marketing' || r.status === 'Approved by Accounts').reduce((acc, r) => acc + r.commissionAmount, 0);
  const totalPendingVerification = referrals.filter(r => r.status === 'Pending Verification').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" /> Core Operations & Accounts-Marketing Synergy
          </div>
          <h2 className="text-2xl font-black tracking-tight">Reward Plan & Partner Commission Engine</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Administer referral commission rates, student incentive points, marketing attribution bonuses, and finance disbursement pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] text-slate-300 font-bold block uppercase">Disbursed Payouts</span>
            <span className="text-base font-black text-emerald-400">₹{totalPaidOut.toLocaleString()}</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
            <span className="text-[10px] text-slate-300 font-bold block uppercase">Pending Accounts</span>
            <span className="text-base font-black text-amber-300">₹{totalPendingAccounts.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('referrals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'referrals' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Gift className="w-3.5 h-3.5" /> Referral & Claims Queue ({referrals.length})
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'matrix' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Percent className="w-3.5 h-3.5" /> Departmental Commission Matrix
        </button>
        <button
          onClick={() => setActiveTab('policy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'policy' 
              ? 'bg-slate-900 text-white shadow-sm' 
              : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Award className="w-3.5 h-3.5" /> Ambassador Tiers & Policies
        </button>
        <button
          onClick={() => setActiveTab('finance_sync')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'finance_sync' 
              ? 'bg-emerald-700 text-white shadow-sm' 
              : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" /> Accounts & Marketing Ledger Sync
        </button>
      </div>

      {/* TAB 1: REFERRALS QUEUE */}
      {activeTab === 'referrals' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search referrer, candidate, or claim ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-brand-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"
              >
                <option value="All">All Statuses ({referrals.length})</option>
                <option value="Pending Verification">Pending Verification ({totalPendingVerification})</option>
                <option value="Approved by Marketing">Approved by Marketing</option>
                <option value="Approved by Accounts">Approved by Accounts</option>
                <option value="Paid Out">Paid Out</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                  <tr>
                    <th className="px-4 py-3">Claim ID</th>
                    <th className="px-4 py-3">Referrer</th>
                    <th className="px-4 py-3">Candidate / Vertical</th>
                    <th className="px-4 py-3">Payout & Points</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReferrals.map((claim) => (
                    <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">{claim.id}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-900 block">{claim.referrerName}</span>
                        <span className="text-[10px] text-slate-400">{claim.referrerEmail} • <span className="font-semibold text-brand-600">{claim.referrerRole}</span></span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-800 block">{claim.candidateName}</span>
                        <span className="inline-block px-2 py-0.5 mt-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {claim.vertical}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-extrabold text-emerald-700 block">₹{claim.commissionAmount.toLocaleString()}</span>
                        <span className="text-[10px] text-amber-700 font-bold">+{claim.pointsEarned} Points</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black inline-flex items-center gap-1 ${
                          claim.status === 'Paid Out' ? 'bg-emerald-100 text-emerald-800' :
                          claim.status === 'Approved by Accounts' ? 'bg-blue-100 text-blue-800' :
                          claim.status === 'Approved by Marketing' ? 'bg-purple-100 text-purple-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                        {claim.status === 'Pending Verification' && (
                          <button 
                            onClick={() => handleUpdateStatus(claim.id, 'Approved by Marketing')}
                            className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold hover:bg-purple-700 cursor-pointer shadow-xs"
                          >
                            Verify Marketing
                          </button>
                        )}
                        {claim.status === 'Approved by Marketing' && (
                          <button 
                            onClick={() => handleUpdateStatus(claim.id, 'Approved by Accounts')}
                            className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-bold hover:bg-blue-700 cursor-pointer shadow-xs"
                          >
                            Authorize Accounts
                          </button>
                        )}
                        {claim.status === 'Approved by Accounts' && (
                          <button 
                            onClick={() => handleUpdateStatus(claim.id, 'Paid Out')}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-700 cursor-pointer shadow-xs"
                          >
                            Disburse Funds 💰
                          </button>
                        )}
                        {claim.status === 'Paid Out' && (
                          <span className="text-[10px] font-bold text-emerald-700 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEPARTMENTAL COMMISSION MATRIX */}
      {activeTab === 'matrix' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 bg-blue-50/70 border border-blue-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Education Hub</span>
              <span className="text-xs font-black text-blue-900">₹2,500 – ₹5,000</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">Academy & Language Programs</h4>
            <p className="text-xs text-slate-600">Disbursed on candidate admission and initial fee settlement for Goethe German (A1–C2) or IELTS cohorts.</p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-blue-200 flex justify-between">
              <span>Points per Admission:</span>
              <span className="font-bold text-slate-900">500 pts</span>
            </div>
          </div>

          <div className="p-5 bg-indigo-50/70 border border-indigo-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">Study Abroad</span>
              <span className="text-xs font-black text-indigo-900">₹10,000 – ₹20,000</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">University Placement</h4>
            <p className="text-xs text-slate-600">Paid upon German public/private university admission offer letter receipt and dossier completion.</p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-indigo-200 flex justify-between">
              <span>Points per Admission:</span>
              <span className="font-bold text-slate-900">1,500 pts</span>
            </div>
          </div>

          <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Work and Study</span>
              <span className="text-xs font-black text-amber-900">₹5,000 + 500 Pts</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">Ausbildung & Dual Apprenticeship</h4>
            <p className="text-xs text-slate-600">Paid upon candidate signing an official €1,200/mo German enterprise trainee contract.</p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-amber-200 flex justify-between">
              <span>Points per Admission:</span>
              <span className="font-bold text-slate-900">800 pts</span>
            </div>
          </div>

          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Visa and Services</span>
              <span className="text-xs font-black text-emerald-900">₹7,500 – ₹15,000</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">Visa Processing & Filing</h4>
            <p className="text-xs text-slate-600">Paid upon successful submission and verification of student, job seeker, or opportunity card visa files.</p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-emerald-200 flex justify-between">
              <span>Points per File:</span>
              <span className="font-bold text-slate-900">1,000 pts</span>
            </div>
          </div>

          <div className="p-5 bg-purple-50/70 border border-purple-200 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-100 px-2 py-0.5 rounded">Jobs and Career</span>
              <span className="text-xs font-black text-purple-900">₹15,000 – ₹30,000</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900">Corporate & Healthcare Placements</h4>
            <p className="text-xs text-slate-600">Paid upon candidate joining healthcare (18a/b) or IT positions with German partner employers.</p>
            <div className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-purple-200 flex justify-between">
              <span>Points per Placement:</span>
              <span className="font-bold text-slate-900">2,500 pts</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TIERS & POLICIES */}
      {activeTab === 'policy' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tierRules.map(tier => (
            <div key={tier.id} className={`p-5 rounded-3xl border-2 space-y-3 ${tier.color}`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider">Tier {tier.id}</span>
                <Trophy className="w-4 h-4" />
              </div>
              <h4 className="font-black text-base">{tier.tierName}</h4>
              <p className="text-xs opacity-80">Requires at least {tier.minReferrals} completed candidate admissions.</p>
              <div className="pt-2 border-t border-current/20 space-y-1 text-xs font-bold">
                <div className="flex justify-between">
                  <span>Multiplier:</span>
                  <span>{tier.bonusMultiplier}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Rate:</span>
                  <span>{tier.baseReward}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: FINANCE & MARKETING SYNC */}
      {activeTab === 'finance_sync' && (
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" /> Accounts & Marketing General Ledger Integration
            </h3>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Real-time Sync</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            All approved referral payouts and student reward points are synchronized with the <strong>Finance Commission Hub</strong> and the <strong>Marketing Studio Campaign Attribution Ledger</strong> to ensure zero double-booking and automated expense bookkeeping.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-bold block">Disbursed This Month</span>
              <span className="text-lg font-black text-slate-900">₹{totalPaidOut.toLocaleString()}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-bold block">Accounts Approval Queue</span>
              <span className="text-lg font-black text-blue-600">₹{totalPendingAccounts.toLocaleString()}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-slate-500 font-bold block">Active Referral Codes</span>
              <span className="text-lg font-black text-brand-600">42 Active</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
