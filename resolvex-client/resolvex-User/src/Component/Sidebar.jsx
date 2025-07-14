import { useNavigate ,useLocation }from 'react-router-dom';
import {
  FaBars,
  FaHome,
  FaPlus,
  FaList,
  FaCommentDots,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menu = [
    { label: 'Dashboard', icon: <FaHome />, route: '/userdashboard' },
    { label: 'Post Complaint', icon: <FaPlus />, route: '/complaintform' },
    { label: 'View Complaints', icon: <FaList />, route: '/viewcomplaints' },
    { label: 'Submit Feedback', icon: <FaCommentDots />, route: '/userFeedback' },
    {label:'View Feedback', icon: <FaCommentDots />, route: '/viewFeedback'},
    { label: 'Logout', icon: <FaSignOutAlt />, route: '/' }
  ];

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <div className="fixed top-4 left-4 z-[100]">
        <button
          onClick={toggleSidebar}
          className="bg-[#57c999] text-white p-2 rounded-3xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Backdrop (for mobile only when sidebar is open) */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-50 h-screen bg-[#57c999] text-white transition-all duration-300
          flex flex-col overflow-hidden
          ${isMobile
            ? sidebarOpen
              ? 'w-64'
              : 'w-0'
            : sidebarOpen
            ? 'w-64'
            : 'w-16'}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          {sidebarOpen ? (
            <div className="flex items-center px-8 gap-3">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              <h2 className="text-xl font-bold tracking-wide hidden sm:block">
                ResolveX
              </h2>
            </div>
          ) : (
            !isMobile && (
              <img src="/logo.png" alt="Logo" className="h-10 hidden w-auto mx-auto" />
            )
          )}
        </div>

        {/* Menu Items */}
        <ul className="flex-1 space-y-2 mt-6 px-2">
         {menu.map((item, index) => {
  const isActive = location.pathname === item.route;

  return (
   <li
  key={index}
  onClick={() => {
    if (item.label === 'Logout') {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    navigate(item.route);
    if (isMobile) toggleSidebar();
  }}
  className={`relative flex items-center gap-4 px-4 py-2 transition-colors duration-200 cursor-pointer
    ${isActive
      ? 'bg-white text-[#57c999] rounded-l-full font-semibold w-[120%] -mr-6 pl-6 pr-10 shadow'
      : 'hover:bg-[#3ea986] text-white'
    }
  `}
>
  <span className="text-lg">{item.icon}</span>
  {sidebarOpen && <span className="text-sm">{item.label}</span>}
</li>

  );
})}

        </ul>
      </div>
    </>
  );
};

export default Sidebar;
