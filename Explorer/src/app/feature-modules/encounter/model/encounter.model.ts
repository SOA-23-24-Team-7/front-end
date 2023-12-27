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
    peopleNumber?: number;
    picture?: string;
    pictureLongitude?: number;
    pictureLatitude?: number;
    challengeDone: boolean;
    instances?: number[];
}

export enum EncounterType {
    Social,
    Hidden,
    Misc,
    KeyPoint,
}
export enum EncounterStatus {
    Active,
    Draft,
    Archieved,
}
