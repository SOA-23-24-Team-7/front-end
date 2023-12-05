export interface HiddenEncounter {
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    radius: number;
    xp: number;
    status: EncounterStatus;
    picture: string;
    pictureLongitude: number;
    pictureLatitude: number;
}
export enum EncounterStatus {
    Active,
    Draft,
    Archived,
}
