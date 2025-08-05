import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navigation from './Navigation';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile by default
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex">
      {/* Sidebar - Fixed on left, collapsible on mobile */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

      {/* Main Content Area */}
      <div 
        className="flex-grow-1"
        style={{ 
          marginLeft: isMobile ? '0' : (sidebarOpen ? '250px' : '70px'),
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh'
        }}
      >
        {/* Navbar - Fixed on top */}
        <Navigation toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <div className="p-4 mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;