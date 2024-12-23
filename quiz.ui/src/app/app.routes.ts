import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'sandbox', component: SandboxComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];
