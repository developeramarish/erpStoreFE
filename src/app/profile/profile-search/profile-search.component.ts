import { Component, OnInit, ViewChild } from '@angular/core';
import { Parent } from '../../core/class/Parent';
import { CoreProvider } from '../../core/provider/coreProvider';
import { ProfileProvider } from '../profile-provider/profileProvider';
import { ENProfile } from '../profile-class/ENProfile';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-profile-search',
  templateUrl: './profile-search.component.html',
  styles: [],
  providers: [CoreProvider, ProfileProvider]
})
export class ProfileSearchComponent extends Parent implements OnInit {
  listItem: Array<ENProfile> = [];
  dataSource: MatTableDataSource<ENProfile>;
  displayedColumns = ['name','button'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private profileProvider: ProfileProvider
  ) 
  { 
    super() 
    this.actionView = "PRA001";
    this.actionEdit = "PRA002";
    if (!this.validateSession(this.actionView)){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.buildForm();
    this.getItem()
  }

  getItem(): void{
    this.showProcessing = true;
    this.profileProvider.search(0)
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENProfile>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [''],
    });
  }

  addItem() {
    this.router.navigate(['home/profileMaintenance']); 
    localStorage.setItem("profileOperation", this.operationNew);
    localStorage.setItem("profile", "");
  }

  updateItem(item){
    this.router.navigate(['home/profileMaintenance']); 
    localStorage.setItem("profileOperation", this.operationUpdate);
    localStorage.setItem("profile", JSON.stringify(item));
  }

  viewItem(item){
    this.router.navigate(['home/profileMaintenance']); 
    localStorage.setItem("profileOperation", this.operationView);
    localStorage.setItem("profile", JSON.stringify(item));
  }
  
  deleteItem(item){
    this.router.navigate(['home/profileMaintenance']); 
    localStorage.setItem("profileOperation", this.operationDelete);
    localStorage.setItem("profile", JSON.stringify(item));
  }
}
