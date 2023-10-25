import { Time } from "@angular/common";

export interface RatingUsername {
    id?: number;
    grade: number;
    comment: string;
    dateTime: Date;
    userId: number;
    userName: string;
}