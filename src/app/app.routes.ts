import { Routes } from '@angular/router';
import { App } from './app';
import { Frontend } from './components/frontend/frontend';
import { Backend } from './components/backend/backend';
import { Design } from './components/design/design';
import { Apropos } from './components/apropos/apropos';

export const routes: Routes = [
    {path:'app', component:App},
    {path:'app-frontend', component:Frontend},
    {path:'app-backend', component:Backend},
    {path:'app-design', component:Design},
    {path:'app-apropos', component:Apropos},
    {path:'**', redirectTo:'app', pathMatch:'full'},
    {path:'**', component:App},
];
