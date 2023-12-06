export interface EncounterInstance {
    userId: number;
    status: EncounterInstanceStatus;
    completionTime: Date;
}

export enum EncounterInstanceStatus {
    Active,
    Completed,
}
