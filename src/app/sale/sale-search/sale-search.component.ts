import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreProvider } from '../../core/provider/coreProvider';
import { SaleProvider } from '../sale-provider/saleProvider';
import { Parent } from '../../core/class/Parent';
import { ENSale } from '../sale-class/ENSale';
import {  MatTableDataSource, 
          MatPaginator, 
          MatSort, 
          MatDialog,
          MatDialogRef,
          MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ENResult } from '../../core/class/ENResult';
import { SaleMaintenanceComponent } from '../sale-maintenance/sale-maintenance.component';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'itcusco-sale-search',
  templateUrl: './sale-search.component.html',
  styles: [],
  providers: [ CoreProvider, SaleProvider ]
})
export class SaleSearchComponent extends Parent implements OnInit {
  
  listItem: Array<ENSale> = [];
  dataSource: MatTableDataSource<ENSale>;
  displayedColumns = ['documentType','documentNumber','date','status','button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private saleProvider: SaleProvider,
    public dialog: MatDialog
  ) 
  { 
    super();
    this.actionView = "SAL001";
    this.actionEdit = "SAL002";
    
    //valid user and enterprise
    if (!this.validateSession(this.actionView)){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.buildForm();
    this.getItem();
  }

  getItem(): void{
    this.showProcessing = true;
    this.saleProvider.searchSale(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENSale>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(SaleMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(SaleMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(SaleMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(SaleMaintenanceComponent, {
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
      idSale: [0],
      idStore: [0],
      name: ['']
    });
  }
}
