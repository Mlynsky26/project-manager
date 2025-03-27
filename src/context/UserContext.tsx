'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRaw = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
};

export type User = Omit<UserRaw, 'password'>;

export type UserOmitId = Omit<User, 'id'>;

export enum UserRole {
  ADMIN = 'ADMIN',
  DEVOPS = 'DEVOPS',
  DEVELOPER = 'DEVELOPER'
}

export type UserContextType = {
  user: User | null;
  users: User[];
  getUser: (userId: string) => User | null;
  logout: () => void;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType>(null as unknown as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        if (userData) {
          setUser(userData);
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const usersData = await response.json();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const getUser = (userId: string) => users.find(u => u.id === userId) ?? null;

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  console.log(users)

  return (
    <UserContext.Provider value={{ user, users, getUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
