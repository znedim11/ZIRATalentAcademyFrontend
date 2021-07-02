import { Grade } from "./grade.model";

export class FormulaCreate{
    name:String;
    formula:string;
    grades:Grade[]

    constructor() {
        this.name = null;
        this.formula = null;
        
    }
}