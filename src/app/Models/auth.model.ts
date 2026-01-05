import { GetUserDto } from './user.model';

export interface LoginRequestDto {
    userName: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
    tokenType: string;
    expiresIn: number;
    user: GetUserDto;
}