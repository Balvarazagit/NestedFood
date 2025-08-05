import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaFileAlt, FaUserPlus } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const navItems = [
    { label: 'Dashboard', to: '/', icon: <FaTachometerAlt /> },
    { label: 'Users', to: '/users', icon: <FaUsers /> },
    { label: 'Products', to: '/products', icon: <FaClipboardList /> },
    { label: 'Order List', to: '/admin/orders', icon: <FaFileAlt /> },
  ];

  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  return (
    <>
      {isMobile && (
        <button
          className="btn btn-sm btn-dark position-fixed top-2 start-2"
          onClick={toggleMobileSidebar}
          style={{ zIndex: 1050 }}
        >
          ☰
        </button>
      )}

      {isMobile && mobileSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 vh-100 vw-100 bg-dark opacity-50"
          style={{ zIndex: 1040 }}
          onClick={toggleMobileSidebar}
        />
      )}

      <div
        className={`bg-dark text-white position-fixed top-0 start-0 vh-100 p-3 ${
          isMobile && !mobileSidebarOpen ? 'translate-x-negative' : ''
        }`}
        style={{
          width: collapsed ? '70px' : '250px',
          zIndex: 1041,
          transition: isMobile ? 'transform 0.3s ease' : 'width 0.3s ease',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className={`fs-5 fw-bold mb-0 ${collapsed ? 'd-none' : ''}`}>Admin</h4>
        </div>

        <nav className="nav flex-column">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link text-white mb-2 d-flex align-items-center gap-2 ${
                  isActive ? 'bg-secondary rounded' : ''
                }`
              }
              onClick={() => isMobile && setMobileSidebarOpen(false)}
            >
              {item.icon}
              <span className={collapsed ? 'd-none d-md-inline' : ''}>{item.label}</span>
              <span className={collapsed ? 'd-inline' : 'd-none'}>
                {item.label.charAt(0)}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <style>{`
        .translate-x-negative {
          transform: translateX(-100%);
        }
        @media (max-width: 767px) {
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
