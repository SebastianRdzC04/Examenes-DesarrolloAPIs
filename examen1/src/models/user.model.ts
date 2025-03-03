export interface UserInterface {
    id?: string,
    username: string,
    phone: string,
    password: string,
    is_on: boolean,
    created_at: Date | null,
    role_id?: string
}
