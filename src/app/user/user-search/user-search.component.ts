import { Component, OnInit, ViewChild } from '@angular/core';
import { Parent } from '../../core/class/Parent';
import { CoreProvider } from '../../core/provider/coreProvider';
import { UserProvider } from '../user-provider/userProvider';
import { ENUser } from '../user-class/ENUser';
import {  MatTableDataSource, 
          MatPaginator, 
          MatSort, 
          MatDialog} from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ENResult } from '../../core/class/ENResult';
import { UserMaintenanceComponent } from '../user-maintenance/user-maintenance.component';

@Component({
  selector: 'itcusco-user-search',
  templateUrl: './user-search.component.html',
  styles: [],
  providers: [CoreProvider, UserProvider]
})
export class UserSearchComponent extends Parent implements OnInit {
  listItem: Array<ENUser> = [];
  dataSource: MatTableDataSource<ENUser>;
  displayedColumns = ['userName','name','profile','store','button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private userProvider: UserProvider,
    public dialog: MatDialog
  ) 
  { 
    super();
    this.actionView = "USE001";
    this.actionEdit = "USE002";
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
    this.userProvider.search()
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENUser>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(UserMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(UserMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationView,
        info: item
      }
    });
  }
  
  deleteItem(item){
    let dialogRef = this.dialog.open(UserMaintenanceComponent, {
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
    let dialogRef = this.dialog.open(UserMaintenanceComponent, {
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
      userName: [''],
      idProfile: [''],
      idStore: [''],
      name: [''],
      lastname: [''],
      password: [''],
    });
  }
}