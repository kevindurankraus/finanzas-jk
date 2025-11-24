import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const categories = {
    income: ['Nómina', 'Freelance', 'Regalo', 'Inversión', 'Otros'],
    expense: ['Comida', 'Transporte', 'Vivienda', 'Ocio', 'Compras', 'Salud', 'Educación', 'Otros']
};

const TransactionForm = () => {
    const { addTransaction } = useTransactions();
    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(categories.expense[0]);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !category || !date) return;

        addTransaction({
            type,
            amount: parseFloat(amount),
            category,
            description,
            date
        });

        // Reset form
        setAmount('');
        setDescription('');
        setCategory(type === 'expense' ? categories.expense[0] : categories.income[0]);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
            <h2 className="text-sm font-medium text-zinc-900 dark:text-white mb-6">Nueva Transacción</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Type Toggle */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => { setType('income'); setCategory(categories.income[0]); }}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${type === 'income'
                                ? 'bg-emerald-600 dark:bg-emerald-500 text-white border-transparent'
                                : 'border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                    >
                        Ingreso
                    </button>
                    <button
                        type="button"
                        onClick={() => { setType('expense'); setCategory(categories.expense[0]); }}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${type === 'expense'
                                ? 'bg-rose-600 dark:bg-rose-500 text-white border-transparent'
                                : 'border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                    >
                        Gasto
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Cantidad (€)</label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.01"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Fecha</label>
                        <input
                            type="date"
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Categoría</label>
                        <select
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories[type].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Descripción</label>
                        <input
                            type="text"
                            placeholder="Opcional..."
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all placeholder:text-zinc-400"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg text-sm font-medium transition-all shadow-sm">
                    Añadir {type === 'income' ? 'Ingreso' : 'Gasto'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;
