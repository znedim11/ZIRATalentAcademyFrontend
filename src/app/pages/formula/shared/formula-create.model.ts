
export class FormulaCreate {
    name: String;
    formula: string;
    grades: string[]

    constructor() {
        this.name = null;
        this.formula = null;
        this.grades = [];
    }
}