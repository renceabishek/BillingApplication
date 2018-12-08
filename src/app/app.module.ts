import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './components/login/login.component';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';

import { ProductService } from './services/product.service';
import { SettingsService } from './services/settings.service';
import { CustomerService } from './services/customer.service';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    LoginComponent,
    DashboardComponent,
    AdminSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    AgGridModule.withComponents([])
  ],
  providers: [CustomerService,ProductService,MessageService,SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
