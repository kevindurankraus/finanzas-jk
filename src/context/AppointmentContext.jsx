import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AppointmentContext = createContext();

export const useAppointments = () => useContext(AppointmentContext);

const API_URL = 'http://localhost:5000/api';

export const AppointmentProvider = ({ children }) => {
    const { token } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch appointments when user logs in
    useEffect(() => {
        if (token) {
            fetchAppointments();
        } else {
            setAppointments([]);
            setLoading(false);
        }
    }, [token]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`${API_URL}/appointments`, {
                headers: { 'x-auth-token': token }
            });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const addAppointment = async (appointment) => {
        try {
            const response = await axios.post(`${API_URL}/appointments`, appointment, {
                headers: { 'x-auth-token': token }
            });
            setAppointments([...appointments, response.data]);
        } catch (error) {
            console.error('Error adding appointment:', error);
            console.error('Error response:', error.response?.data);
            alert('Error al crear la cita: ' + (error.response?.data?.msg || error.message));
        }
    };

    const deleteAppointment = async (id) => {
        try {
            await axios.delete(`${API_URL}/appointments/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setAppointments(appointments.filter(a => a._id !== id));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const value = {
        appointments,
        loading,
        addAppointment,
        deleteAppointment
    };

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    );
};
