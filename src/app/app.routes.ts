import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { InvestFormComponent } from '../components/invest-form/invest-form.component';

export const routes: Routes = [
    {path:'', component:DashboardComponent},
    {path:'invest', component:InvestFormComponent}
];
