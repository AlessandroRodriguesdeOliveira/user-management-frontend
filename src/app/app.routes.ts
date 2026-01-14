import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { UserMain } from './user-main/user-main';

export const routes: Routes = [

    
    {
        path: 'user',
        component: UserMain

    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./admin-main/admin-main').then(c => c.AdminMain)
    },
    {
        path: 'update',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./user-update/user-update').then(c => c.UserUpdate)
    },
    {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'user',
        pathMatch: 'full'
    }
];
