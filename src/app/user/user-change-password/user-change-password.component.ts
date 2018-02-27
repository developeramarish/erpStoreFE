import { Component, OnInit } from '@angular/core';
import { Parent } from '../../core/class/Parent';

@Component({
  selector: 'itcusco-user-change-password',
  templateUrl: './user-change-password.component.html',
  styles: []
})
export class UserChangePasswordComponent extends Parent implements OnInit {

  constructor() 
  { super() }

  ngOnInit() {
  }

}
