import { ImageRequest } from "../../shared/image-request.model";

export class Game {
    id: number;
    abbriviation: string;
    created : Date;
    createdBy : string;
    dlc: string;
    dlcGameId:number;
    franchiseId: number;
    fullName: string;
    genre: string;
    imageUrl: string;
    information: string;
    modified: Date;
    modifiedBy: string;
    outlineText: string;
    numberOfReleases: number;
    platformAbbreviations: string[];
    platformName: string;
    developer: string;
    publisher: string;
    firstReleaseDate: string;
    imageRequest: ImageRequest;

    constructor() {
        this.imageRequest = new ImageRequest();
    }
}
