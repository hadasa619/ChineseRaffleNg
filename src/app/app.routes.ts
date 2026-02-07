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
import { ForbiddenComponent } from './Components/Shared/forbidden/forbidden.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';

export const routes: Routes = 
[{path:'', component:HomeLayoutComponent},
 {path:'login', component:LoginComponent},
 {path:'register', component:RegisterComponent}, 
 {path:'gifts', component:GiftsLayoutComponent},
 {path:'gifts/update-gift/:id',component:UpdateGiftComponent, canActivate: [adminGuard]},
 {path: 'gifts/add-gift', component:AddGiftComponent, canActivate: [adminGuard]},
 {path:'donors',component:DonorsLayoutComponent, canActivate: [adminGuard]},
 {path:'donors/add-donor', component:AddDonorComponent, canActivate: [adminGuard]},
 {path:'donors/update-donor/:id',component:UpdateDonorComponent, canActivate: [adminGuard]},
 {path:'tickets', component:TicketsLayoutComponent, canActivate: [adminGuard]},
 {path:'basket/myBasket', component:BasketComponent, canActivate: [userGuard]},
 {path:'forbidden', component: ForbiddenComponent},
 {path:'**', redirectTo:''}
];
