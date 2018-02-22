import { Component, OnInit, Inject } from '@angular/core';
import { Parent } from '../../core/class/Parent';
import { CoreProvider } from '../../core/provider/coreProvider';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ENGlobalParameters } from '../global-parameters-class/ENGlobalParameters';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-global-parameters-maintanance',
  templateUrl: './global-parameters-maintanance.component.html',
  styles: [],
  providers: [ CoreProvider ]
})
export class GlobalParametersMaintananceComponent extends Parent implements OnInit {
  constructor
  (
    public dialogRef: MatDialogRef<GlobalParametersMaintananceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private coreProvider: CoreProvider
  ) 
  { super() }

  ngOnInit() 
  {
    this.title = this.data["operation"];
    switch (this.title){
      case this.operationView:       
        this.disabledEdit= true;
        break;  
      case this.operationUpdate:  
        this.disabledEdit= false;
        break;
      default: 
        this.disabledEdit= true;
    }    
    this.buildForm(); 
  }

  buildForm(): void 
  {
    if (this.data["info"] != null){
      var temp:ENGlobalParameters= <ENGlobalParameters>this.data["info"];
      this.form = this.formBuilder.group({
        IGV:[{
          value:temp.IGV,
          disabled: this.disabledEdit
        }, Validators.required],
        percentageMinWholesalePrice: [{
          value:temp.percentageMinWholesalePrice,
          disabled: this.disabledEdit
        }, Validators.required],       
        percentageMinRetailPrice: [{
          value:temp.percentageMinRetailPrice,
          disabled: this.disabledEdit
        }, Validators.required]
      });
    }
    else
    {
      this.form = this.formBuilder.group({
        IGV: ['', Validators.required],
        percentageMinWholesalePrice: ['', Validators.required],             
        percentageMinRetailPrice: ['', Validators.required] 
      });
    }
  }

  save()
  {    
    var url:string;
    var body;
    if (this.title == this.operationUpdate){
      var info = {  IGV: this.form.value.percentageMinRetailPrice,
                    percentageMinWholesalePrice: this.form.value.percentageMinRetailPrice,
                    percentageMinRetailPrice: this.form.value.percentageMinRetailPrice };
      url = this.coreProvider.getUrlBackEnd() + 'PRGlobalParameters/update'; 
      body = JSON.stringify(info);    
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
        else { this.coreProvider.showMessageError(data.message) } 
      },
      (err) => { this.coreProvider.showMessageErrorUnexpected() }
    );
  }
}