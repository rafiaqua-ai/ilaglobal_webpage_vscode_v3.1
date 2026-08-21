import { useState, useEffect } from 'react'
import { X, LogIn, Shield, GraduationCap, User, Users, Building2, UserPlus, Gift, Sparkles } from 'lucide-react'
import { portalRoles, type PortalRole } from '../data/navigation'
import { supabase } from '../supabaseClient'

const roleIcons: Record<PortalRole, typeof GraduationCap> = {
  student: GraduationCap,
  employee: User,
  team: Users,
  employer: Building2,
}

export interface StaffUser {
  id: string
  email: string
  name: string
  department: 'Super Admin' | 'General Manager' | 'Finance Officer' | 'HR Manager' | 'Marketing Exec' | 'Academic Counselor' | 'Education' | 'Visa'
  hrApprovalStatus?: 'Pending HR Approval' | 'Verified' | 'Rejected'
  hrIssuedId?: string
  temporaryAccessExpiry?: string
}

export default function PortalLogin() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'signin' | 'register' | 'forgot'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [selectedRole, setSelectedRole] = useState<PortalRole | null>(null)
  
  // Registration specific fields
  const [refCode, setRefCode] = useState('')
  const [detectedCampaign, setDetectedCampaign] = useState('')
  const [regDepartment, setRegDepartment] = useState<'Super Admin' | 'General Manager' | 'Finance Officer' | 'HR Manager' | 'Marketing Exec' | 'Academic Counselor'>('Academic Counselor')

  const [forgotEmail, setForgotEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)


  // Auto-detect Referral & Campaign Codes
  useEffect(() => {
    const detectParams = () => {
      const searchParams = new URLSearchParams(window.location.search)
      const ref = searchParams.get('ref') || searchParams.get('referral')
      const camp = searchParams.get('campaign') || searchParams.get('utm_campaign')
      
      if (ref) {
        setRefCode(ref)
      }
      if (camp) {
        setDetectedCampaign(camp)
      }
      
      // Check window location hash just in case of routing-based query parameters
      const hash = window.location.hash
      if (hash.includes('?')) {
        const hashParams = new URLSearchParams(hash.split('?')[1])
        const href = hashParams.get('ref') || hashParams.get('referral')
        const hcamp = hashParams.get('campaign') || hashParams.get('utm_campaign')
        if (href) setRefCode(href)
        if (hcamp) setDetectedCampaign(hcamp)
      }
    }
    
    detectParams()
    window.addEventListener('hashchange', detectParams)
    return () => window.removeEventListener('hashchange', detectParams)
  }, [open])


  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-portal-login', handler)
    return () => window.removeEventListener('open-portal-login', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!selectedRole) {
      setError('Please select a portal role.')
      return
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // For demonstration, after successful Supabase auth we map to internal roles
      if (selectedRole === 'team') {
        localStorage.setItem('ilas_auth_role', 'team');
        localStorage.setItem('ilas_team_role', 'Super Admin'); // Mocking role for now
        localStorage.setItem('ilas_team_scope', 'all');
        localStorage.setItem('ilas_user_name', data.user?.email || 'Admin');
        
        window.dispatchEvent(new CustomEvent('ilas-team-role-changed'));
        window.dispatchEvent(new CustomEvent('ilas-auth-state-changed'));
        
        setSuccess(`Welcome back! Routing directly to Admin Dashboard...`);
        setTimeout(() => {
          window.location.hash = '#admin-dashboard';
          setOpen(false);
        }, 1000);
      } else {
        localStorage.setItem('ilas_auth_role', selectedRole);
        localStorage.setItem('ilas_user_name', email.split('@')[0]);
        window.dispatchEvent(new CustomEvent('ilas-auth-state-changed'));
        
        if (selectedRole === 'student') {
          window.location.hash = '#student-dashboard';
        } else {
          alert(`Redirecting to ${selectedRole} portal...`);
        }
        setOpen(false);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login.');
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!selectedRole) {
      setError('Please select a portal role.')
      return
    }

    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }

    if (selectedRole === 'team') {
      setSuccess(`Account registration for staff is managed by Admins. Please contact support to provision your account.`);
    } else {
      // Student or consultant registration simulation
      setSuccess(`Account registered successfully for role: ${selectedRole}! Logging you in...`)
      setTimeout(() => {
        localStorage.setItem('ilas_auth_role', selectedRole)
        localStorage.setItem('ilas_user_name', name)
        if (refCode) {
          localStorage.setItem('ilas_registration_ref', refCode)
        }
        window.dispatchEvent(new CustomEvent('ilas-auth-state-changed'))
        
        if (selectedRole === 'student') {
          window.location.hash = '#student-dashboard'
        } else {
          alert(`Redirecting to ${selectedRole} portal...`)
        }
        setOpen(false)
      }, 1500)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto flex flex-col border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-700" />
            <h2 className="text-lg font-bold text-slate-900">ILAS Enterprise Portal</h2>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Tabs header */}
          <div className="flex border-b border-slate-200 mb-6 bg-slate-50 p-1 rounded-xl">
            <button
              onClick={() => { setActiveTab('signin'); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'signin' ? 'bg-white text-brand-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'register' ? 'bg-white text-brand-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Register
            </button>
            <button
              onClick={() => { setActiveTab('forgot'); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'forgot' ? 'bg-white text-brand-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Reset Pass
            </button>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Select Portal Role</label>
            <div className="grid grid-cols-2 gap-3">
              {portalRoles.map(({ id, label, description }) => {
                const Icon = roleIcons[id]
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(id)
                      setError(null)
                    }}
                    className={`text-left p-3.5 rounded-xl border-2 transition-all flex flex-col ${
                      selectedRole === id
                        ? 'border-brand-500 bg-brand-50/50'
                        : 'border-slate-100 bg-white hover:border-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 ${selectedRole === id ? 'text-brand-700' : 'text-slate-400'}`} />
                    <div className="text-xs font-bold text-slate-800">{label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{description}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Referral/Campaign Info banner */}
          {(refCode || detectedCampaign) && (
            <div className="p-3 bg-brand-50 border border-brand-100 rounded-xl mb-4 flex items-center gap-2.5 text-xs text-brand-900 font-semibold">
              <Gift className="w-4 h-4 text-brand-600 animate-bounce" />
              <div>
                {refCode && <div>Referral Code Auto-Detected: <span className="font-extrabold text-brand-700">{refCode}</span></div>}
                {detectedCampaign && <div>Campaign Source: <span className="font-extrabold text-emerald-700 uppercase">{detectedCampaign}</span></div>}
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600 mb-4 animate-in fade-in">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-700 mb-4 animate-in fade-in">
              {success}
            </div>
          )}

          {activeTab === 'signin' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address or Staff ID</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  placeholder="name@company.com or STAFF-001"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedRole}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                <LogIn className="w-4 h-4" /> Sign In to Dashboard
              </button>
            </form>
          ) : activeTab === 'forgot' ? (
            <form onSubmit={(e) => {
              e.preventDefault()
              setError(null)
              setSuccess(`Mock password reset link has been dispatched to ${forgotEmail}! Please check your email.`)
              setForgotEmail('')
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enter Your Registered Email Address</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  placeholder="name@company.com"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Shield className="w-4 h-4" /> Dispatch Reset Link
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                  placeholder="••••••••"
                />
              </div>

              {selectedRole === 'team' && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">Assign Staff Department Permission</label>
                  <select
                    value={regDepartment}
                    onChange={(e: any) => setRegDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white font-bold text-slate-700"
                  >
                    <option value="Super Admin">Super Admin / CEO (Full Access)</option>
                    <option value="General Manager">General Manager (Management & Approvals)</option>
                    <option value="Finance Officer">Finance Officer (Finance & POS)</option>
                    <option value="HR Manager">HR Manager (HR Suite)</option>
                    <option value="Marketing Exec">Marketing Exec (Marketing Studio)</option>
                    <option value="Academic Counselor">Academic Counselor (Leads CRM & Ilas Monitor)</option>
                  </select>
                </div>
              )}

              {selectedRole !== 'team' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Referral Code (Optional)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={refCode}
                        onChange={(e) => setRefCode(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                        placeholder="REF-XXXX"
                      />
                      <Gift className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Campaign (Optional)</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={detectedCampaign}
                        onChange={(e) => setDetectedCampaign(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
                        placeholder="CAMPAIGN-DE"
                      />
                      <Sparkles className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedRole}
                className="w-full py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                <UserPlus className="w-4 h-4" /> Create Portal Account
              </button>
            </form>
          )}

          <p className="text-[10px] text-slate-400 text-center mt-6">
            Secure, end-to-end encrypted session. By continuing, you agree to ILAS terms of service.
          </p>
        </div>
      </div>
    </div>
  )
}
