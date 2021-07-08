import { ImageRequest } from "../../shared/image-request.model";

export class Character{
    id: number;
    name: string;
    realName: string;
    aliases: string;
    dob: string;
    dod: string;
    gender: string;
    information: string;
    outlineText: string;
    imageUrl: string;
    imageRequest: ImageRequest;
}