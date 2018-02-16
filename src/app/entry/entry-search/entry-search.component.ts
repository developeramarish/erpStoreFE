import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Router } from "@angular/router";
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CoreProvider } from '../../core/provider/coreProvider';
import { Parent } from '../../core/class/Parent';
import { EntryProvider } from '../entry-provider/entryProvider';
import { ENEntry } from '../entry-class/ENEntry';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-entry-search',
  templateUrl: './entry-search.component.html',
  styles: [],
  providers: [CoreProvider, EntryProvider]
})
export class EntrySearchComponent extends Parent implements OnInit {

  listItem: Array<ENEntry> = [];
  dataSource: MatTableDataSource<ENEntry>;
  displayedColumns = ['date','entryType','button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private entryProvider: EntryProvider
  ) 
  { 
    super();
    this.actionView = "ENT001";
    this.actionEdit = "ENT002";
    if (!this.validateSession(this.actionView)){
      this.router.navigate(['/']);
    } 
  }

  ngOnInit() {
    this.buildForm();
    this.getItem();
  }

  applyFilter(filter: string) {
    filter = filter.trim(); 
    filter = filter.toLowerCase();
    this.dataSource.filter = filter;
  }

  getItem(): void{
    this.showProcessing = true;
    this.entryProvider.searchEntry(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENEntry>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    this.router.navigate(['entryMaintenance']); 
    localStorage.setItem("entryOperation", this.operationUpdate);
    localStorage.setItem("idEntry", item.idEntry);
  }

  viewItem(item){
    this.router.navigate(['entryMaintenance']); 
    localStorage.setItem("entryOperation", this.operationView);
    localStorage.setItem("idEntry", item.idEntry);
  }
  
  deleteItem(item){
    this.router.navigate(['entryMaintenance']); 
    localStorage.setItem("entryOperation", this.operationDelete);
    localStorage.setItem("idEntry", item.idEntry);
  }

  addItem() {
    this.router.navigate(['home/entryMaintenance']); 
    localStorage.setItem("entryOperation", this.operationNew);
    localStorage.setItem("idEntry", '0');
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      idEntry: [0],
      idSource: [0],
      entryType: [''],
      date: [''],
    });
  }

}
