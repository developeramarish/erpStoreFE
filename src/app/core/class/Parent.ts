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

    getDateOfStringYMD(strFechaYMD: string): Date {
        var array = strFechaYMD.split('-');
        return new Date(parseInt(array[0]), parseInt(array[1])-1, parseInt(array[2]));
    }

    getDateNowYMD(): string {
        var today = new Date();
        var dd:string = String(today.getDate());
        var mm:string = String(today.getMonth()+1); //January is 0!
        var yyyy:string = String(today.getFullYear());    
        if(dd.length == 1) {
            dd = '0'+dd;
        }     
        if(mm.length == 1) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm + '-' + dd;
      }

      getDateNowDMY(): string {
        var today = new Date();
        var dd:string = String(today.getDate());
        var mm:string = String(today.getMonth()+1); //January is 0!
        var yyyy:string = String(today.getFullYear());    
        if(dd.length == 1) {
            dd = '0'+dd;
        }     
        if(mm.length == 1) {
            mm = '0' + mm;
        }
        return mm + '-' + dd + '-' + yyyy;
      }
}