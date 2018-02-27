import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreProvider } from '../../core/provider/coreProvider';
import { ProfileProvider } from '../profile-provider/profileProvider';
import { Parent } from '../../core/class/Parent';
import { ENAction } from '../profile-class/ENAction';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ENResult } from '../../core/class/ENResult';
import { Router } from '@angular/router';
import { ENProfile } from '../profile-class/ENProfile';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'itcusco-profile-maintenance',
  templateUrl: './profile-maintenance.component.html',
  styles: [],
  providers:[CoreProvider, ProfileProvider]
})
export class ProfileMaintenanceComponent extends Parent implements OnInit {
  listAction: Array<ENAction> = [];
  dataSource: MatTableDataSource<ENAction>;
  displayedColumns = ['select','name'];
  selection = new SelectionModel<ENAction>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private coreProvider: CoreProvider,
    private profileProvider: ProfileProvider,
    private router: Router,
  ) 
  { super() }

  ngOnInit() {
    this.title = localStorage.getItem("profileOperation");
    switch (this.title){
      case this.operationDelete:       
        this.disabledEdit= true;
        break;
      case this.operationView:       
        this.disabledEdit= true;
        break;  
      case this.operationNew:  
        this.disabledEdit= false;
        break;
      case this.operationUpdate:  
        this.disabledEdit= false;
        break;
      default: 
        this.disabledEdit= true;
    }
    this.buildForm();
    this.getAction();
  }

  buildForm(): void {
    let temp:ENProfile;
    if (this.title != this.operationNew){
      temp = <ENProfile>JSON.parse(localStorage.getItem("profile"));
    } else {
      temp = new ENProfile();
      temp.idProfile = 0;
    }
    this.form = this.formBuilder.group({
      idProfile: [temp.idProfile],
      name:[{
        value:temp.name,
        disabled: this.disabledEdit }, 
        Validators.required ]
    });
  }
  
  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
        id: this.form.value.idProfile,
        name: this.form.value.name                
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PRProfile/update'; 
      }else{
        url = this.coreProvider.getUrlBackEnd() + 'PRProfile/insert';   
        delete info.id;
      }  
      body = JSON.stringify(info);
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PRProfile/delete';    
      body = JSON.stringify({ 
        id: this.form.value.idProfile,
      });    
    }
    const headers = new HttpHeaders().
    set('Content-Type', 'application/json; charset=utf-8');    
    this.http.post<ENResult>(url, body, {headers: headers}).
    subscribe(data => {
      this.showProcessing = false;
      if (data.code == 0){
        this.coreProvider.showMessageOK();
        this.router.navigate(['home/profileSearch']); 
      }
      else
      { this.coreProvider.showMessageError(data.message); }
    },
    (err) => { this.coreProvider.showMessageErrorUnexpected();}
    );
  }

  getAction(): void{
    this.showProcessing = true;
    this.profileProvider.searchAction("")
    .then(data =>{
      this.showProcessing = false;
      this.listAction = <Array<ENAction>>(<ENResult>data).result;    
      this.dataSource = new MatTableDataSource(this.listAction);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  back(): void
  {
    this.router.navigate(['home/profileSearch']);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
