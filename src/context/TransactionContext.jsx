import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

const API_URL = 'http://localhost:5000/api';

export const TransactionProvider = ({ children }) => {
    const { token } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch transactions when user logs in
    useEffect(() => {
        if (token) {
            fetchTransactions();
        } else {
            setTransactions([]);
            setLoading(false);
        }
    }, [token]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`${API_URL}/transactions`, {
                headers: { 'x-auth-token': token }
            });
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTransaction = async (transaction) => {
        try {
            const response = await axios.post(`${API_URL}/transactions`, transaction, {
                headers: { 'x-auth-token': token }
            });
            setTransactions([...transactions, response.data]);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`${API_URL}/transactions/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setTransactions(transactions.filter(t => t._id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const getSummary = () => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            income,
            expense,
            balance: income - expense
        };
    };

    const value = {
        transactions,
        loading,
        addTransaction,
        deleteTransaction,
        getSummary
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};
