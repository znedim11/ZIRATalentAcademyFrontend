export class LinkMapCreate {
    objectAId: number;
    objectAType: string;
    objectsMap: Map<string, number>;

    constructor() {
        this.objectAId = null;
        this.objectAType = null;
        this.objectsMap = new Map<string, number>();
    }
}