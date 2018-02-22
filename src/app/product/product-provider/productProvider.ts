import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from '../../core/provider/coreProvider';
import 'rxjs/Rx';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ENResult } from '../../core/class/ENResult';
import { ProductMaintenanceComponent } from '../product-maintenance/product-maintenance.component'


@Injectable()
export class ProductProvider {
    constructor(
      public dialog: MatDialog,
      private http: HttpClient,
      private coreProvider: CoreProvider

    ) {}

  searchProduct(idProduct:number) {
    let promise =  new Promise((resolve, reject) => {
      const url = this.coreProvider.getUrlBackEnd() + 'PRProduct/search';
      const body = JSON.stringify(
      {
        idProduct: idProduct
      });
      const headers = new HttpHeaders().
      set('Content-Type', 'application/json; charset=utf-8');    
      this.http.post<ENResult>(url, body, {headers: headers})
      .toPromise()
      .then(data => { resolve(data); },
            err => { reject(err); }
      );
    });   
    return promise;   
  }

  searchProductById(idProduct:number) {
    let promise =  new Promise((resolve, reject) => {
      const url = this.coreProvider.getUrlBackEnd() + 'PRProduct/searchProductById';
      const body = JSON.stringify(
      {
        idProduct: idProduct
      });
      const headers = new HttpHeaders().
      set('Content-Type', 'application/json; charset=utf-8');    
      this.http.post<ENResult>(url, body, {headers: headers})
      .toPromise()
      .then(data => { resolve(data); },
            err => { reject(err); }
      );
    });   
    return promise;   
  }

  searchProductCategory(idCategory:number) {
    let promise =  new Promise((resolve, reject) => {
      const url = this.coreProvider.getUrlBackEnd() + 'PRProduct/searchCategory';
      const body = JSON.stringify(
      {
        idCategory: idCategory
      });
      const headers = new HttpHeaders().
      set('Content-Type', 'application/json; charset=utf-8');    
      this.http.post<ENResult>(url, body, {headers: headers})
      .toPromise()
      .then(data => { resolve(data); },
            err => { reject(err); }
      );
    });   
    return promise;   
  }

  searchProperty(idProduct:number) {
    let promise =  new Promise((resolve, reject) => {
      const url = this.coreProvider.getUrlBackEnd() + 'PRProductProperty/search';
      const body = JSON.stringify(
      {
        idProduct: idProduct
      });
      const headers = new HttpHeaders().
      set('Content-Type', 'application/json; charset=utf-8');    
      this.http.post<ENResult>(url, body, {headers: headers})
      .toPromise()
      .then(data => { resolve(data); },
            err => { reject(err); }
      );
    });   
    return promise;   
  }
}