import { TourDuration } from "../../tour-authoring/model/tourDuration.model";
import { KeyPoint } from "../../tour-authoring/model/key-point.model";
import { Review } from "./review.model";

export interface TourLimitedView {
    authorId?: number;
    id?: number;
    name: string;
    description: string;
    difficulty: number;
    tags: string[];
    status?: TourStatus;
    price?: number;
    isDeleted?: boolean;
    distance?: number;
    publishDate?: Date;
    durations?: TourDuration[];
    keyPoint?: KeyPoint;
    reviews?: Review[];
}

export enum TourStatus {
    Draft = 0,
    Published = 1,
    Archived = 2,
}
