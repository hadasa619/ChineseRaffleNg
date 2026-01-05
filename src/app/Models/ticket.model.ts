export interface AddTicketDto {
    giftId: number;
    userId: number;
}

export interface GetTicketDto {
    id: number;
    giftId: number;
    userId: number;
    giftTitle: string;
    userName: string;
}