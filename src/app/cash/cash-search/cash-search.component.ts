import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreProvider } from '../../core/provider/coreProvider';
import { CashProvider } from '../cash-provider/cashProvider';
import { Parent } from '../../core/class/Parent';
import { ENCash } from '../cash-class/ENCash';
import {  MatDialog, 
          MatDialogRef, 
          MatTableDataSource, 
          MatSort, 
          MatPaginator, 
          MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ENResult } from '../../core/class/ENResult';
import { CashMaintenanceComponent } from './../cash-maintenance/cash-maintenance.component' 
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'itcusco-cash-search',
  templateUrl: './cash-search.component.html',
  styles: [],
  providers: [CoreProvider, CashProvider]
})
export class CashSearchComponent extends Parent implements OnInit {

  listItem: Array<ENCash> = [];
  dataSource: MatTableDataSource<ENCash>;
  displayedColumns = ['name', 'button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private cashProvider: CashProvider,
    public dialog: MatDialog) { 
    super();
    this.actionView = "SUP001";
    this.actionEdit = "SUP002";
    
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
    this.cashProvider.searchCash(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENCash>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(CashMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(CashMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(CashMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(CashMaintenanceComponent, {
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
      idCash: [0],
      idStore: [0],
      name: ['']
    });
  }
}
