import { Grade } from "../../formula/shared/grade.model";

export class ReviewCreate {
    title:string;
    text:string;
    totalRating: number;
    formulaId:number;
    gameId:number;
    grades:Grade[];

    constructor() {
        this.title = null;
        this.text = null;
        this.totalRating = null;
        this.formulaId = null;
        this.gameId = null;
        this.grades = [];
    }
}