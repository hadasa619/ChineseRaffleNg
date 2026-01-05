export interface AddBasketDto {
    userId: number;
    giftId: number;
    quantity: number;
}

export interface UpdateBasketDto {
    quantity: number;
}

export interface GetBasketDto {
    id: number;
    userId: number;
    giftId: number;
    quantity: number;
}