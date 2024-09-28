export class Sample {
    guid: string;
    name:string;
    absent_occupied : number;
    owner_occupied: number;
    property_count: number;
    
    constructor(guid: string,name:string,absent_occupied : number,owner_occupied: number,property_count: number){
      this.guid=guid;
      this.name=name;
      this.absent_occupied = absent_occupied;
      this.owner_occupied = owner_occupied;
      this.property_count = property_count;
    }
}
