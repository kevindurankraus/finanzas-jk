import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitchToLogin }) => {
    const { register } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        const result = await register(username, password);

        if (!result.success) {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-50 dark:bg-black transition-opacity duration-500">
            <div className="w-full max-w-sm p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl dark:shadow-none animate-fade-in">
                <div className="h-10 w-10 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center mb-6 shadow-sm mx-auto">
                    <span className="font-semibold text-xl tracking-tighter">F</span>
                </div>

                <h2 className="text-xl font-semibold text-center text-zinc-900 dark:text-white tracking-tight mb-1">Crear cuenta</h2>
                <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mb-8">Regístrate para comenzar</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1">Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:text-white transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg text-sm font-medium transition-all shadow-sm mt-2 disabled:opacity-50"
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={onSwitchToLogin}
                        className="text-sm text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </button>
                </div>

                <p className="mt-6 text-xs text-center text-zinc-400 dark:text-zinc-600">
                    Finanzas JK v1.0
                </p>
            </div>
        </section>
    );
};

export default Register;
