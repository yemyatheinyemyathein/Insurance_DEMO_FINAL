import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true';
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem('username');
  });

  const login = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
  };

  useEffect(() => {
    console.log('Authentication status changed:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
