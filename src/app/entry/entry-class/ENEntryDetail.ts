import { ENEntryDetailProperty } from "./ENEntryDetailProperty";

export class ENEntryDetail 
{
    idEntry: number;
    idEntryDetail: number;
    idProduct: number;
    name: string;
    perishable: boolean;
    quantity: number;
    purchasePrice: number;
    dueDate: Date;
    dueDateYMD: string;
    listDetailProperty: Array<ENEntryDetailProperty>;
}