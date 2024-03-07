import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"; 
import { BrowserModule } from "@angular/platform-browser"; 
import { FormsModule } from "@angular/forms"; 

import { AppComponent } from "./app.component"; 
import { MatCardModule } from "@angular/material/card"; 
import { MatButtonModule } from "@angular/material/button"; 

@NgModule({ 
imports: 
[BrowserModule, 
FormsModule, 
MatCardModule, 
MatButtonModule 
], 
declarations: [AppComponent], 
bootstrap: [AppComponent], 
schemas: [CUSTOM_ELEMENTS_SCHEMA]
}) 
export class AppModule {}
