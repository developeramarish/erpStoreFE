import { Component, OnInit, Inject } from '@angular/core';
import { CashProvider } from '../cash-provider/cashProvider';
import { CoreProvider } from '../../core/provider/coreProvider';
import { ENCash } from '../cash-class/ENCash';
import { Parent } from '../../core/class/Parent';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENCashMovement } from '../cash-class/ENCashMovement';
import { ENResult } from '../../core/class/ENResult';

@Component({
  selector: 'itcusco-cash-open-close',
  templateUrl: './cash-open-close.component.html',
  styles: [],
  providers: [ CoreProvider, CashProvider ]
})
export class CashOpenCloseComponent extends Parent implements OnInit {
  listCash: Array<ENCash>;
  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder, 
    private http: HttpClient,     
    private coreProvider: CoreProvider,
    private cashProvider: CashProvider,
    public dialog: MatDialog, 
  ) 
  { super() }

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
    Promise.all([
      this.getCash(false)
    ]).then(res=>{
      this.showProcessing = false;
    }) 
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew){
      var info = {
        id: this.form.value.idMovement,
        idCash: this.form.value.idCash,
        idSale: this.form.value.idSale, 
        date: this.form.value.date,
        movementType: this.form.value.movementType, 
        amount: this.form.value.amount,  
        amountOpening: this.form.value.amountOpening, 
        amountClosing: this.form.value.amountClosing, 
        concept: this.form.value.concept, 
      }
      url = this.coreProvider.getUrlBackEnd() + 'PREntry/insert';    
      delete info.id;
      body = JSON.stringify(info);    
    }
    const headers = new HttpHeaders().
    set('Content-Type', 'application/json; charset=utf-8');    
    this.http.post<ENResult>(url, body, {headers: headers}).
      subscribe(data => {
        this.showProcessing = false;
        if (data.code == 0){
          this.coreProvider.showMessageOK();
        }else{
          this.coreProvider.showMessageError(data.message);
        }
      },
      (err) => {        
        this.coreProvider.showMessageErrorUnexpected();        
      }
      );
  }
  
  buildForm(): void {
    if (null != null){
      var temp:ENCashMovement;
      this.form = this.formBuilder.group({
        idMovement: [temp.idMovement],
        idCash: [{
          value: temp.idCash,
          disabled: this.disabledEdit
        }, Validators.required], 
        idSale: [{
          value: temp.idSale,
          disabled: this.disabledEdit
        }], 
        date: [{
          value: temp.date,
          disabled: this.disabledEdit
        }, Validators.required],  
        movementType: [{
          value: temp.movementType,
          disabled: this.disabledEdit
        }, Validators.required],
        amount: [{
          value: temp.amount,
          disabled: this.disabledEdit
        }, Validators.required], 
        amountOpening: [{
          value: temp.amountOpening,
          disabled: this.disabledEdit
        }], 
        amountClosing: [{
          value: temp.amountClosing,
          disabled: this.disabledEdit
        }], 
        concept: [{
          value: temp.concept,
          disabled: this.disabledEdit
        }, Validators.required],
      });
    }else{
      this.form = this.formBuilder.group({
        idMovement: [0],
        idCash: ['', Validators.required], 
        idSale: [''], 
        date: [new Date(), Validators.required],  
        movementType: ['', Validators.required],
        amount: ['', Validators.required], 
        amountOpening: [''], 
        amountClosing: [''], 
        concept: ['', Validators.required],
      });
    }
  }
  getCash(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.cashProvider.searchCash(0)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listCash = data.result;          
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
