import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),      // Hook up the routes
    ...appConfig.providers      // Load global providers (like Toastr, Interceptors, etc.)
  ]
})
.catch((err) => console.error(err));
