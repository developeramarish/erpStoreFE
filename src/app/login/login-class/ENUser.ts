import { ENUserAction } from './ENUserAction'

export class ENUser{
    userName: string;
    idProfile: number;   
    idStore: number;     
    name: string;                                                                                                 
    lastname: string;                                                                                             
    profileName: string;
    storeName: string; 
    actions: Array<ENUserAction>;
}