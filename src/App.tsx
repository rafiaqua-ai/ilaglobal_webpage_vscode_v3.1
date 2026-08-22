import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import PortalLogin from './components/PortalLogin'
import LanguageTrainer from './components/LanguageTrainer'
import LiveConsultant from './components/LiveConsultant'
import UnifiedIntakeForms from './components/UnifiedIntakeForms'

import { useState, useEffect } from 'react'
import HomePage from './components/HomePage'
import GermanLanguagePage from './components/GermanLanguagePage'
import { logVisitorActivity } from './lib/db'
import StudentDashboard from './components/StudentDashboard'
import AdminPortal from './components/AdminPortal'
import CoursePage from './components/CoursePage'
import JobsPage from './components/JobsPage'
import VisaPage from './components/VisaPage'
import WorkWhileYouStudyPage from './components/WorkWhileYouStudyPage'
import RewardsPage from './components/RewardsPage'
import AboutUsPage from './components/AboutUsPage'
import IlasWithYouPage from './components/IlasWithYouPage'
import FloatingContact from './components/FloatingContact'
import StudyAbroadPage from './components/StudyAbroadPage'
import EducationPage from './components/EducationPage'
import ApplicationPoolPage from './components/ApplicationPoolPage'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import CookieBanner from './components/CookieBanner'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [activeCourseTitle, setActiveCourseTitle] = useState('')
  const [activeCourseCategory, setActiveCourseCategory] = useState('')

  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 0) {
        const pageLabel = currentPage === 'course-page' ? activeCourseTitle || 'Course Page' : currentPage;
        logVisitorActivity(pageLabel, timeSpent);
      }
    };
  }, [currentPage, activeCourseTitle]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      
      if (hash === '#german-language') {
        setCurrentPage('course-page')
        setActiveCourseTitle('German Language A1–C2')
        setActiveCourseCategory('Language & Proficiency')
        window.scrollTo(0, 0)
      } else if (hash === '#student-dashboard') {
        setCurrentPage('student-dashboard')
        window.scrollTo(0, 0)
      } else if (hash === '#admin-portal' || hash === '#admin-dashboard' || hash === '#erp-portal') {
        setCurrentPage('admin-portal')
        window.scrollTo(0, 0)
      } else if (hash === '#jobs-page') {
        setCurrentPage('jobs-page')
        window.scrollTo(0, 0)
      } else if (hash === '#visa-page' || hash.startsWith('#visa-page#')) {
        setCurrentPage('visa-page')
        // Scroll handled within component or let it scroll to top if just #visa-page
        if (hash === '#visa-page') window.scrollTo(0, 0)
      } else if (hash === '#work-while-you-study-page' || hash.startsWith('#work-while-you-study-page#')) {
        setCurrentPage('work-while-you-study-page')
        if (hash === '#work-while-you-study-page') window.scrollTo(0, 0)
      } else if (hash === '#rewards' || hash === '#rewards-page') {
        setCurrentPage('rewards-page')
        window.scrollTo(0, 0)
      } else if (hash === '#about') {
        setCurrentPage('about-us')
        window.scrollTo(0, 0)
      } else if (hash === '#ilas-with-you') {
        setCurrentPage('ilas-with-you')
        window.scrollTo(0, 0)
      } else if (hash.startsWith('#applications') || hash.startsWith('#apply')) {
        setCurrentPage('applications')
        window.scrollTo(0, 0)
      } else if (hash === '#privacy-policy') {
        setCurrentPage('privacy-policy')
        window.scrollTo(0, 0)
      } else if (hash === '#study-abroad' || hash.startsWith('#study-abroad#')) {
        setCurrentPage('study-abroad')
        if (hash === '#study-abroad') window.scrollTo(0, 0)
      } else if (hash === '#education' || hash.startsWith('#education#')) {
        setCurrentPage('education')
        if (hash === '#education') window.scrollTo(0, 0)
      } else if (hash.startsWith('#course-')) {
        const courseKey = hash.replace('#course-', '')
        setCurrentPage('course-page')
        
        switch(courseKey) {
          case 'ielts':
            setActiveCourseTitle('IELTS / TOEFL Proficiency')
            setActiveCourseCategory('Language & Proficiency')
            break
          case 'pte':
            setActiveCourseTitle('PTE (Pearson Test of English)')
            setActiveCourseCategory('Language & Proficiency')
            break
          case 'software-engineering':
            setActiveCourseTitle('Software Engineering & Full Stack')
            setActiveCourseCategory('Professional & Career Skilling')
            break
          case 'digital-marketing':
            setActiveCourseTitle('Digital Marketing & E-commerce')
            setActiveCourseCategory('Professional & Career Skilling')
            break
          case 'project-management':
            setActiveCourseTitle('Project Management (PMP / Agile)')
            setActiveCourseCategory('Professional & Career Skilling')
            break
          case 'client-management':
            setActiveCourseTitle('Client Relationship Management')
            setActiveCourseCategory('Professional & Career Skilling')
            break
          case 'sap':
            setActiveCourseTitle('SAP S/4HANA (FI/CO, MM, SD)')
            setActiveCourseCategory('Premium Certification')
            break
          case 'cloud-devops':
            setActiveCourseTitle('Cloud Architecture & DevOps')
            setActiveCourseCategory('Premium Certification')
            break
          case 'data-science':
            setActiveCourseTitle('Data Science & AI Engineering')
            setActiveCourseCategory('Premium Certification')
            break
          case 'financial-accounting':
            setActiveCourseTitle('Financial Accounting (Tally, QuickBooks)')
            setActiveCourseCategory('Fundamental & Practical')
            break
          case 'ui-ux':
            setActiveCourseTitle('UI/UX Design & Graphic Fundamentals')
            setActiveCourseCategory('Fundamental & Practical')
            break
          case 'excel':
            setActiveCourseTitle('Microsoft Excel Advanced')
            setActiveCourseCategory('Job-Related Program')
            break
          case 'bookkeeping':
            setActiveCourseTitle('Bookkeeping & Tally')
            setActiveCourseCategory('Job-Related Program')
            break
          case 'python':
            setActiveCourseTitle('Python Basics')
            setActiveCourseCategory('Job-Related Program')
            break
          case 'data-analytics':
            setActiveCourseTitle('Data Analytics Fundamentals')
            setActiveCourseCategory('Job-Related Program')
            break
          case 'medical-fsp':
            setActiveCourseTitle('Medical Terminology (FSP Prep)')
            setActiveCourseCategory('Job-Related Program')
            break
          default:
            setActiveCourseTitle(courseKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
            setActiveCourseCategory('Specialized Program')
        }
        window.scrollTo(0, 0)
      } else if (hash.startsWith('#education#')) {
        const courseKey = hash.replace('#education#', '')
        setCurrentPage('course-page')
        
        switch(courseKey) {
          case 'german-language':
            setActiveCourseTitle('German Language A1–C2')
            setActiveCourseCategory('Language & Proficiency')
            break
          case 'ielts':
            setActiveCourseTitle('IELTS / TOEFL / PTE')
            setActiveCourseCategory('Language & Proficiency')
            break
          case 'software-training':
            setActiveCourseTitle('Software & Tech Training')
            setActiveCourseCategory('Professional & Career Skilling')
            break
          case 'job-related-programs':
            setActiveCourseTitle('Job-Related Specialized Programs')
            setActiveCourseCategory('Professional & Career Skilling')
            break
          default:
            setActiveCourseTitle(courseKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
            setActiveCourseCategory('Specialized Program')
        }
        window.scrollTo(0, 0)
      } else {
        setCurrentPage('home')
        window.scrollTo(0, 0)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const isAdminPage = currentPage === 'admin-portal'

  return (
    <div className="min-h-screen">
      {!isAdminPage && <Navbar />}
      <main>
        {currentPage === 'german-language' ? (
          <GermanLanguagePage />
        ) : currentPage === 'course-page' ? (
          <CoursePage courseTitle={activeCourseTitle} category={activeCourseCategory} />
        ) : currentPage === 'student-dashboard' ? (
          <StudentDashboard />
        ) : currentPage === 'admin-portal' ? (
          <AdminPortal />
        ) : currentPage === 'jobs-page' ? (
          <JobsPage />
        ) : currentPage === 'visa-page' ? (
          <VisaPage />
        ) : currentPage === 'work-while-you-study-page' ? (
          <WorkWhileYouStudyPage />
        ) : currentPage === 'rewards-page' ? (
          <RewardsPage />
        ) : currentPage === 'about-us' ? (
          <AboutUsPage />
        ) : currentPage === 'ilas-with-you' ? (
          <IlasWithYouPage />
        ) : currentPage === 'study-abroad' ? (
          <StudyAbroadPage />
        ) : currentPage === 'education' ? (
          <EducationPage />
        ) : currentPage === 'applications' ? (
          <ApplicationPoolPage />
        ) : currentPage === 'privacy-policy' ? (
          <PrivacyPolicyPage />
        ) : (
          <HomePage />
        )}
      </main>
      {!isAdminPage && <Footer />}
      <PortalLogin />
      <UnifiedIntakeForms />
      {!isAdminPage && <LanguageTrainer />}
      {!isAdminPage && <LiveConsultant />}
      {!isAdminPage && <FloatingContact />}
      <CookieBanner />
    </div>
  )
}

export default App