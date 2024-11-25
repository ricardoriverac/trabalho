import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()), // Adiciona suporte ao fetch
    provideRouter(routes), // Rotas configuradas
  ],
}).catch((err) => console.error(err));
