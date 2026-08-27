export interface NavItem {
  label: string
  href?: string
  action?: string
  children?: { label: string; href: string; description?: string; action?: string }[]
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  {
    label: 'All Courses',
    href: '#education',
    children: [
      { label: 'German Language A1-C2', href: '#course-german-language', description: 'A1–C2 certified courses' },
      { label: 'IELTS/TOEFL/PTE', href: '#course-ielts', description: 'Language proficiency training' },
      { label: 'Software Engineering', href: '#course-software-engineering', description: 'Tech & coding programs' },
      { label: 'Job-Related Programs', href: '#course-job-related-programs', description: 'Short-term certifications' },
    ],
  },
  {
    label: 'Work and Study',
    href: '#work-while-you-study-page',
    children: [
      { label: 'Freshers AI Training', href: '#work-while-you-study-page#overview', description: 'Overcome entry barriers with AI' },
      { label: 'German Project Pathway', href: '#work-while-you-study-page#growth', description: 'Onboarding to 1-year contracts' },
      { label: 'Domain Roles', href: '#work-while-you-study-page#roles', description: 'Operations, IT, Trade & Infra' },
      { label: 'Scholarship & Salary', href: '#work-while-you-study-page#apply', description: 'Fee subsidies & paid structure' },
    ],
  },
  {
    label: 'Study Abroad',
    href: '#study-abroad',
    children: [
      { label: 'German Public Universities', href: '#study-abroad#public', description: 'Admissions and requirements' },
      { label: 'German Private Universities', href: '#study-abroad#private', description: 'Explore top private institutions' },
      { label: 'Visa Support', href: '#study-abroad#visa', description: 'Guidance through the visa process' },
      { label: 'End-to-End Processing', href: '#study-abroad#processing', description: 'Backed by our expert team' },
    ],
  },
  {
    label: 'Visa and Services',
    href: '#visa-page',
    children: [
      { label: 'Student Visa', href: '#visa-page#student-visa', description: 'University Enrollment & Documentation' },
      { label: 'Job Seeker Visa', href: '#visa-page#job-seeker-visa', description: 'Professional Career Entry' },
      { label: 'Tourist Visa', href: '#visa-page#tourist-visa', description: 'Travel & Exploration' },
      { label: 'Business Visa', href: '#visa-page#business-visa', description: 'Corporate Travel & Relocation' },
      { label: 'Schengen Visa', href: '#visa-page#schengen-visa', description: 'Short-stay European travel' },
      { label: 'Opportunity Card', href: '#visa-page#opportunity-card', description: 'Chancenkarte for job seekers' },
      { label: 'All Documentation Process', href: '#visa-page#documentation', description: 'AI-driven document handling' },
    ],
  },
  {
    label: 'Jobs and Career',
    href: '#jobs-page',
    children: [
      { label: 'Premium Career Services', href: '#jobs-page', description: 'Strategic job support & applications' },
      { label: 'Doctor to Driver', href: '#jobs', description: 'Blue-collar career pathways' },
      { label: 'AI Resume Match', href: '#jobs', description: 'Smart job matching portal' },
    ],
  },
  { label: 'Apply Now 🎯', href: '#applications' },
]

export type PortalRole = 'student' | 'employee' | 'team' | 'employer'

export const portalRoles: { id: PortalRole; label: string; description: string }[] = [
  { id: 'student', label: 'Student', description: 'Access courses, progress & certificates' },
  { id: 'employee', label: 'Partner/Consultant', description: 'Manage assignments & referrals' },
  { id: 'team', label: 'Team / Staff', description: 'Access Admin ERP CMS Dashboard' },
  { id: 'employer', label: 'Enterprise', description: 'Hire, manage & track candidates' },
]
