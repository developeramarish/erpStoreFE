import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { CoreProvider } from "./../core/provider/coreProvider";
import { Router } from "@angular/router";
import { ENResult } from './../core/class/ENResult';
import { Parent } from '../core/class/Parent';

@Component({
  selector: 'itcusco-login',
  templateUrl: './login.component.html',
  styles: [],
  providers: [CoreProvider]
})
export class LoginComponent extends Parent implements OnInit {
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private coreProvider: CoreProvider,
    private router: Router) { 
    super();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    //verificar si el usuario y el passwor son correctos
    this.showProcessing = true;
    const url = this.coreProvider.getUrlBackEnd() + 'PRUser/login';
    const body = JSON.stringify(
      {
        userName : this.form.value.userName,
        password: this.form.value.password
      });
    const headers = new HttpHeaders().
    set('Content-Type', 'application/json; charset=utf-8');    
    this.http.post<ENResult>(url, body, {headers: headers}).
      subscribe(data => {
        this.showProcessing = false;
        //var objdata  = JSON.parse(data);interface        
        if (data.code == 0){
          localStorage.setItem('userInfo',JSON.stringify(data.result));
          localStorage.setItem('token',JSON.stringify(data.token));
          this.router.navigate(['/home']); 
        }else{
          this.coreProvider.showMessageError(data.message);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showProcessing = false;
          this.coreProvider.showMessageError("Error inesperado (cliente) consulte con el administrador.");
        } else {
          this.showProcessing = false;
          this.coreProvider.showMessageError("Error inesperado (servidor) consulte con el administrador.");
        }
      }
      );
  }
}
