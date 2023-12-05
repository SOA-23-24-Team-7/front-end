export interface SocialEncounter {
    title: string;
    description: string;
    longitude: number;
    latitude: number;
    radius: number;
    xp: number;
    status: EncounterStatus;
    peopleNumber: number;
}
export enum EncounterStatus {
    Active,
    Draft,
    Archived,
}
