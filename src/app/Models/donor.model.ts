import { GetGiftDto } from './gift.model';

export interface AddDonorDto {
    name: string;
    phoneNumber: string;
    email: string;
}

export interface UpdateDonorDto {
    name?: string;
    phoneNumber?: string;
    email?: string;
}

export interface GetDonorDto {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    giftList: GetGiftDto[]; 
}
export interface ShowDonor {
  id: number;
  name: string;
}