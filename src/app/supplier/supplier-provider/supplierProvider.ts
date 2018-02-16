import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from '../../core/provider/coreProvider';
import 'rxjs/Rx';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { ENResult } from '../../core/class/ENResult';
import { SupplierMaintenanceComponent } from '../supplier-maintenance/supplier-maintenance.component'


@Injectable()
export class SupplierProvider {
    constructor(
      public dialog: MatDialog,
      private http: HttpClient,
      private coreProvider: CoreProvider

    ) {}

    searchSupplier(IdSupplier:number) {
      let promise =  new Promise((resolve, reject) => {
        const url = this.coreProvider.getUrlBackEnd() + 'PRSupplier/Search';
        const body = JSON.stringify(
        {
          idSupplier: IdSupplier,  
        });
        const headers = new HttpHeaders().
        set('Content-Type', 'application/json; charset=utf-8');    
        this.http.post<ENResult>(url, body, {headers: headers})
        .toPromise()
        .then(data => {            
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });   
    return promise;   
  }
}