import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { TrendingUp, TrendingDown, PackageCheck } from 'lucide-react';

const Dashboard = () => {
    const { getSummary } = useTransactions();
    const { income, expense, balance } = getSummary();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Ingresos (Total)</p>
                        <h3 className="text-2xl font-medium text-emerald-600 dark:text-emerald-500 mt-1 tracking-tight">{formatCurrency(income)}</h3>
                    </div>
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Gastos (Total)</p>
                        <h3 className="text-2xl font-medium text-rose-600 dark:text-rose-500 mt-1 tracking-tight">{formatCurrency(expense)}</h3>
                    </div>
                    <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-lg text-rose-600 dark:text-rose-400">
                        <TrendingDown className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Balance Total</p>
                        <h3 className="text-2xl font-medium text-indigo-600 dark:text-indigo-400 mt-1 tracking-tight">{formatCurrency(balance)}</h3>
                    </div>
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                        <PackageCheck className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
