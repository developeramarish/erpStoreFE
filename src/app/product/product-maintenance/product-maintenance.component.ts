import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreProvider } from './../../core/provider/coreProvider';
import { ENProduct } from '../product-class/ENProduct';
import { ENResult } from '../../core/class/ENResult';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Parent } from  './../../core/class/Parent';
import { ENCategory } from '../../category/category-class/ENCategory';
import { CategoryProvider } from '../../category/category-provider/categoryProvider';
import { CategoryMaintenanceComponent } from '../../category/category-maintenance/category-maintenance.component';
import { ENBrand } from '../../brand/brand-class/ENBrand';
import { BrandMaintenanceComponent } from '../../brand/brand-maintenance/brand-maintenance.component';
import { BrandProvider } from '../../brand/brand-provider/brandProvider';
import { UnitMaintenanceComponent } from '../../unit/unit-maintenance/unit-maintenance.component';
import { UnitProvider } from '../../unit/unit-provider/unitProvider';
import { ENUnit } from '../../unit/unit-class/ENUnit';

import { ActivatedRoute, Router } from "@angular/router";
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { ENProductProperty } from '../product-class/ENProductProperty';
import { ProductProvider } from '../product-provider/productProvider';

@Component({
  selector: 'itcusco-product-maintenance',
  templateUrl: './product-maintenance.component.html',
  styles: [],
  providers: [ CoreProvider, CategoryProvider, BrandProvider, UnitProvider, ProductProvider ]
})
export class ProductMaintenanceComponent extends Parent implements OnInit {
  listCategory: Array<ENCategory>;
  listBrand: Array<ENBrand>;
  listUnit: Array<ENUnit>;
  listProperty: Array<ENProductProperty> = [];
  tempDivisibleNumberPart: number;
  tempDivisibleCodeUnit: string; 
  listPropertyDelete: Array<ENProductProperty> = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor
  (
    public dialogRef: MatDialogRef<ProductMaintenanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private coreProvider: CoreProvider,
    private categoryProvider: CategoryProvider,
    private brandProvider: BrandProvider,
    private unitProvider: UnitProvider,
    private productProvider: ProductProvider,
    public dialog: MatDialog 
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
    this.disabledChange();
    this.showProcessing = true;
    Promise.all([
      this.getCategory(false), 
      this.getBrand(false), 
      this.getUnit(false)
    ]).then(res=>{
      this.showProcessing = false;
    }) 
  }
  

  buildForm(): void {
    if (this.data["info"] != null){
      var temp: ENProduct = <ENProduct>this.data["info"];
      this.form = this.formBuilder.group
      ({
        idProduct: [temp.idProduct],
        idCategory: [{
          value: temp.idCategory,
          disabled: this.disabledEdit
        },
          Validators.required],
        idBrand: [{
          value: temp.idBrand,
          disabled: this.disabledEdit
          }, 
          Validators.required
        ],
        codeUnit: 
        [{
          value: temp.codeUnit,
          disabled: this.disabledEdit
          }, 
          Validators.required
        ],
        name: 
        [{
          value: temp.name,
          disabled: this.disabledEdit
        }, 
        Validators.required
        ],
        divisible: [{
          value: temp.divisible, 
          disabled: this.disabledEdit          
        }],
        divisibleCodeUnit: [{
          value: temp.divisibleCodeUnit,
          disabled: this.disabledEdit          
        }],
        divisibleNumberParts: [{
          value: temp.divisibleNumberParts,
          disabled: this.disabledEdit
         }],
        perishable: [{
          value:temp.perishable,
          disabled: this.disabledEdit
        }],
        traceable: [{
          value: temp.traceable,
          disabled: this.disabledEdit
        }],
        barcodeType: [{
          value: temp.barcodeType,
          disabled: this.disabledEdit
        }, Validators.required],
        listProperty: this.formBuilder.array([]),
      });
      this.productProvider.searchProperty(temp.idProduct)
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
        else{
          this.coreProvider.showMessageError((<ENResult>data).message);
        }
        
      })
    }
    else{
      this.form = this.formBuilder.group({
        idProduct: [0],
        idCategory: ['', Validators.required],
        idBrand: ['', Validators.required],
        codeUnit: ['', Validators.required],   
        name: ['', Validators.required],
        divisible: false,
        divisibleCodeUnit: [''],
        divisibleNumberParts: [0],
        perishable: false,
        traceable: false,
        barcodeType: ['', Validators.required],
        listProperty: this.formBuilder.array([])
      });
    }
  }

  save(){    
    this.showProcessing = true;
    var url:string;
    var body;
    if (this.form.value.divisible  == true ){
      this.tempDivisibleCodeUnit =  this.form.value.divisibleCodeUnit;
      this.tempDivisibleNumberPart = this.form.value.divisibleNumberParts;
    }
    else{
      this.tempDivisibleCodeUnit =  '';
      this.tempDivisibleNumberPart = 0;
    }
    if (this.title == this.operationNew || this.title == this.operationUpdate)
    {
      var info = {
        id: this.form.value.idProduct,
        idCategory: this.form.value.idCategory, 
        idBrand: this.form.value.idBrand, 
        codeUnit: this.form.value.codeUnit,
        name: this.form.value.name,
        divisible: this.form.value.divisible,
        divisibleCodeUnit: this.tempDivisibleCodeUnit, 
        divisibleNumberParts: this.tempDivisibleNumberPart, 
        perishable: this.form.value.perishable, 
        traceable: this.form.value.traceable, 
        barcodeType: this.form.value.barcodeType,
        listProperty: this.form.value.listProperty,
        listPropertyDelete: this.listPropertyDelete
      };
      if (this.title == this.operationUpdate)
      {
        url = this.coreProvider.getUrlBackEnd() + 'PRProduct/update'; 
      }
      else
      {
        url = this.coreProvider.getUrlBackEnd() + 'PRProduct/insert'; 
        delete info.id;
        delete info.listPropertyDelete;
      }  
      body = JSON.stringify(info);    
    }
    if (this.title == this.operationDelete)
    {
      url = this.coreProvider.getUrlBackEnd() + 'PRProduct/delete';    
      body = JSON.stringify({ 
        id: this.form.value.idProduct,
      });    
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
      else
      {  
        this.coreProvider.showMessageError(data.message);
      }
      },
      (err) => { 
        this.showProcessing = false;
        this.coreProvider.showMessageErrorUnexpected(); 
      }
    );
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

  addCategory() {
    let dialogRef = this.dialog.open(CategoryMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationNew,
        info: null 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCategory(true);
    });
  }

  disabledChange() {
    var divisible:boolean =  this.form.controls['divisible'].value;
    if (divisible){
      this.form.controls['divisibleNumberParts'].enable();
      this.form.controls['divisibleNumberParts'].setValidators(Validators.required);
      this.form.controls['divisibleCodeUnit'].enable();
      this.form.controls['divisibleCodeUnit'].setValidators(Validators.required); 
    }
    else{
      this.form.controls['divisibleNumberParts'].setValue('0');
      this.form.controls['divisibleNumberParts'].disable();
      this.form.controls['divisibleNumberParts'].setValidators(null);
      this.tempDivisibleNumberPart = null;      
      this.form.controls['divisibleCodeUnit'].setValue(null);
      this.form.controls['divisibleCodeUnit'].disable(); 
      this.form.controls['divisibleCodeUnit'].setValidators(null);
      this.tempDivisibleCodeUnit = null;
    }
  }

  traceableChange() {
    var traceable:boolean =  this.form.controls['traceable'].value;
    if (traceable){
      this.form.controls['barcodeType'].setValue('Generado');
    }
  }

  barcodeTypeChange(){
    var barcode: string = this.form.controls['barcodeType'].value; 
    if(barcode != 'Generado'){
      this.form.controls['traceable'].setValue(false);
    }
  }

  getBrand(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.brandProvider.searchBrand(0)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listBrand = data.result;          
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

  addBrand() {
    let dialogRef = this.dialog.open(BrandMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationNew,
        info: null 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBrand(true);
    });
  }

  getUnit(controlProcessing: boolean): void{
    if(controlProcessing == true){
      this.showProcessing = true;
    }
    this.unitProvider.searchUnit(0)
    .then(<ENResult>(data) =>{
      if(controlProcessing == true){
        this.showProcessing = false;
      }   
      if (data.code == 0){
        this.listUnit = data.result;          
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

  addUnit() {
    let dialogRef = this.dialog.open(UnitMaintenanceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationNew,
        info: null 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUnit(true);
    });
  }

  addRowProperty(): void{
    const control = <FormArray>this.form.controls['listProperty'];
    control.push(this.initProperty());
  }

  initProperty(): FormGroup {
    return this.formBuilder.group({
      idProperty: 0,
      name: ['', Validators.required],
      abbreviation: ['', Validators.required],
      required: false, 
    });
  }

  deleteProperty(index): void
  {
    const control = <FormArray>this.form.controls['listProperty'];         
    if (control.at(index).get('idProperty').value > 0)
    {
      this.listPropertyDelete.push(control.at(index).value);
      control.removeAt(index);
    }
  }
}