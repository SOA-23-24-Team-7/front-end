import { EncounterStatus } from "./encounter.model";

export interface KeyPointEncounter {
    title: string;
    description: string;
    radius: number;
    xpReward: number;
    keyPointId: number;
    isRequired: boolean;
    status?: EncounterStatus;
}
