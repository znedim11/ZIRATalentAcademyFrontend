import { Grade } from "./grade.model";

export class Formula {
    id: number;
    name: string;
    formula: string;
    grades: string[];
    reviewCount: number;

    constructor(){
        this.id = null;
        this.name = null;
        this.formula = null;
        this.grades = [];
        this.reviewCount = 0;
    }
}