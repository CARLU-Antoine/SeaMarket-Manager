import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers la page de connexion
  { path: 'login', component: LoginComponent },
  { path: 'sidenav', component: SidenavComponent },
  // Ajoutez d'autres routes au besoin
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes }; // Exportez la variable routes
