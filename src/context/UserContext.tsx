'use client';

import { UserRole } from '@/models/UserRole';
import { useRouter } from 'next/navigation';
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

export type UserContextType = {
  user: User | null;
  users: User[];
  fetchUser: () => Promise<void>;
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
  const router = useRouter();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    console.log('fetchUser', token)
    if (!token) {
      setUser(null);
      return
    }
    const response = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setUser(null);
      return
    }

    const userData = await response.json();
    if (!userData)
      return

    setUser(userData);
  };

  useEffect(() => {
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

  return (
    <UserContext.Provider value={{ user, users, getUser, logout, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
