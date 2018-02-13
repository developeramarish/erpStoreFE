import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Router } from "@angular/router";
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { CoreProvider } from '../../core/provider/coreProvider';
import { Parent } from '../../core/class/Parent';
import { ENResult } from '../../core/class/ENResult';
import { ProductProvider } from '../product-provider/productProvider';
import { ENProduct } from '../product-class/ENProduct';
import { ProductMaintenanceComponent } from '../product-maintenance/product-maintenance.component';
import { ENProductProperty } from '../product-class/ENProductProperty';

@Component({
  selector: 'itcusco-product-search',
  templateUrl: './product-search.component.html',
  styles: [],
  providers: [CoreProvider, ProductProvider]
})
export class ProductSearchComponent extends Parent implements OnInit {
  listItem: Array<ENProduct> = [];
  dataSource: MatTableDataSource<ENProduct>;  
  displayedColumns = ['name','category','brand','codeUnit','button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private productProvider: ProductProvider,
    public dialog: MatDialog
  ) 
  { 
    super();
    this.actionView = "M00004";
    //valid user and enterprise
    if (!this.validateSession()){
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

  addItem() {
    let dialogRef = this.dialog.open(ProductMaintenanceComponent, {
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
      idCategory: [0],
      name: [''],
    });
  }

  deleteItem(item){
    let dialogRef = this.dialog.open(ProductMaintenanceComponent, {
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

  getItem(): void{
    this.showProcessing = true;
    this.productProvider.searchProduct(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENProduct>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(ProductMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(ProductMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationView,
        info: item
      }
    });
  }
}