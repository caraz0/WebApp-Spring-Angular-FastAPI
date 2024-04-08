import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {LoginComponent} from "./pages/login/login.component";
import {MacrodataComponent} from "./pages/macrodata/macrodata.component";
import {IndexComponent} from "./pages/index/index.component";
import {ForexComponent} from "./pages/forex/forex.component";
import {StockComponent} from "./pages/stock/stock.component";
import {PortfolioComponent} from "./pages/portfolio/portfolio.component";
import {CommoditiesComponent} from "./pages/commodities/commodities.component";
import {WatchlistComponent} from "./pages/watchlist/watchlist.component";
import {AuthGuardService} from "./services/auth-guard.service";

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    title: 'Financify',
    pathMatch: 'full'
  },
  {
    path:'signup',
    component: SignupComponent,
    title: 'Financify - Sign Up',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
    title: 'Financify - Login',
    pathMatch: 'full'
  },
  {
    path:'macro',
    component: MacrodataComponent,
    title: 'Financify - Macrodata',
    pathMatch: 'full'
  },
  {
    path:'index',
    component: IndexComponent,
    title: 'Financify - Index',
    pathMatch: 'full'
  },
  {
    path:'forex',
    component: ForexComponent,
    title: 'Financify - Forex',
    pathMatch: 'full'
  },
  {
    path:'stock',
    component: StockComponent,
    title: 'Financify - Stocks',
    pathMatch: 'full'
  },
  {
    path:'commodities',
    component: CommoditiesComponent,
    title: 'Financify - Commodities',
    pathMatch: 'full'
  },
  {
    path:'watchlist',
    component: WatchlistComponent,
    title: 'Financify - Watchlist',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path:'portfolio',
    component: PortfolioComponent,
    title: 'Financify - Portfolio',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }
];
