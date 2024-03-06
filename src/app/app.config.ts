import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module'; // Importez les routes depuis app-routing.module

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)] // Utilisez les routes exportées depuis app-routing.module
};
