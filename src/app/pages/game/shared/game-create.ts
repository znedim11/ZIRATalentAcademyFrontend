import { ImageRequest } from "../../shared/image-request.model";

export class GameCreate {
    fullName: string;
    abbriviation:string;
    outlineText:string;
    franchiseId : number;
    dlc: string;
    parentGameId:number;
    genre:string;
    information: string;
    imageCreateRequest :ImageRequest;

    constructor() {
        this.fullName = null;
        this.abbriviation = null;
        this.outlineText = null;
        this.franchiseId = null;
        this.dlc=null;
        this.parentGameId=null;
        this.genre=null;
        this.information=null;
        this.imageCreateRequest = new ImageRequest();
    }
}