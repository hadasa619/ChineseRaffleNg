import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './Components/Home/home-layout/home-layout.component';
import { GiftsLayoutComponent } from './Components/Gifts/gifts-layout/gifts-layout.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { UpdateGiftComponent } from './Components/Gifts/update-gift/update-gift.component';
import { AddGiftComponent } from './Components/Gifts/add-gift/add-gift.component';
import { DonorsLayoutComponent } from './Components/Donors/donors-layout/donors-layout.component';
import { UpdateDonorComponent } from './Components/Donors/update-donor/update-donor.component';
import { AddDonorComponent } from './Components/Donors/add-donor/add-donor.component';
import { TicketsLayoutComponent } from './Components/Tickets/tickets-layout/tickets-layout.component';
import { BasketComponent } from './Components/UserComps/basket/basket.component';

export const routes: Routes = 
[{path:'', component:HomeLayoutComponent},
 {path:'login', component:LoginComponent},
 {path:'register', component:RegisterComponent}, 
 {path:'gifts', component:GiftsLayoutComponent},
 {path:'gifts/update-gift/:id',component:UpdateGiftComponent},
 {path: 'gifts/add-gift', component:AddGiftComponent},
 {path:'donors',component:DonorsLayoutComponent},
 {path:'donors/add-donor', component:AddDonorComponent},
 {path:'donors/update-donor/:id',component:UpdateDonorComponent},
 {path:'tickets', component:TicketsLayoutComponent},
 {path:'basket/myBasket', component:BasketComponent},
 {path:'**', redirectTo:''}
];
