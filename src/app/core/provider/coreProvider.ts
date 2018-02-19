import { Injectable } from '@angular/core';

@Injectable()
export class CoreProvider{
    showMessageError(message: String): void{
        alert( message);
    }

    showMessageErrorUnexpected(): void{
        alert("Se a producido un error inesperado, consulte al administrador");
    }

    showMessage(message: String): void{
        alert(message);
    }

    showMessageOK(): void{
        alert("Se proceso de forma correcta");
    }

    getUrlBackEnd(): string{
        //return 'http://inkavebe.itcusco.com/';
        return 'http://localhost:49903/';
    }

    getUser(): string {
        return "betzabe";
    }
}