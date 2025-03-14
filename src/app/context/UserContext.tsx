'use client';

import { createContext, useContext, useState, ReactNode } from 'react'

export type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export type UserOmitId = Omit<User, 'id'>


export type UserContextType = {
  user: User | null;
};

type UserProviderProps = {
  children: ReactNode;
}

const UserContext = createContext<UserContextType>(null as unknown as UserContextType);

export const UserProvider = ({ children }: UserProviderProps) => {
  // const [user, setUser] = useState<User | null >(null);
  const [user, setUser] = useState<User>({id: 'abc', firstName: 'Marek', lastName: 'Mostowiak' });

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext)