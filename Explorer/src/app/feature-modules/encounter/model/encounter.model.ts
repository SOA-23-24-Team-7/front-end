export interface Encounter {
    id: number;
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    radius: number;
    xpReward: number;
    status: EncounterStatus;
    type: EncounterType;
}
export enum EncounterStatus {
    Active,
    Draft,
    Archieved,
}
export enum EncounterType {
    Social,
    Location,
    Misc,
}
