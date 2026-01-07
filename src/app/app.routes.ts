import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './Components/Home/home-layout/home-layout.component';
import { GiftsLayoutComponent } from './Components/Gifts/gifts-layout/gifts-layout.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { UpdateGiftComponent } from './Components/Gifts/update-gift/update-gift.component';

export const routes: Routes = 
[{path:'', component:HomeLayoutComponent},
 {path:'login', component:LoginComponent},
 {path:'register', component:RegisterComponent}, 
 {path:'gifts', component:GiftsLayoutComponent},
 {path:'update-gift/:id',component:UpdateGiftComponent}
];
