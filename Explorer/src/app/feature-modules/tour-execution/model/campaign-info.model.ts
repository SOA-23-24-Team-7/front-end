import { Equipment } from "../../administration/model/equipment.model";
import { KeyPoint } from "../../tour-authoring/model/key-point.model";

export interface Campaign {
    id: 1;
    name: string;
    description: string;
    distance: number;
    averageDifficulty: number;
    equipments: Equipment[];
    keyPoints: KeyPoint[];
}
