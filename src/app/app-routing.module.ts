import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { ShowComponent } from './show/show.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path : '', component : ShowComponent},
  { path : 'login', component : LoginComponent },
  { path : 'registration', component : RegistrationComponent },
  { path : 'hod/dashboard/:id', component : HodDashboardComponent, canActivate: [AuthGuard]},
  { path : 'staff/dashboard/:id', component : StaffDashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
