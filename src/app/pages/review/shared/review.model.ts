import { Grade } from "../../formula/shared/grade.model";

export class Review {
    id: number;
    title: string;
    text: string;
    totalRating: number;
    formulaId: number;
    gameId: number;
    grades: Grade[];
    reviewerId: string;
    reviewerName: string;
    numOfReviewesByReviewer: number;
    
    constructor() {
        this.title = null;
        this.text = null;
        this.totalRating = null;
        this.formulaId = null;
        this.gameId = null;
        this.reviewerId = null;
        this.reviewerName = null;
        this.numOfReviewesByReviewer = null;
        this.grades = [];
    }
}