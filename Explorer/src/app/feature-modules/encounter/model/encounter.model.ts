export interface Encounter {
    id: number;
    title:string;
    description:string;
    location:string;
    xp:number;
    status:EncounterStatus;
    type: EncounterType;
}
export enum EncounterStatus{
    Active, Draft, Archieved
}
export enum EncounterType{
    Social, Location, Misc
}