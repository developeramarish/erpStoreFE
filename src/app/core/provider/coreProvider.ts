import { Injectable } from '@angular/core';

@Injectable()
export class CoreProvider{
    showMessageError(message: String): void{
        alert(message);
    }

    showMessageErrorUnexpected(): void{
        alert("Se a producido un error inesperado, consulte al administrador");
    }

    showMessage(message: String): void{
        alert(message);
    }

    getUrlBackEnd(): string{
        return 'http://localhost:49903/';
    }
}