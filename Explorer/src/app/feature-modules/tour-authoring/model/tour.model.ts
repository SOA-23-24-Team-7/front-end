import { KeyPoint } from "./key-point.model"
import { TourDuration } from "./tourDuration.model"

export interface Tour{
    authorId?: number,
    id?: number,
    name: string,
    description: string,
    difficulty: number,
    tags: string[],
    status?: TourStatus,
    price?: number,
    isDeleted?: boolean,
    distance?: number,
    publishDate?: Date,
    durations?: TourDuration[],
    keyPoints?: KeyPoint[]
}

export enum TourStatus {
    Draft = 0,
    Published = 1,
    Archived = 2
}