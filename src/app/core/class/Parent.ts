import { FormGroup } from "@angular/forms";

export class Parent{
    public showProcessing: Boolean = false;
    public form: FormGroup;
    public operationNew = "NUEVO";
    public operationDelete = "ELIMINAR";
    public operationUpdate = "MODIFICAR";
    public operationView = "VER";
    public disabledEdit: boolean = true;
    public title: string;
    public actionView: string;
    public validateSession(): Boolean{
        //Validar el actionView
        return true;
    }
    
}