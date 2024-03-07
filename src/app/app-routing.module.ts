import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageModifUserComponent } from './page-modif-user/page-modif-user.component';
import { PageTableauProduitsComponent } from './page-tableau-produits/page-tableau-produits.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection vers la page de connexion
  { path: 'login', component: LoginComponent },
  { path: 'sidenav', component: SidenavComponent },
  // Ajoutez d'autres routes au besoin
  { path: 'modifUser', component: PageModifUserComponent },
  { path: 'tabProduits', component: PageTableauProduitsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes };  
