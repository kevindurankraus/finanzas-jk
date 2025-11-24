import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

const SplitCalculator = () => {
    const [amount, setAmount] = useState('');
    const [people, setPeople] = useState('');
    const [result, setResult] = useState(0);

    useEffect(() => {
        const total = parseFloat(amount) || 0;
        const numPeople = parseInt(people) || 1;
        setResult(numPeople > 0 ? total / numPeople : 0);
    }, [amount, people]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-lg">
                    <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-medium text-zinc-900 dark:text-white">Repartir Gastos</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Monto Total</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">€</span>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full pl-7 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:text-white transition-all"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.01"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Cantidad de Personas</label>
                    <input
                        type="number"
                        placeholder="1"
                        min="1"
                        className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 dark:text-white transition-all"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                    />
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Por Persona</span>
                        <span className="text-2xl font-medium text-zinc-900 dark:text-white tracking-tight">{formatCurrency(result)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplitCalculator;
