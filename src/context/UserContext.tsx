'use client';

import { createContext, useContext, useState, ReactNode } from 'react'

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole
};

export type UserOmitId = Omit<User, 'id'>

export enum UserRole {
  ADMIN = 'ADMIN',
  DEVOPS = 'DEVOPS',
  DEVELOPER = 'DEVELOPER'
}

export type UserContextType = {
  user: User | null;
  users: User[],
  getUser: (userId: string) => User | null 
};

type UserProviderProps = {
  children: ReactNode;
}

const usersMock: User[] = [
  { id: 'abc', firstName: 'Marek', lastName: 'Mostowiak', role: UserRole.ADMIN },
  { id: 'def', firstName: 'Justyna', lastName: 'Mucha', role: UserRole.DEVELOPER },
  { id: 'ghi', firstName: 'Janusz', lastName: 'Nowak', role: UserRole.DEVOPS },
  { id: 'jkl', firstName: 'Kamil', lastName: 'Kowalski', role: UserRole.DEVELOPER },
]

const userMock = usersMock[0]

const UserContext = createContext<UserContextType>(null as unknown as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {
  // const [user, setUser] = useState<User | null >(null);
  const [users, setUsers] = useState<User[]>(usersMock);
  const [user, setUser] = useState<User>(userMock);
  const getUser = (userId: string) => users.find(u => u.id === userId) ?? null

  return (
    <UserContext.Provider value={{ user, users, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)