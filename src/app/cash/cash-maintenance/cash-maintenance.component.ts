import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from './../../core/provider/coreProvider';
import { Parent } from  './../../core/class/Parent';
import { Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENCash } from '../cash-class/ENCash';
import { ENResult } from '../../core/class/ENResult';
import { ENStore } from '../../store/store-class/ENStore';
import { StoreProvider } from '../../store/store-provider/storeProvider';
import { StoreMaintenanceComponent } from '../../store/store-maintenance/store-maintenance.component';

@Component({
  selector: 'itcusco-cash-maintenance',
  templateUrl: './cash-maintenance.component.html',
  styles: [],
  providers: [ CoreProvider, StoreProvider ]
})
export class CashMaintenanceComponent extends Parent implements OnInit {
  listStore: Array<ENStore>;
  constructor(
    public dialogRef: MatDialogRef<CashMaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder, 
    private storeProvider: StoreProvider,
    private http: HttpClient, 
    public dialog: MatDialog, 
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
    Promise.all([
      this.getStore(false)
    ]).then(res=>{
      this.showProcessing = false;
    }) 
  }

  buildForm(): void {
    if (this.data["info"] != null){
      var temp:ENCash= <ENCash>this.data["info"];
      this.form = this.formBuilder.group({
        idCash: [temp.idCash],
        idStore: [{
          value: temp.idStore,
          disabled: this.disabledEdit
        }, Validators.required],
        name: [{
          value: temp.name,
          disabled: this.disabledEdit
        }, Validators.required],
      });
    }else{
      this.form = this.formBuilder.group({
        idCash: [0],
        idStore: ['', Validators.required],
        name: ['', Validators.required],
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
        id: this.form.value.idCash,
        idStore: this.form.value.idStore,        
        name: this.form.value.name
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PRCash/update'; 
      }
      else{
        url = this.coreProvider.getUrlBackEnd() + 'PRCash/insert';    
        delete info.id;
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PRCash/delete';    
      body = JSON.stringify({ 
        id: this.form.value.idCash,
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
}
