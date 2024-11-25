import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withFetch(), withInterceptorsFromDi()), // Adiciona suporte ao fetch
      provideRouter(routes),
    ],
  });

export default bootstrap;
