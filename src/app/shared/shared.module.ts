import { NgModule } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AllProductsComponent } from '../products/components/all-products/all-products.component';
import { SelectComponent } from './components/select/select.component';
import { ProductComponent } from '../products/components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../products/components/product-details/product-details.component';
import { MaterialModule } from '../material/material.module';
import { AlertComponent } from './alert/alert.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    AllProductsComponent,
    SelectComponent,
    ProductComponent,
    ProductDetailsComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    HeaderComponent,
    SelectComponent,
    FormsModule,
    AlertComponent,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
