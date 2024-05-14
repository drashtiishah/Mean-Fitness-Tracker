import { Routes } from '@angular/router';
import { authGuard, loggedinGuard } from './guard/auth.guard';
import { WorkoutAddComponent } from './components/workout-add/workout-add.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: "Home", canActivate: [authGuard] },
    { path: 'workout-add', component: WorkoutAddComponent, title: "Form", canActivate: [authGuard] },
    { path: 'workout-add/:id', component: WorkoutAddComponent, title: "Form", canActivate: [authGuard] },
    { path: 'workout-list', component: WorkoutListComponent, title: "Workout Details", canActivate: [authGuard] },
    { path: "login", component: LoginComponent, title: "Login", canActivate: [loggedinGuard] },
    { path: "register", component: RegisterComponent, title: "Register", canActivate: [loggedinGuard] },
    { path: "**", component: LoginComponent }
];
