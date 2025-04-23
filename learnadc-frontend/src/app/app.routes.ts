import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'auth/register', component: RegisterComponent },

    // Protected Routes

    // { path: 'courses', component: CoursesComponent, canActivate: [authGuard] },
    // { path: 'courses/:id/lessons/:lessonId', component: LessonComponent, canActivate: [authGuard] },

    // Fallback route
    // { path: '**', redirectTo: 'dashboard' }

];
