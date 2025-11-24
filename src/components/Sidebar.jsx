import React from 'react';
import { LayoutDashboard, Package, CalendarDays, Calculator, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { logout } = useAuth();

    const navItems = [
        { id: 'dashboard', label: 'Resumen', icon: LayoutDashboard },
        { id: 'inventory', label: 'Inventario', icon: Package },
        { id: 'calendar', label: 'Citas', icon: CalendarDays },
        { id: 'calculator', label: 'Calculadora', icon: Calculator },
    ];

    return (
        <aside className="w-20 lg:w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col flex-shrink-0 transition-colors duration-300 z-20">
            <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-zinc-100 dark:border-zinc-900">
                <div className="h-8 w-8 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center mr-0 lg:mr-3 shadow-sm">
                    <span className="font-medium text-lg tracking-tighter">F</span>
                </div>
                <span className="hidden lg:block font-medium text-sm tracking-tight text-zinc-900 dark:text-zinc-100">Finanzas JK</span>
            </div>

            <nav className="p-4 space-y-1 flex-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center p-2.5 rounded-lg text-sm font-medium transition-colors group ${activeTab === item.id
                            ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white'
                            : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200'
                            }`}
                    >
                        <item.icon className="w-5 h-5 lg:mr-3 stroke-[1.5]" />
                        <span className="hidden lg:block">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-zinc-100 dark:border-zinc-900">
                <button
                    onClick={logout}
                    className="w-full flex items-center p-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                >
                    <LogOut className="w-5 h-5 lg:mr-3 stroke-[1.5]" />
                    <span className="hidden lg:block">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
