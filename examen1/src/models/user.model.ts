import {Rol, RolInterface} from "./rol.model";

export interface UserInterface {
    id?: string,
    username: string,
    phone: string,
    password: string,
    is_on: boolean,
    created_at: Date | null,
    role_id: string
}

interface UserInterfaceModel {
    id?: string,
    username: string,
    phone: string,
    password: string,
    is_on: boolean,
    created_at: Date | null,
    role_id: string,
    role?: RolInterface | null
}

export class User{
    id?: string;
    username: string;
    phone: string;
    password: string;
    is_on: boolean;
    created_at: Date | null;
    role?: RolInterface | null;

    constructor(user: UserInterfaceModel) {
        this.id = user.id;
        this.username = user.username;
        this.phone = user.phone;
        this.password = user.password;
        this.is_on = user.is_on;
        this.created_at = user.created_at;
        this.role = user.role;
    }
}
