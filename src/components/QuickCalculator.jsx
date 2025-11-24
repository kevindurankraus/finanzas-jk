import React, { useState, useEffect } from 'react';
import { Scale } from 'lucide-react';
import { useTransactions } from '../context/TransactionContext';

const QuickCalculator = () => {
    const { addTransaction } = useTransactions();
    const [weight, setWeight] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const w = parseFloat(weight) || 0;
        const p = parseFloat(price) || 0;
        setTotal(w * p);
    }, [weight, price]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
    };

    const handleAddIncome = () => {
        if (total > 0) {
            addTransaction({
                type: 'income',
                amount: total,
                category: 'Venta',
                description: `Venta por peso: ${weight}kg x ${formatCurrency(price)}`,
                date: new Date().toISOString().split('T')[0]
            });
            setWeight('');
            setPrice('');
            setTotal(0);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-medium text-zinc-900 dark:text-white">Calculadora de Peso</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Peso (kg/gr)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        step="0.01"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Precio por Kg/Unidad</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">€</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            step="0.01"
                        />
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Total Calculado</span>
                        <span className="text-2xl font-medium text-zinc-900 dark:text-white tracking-tight">{formatCurrency(total)}</span>
                    </div>
                    <button
                        onClick={handleAddIncome}
                        disabled={total <= 0}
                        className="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg text-sm font-medium transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Registrar Venta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickCalculator;
