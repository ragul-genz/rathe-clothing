import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  registerUserSession: (newUser: User) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
      const savedUser = localStorage.getItem('radhe_user');
      return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Check local admin credentials or registered users
    const savedUsersStr = localStorage.getItem('rc_users');
    const registeredUsers: User[] = savedUsersStr ? JSON.parse(savedUsersStr) : [];
    
    // Admin check
    if ((email === 'admin@radheclothing.com' || email === 'neelafashion@gmail.com') && (pass === 'admin-radhe' || pass === 'admin-neela')) {
        const adminUser: User = {
            id: '1',
            name: 'Radhe Admin',
            email: email,
            role: 'admin',
            isActive: true
        };
        setUser(adminUser);
        localStorage.setItem('radhe_user', JSON.stringify(adminUser));
        setIsLoading(false);
        return true;
    }

    // Customer check
    const matchedUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matchedUser) {
        setUser(matchedUser);
        localStorage.setItem('radhe_user', JSON.stringify(matchedUser));
        setIsLoading(false);
        return true;
    }

    // Default guest or fallback login for demo purposes
    const demoUser: User = {
        id: String(Date.now()),
        name: email.split('@')[0] || 'Customer',
        email: email,
        role: 'customer',
        isActive: true
    };
    setUser(demoUser);
    localStorage.setItem('radhe_user', JSON.stringify(demoUser));
    setIsLoading(false);
    return true;
  };

  const registerUserSession = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('radhe_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('radhe_user');
    toast.success("Logged out successfully", { icon: '👋', position: 'bottom-center' });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      registerUserSession,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
