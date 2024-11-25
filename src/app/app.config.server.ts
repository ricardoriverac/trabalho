import { provideHttpClient } from '@angular/common/http';

export const config = {
  providers: [
    provideHttpClient(), // Incluindo o HttpClient para configurações do servidor
    { provide: 'SSR_MODE', useValue: true }, // Exemplo de configuração para SSR
  ],
};
