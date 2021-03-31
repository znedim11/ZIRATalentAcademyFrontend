import { Injectable } from '@angular/core'

@Injectable()
export class FranchiseService {
    getFranchises() {
        return FRANCHISES;
    }

    addOrEditFranchise(franchise){
        console.log(franchise);
    }
}

const FRANCHISES = [
    {name:"Super Mario", created: "22-01-2021", createdBy:"emsta", firstAppearance:"01-02-1981 (Donkey Kong)", outlineText:"It's a me!", games:"Donkey Kong,SMB,...", aliases:"Mario,SMB"},
    {name:"Metroid", created: "22-01-2021", createdBy:"emsta", firstAppearance:"01-06-1984 (Metroid)", outlineText:"Samus Aran shoots thigs", games:"Metroid,Metroid 2,...", aliases:"Metroidvania"},
]