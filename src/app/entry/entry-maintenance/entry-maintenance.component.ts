import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from './../../core/provider/coreProvider';
import { Parent } from  './../../core/class/Parent';
import { Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ENEntry } from '../entry-class/ENEntry';
import { ENResult } from '../../core/class/ENResult';
import { Router } from '@angular/router';
import { EntryProvider } from '../entry-provider/entryProvider';
import { ENStore } from '../../store/store-class/ENStore';
import { StoreProvider } from '../../store/store-provider/storeProvider';
import { ENSupplier } from '../../supplier/supplier-class/ENSupplier';
import { SupplierProvider } from '../../supplier/supplier-provider/supplierProvider';
import { SupplierMaintenanceComponent } from '../../supplier/supplier-maintenance/supplier-maintenance.component';
import { StoreMaintenanceComponent } from '../../store/store-maintenance/store-maintenance.component';
import { ENEntryDetail } from '../entry-class/ENEntryDetail';
import { CategoryProvider } from '../../category/category-provider/categoryProvider';
import { ENCategory } from '../../category/category-class/ENCategory';
import { ProductProvider } from '../../product/product-provider/productProvider';
import { ENProduct } from '../../product/product-class/ENProduct';
import { ProductMaintenanceComponent } from '../../product/product-maintenance/product-maintenance.component';
import { ENProductProperty } from '../../product/product-class/ENProductProperty';

@Component({
  selector: 'itcusco-entry-maintenance',
  templateUrl: './entry-maintenance.component.html',
  styles: [],
  providers: [ CoreProvider, EntryProvider, StoreProvider, SupplierProvider, CategoryProvider, ProductProvider ]
})
export class EntryMaintenanceComponent extends Parent implements OnInit {
  listStore: Array<ENStore>;
  listSupplier: Array<ENSupplier>;
  listDetail: Array<ENEntryDetail> = [];
  listProperty: Array<ENProductProperty> = [];
  listCategory: Array<ENCategory>;
  listProduct: Array<ENProduct>;
  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private entryProvider: EntryProvider,
    private storeProvider: StoreProvider,
    private supplierProvider: SupplierProvider,
    private categoryProvider: CategoryProvider,
    private productProvider: ProductProvider,
    public dialog: MatDialog
  ) 
  { 
    super(); 
    this.actionView = "ENT001";
    this.actionEdit = "ENT002";
    if (!this.validateSession(this.actionEdit)){
      this.router.navigate(['/']);
    } 
   }

  ngOnInit() {
    this.title = localStorage.getItem("entryOperation");
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
    this.showProcessing = true;
    this.buildForm();  
    this.disabledSource();

    Promise.all([
      this.getStore(false), 
      this.getSupplier(false),
      this.getCategory(false),
    ]).then(res=>{
      this.showProcessing = false;
    })  
  }

  buildForm(): void {
    if (null != null){
      var temp:ENEntry;//= <ENEntry>this.data["info"];
      this.form = this.formBuilder.group({
        idEntry: [temp.idEntry],
        idSource: [temp.idSource, Validators.required],
        entryType: [{
          value: temp.entryType,
          disabled: this.disabledEdit
        }, Validators.required],
        date:[{
          value: temp.date,
          disabled: this.disabledEdit
        }, Validators.required],
        product: [''],
        listDetail: this.formBuilder.array([]),
      });
      this.entryProvider.searchEntry(temp.idEntry)
      .then(data  => {          
        this.showProcessing = false;
        if((<ENResult>data).code == 0){
          var listDetail: Array<ENEntryDetail> = <Array<ENEntryDetail>>(<ENResult>data).result;
          const control = <FormArray>this.form.controls['listDetail'];
          for (var i =0; i<listDetail.length; i++){
            control.push(
              this.formBuilder.group({
                idEntry: [{
                  value: listDetail[i].idEntry, 
                  disabled: this.disabledEdit
                }],
                idProduct: [{
                  value: listDetail[i].idProduct,
                  disabled: this.disabledEdit
                }],
                quantity: [{
                  value: listDetail[i].quantity,
                  disabled: this.disabledEdit
                }],
                purchasePrice: [{
                  value: listDetail[i].purchasePrice,
                  disabled: this.disabledEdit
                }],          
                dueDate: [{
                  value: listDetail[i].dueDate,
                  disabled: this.disabledEdit
                }],
                listProperty: this.formBuilder.array([]),
              })
            )
          }
        }
        else{
          this.coreProvider.showMessageError((<ENResult>data).message);
        }
        
      });
      
    }else{
      this.form = this.formBuilder.group({
        idEntry: [0],
        idSourceSupplier: ['', Validators.required],
        idSourceStore: ['', Validators.required],        
        entryType: ['', Validators.required],
        date: ['', Validators.required],
        idCategory: ['',Validators.required],
        product: ['',Validators.required],
        listDetail: this.formBuilder.array([]),
        listProperty: this.formBuilder.array([]),
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      var info = {
        id: this.form.value.idEntry,
        idSource: this.form.value.idSource,
        entryType: this.form.value.entryType,
        date: this.form.value.date
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PREntry/update'; 
      }else{
        url = this.coreProvider.getUrlBackEnd() + 'PREntry/insert';    
        delete info.id;
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete){
      url = this.coreProvider.getUrlBackEnd() + 'PREntry/delete';    
      body = JSON.stringify({ 
        id: this.form.value.idEntry,
      });    
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

  getSupplier(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.supplierProvider.searchSupplier(0)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listSupplier = data.result;          
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

  disabledSource() {
    var entryType: string =  this.form.controls['entryType'].value;
    
    if (entryType == '' ){
      this.form.controls['idSourceSupplier'].disable();
      this.form.controls['idSourceStore'].disable(); 
    }
    else{
      if (entryType == 'compra'){
        this.form.controls['idSourceSupplier'].enable();
        this.form.controls['idSourceStore'].disable(); 
        this.form.controls['idSourceSupplier'].setValidators(Validators.required);
        this.form.controls['idSourceStore'].setValue(null);
      }
      if (entryType == 'traslado'){
        this.form.controls['idSourceStore'].enable();
        this.form.controls['idSourceSupplier'].disable();
        this.form.controls['idSourceStore'].setValidators(Validators.required);
        this.form.controls['idSourceSupplier'].setValue(null);
      }
    }
  }

  addSupplier() {
    let dialogRef = this.dialog.open(SupplierMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationNew,
        info: null 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getSupplier(true);
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

  addRowDetail(): void{
    const control = <FormArray>this.form.controls['listDetail'];
    control.push(this.initDetail());
    var product: number = this.form.controls['product'].value;
    this.form.controls['product'].setValue(null);
  }

  initDetail(): FormGroup {
    return this.formBuilder.group({
      idProduct: [{
        value: this.form.value.product,
        disabled: true}, Validators.required],
      quantity:  ['', Validators.required],
      purchasePrice:  ['', Validators.required],
      dueDate:'',
    });    
  }

  deleteDetail(index): void
  {
    const control = <FormArray>this.form.controls['listProperty'];         
    //if (control.at(index).get('idProperty').value > 0)
    //{
      //this.listPropertyDelete.push(control.at(index).value);
      control.removeAt(index);
   // }
  }
  getCategory(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.categoryProvider.searchCategory(0)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listCategory = data.result;          
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
  
  getProduct(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.productProvider.searchProductCategory(this.form.value.idCategory)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listProduct = data.result;          
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

  addProduct() {
    let dialogRef = this.dialog.open(ProductMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationNew,
        info: null 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProduct(true);
    });
  }

  getProductProperty(idProduct: number){
    this.productProvider.searchProperty(idProduct)
    .then(data  => {          
      this.showProcessing = false;
      if((<ENResult>data).code == 0){
        var listProperty: Array<ENProductProperty> = <Array<ENProductProperty>>(<ENResult>data).result;
        const control = <FormArray>this.form.controls['listProperty'];
        for (var i =0; i<listProperty.length; i++){
          control.push(
            this.formBuilder.group({
              idProduct: [{
                value: listProperty[i].idProduct,
                disabled: this.disabledEdit
              }],
              idProperty: [{
                value: listProperty[i].idProperty, 
                disabled: this.disabledEdit
              }],
              name: [{
                value: listProperty[i].name,
                disabled: this.disabledEdit
              }],
              abbreviation: [{
                value: listProperty[i].abbreviation,
                disabled: this.disabledEdit
              }],          
              required: [{
                value: listProperty[i].required,
                disabled: this.disabledEdit
              }]
            })
          )
        }
      }
      else
      {
        this.coreProvider.showMessageError((<ENResult>data).message);
      }
    })
  }
}
