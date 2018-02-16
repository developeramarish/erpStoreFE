import { Component, OnInit } from '@angular/core';
import { Parent } from '../class/Parent';
import { Router } from '@angular/router';

@Component({
  selector: 'itcusco-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent extends Parent implements OnInit {

constructor(private router: Router) { 
    super();
  }

  ngOnInit() {
  }

  redirect(new_url){
    switch (new_url) 
    {
    case'/home/saleSearch': 
      localStorage.setItem('saleOperation', '');
      break;  
    case'/home/saleMaintenance': 
      localStorage.setItem('saleOperation', this.operationNew);
      break; 
    case'/home/cashSearch': 
      localStorage.setItem('cashOperation', '');
      break; 
    case'/home/movementCash': 
      localStorage.setItem('movementOperation', this.operationNew);
      break; 
    case'/home/colletSale': 
      localStorage.setItem('colletSaleOperation', this.operationNew);
      break;         
    case'/home/entrySearch': 
      localStorage.setItem('entryOperation', '');
      break;
    case'/home/decreaseSearch': 
      localStorage.setItem('decreaseSearch', '');
      break;       
    case '/home/categorySearch':
      localStorage.setItem('categoryOperation','');
      break;
    case '/home/brandSearch':
      localStorage.setItem('brandOperation','');  
      break;
    case '/home/productSearch':
      localStorage.setItem('productOperation','');  
      break;
    case '/home/supplierSearch':
      localStorage.setItem('supplierOperation','');  
      break;  
    case '/home/storeSearch':
      localStorage.setItem('storeOperation','');  
      break;
    case '/home/unitSearch':
      localStorage.setItem('unitOperation','');  
      break;
    case  '/home/globalParametersMaintenance':
      localStorage.setItem('globalParameterOperation', this.operationUpdate);
      break;
    case'/home/userSearch': 
      localStorage.setItem('userOperation', '');
      break;
    case  '/home/profileSearch':
      localStorage.setItem('profileOperation','');
    break;
    case  '/home/changePasswordMaintenance':
      localStorage.setItem('userOperation',this.operationUpdate);
    break;

    case'': 
      localStorage.clear();
      break; 
    default: 
      alert('Error, no esta contemplado en el menu');
    } 
    this.router.navigate([new_url]);
  }
}