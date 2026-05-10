import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProcessPage } from './pages/ProcessPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { LogoShowcase } from './components/LogoShowcase';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos'>('home');

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

  return <div className="min-h-screen">{renderPage()}</div>;
}
