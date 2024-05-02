import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    ConfirmationService,
    ConfirmDialogModule,
    provideToastr({
      timeOut: 3000,
      positionClass:'toast-bottom-right',
      newestOnTop: false,
      preventDuplicates: true
    }),
  ]
};
