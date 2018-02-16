import { FormGroup } from "@angular/forms";
import { ENUser } from "../../login/login-class/ENUser";

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
    public actionEdit: string;    
    public validateSession(actionCode: string ): Boolean{
        var flag:boolean= false;        
        var temp: ENUser= (<ENUser>JSON.parse( localStorage.getItem("userInfo")));
        for(var i = 0; i < temp.actions.length; i++)
        {
            if(temp.actions[i].code == actionCode){
                flag = true;
            }
        }
        return flag;
    }
}