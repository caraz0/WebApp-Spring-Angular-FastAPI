import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {LoginComponent} from "./pages/login/login.component";
import {MacrodataComponent} from "./pages/macrodata/macrodata.component";
import {IndexComponent} from "./pages/index/index.component";
import {ForexComponent} from "./pages/forex/forex.component";
import {StockComponent} from "./pages/stock/stock.component";

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path:'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'macro',
    component: MacrodataComponent,
    pathMatch: 'full'
  },
  {
    path:'index',
    component: IndexComponent,
    pathMatch: 'full'
  },
  {
    path:'forex',
    component: ForexComponent,
    pathMatch: 'full'
  },
  {
    path:'stock',
    component: StockComponent,
    pathMatch: 'full'
  }
];
