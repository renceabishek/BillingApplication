import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'product', component: ProductComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'settings', component: AdminSettingsComponent } 
    ]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
