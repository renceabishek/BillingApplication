import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';
import { SettingsService } from './services/settings.service';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AgGridModule } from 'ag-grid-angular';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    AdminSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlimLoadingBarModule,
    AgGridModule.withComponents([])
  ],
  providers: [CustomerService,ProductService,SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
