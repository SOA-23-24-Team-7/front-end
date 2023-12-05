export interface Encounter {
    id: number;
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    radius: number;
    xpReward: number;
    status: EncounterStatus;
    peopleNumber?: number;
    pictureURL?: string;
    pictureLongitude?: number;
    pictureLatitude?: number;
}
export enum EncounterStatus {
    Active,
    Draft,
    Archieved,
}
