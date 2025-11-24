import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const InventoryForm = () => {
    const { addItem } = useInventory();
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitType, setUnitType] = useState('kg');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !quantity || !price) return;

        addItem({
            name,
            quantity: parseFloat(quantity),
            unitType,
            price: parseFloat(price)
        });

        // Reset
        setName('');
        setQuantity('');
        setPrice('');
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
            <h2 className="text-sm font-medium text-zinc-900 dark:text-white mb-6">Nuevo Producto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Nombre del Producto</label>
                    <input
                        type="text"
                        placeholder="Ej: Manzanas Fuji"
                        className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all placeholder:text-zinc-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Cantidad</label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            step="0.01"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Unidad</label>
                        <select
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            value={unitType}
                            onChange={(e) => setUnitType(e.target.value)}
                        >
                            <option value="kg">Kg</option>
                            <option value="unit">Unidad</option>
                            <option value="liter">Litro</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Precio por Unidad (€)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        required
                    />
                </div>

                <button type="submit" className="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg text-sm font-medium transition-all shadow-sm">
                    Agregar Producto
                </button>
            </form>
        </div>
    );
};

export default InventoryForm;
