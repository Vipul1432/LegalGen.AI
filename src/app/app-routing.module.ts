import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ResetPasswordComponent } from './shared/reusableComponents/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './shared/reusableComponents/update-password/update-password.component';
import { ProfileComponent } from './shared/reusableComponents/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
  { path:  '',component:LandingpageComponent},
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'reset-password',component:ResetPasswordComponent
  },
  {
    path:'update-password',component:UpdatePasswordComponent
  },
  {
    path:'profile',component:ProfileComponent
  },
  { path: "dashboard", component:DashboardComponent},
  
  {
    path:'Aichat',component:SearchComponent
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
