import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/Sidebar';
import { Navbar } from '@/Navbar';
import { useUiStore } from '@/uiStore';
import { useUserStore } from '@/userStore';
import { cn } from '@/utils';
import { ChatWidget } from '@/components/ChatWidget';

export const DashboardLayout = () => {
  const isSidebarCollapsed = useUiStore((state) => state.isSidebarCollapsed);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0f172a]">
      <Sidebar />
      <div className={cn(
        "flex flex-1 flex-col transition-all duration-700 ease-[0.16, 1, 0.3, 1]", 
        "w-full",
        isSidebarCollapsed ? "md:pl-24" : "md:pl-64"
      )}>
        <Navbar />
        <main className="flex-1 p-4 md:p-8 animate-in fade-in duration-1000 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <ChatWidget />
    </div>
  );
};
