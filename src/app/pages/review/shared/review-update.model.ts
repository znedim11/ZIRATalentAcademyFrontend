import { Grade } from "../../formula/shared/grade.model";

export class ReviewUpdate {
    title:string;
    text:string;
    totalRating: number;
    formulaId:number;
    grades:Grade[];

    constructor() {
        this.title = null;
        this.text = null;
        this.totalRating = null;
        this.formulaId = null;
        this.grades = [];
    }
}