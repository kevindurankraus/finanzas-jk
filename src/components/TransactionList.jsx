import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const TransactionList = () => {
    const { transactions, deleteTransaction } = useTransactions();

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    const groupedTransactions = sortedTransactions.reduce((groups, transaction) => {
        const date = transaction.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {});

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Movimientos Recientes</h3>
            </div>
            <div className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
                {Object.keys(groupedTransactions).length === 0 ? (
                    <div className="px-6 py-8 text-center">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">No hay transacciones aún.</p>
                    </div>
                ) : (
                    Object.keys(groupedTransactions).map(date => (
                        <div key={date} className="px-6 py-4">
                            <h4 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3" style={{ textTransform: 'capitalize' }}>
                                {formatDate(date)}
                            </h4>
                            <div className="space-y-2">
                                {groupedTransactions[date].map(t => (
                                    <div key={t._id} className="flex items-center justify-between py-2 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 rounded-lg px-2 -mx-2 transition-colors group">
                                        <div className="flex items-center space-x-4">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${t.type === 'income'
                                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                                }`}>
                                                {t.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.category}</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`text-sm font-medium ${t.type === 'income'
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-zinc-900 dark:text-zinc-300'
                                                }`}>
                                                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                                            </span>
                                            <button
                                                onClick={() => deleteTransaction(t._id)}
                                                className="opacity-0 group-hover:opacity-100 text-xs text-red-600 dark:text-red-400 hover:underline transition-opacity"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TransactionList;
