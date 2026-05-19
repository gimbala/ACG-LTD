import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LogoShowcase } from './components/LogoShowcase';

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos'
  >('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'services':
        return <ServicesPage onNavigate={setCurrentPage} />;
      case 'process':
        return <ProcessPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'portal':
        return <ClientPortalPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboardPage onNavigate={setCurrentPage} />;
      case 'logos':
        return <LogoShowcase />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-[#1E1B4B] focus:shadow-lg"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen">
        {renderPage()}
      </main>
    </>
  );
}
