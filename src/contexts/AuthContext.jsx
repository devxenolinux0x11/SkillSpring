import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const userData = email === 'admin@example.com' ? { email, name: 'Admin', role: 'admin' } : { email, name: 'User' };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (email, password, name) => {
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = { user, login, logout, register, loading };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
