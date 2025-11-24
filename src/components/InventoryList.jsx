import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { useTransactions } from '../context/TransactionContext';
import { Apple, ShoppingCart } from 'lucide-react';

const InventoryList = () => {
    const { inventory, updateStock, deleteItem } = useInventory();
    const { addTransaction } = useTransactions();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    const handleSell = (item) => {
        if (item.quantity >= 1) {
            const newQuantity = item.quantity - 1;
            updateStock(item._id, newQuantity);

            addTransaction({
                type: 'income',
                amount: item.price,
                category: 'Venta',
                description: `Venta: ${item.name}`,
                date: new Date().toISOString().split('T')[0]
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium text-zinc-900 dark:text-white">Inventario</h2>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{inventory.length} productos</span>
            </div>

            {inventory.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">No hay productos en el inventario.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {inventory.map(item => (
                        <div key={item._id} className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="h-12 w-12 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
                                        <Apple className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-medium text-zinc-900 dark:text-white">{item.name}</h4>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{formatCurrency(item.price)} / {item.unitType}</p>
                                    </div>
                                </div>
                                <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full capitalize">
                                    {item.unitType}
                                </span>
                            </div>

                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Stock Disponible</p>
                                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-200">
                                        {item.quantity} {item.unitType}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => deleteItem(item._id)}
                                        className="px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleSell(item)}
                                        disabled={item.quantity < 1}
                                        className="px-3 py-1.5 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Vender 1{item.unitType}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InventoryList;
