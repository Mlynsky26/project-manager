import { UserRaw } from "@/context/UserContext";
import { UserRole } from "@/models/UserRole";
import bcrypt from "bcryptjs";

export const users: UserRaw[] = [
    {
        id: '1',
        firstName: 'Marek',
        lastName: 'Mostowiak',
        username: 'mmostowiak',
        role: UserRole.ADMIN,
        password: bcrypt.hashSync("haslo", 10)
    },
    {
        id: '2',
        firstName: 'Justyna',
        lastName: 'Mucha',
        username: 'jmucha',
        role: UserRole.DEVELOPER,
        password: bcrypt.hashSync("haslo", 10)
    },
    {
        id: '3',
        firstName: 'Janusz',
        lastName: 'Nowak',
        username: 'jnowak',
        role: UserRole.DEVOPS,
        password: bcrypt.hashSync("haslo", 10)
    },
    {
        id: '4',
        firstName: 'Kamil',
        lastName: 'Kowalski',
        username: 'kkowalski',
        role: UserRole.DEVELOPER,
        password: bcrypt.hashSync("haslo", 10)
    },
];