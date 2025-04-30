import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                if (!token) {
                    setLoading(false);
                    return;
                }

                // Here you could validate the token with an API call if needed
                setIsAuthenticated(true);

                // Retrieve user from localStorage if available
                const userData = localStorage.getItem('user');
                if (userData) {
                    setCurrentUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Token validation error:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);

            if (response.status) {
                const { token, ...userData } = response.message.data;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));

                setToken(token);
                setCurrentUser(userData);
                setIsAuthenticated(true);

                return { success: true };
            } else {
                return { success: false, message: response.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: error.message || 'An error occurred during login' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};