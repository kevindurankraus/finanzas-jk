import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { useInventory } from '../context/InventoryContext';
import { useTransactions } from '../context/TransactionContext';
import { CheckCircle2, Clock, MapPin, Plus } from 'lucide-react';

const AppointmentManager = () => {
    const { appointments, addAppointment, deleteAppointment } = useAppointments();
    const { inventory, updateStock } = useInventory();
    const { addTransaction } = useTransactions();

    // Form State
    const [clientName, setClientName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [selectedProductId, setSelectedProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');

    const handleProductChange = (e) => {
        const id = e.target.value;
        setSelectedProductId(id);

        if (id) {
            const item = inventory.find(i => i._id === id);
            if (item) {
                setProductName(item.name);
                setPrice(item.price);
            }
        } else {
            setProductName('');
            setPrice('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted with:', { clientName, date, productName, selectedProductId });

        if (!clientName || !date) {
            alert('Por favor completa el nombre del cliente y la fecha');
            return;
        }

        if (!productName && !selectedProductId) {
            alert('Por favor selecciona un producto o escribe un servicio');
            return;
        }

        const appointmentData = {
            clientName,
            date,
            location,
            product: productName,
            productId: selectedProductId || undefined,
            price: parseFloat(price) || 0,
            status: 'pending'
        };

        console.log('Sending appointment:', appointmentData);
        addAppointment(appointmentData);

        // Reset
        setClientName('');
        setDate('');
        setLocation('');
        setSelectedProductId('');
        setProductName('');
        setPrice('');
    };

    const handleComplete = (apt) => {
        // 1. Add Transaction
        addTransaction({
            type: 'income',
            amount: apt.price,
            category: 'Servicio/Cita',
            description: `Cita Completada: ${apt.clientName} - ${apt.product}`,
            date: new Date().toISOString().split('T')[0]
        });

        // 2. Deduct Inventory if linked
        if (apt.productId) {
            const item = inventory.find(i => i._id === apt.productId);
            if (item) {
                const decrement = item.unitType === 'kg' ? 1 : 1;
                updateStock(item._id, item.quantity - decrement);
            }
        }

        // 3. Remove Appointment
        deleteAppointment(apt._id);
    };

    const formatDateTime = (dateStr) => {
        return new Date(dateStr).toLocaleString('es-ES', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium text-zinc-900 dark:text-white">Calendario de Citas</h2>
            </div>

            {/* Add Appointment Form */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-4">Nueva Cita</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Nombre del Cliente</label>
                            <input
                                type="text"
                                placeholder="Juan Pérez"
                                className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all placeholder:text-zinc-400"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Fecha y Hora</label>
                            <input
                                type="datetime-local"
                                className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Ubicación</label>
                        <input
                            type="text"
                            placeholder="Oficina Central"
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all placeholder:text-zinc-400"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Producto/Servicio</label>
                            <select
                                className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                                value={selectedProductId}
                                onChange={handleProductChange}
                            >
                                <option value="">-- Seleccionar Producto --</option>
                                {inventory.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name} ({formatCurrency(item.price)})
                                    </option>
                                ))}
                            </select>
                            {!selectedProductId && (
                                <input
                                    type="text"
                                    placeholder="O escribir servicio manual..."
                                    className="mt-2 w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all placeholder:text-zinc-400"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    required={!selectedProductId}
                                />
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">Precio Estimado (€)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                step="0.01"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg text-sm font-medium transition-all shadow-sm">
                        Agendar Cita
                    </button>
                </form>
            </div>

            {/* Appointment List */}
            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-12 text-center">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">No hay citas programadas.</p>
                    </div>
                ) : (
                    appointments.map(apt => (
                        <div key={apt._id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-900 transition-colors">
                            <div className="flex items-start space-x-4">
                                <div className="flex flex-col items-center justify-center h-14 w-14 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700">
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase">
                                        {new Date(apt.date).toLocaleDateString('es-ES', { month: 'short' })}
                                    </span>
                                    <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                                        {new Date(apt.date).getDate()}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{apt.clientName}</h4>
                                    <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mt-1 space-x-3">
                                        <span className="flex items-center">
                                            <Clock className="w-3 h-3 mr-1" /> {formatDateTime(apt.date)}
                                        </span>
                                        <span className="flex items-center">
                                            <MapPin className="w-3 h-3 mr-1" /> {apt.location || 'Sin ubicación'}
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-0.5 rounded font-medium border border-indigo-100 dark:border-indigo-500/20">
                                            {apt.product}
                                        </span>
                                        <span className="ml-2 text-xs font-medium text-zinc-900 dark:text-zinc-200">{formatCurrency(apt.price)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => deleteAppointment(apt._id)}
                                    className="px-3 py-1.5 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleComplete(apt)}
                                    className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg text-xs font-medium transition-all flex items-center justify-center"
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" /> Completar & Cobrar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AppointmentManager;
