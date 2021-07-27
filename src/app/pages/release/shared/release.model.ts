

export class Release{

    startDate: Date;
    endDate: Date;
    mapOfReleasesByIntervals:Map<string,ReleaseDetail[]>
   
}

export class ReleaseDetail{
    uuid: string;
    releaseDate: string;
    type: string;
    gameId: number;
    gameName: string;
    platformId: number;
    platformName: string;
    regionId: number;
    regionName: string;
    imageUrl: string;
}