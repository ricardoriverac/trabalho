import { provideHttpClient } from '@angular/common/http';

export const appConfig = {
  providers: [
    provideHttpClient(), // Incluindo o HttpClient como provedor
  ],
};
