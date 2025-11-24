import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import { InventoryProvider } from './context/InventoryContext';
import { AppointmentProvider } from './context/AppointmentContext';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import InventoryForm from './components/InventoryForm';
import InventoryList from './components/InventoryList';
import SplitCalculator from './components/SplitCalculator';
import QuickCalculator from './components/QuickCalculator';
import AppointmentManager from './components/AppointmentManager';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const pageTitles = {
    'dashboard': 'Resumen General',
    'inventory': 'Gestión de Inventario',
    'calculator': 'Herramientas',
    'calendar': 'Agenda de Citas'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50 dark:bg-black">
        <div className="text-zinc-500 dark:text-zinc-400">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <TransactionProvider>
      <InventoryProvider>
        <AppointmentProvider>
          <div className="flex h-screen overflow-hidden">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-zinc-50 dark:bg-black transition-colors duration-300">
              {/* Top Header */}
              <header className="h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 md:px-8 sticky top-0 z-10 transition-colors duration-300">
                <h1 className="text-sm md:text-lg font-medium text-zinc-900 dark:text-white tracking-tight">
                  {pageTitles[activeTab]}
                </h1>

                <div className="flex items-center space-x-4 md:space-x-6">
                  {/* Dark Mode Toggle */}
                  <button onClick={toggleTheme} className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors focus:outline-none">
                    {isDark ? <Sun className="w-5 h-5 stroke-[1.5]" /> : <Moon className="w-5 h-5 stroke-[1.5]" />}
                  </button>

                  <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm ring-2 ring-white dark:ring-zinc-800"></div>
                </div>
              </header>

              {/* Content Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
                <div className="max-w-6xl mx-auto animate-fade-in">
                  {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                      <Dashboard />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TransactionForm />
                        <TransactionList />
                      </div>
                    </div>
                  )}

                  {activeTab === 'inventory' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InventoryForm />
                      <InventoryList />
                    </div>
                  )}

                  {activeTab === 'calendar' && (
                    <AppointmentManager />
                  )}

                  {activeTab === 'calculator' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <QuickCalculator />
                      <SplitCalculator />
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </AppointmentProvider>
      </InventoryProvider>
    </TransactionProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
