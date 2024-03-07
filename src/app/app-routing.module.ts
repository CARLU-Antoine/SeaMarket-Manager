import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageModifUserComponent } from './page-modif-user/page-modif-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'sidenav', pathMatch: 'full' },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modifUser', component: PageModifUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes };  
