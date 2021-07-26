import { ImageRequest } from "../../shared/image-request.model";

export class Concept {
    id: number;
    name: string;
    aliases:string;
    information: string;
    outline: string;
    imageUrl: string;
    numberOfGames: string;
    releaseDate: string;
    imageRequest: ImageRequest;
}