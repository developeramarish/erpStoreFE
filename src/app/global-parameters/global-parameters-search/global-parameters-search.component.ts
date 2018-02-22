import { Component, OnInit } from '@angular/core';
import { Parent } from '../../core/class/Parent';
import { CoreProvider } from '../../core/provider/coreProvider';
import { GlobalParametersProvider } from '../global-parameters-provider/globalParametersProvider';
import { ENGlobalParameters } from '../global-parameters-class/ENGlobalParameters';
import {  MatTableDataSource, 
          MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ENResult } from '../../core/class/ENResult';
import { GlobalParametersMaintananceComponent } from '../global-parameters-maintanance/global-parameters-maintanance.component';

@Component({
  selector: 'itcusco-global-parameters-search',
  templateUrl: './global-parameters-search.component.html',
  styles: [],
  providers: [CoreProvider, GlobalParametersProvider]
})
export class GlobalParametersSearchComponent extends Parent implements OnInit {
  listItem: Array<ENGlobalParameters> = [];
  dataSource: MatTableDataSource<ENGlobalParameters>;
  displayedColumns = ['igv','percentageMinWholesalePrice','percentageMinRetailPrice','button'];

  constructor
  (
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private coreProvider: CoreProvider,
    private globalParametersProvider: GlobalParametersProvider,
    public dialog: MatDialog
  ) 
  { 
    super();
    this.actionView = "GLO001";
    this.actionEdit = "GLO002";
    if (!this.validateSession(this.actionView)){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() 
  {
    this.buildForm();
    this.getItem()
  }

  getItem(): void{
    this.showProcessing = true;
    this.globalParametersProvider.search()
    .then(data =>{
      this.showProcessing = false;
      this.listItem = <Array<ENGlobalParameters>>(<ENResult>data).result;          
      this.dataSource = new MatTableDataSource(this.listItem);
    }).catch( error => {
      this.showProcessing = false;
      this.coreProvider.showMessageErrorUnexpected();
    });        
  }

  updateItem(item){
    let dialogRef = this.dialog.open(GlobalParametersMaintananceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationUpdate,
        info: item
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getItem();
    });
  }

  viewItem(item){
    let dialogRef = this.dialog.open(GlobalParametersMaintananceComponent, {
      width: '80%',
      disableClose: true, 
      data: { 
        operation: this.operationView,
        info: item
      }
    });
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      IGV: [''],
      percentageMinWholesalePrice: [''],             
      percentageMinRetailPrice: ['']
    });
  }
}