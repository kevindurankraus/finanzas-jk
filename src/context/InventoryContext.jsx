import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

const API_URL = 'http://localhost:5000/api';

export const InventoryProvider = ({ children }) => {
    const { token } = useAuth();
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch inventory when user logs in
    useEffect(() => {
        if (token) {
            fetchInventory();
        } else {
            setInventory([]);
            setLoading(false);
        }
    }, [token]);

    const fetchInventory = async () => {
        try {
            const response = await axios.get(`${API_URL}/inventory`, {
                headers: { 'x-auth-token': token }
            });
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (item) => {
        try {
            const response = await axios.post(`${API_URL}/inventory`, item, {
                headers: { 'x-auth-token': token }
            });
            setInventory([...inventory, response.data]);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const updateStock = async (id, newQuantity) => {
        try {
            const item = inventory.find(i => i._id === id);
            const response = await axios.put(`${API_URL}/inventory/${id}`,
                { ...item, quantity: newQuantity },
                { headers: { 'x-auth-token': token } }
            );
            setInventory(inventory.map(i => i._id === id ? response.data : i));
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/inventory/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setInventory(inventory.filter(i => i._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const value = {
        inventory,
        loading,
        addItem,
        updateStock,
        deleteItem
    };

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    );
};
