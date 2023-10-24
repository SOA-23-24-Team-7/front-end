import { Time } from "@angular/common";

export interface Rating {
    id?: number;
    grade: number;
    comment: string;
    dateTime: Date;
    userId: number;
}