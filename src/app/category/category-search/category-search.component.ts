import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Router } from "@angular/router";
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { CategoryMaintenanceComponent } from './../category-maintenance/category-maintenance.component' 
import { MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { CoreProvider } from '../../core/provider/coreProvider';
import { Parent } from '../../core/class/Parent';
import { CategoryProvider } from '../category-provider/categoryProvider';
import { ENCategory } from '../category-class/ENCategory';
import { ENResult } from '../../core/class/ENResult';


@Component({
  selector: 'itcusco-category-search',
  templateUrl: './category-search.component.html',
  styles: [],
  providers: [CoreProvider, CategoryProvider]
})
export class CategorySearchComponent extends Parent implements OnInit {

  listItem: Array<ENCategory> = [];
  dataSource: MatTableDataSource<ENCategory>;
  displayedColumns = ['name', 'button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private categoryProvider: CategoryProvider,
    public dialog: MatDialog) { 
    super();
    this.actionView = "CAT001";
    this.actionEdit = "CAT002";    
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
    this.categoryProvider.searchCategory(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENCategory>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(CategoryMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(CategoryMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(CategoryMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(CategoryMaintenanceComponent, {
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
      name: ['']
    });
  }
}
