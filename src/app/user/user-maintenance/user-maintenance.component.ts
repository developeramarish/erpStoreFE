import { Component, OnInit, Inject } from '@angular/core';
import { Parent } from '../../core/class/Parent';
import { CoreProvider } from '../../core/provider/coreProvider';
import {  MatDialogRef, 
          MAT_DIALOG_DATA, 
          MatDialog} from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENUser } from '../user-class/ENUser';
import { ENResult } from '../../core/class/ENResult';
import { StoreMaintenanceComponent } from '../../store/store-maintenance/store-maintenance.component';
import { StoreProvider } from '../../store/store-provider/storeProvider';
import { ENStore } from '../../store/store-class/ENStore';
import { ENProfile } from '../../profile/profile-class/ENProfile';
import { ProfileProvider } from '../../profile/profile-provider/profileProvider';

@Component({
  selector: 'itcusco-user-maintenance',
  templateUrl: './user-maintenance.component.html',
  styles: [],
  providers: [CoreProvider, StoreProvider, ProfileProvider]
})
export class UserMaintenanceComponent extends Parent implements OnInit {
  listStore: Array<ENStore>;
  listProfile: Array<ENProfile>;
  constructor
  (
    public dialogRef: MatDialogRef<UserMaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private coreProvider: CoreProvider,
    private storeProvider: StoreProvider,
    private profileProvider: ProfileProvider,
    public dialog: MatDialog, 
  ) 
  { super() }

  ngOnInit() 
  {
    this.title = this.data["operation"];
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
    this.disabledUpdate();
    Promise.all([
      this.getStore(false),
      this.getProfile(false)
    ]).then(res=>{
      this.showProcessing = false;
    })      
  }
  
  buildForm(): void {
    if (this.data["info"] != null){
      var temp:ENUser= <ENUser>this.data["info"];
      this.form = this.formBuilder.group({
        userName: [{
          value:temp.userName,
          disabled: this.disabledEdit
        },Validators.required],
        idProfile: [{
          value:temp.idProfile,
          disabled: this.disabledEdit
        },Validators.required],
        idStore: [{
          value:temp.idStore,
          disabled: this.disabledEdit
        },Validators.required],
        name: [{
          value:temp.name,
          disabled: this.disabledEdit
        },Validators.required],
        lastname: [{
          value:temp.lastname,
          disabled: this.disabledEdit
        },Validators.required],
        password: [{
          value:temp.password,
          disabled: this.disabledEdit
        }],
      });
    }else{
      this.form = this.formBuilder.group({
        userName: ['',Validators.required],
        idProfile: ['',Validators.required],
        idStore: ['',Validators.required],
        name: ['',Validators.required],
        lastname: ['',Validators.required],
        password: [''],
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
        userName: this.form.value.userName,
        idProfile: this.form.value.idProfile,
        idStore: this.form.value.idStore,
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        password: this.form.value.password
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PRUser/update'; 
        delete info.password;
      }
      else{
        url = this.coreProvider.getUrlBackEnd() + 'PRUser/insert';
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PRUser/delete';    
      body = JSON.stringify({ 
        userName: this.form.value.userName,
      });
      alert(body);    
    }
    const headers = new HttpHeaders().
    set('Content-Type', 'application/json; charset=utf-8');    
    this.http.post<ENResult>(url, body, {headers: headers}).
      subscribe(data => {
        this.showProcessing = false;
        if (data.code == 0)
        {
          this.coreProvider.showMessageOK();
          this.dialogRef.close();
        }
        else { this.coreProvider.showMessageError(data.message); }
      },
      (err) => { this.coreProvider.showMessageErrorUnexpected(); }
    );
  }

  getStore(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.storeProvider.searchStore(0)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listStore = data.result;          
      }else{
        this.coreProvider.showMessageError(data.message);
      }      
    }).catch( error => {
      if(controlProcessing == true){
        this.showProcessing = false;
      }
      this.coreProvider.showMessageErrorUnexpected();
    });
  }

  disabledUpdate() {
    if(this.title == this.operationUpdate){
      this.form.controls['password'].disable(); 
      //this.form.controls['userName'].disable();
    }
  }

  addStore() {
    let dialogRef = this.dialog.open(StoreMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationNew,
        info: null 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getStore(true);
    });
  }

  getProfile(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.profileProvider.search(0)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listProfile = data.result;          
      }else{
        this.coreProvider.showMessageError(data.message);
      }      
    }).catch( error => {
      if(controlProcessing == true){
        this.showProcessing = false;
      }
      this.coreProvider.showMessageErrorUnexpected();
    });
  }
}