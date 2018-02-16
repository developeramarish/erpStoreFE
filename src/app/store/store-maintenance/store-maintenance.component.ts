import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from './../../core/provider/coreProvider';
import { Parent } from  './../../core/class/Parent';
import { Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENStore } from '../store-class/ENStore';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-store-maintenance',
  templateUrl: './store-maintenance.component.html',
  styles: [],
  providers: [ CoreProvider ]
})
export class StoreMaintenanceComponent extends Parent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<StoreMaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private coreProvider: CoreProvider) { 
      super();
    }

  ngOnInit() {
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
  }

  buildForm(): void {
    if (this.data["info"] != null){
      var temp:ENStore= <ENStore>this.data["info"];
      this.form = this.formBuilder.group({
        idStore: [temp.idStore],
        name: [{
          value: temp.name,
          disabled: this.disabledEdit
        }, Validators.required],
        address: [{
          value: temp.address,
          disabled: this.disabledEdit
        }, Validators.required],
        processSale: [{
          value: temp.processSale,
          disabled: this.disabledEdit
        }, Validators.required]
      });
    }else{
      this.form = this.formBuilder.group({
        idStore: [0],
        name: ['', Validators.required],
        address: ['', Validators.required],
        processSale: ['', Validators.required]
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
        id: this.form.value.idStore,
        name: this.form.value.name,
        address: this.form.value.address,
        processSale:this.form.value.processSale
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PRStore/update'; 
      }
      else{
        url = this.coreProvider.getUrlBackEnd() + 'PRStore/insert';    
        delete info.id;
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PRStore/delete';    
      body = JSON.stringify({ 
        id: this.form.value.idStore,
      });    
    }
    const headers = new HttpHeaders().
    set('Content-Type', 'application/json; charset=utf-8');    
    this.http.post<ENResult>(url, body, {headers: headers}).
      subscribe(data => {
        this.showProcessing = false;
        if (data.code == 0){
          this.coreProvider.showMessageOK();
          this.dialogRef.close();
        }else{
          this.coreProvider.showMessageError(data.message);
        }
      },
      (err) => {        
        this.coreProvider.showMessageErrorUnexpected();        
      }
      );
  }
}
