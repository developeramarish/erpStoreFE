import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Router } from "@angular/router";
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BrandMaintenanceComponent } from './../brand-maintenance/brand-maintenance.component' 
import { MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';
import { CoreProvider } from '../../core/provider/coreProvider';
import { Parent } from '../../core/class/Parent';
import { BrandProvider } from '../brand-provider/brandProvider';
import { ENBrand } from '../brand-class/ENBrand';
import { ENResult } from '../../core/class/ENResult';


@Component({
  selector: 'itcusco-brand-search',
  templateUrl: './brand-search.component.html',
  styles: [],
  providers: [CoreProvider, BrandProvider]
})
export class BrandSearchComponent extends Parent implements OnInit {

  listItem: Array<ENBrand> = [];
  dataSource: MatTableDataSource<ENBrand>;
  displayedColumns = ['name', 'button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private brandProvider: BrandProvider,
    public dialog: MatDialog) 
    { 
      super();
      this.actionView = "BRA001";
      this.actionEdit = "BRA002"
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
    this.brandProvider.searchBrand(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENBrand>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(BrandMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(BrandMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationView,
        info: item
      }
    });
  }
  
  deleteItem(item){
    let dialogRef = this.dialog.open(BrandMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(BrandMaintenanceComponent, {
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
