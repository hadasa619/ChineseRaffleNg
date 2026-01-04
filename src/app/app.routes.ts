import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './Components/Home/home-layout/home-layout.component';
import { GiftsLayoutComponent } from './Components/Gifts/gifts-layout/gifts-layout.component';

export const routes: Routes = 
[{path:'', component:HomeLayoutComponent},
{path:'gifts', component:GiftsLayoutComponent}
 
];
