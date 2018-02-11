import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from './../../core/provider/coreProvider';
import { Parent } from  './../../core/class/Parent';
import { Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENUnit } from '../unit-class/ENUnit';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-unit-maintenance',
  templateUrl: './unit-maintenance.component.html',
  styles: [],
  providers: [ CoreProvider ]
})
export class UnitMaintenanceComponent extends Parent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UnitMaintenanceComponent>,
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
      var temp:ENUnit= <ENUnit>this.data["info"];
      this.form = this.formBuilder.group({
        codeUnit: [ 
        {
          value: temp.codeUnit,
          disabled: this.disabledEdit
        }, Validators.required],
        name: [{
          value: temp.name,
          disabled: this.disabledEdit
        }, Validators.required]
      });
    }else{
      this.form = this.formBuilder.group({
        codeUnit: ['', Validators.required],
        name: ['', Validators.required]
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
        code: this.form.value.codeUnit,
        name: this.form.value.name
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PRUnit/update'; 
      }
      else
      {
        url = this.coreProvider.getUrlBackEnd() + 'PRUnit/insert';    
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PRUnit/delete';    
      body = JSON.stringify({ 
        code: this.form.value.codeUnit,
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
        }
        else
        {  
          this.coreProvider.showMessageError(data.message);
        }
      },
      (err) => {        
        this.coreProvider.showMessageErrorUnexpected();        
      }
      );
  }
}
