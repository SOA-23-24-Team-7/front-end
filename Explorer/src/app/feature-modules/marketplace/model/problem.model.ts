import { Time } from "@angular/common";

export interface Problem {
    id?: number;
    category: string;
    priority: string;
    description: string;
    dateTime: Date;
    touristId?: number;
    tourId: number;
    isResolved?: boolean;
}
