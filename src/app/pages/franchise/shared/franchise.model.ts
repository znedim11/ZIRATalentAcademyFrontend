export class FranchiseCreateRequest {
  name: string;
  outlineText: string;
  information: string;
  aliases: string;
  gamesIds: number;
  
  constructor() {
    this.name= null;
    this.outlineText= null;
    this.information= null;
    this.aliases=null;
    this.gamesIds=null;
  }
}