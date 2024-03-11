import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageModifUserComponent } from './page-modif-user/page-modif-user.component';
import { PageTableauProduitsComponent } from './page-tableau-produits/page-tableau-produits.component';
import { PageAnalyseMarketComponent } from './page-analyse-market/page-analyse-market.component';

const routes: Routes = [
  { path: '', redirectTo: 'sidenav', pathMatch: 'full' },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'analyseMarket', component: PageAnalyseMarketComponent },
  { path: 'modifUser', component: PageModifUserComponent },
  { path: 'tabProduits', component: PageTableauProduitsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes };  
