import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from './../../core/provider/coreProvider';
import { Parent } from  './../../core/class/Parent';
import { Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENSupplier } from '../supplier-class/ENSupplier';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-supplier-maintenance',
  templateUrl: './supplier-maintenance.component.html',
  styles: [],
  providers: [ CoreProvider ]
})
export class SupplierMaintenanceComponent extends Parent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SupplierMaintenanceComponent>,
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
      var temp:ENSupplier= <ENSupplier>this.data["info"];
      this.form = this.formBuilder.group({
        idSupplier: [temp.idSupplier],
        name: [{
          value: temp.name,
          disabled: this.disabledEdit
        }, Validators.required],
        documentType: [{
          value: temp.documentType,
          disabled: this.disabledEdit
        }, Validators.required],
        documentNumber: [{
          value: temp.documentNumber,
          disabled: this.disabledEdit
        }, Validators.required],
        address: [{
          value: temp.address,
          disabled: this.disabledEdit
        }],
        phoneNumber: [{
          value: temp.phoneNumber,
          disabled: this.disabledEdit
        }],
        email: [{
          value: temp.email,
          disabled: this.disabledEdit
        }],
        contactPerson: [{
          value: temp.contactPerson,
          disabled: this.disabledEdit
        }]
      });
    }else{
      this.form = this.formBuilder.group({
        idSupplier: [0],
        name: ['', Validators.required],
        documentType: ['', Validators.required],
        documentNumber: ['', Validators.required],
        address: [''],
        phoneNumber: [''],
        email: [''],
        contactPerson: ['']
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
        id: this.form.value.idSupplier,
        name: this.form.value.name,
        documentType: this.form.value.documentType,
        documentNumber: this.form.value.documentNumber,
        address: this.form.value.address,
        phoneNumber: this.form.value.phoneNumber,
        email: this.form.value.email,
        contactPerson: this.form.value.contactPerson
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PRSupplier/update'; 
      }
      else{
        url = this.coreProvider.getUrlBackEnd() + 'PRSupplier/insert';    
        delete info.id;
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PRSupplier/delete';    
      body = JSON.stringify({ 
        id: this.form.value.idSupplier,
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
