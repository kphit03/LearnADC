import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/auth.guard';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { CoursesComponent } from './features/courses/courses.component';
import { LessonsComponent } from './features/lessons/lessons.component';
import { FaqComponent } from './features/faq.component';
import { ContactComponent } from './features/contact.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    // { path: 'dashboard', component: TestcomponentComponent },

    { path: 'auth/register', component: RegisterComponent },

    // Protected Routes

     { path: 'courses', component: CoursesComponent, canActivate: [authGuard] }, //courses route auth guarded
     { path: 'courses/:courseId/lessons/:lessonId', component: LessonsComponent, canActivate: [authGuard]}, // route to access lessons within a course
     { path: 'faq', component: FaqComponent }, // /faq route
     { path: 'contact', component: ContactComponent},
     { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
    // Fallback route
     { path: '**', redirectTo: 'dashboard' }

];
