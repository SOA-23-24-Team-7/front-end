export interface Tour{
    authorId?: number,
    id?: number,
    name: string,
    description: string,
    difficulty: number,
    tags:string[],
    status?: TourStatus,
    price?:number,
    isDeleted?:boolean
}

export enum TourStatus {
    Draft = 0,
    Published = 1,
}