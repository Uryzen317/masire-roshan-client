import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'panel',
    children: [
      { path: 'forgotPassword', component : ForgotPasswordComponent},
      { path: 'forgotPassword/:token', component : ForgotPasswordComponent},
      { path: 'registeration', component: RegistrationComponent },
      { path: 'registeration/:operation', component: RegistrationComponent },
      { path: '', redirectTo: 'personal-account', pathMatch: 'full' },
      { path: ':operation', component: PanelComponent },
      { path: '*', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {}
