export interface MiscEncounter {
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    radius: number;
    xp: number;
    status: EncounterStatus;
    //additional fields
}
export enum EncounterStatus {
    Active,
    Draft,
    Archived,
}
