import { KeyPoint } from "./key-point.model";

export interface PublicKeyPointRequest {
    id?: number;
    keyPointId: number;
    status: PublicStatus;
    comment?: string;
    keyPoint?: KeyPoint;
    created?: Date;
}

export enum PublicStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
}
