export interface Tour{
    authorId?: number,
    id?: number,
    name: string,
    description: string,
    difficulty: number,
    tags:string[],
    status?: number,
    price?:number,
    isDeleted?:boolean
}