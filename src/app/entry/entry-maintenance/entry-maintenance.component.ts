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
  listDetailProperty: Array<ENProductProperty> = [];
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
    public dialog: MatDialog,
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
      this.getCategory(false)
    ]).then(res=>{
      this.showProcessing = false;
    })  
  }

  buildForm(): void {
    let temp:ENEntry;
    if (this.title != this.operationNew){
      temp = <ENEntry>JSON.parse(localStorage.getItem("entry"));
    } else {
      temp = new ENEntry();
      temp.idEntry = 0;
      temp.date = new Date();
    }
    this.form = this.formBuilder.group({
      idEntry: [temp.idEntry],
      idStore: [{
        value: temp.idStore,
        disabled: this.disabledEdit
      }],
      idSupplier: [{
        value: temp.idSupplier,
        disabled: this.disabledEdit
      }],      
      entryType: [{
        value: temp.entryType,
        disabled: this.disabledEdit
      }, Validators.required],
      date:[{
        value: temp.date,
        disabled: this.disabledEdit
      }, Validators.required],
      idCategory:[{
        value: null,
        disabled: this.disabledEdit
      }],
      idProduct:[{
        value: null,
        disabled: this.disabledEdit
      }],
      listDetail: this.formBuilder.array([]),
    });
    if (this.title != this.operationNew){
      this.entryProvider.searchEntryDetail(temp.idEntry)
      .then(data  => {          
        this.showProcessing = false;
        if((<ENResult>data).code == 0){
          var listDetail: Array<ENEntryDetail> = <Array<ENEntryDetail>>(<ENResult>data).result;
          alert(JSON.stringify(listDetail));
          const control = <FormArray>this.form.controls['listDetail'];
          for (var i =0; i<listDetail.length; i++){
            let disabledPerishable: Boolean = this.disabledEdit || !listDetail[i].perishable;
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
                name: [{
                  value: listDetail[i].name,
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
                  disabled: disabledPerishable
                }],
                listDetailProperty: this.formBuilder.array([]),
              })
            )
          }
        }
        else{
          this.coreProvider.showMessageError((<ENResult>data).message);
        }   
      });
    }
  }

  save(){    
    var url:string;
    var body;
    if (this.title == this.operationNew || this.title == this.operationUpdate){
      let tempIdSupplier = 0;
      let tempIdStore = 0;
      if (this.form.value.entryType == "compra"){
        tempIdSupplier = this.form.value.idSupplier;
      }else{
        tempIdStore = this.form.value.idStore 
      }
      var info = {
        id: this.form.value.idEntry,
        idStore: tempIdStore,
        idSupplier: tempIdSupplier,
        entryType: this.form.value.entryType,
        date: this.form.value.date,
        listDetail: this.form.value.listDetail     
      };
      if (this.title == this.operationUpdate){
        url = this.coreProvider.getUrlBackEnd() + 'PREntry/update'; 
      }else{
        url = this.coreProvider.getUrlBackEnd() + 'PREntry/insert';   
        delete info.id;
      }  
      body = JSON.stringify(info);
      alert(body);
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
          this.router.navigate(['home/entrySearch']); 
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

  disabledSource() 
  {
    var entryType: string =  this.form.controls['entryType'].value;
    if (entryType == null ){
      this.form.controls['idSupplier'].disable();
      this.form.controls['idStore'].disable(); 
    }
    else{
      if (entryType == 'compra'){
        this.form.controls['idSupplier'].enable();
        this.form.controls['idStore'].disable(); 
        this.form.controls['idSupplier'].setValidators(Validators.required);
        this.form.controls['idStore'].setValue(null);
      }
      if (entryType == 'traslado'){
        this.form.controls['idStore'].enable();
        this.form.controls['idSupplier'].disable();
        this.form.controls['idStore'].setValidators(Validators.required);
        this.form.controls['idSupplier'].setValue(null);
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
    this.showProcessing = true;
    this.productProvider.searchProductById(this.form.value.idProduct)
    .then(<ENResult>(data) =>{
      this.showProcessing = false;  
      if (data.code == 0)
      {
        var tempProduct: ENProduct = (<ENProduct>data.result);
        control.push(this.formBuilder.group({      
          idProduct: [this.form.value.idProduct],
          name: [tempProduct.name],
          quantity:  ['', Validators.required],
          purchasePrice:  ['', Validators.required],
          dueDate:[{ 
            value: null, 
            disabled: this.disabledEdit || !tempProduct.perishable
          }],
          listDetailProperty: this.formBuilder.array([]),
        }));
        this.getProductProperty(this.form.value.idProduct);
      }
      else
      {
        this.coreProvider.showMessageError(data.message);
      }      
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });
  }

  disabledAddProperty(): boolean
  {
    if (this.form.controls['idCategory'].value == null || this.form.controls['idProduct'].value == null)
    {
      return true;
    }
  }

  deleteDetail(index): void
  {
    const control = <FormArray>this.form.controls['listDetail'];         
    //if (control.at(index).get('idProperty').value > 0)
    //{
      //this.listDetailPropertyDelete.push(control.at(index).value);
      control.removeAt(index);
    //}
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
    this.showProcessing = true;
    this.productProvider.searchProperty(idProduct)
    .then(data  => {          
      this.showProcessing = false;
      if((<ENResult>data).code == 0){
        var listDetailProperty: Array<ENProductProperty> = <Array<ENProductProperty>>(<ENResult>data).result;
        const lengthArray = (<FormArray>this.form.controls['listDetail']).length;
        let control = (<FormArray>(<FormArray>this.form.controls['listDetail']).at(lengthArray-1).get('listDetailProperty'));
        for (var i =0; i<listDetailProperty.length; i++){
          control.push(
            this.formBuilder.group({
              idProduct: [{
                value: listDetailProperty[i].idProduct,
                disabled: this.disabledEdit
              }],
              idProperty: [{
                value: listDetailProperty[i].idProperty, 
                disabled: this.disabledEdit
              }],
              name: [{
                value: listDetailProperty[i].name,
                disabled: this.disabledEdit
              }],
              abbreviation: [{
                value: listDetailProperty[i].abbreviation,
                disabled: this.disabledEdit
              }],          
              value: [{
                value: '',
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
  
  back(): void
  {
    this.router.navigate(['home/entrySearch']);
  }
}
