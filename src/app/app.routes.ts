import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { ChartBasicDemo } from './chart-basic-demo/chart-basic-demo.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path: 'tasks', component: ManageTasksComponent},
    {path:'tasks-details', component: ChartBasicDemo}
];
