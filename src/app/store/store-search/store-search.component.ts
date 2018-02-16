import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Router } from "@angular/router";
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { StoreMaintenanceComponent } from './../store-maintenance/store-maintenance.component' 
import { MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { CoreProvider } from '../../core/provider/coreProvider';
import { Parent } from '../../core/class/Parent';
import { StoreProvider } from '../store-provider/storeProvider';
import { ENStore } from '../store-class/ENStore';
import { ENResult } from '../../core/class/ENResult';


@Component({
  selector: 'itcusco-store-search',
  templateUrl: './store-search.component.html',
  styles: [],
  providers: [CoreProvider, StoreProvider]
})
export class StoreSearchComponent extends Parent implements OnInit {

  listItem: Array<ENStore> = [];
  dataSource: MatTableDataSource<ENStore>;
  displayedColumns = ['name', 'button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private storeProvider: StoreProvider,
    public dialog: MatDialog) { 
    super();
    this.actionView = "STO001";
    this.actionEdit = "STO002";
    
    //valid user and enterprise
    if (!this.validateSession(this.actionView)){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.buildForm();
    this.getItem();
  }

  applyFilter(filter: string) {
    filter = filter.trim(); // Remove whitespace
    filter = filter.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filter;
  }

  getItem(): void{
    this.showProcessing = true;
    this.storeProvider.searchStore(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENStore>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(StoreMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationUpdate,
        info: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItem();
    });
  }

  viewItem(item){
    let dialogRef = this.dialog.open(StoreMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationView,
        info: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  
  deleteItem(item){
    let dialogRef = this.dialog.open(StoreMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationDelete,
        info: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItem();
    });
  }

  addItem() {
    let dialogRef = this.dialog.open(StoreMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationNew,
        info: null 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getItem();
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      idStore: [0],
      name: [''],
      address: [''],
      processSale: ['']
    });
  }
}
