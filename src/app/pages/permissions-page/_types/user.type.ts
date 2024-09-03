import { UserRole } from "./user-role.type"

export interface User {
    id: number,
    name: string,
    password: string,
    phone: string,
    email: string,
    enabled: number,
    created: string,
    lastUpdated: string,
    roles: UserRole[]
}
        