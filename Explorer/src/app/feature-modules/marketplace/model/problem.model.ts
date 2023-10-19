import { Time } from "@angular/common";

export interface Problem {
    id?: number;
    category: string;
    priority: string;
    description: string;
    reportedTime: string;
    touristId?: number;
    tourId: number;
}