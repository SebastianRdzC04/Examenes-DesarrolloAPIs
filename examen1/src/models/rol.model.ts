export interface RolInterface {
    id: string,
    name: string,
}

export class Rol{
    id: string;
    name: string;

    constructor(rol: RolInterface) {
        this.id = rol.id;
        this.name = rol.name;
    }
}