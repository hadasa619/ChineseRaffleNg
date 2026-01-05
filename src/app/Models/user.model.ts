export enum Role {
    Admin = 0, 
    User = 1
}

export interface AddUserDto {
    userName: string;
    password: string;
    email: string;
    phoneNumber: string;
}

export interface UpdateUserDto {
    userName?: string;
    email?: string;
    phoneNumber?: string;
}

export interface GetUserDto {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    role: Role;
}