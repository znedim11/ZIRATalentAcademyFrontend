import { ImageRequest } from "../../shared/image-request.model";

export class ConceptCreate {
    name: string;
    aliases:string;
    information: string;
    outline: string;
    imageCreateRequest :ImageRequest;

    constructor() {
        this.name = null;
        this.aliases = null;
        this.information = null;
        this.outline = null;
        this.imageCreateRequest = new ImageRequest();
        
    }
}