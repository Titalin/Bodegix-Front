import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Datos de usuario simulados
  const mockUsers = [
    { email: 'admin@bodegix.com', password: 'admin123', role: 'admin' },
    { email: 'user@bodegix.com', password: 'user123', role: 'user' },
  ];

  const login = (email, password) => {
    const foundUser = mockUsers.find(
      (user) => user.email === email && user.password === password
    );
    
    if (foundUser) {
      setUser({ email: foundUser.email, role: foundUser.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};