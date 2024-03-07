import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { PageModifUserComponent } from './page-modif-user/page-modif-user.component';

import { AppComponent } from "./app.component"; 
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatCardModule } from "@angular/material/card"; 
import { MatButtonModule } from "@angular/material/button"; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({ 
imports: 
[BrowserModule, 
FormsModule, 
MatToolbarModule,
MatSidenavModule,
MatIconModule,
MatCardModule, 
MatButtonModule 
], 
declarations: [AppComponent,SidenavComponent], 
bootstrap: [AppComponent], 
schemas: [CUSTOM_ELEMENTS_SCHEMA]
}) 
export class AppModule {}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    PageModifUserComponent
  ]
})
export class AppModule { }
