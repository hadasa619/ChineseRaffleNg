import { GetGiftDto } from './gift.model'; 

export interface AddCategoryDto {
    name: string;
}

export interface UpdateCategoryDto {
    name?: string;
}

export interface GetCategoryDto {
    id: number;
    name: string;
}

export interface GetCategoryWithGiftsDto {
    id: number;
    name: string;
    gifts: GetGiftDto[]; 
}