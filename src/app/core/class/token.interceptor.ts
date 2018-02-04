import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { ENUser } from '../../login/login-class/ENUser';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    var userName: string = "";
    
    /*if (localStorage.getItem('userInfo') != null && localStorage.getItem('userInfo') != ""){
        userName = (<ENUser>JSON.parse(localStorage.getItem('userInfo'))).userName;
    }*/
    var token: string = "";
    if (localStorage.getItem('token') != null && localStorage.getItem('token') != ""){
        token = localStorage.getItem('token');
    }
    const authReq = req.clone({ headers: req.headers.set("Authorization", "Bearer " + token + " " +  userName)});
    //send the newly created request
    return next.handle(authReq)
    .catch((error, caught) => {
    //intercept the respons error and displace it to the console
    console.log("Error Occurred");
    console.log(error);
    //return the error to the method that called it
    return Observable.throw(error);
}) as any;
}
}