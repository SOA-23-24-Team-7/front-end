import { KeyPoint } from "./key-point.model";
import { TourDuration } from "./tourDuration.model";

export interface Tour {
    authorId?: number;
    id?: number;
    name: string;
    description: string;
    difficulty?: number;
    tags?: string[];
    status?: TourStatus;
    price?: number;
    isDeleted?: boolean;
    distance?: number;
    publishDate?: Date;
    durations?: TourDuration[];
    keyPoints?: KeyPoint[];
    averageRating?: number;
    category?: TourCategory;
}

export enum TourStatus {
    Draft = 0,
    Published = 1,
    Archived = 2,
    Ready = 3,
}
export enum TourCategory {
    Adventure = 0,
    FamilyTrips = 1,
    Cruise = 2,
    Cultural = 3,
    Undefined = 4
}