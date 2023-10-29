export interface KeyPoint {
    id?: number;
    tourId: number;
    name: string;
    description: string;
    longitude: number;
    latitude: number;
    imagePath: string;
    order: number;
    status: PublicStatus;
}

export enum PublicStatus {
    NoNeeded = 0,
    Pending = 1,
    Accepted = 2,
    Rejected = 3,
}
