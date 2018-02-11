import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from './../../core/provider/coreProvider';
import { Parent } from  './../../core/class/Parent';
import { Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENBrand } from '../brand-class/ENBrand';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-brand-maintenance',
  templateUrl: './brand-maintenance.component.html',
  styles: [],
  providers: [ CoreProvider ]
})
export class BrandMaintenanceComponent extends Parent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BrandMaintenanceComponent>,
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
      var temp:ENBrand= <ENBrand>this.data["info"];
      this.form = this.formBuilder.group({
        idBrand: [temp.idBrand],
        name: [{
          value: temp.name,
          disabled: this.disabledEdit
        }, Validators.required]
      });
    }else{
      this.form = this.formBuilder.group({
        idBrand: [0],
        name: ['', Validators.required]
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
          id: this.form.value.idBrand,
          name: this.form.value.name
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PRBrand/update'; 
      }else{
        url = this.coreProvider.getUrlBackEnd() + 'PRBrand/insert';    
        delete info.id;
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PRBrand/delete';    
      body = JSON.stringify({ 
        id: this.form.value.idBrand,
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
