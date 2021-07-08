export class Grade {
    type: string;
    grade: number;

    constructor(...args: any[]) {
        if(args.length == 0){
        this.type = null;
        this.grade = null;}
        else if(args.length == 1){
            this.type = args[0];
            this.grade = null;
        }
        else if(args.length == 2){
            this.type = args[0];
            this.grade = args[1];
        }
    }
}