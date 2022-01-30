import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user/user.component';
import { AuthGuard } from './helper/auth.guard';
import { Role } from './model/Role';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/admin'
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
