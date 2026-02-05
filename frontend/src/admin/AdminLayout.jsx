import React, { useState } from 'react';
import { Home, Users, Package, Receipt, TrendingUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import BottomNav from './BottomNav';

const menuItems = [
    { id: 'dashboard', name: 'Dashboard', path: '/admin', icon: Home },
    { id: 'users', name: 'Users & Master', path: '/admin?tab=users', icon: Users },
    { id: 'inventory', name: 'Inventory', path: '/admin?tab=inventory', icon: Package },
    { id: 'billing', name: 'Billing', path: '/admin?tab=billing', icon: Receipt },
    { id: 'reports', name: 'Reports', path: '/admin?tab=reports', icon: TrendingUp }
];

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Helper to determine active tab based on query param or path
    const getActiveTab = () => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) return tab;

        // For sub-paths like /admin/users/tendors, mark 'users' as active
        if (location.pathname.includes('/admin/users') || location.pathname.includes('/admin/masters')) return 'users';

        return 'dashboard';
    };

    const activeTab = getActiveTab();

    const handleTabChange = (tabId) => {
        const item = menuItems.find(i => i.id === tabId);
        if (item) navigate(item.path);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <DesktopNav
                menuItems={menuItems}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
            />

            {mobileMenuOpen && (
                <MobileNav
                    menuItems={menuItems}
                    activeTab={activeTab}
                    setActiveTab={handleTabChange}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
            )}

            {/* Main Content Area - Scrollable with bottom padding for mobile nav */}
            <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6 max-w-7xl mx-auto w-full">
                {children}
            </main>

            <BottomNav
                menuItems={menuItems}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
            />
        </div>
    );
};

export default AdminLayout;
