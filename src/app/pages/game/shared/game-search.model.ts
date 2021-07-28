
export class GameSearch {
    name: string;
    genre: string;
    developerId: number;
    publisherId: number;
    releasedBefore: string;
    releasedAfter: string;
    regionIds: number[];
    featureIds: number[];

    constructor(){
        this.name = null;
        this.genre = null;
        this.developerId = null;
        this.publisherId=null;
        this.releasedAfter = null;
        this.releasedBefore = null;
        this.regionIds = [];
        this.featureIds = [];
    }
}
