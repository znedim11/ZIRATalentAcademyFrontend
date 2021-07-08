import { ImageRequest } from "../../shared/image-request.model";

export class CharacterCreate {
    name: string;
    realName: string;
    gender: String;
    dob: String;
    dod: String;
    aliases:string;
    information: string;
    outlineText: string;
    gamesIds: number[];
    imageCreateRequest :ImageRequest;

    constructor() {
        this.name = null;
        this.realName = null;
        this.gender = null;
        this.dob = null;
        this.dod = null;
        this.aliases = null;
        this.information = null;
        this.outlineText = null;
        this.gamesIds = null;
        this.imageCreateRequest = new ImageRequest();
    }
}