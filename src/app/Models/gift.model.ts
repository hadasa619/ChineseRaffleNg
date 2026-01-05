import { GetTicketDto } from './ticket.model'; 
import { GetUserDto } from './user.model';     

export interface AddGiftDto {
    title: string;
    categoryId?: number;
    donorId: number;
    ticketPrice: number;
    image?: string;
}

export interface UpdateGiftDto {
    title?: string;
    categoryId?: number;
    donorId?: number;
    ticketPrice?: number;
    image?: string;
    winnerId?: number;
}

export interface GetGiftDto {
    id: number;
    title: string;
    ticketPrice: number;
    categoryId?: number;
    image?: string;
}

export interface GetGiftWithTicketsDto {
    id: number;
    title: string;
    categoryId?: number;
    tickets: GetTicketDto[];
    quantitySold: number;
}

export interface GetGiftWithBuyersDto {
    id: number;
    title: string;
    categoryId?: number;
    buyers: GetUserDto[];
}