import { User } from "src/app/infrastructure/auth/model/user.model";
import { KeyPoint } from "./key-point.model";

export interface PublicKeyPointRequest {
    id?: number;
    keyPointId: number;
    status: PublicStatus;
    comment?: string;
    keyPoint?: KeyPoint;
    created?: Date;
    authorName: string;
    keyPointName?: string;
    author?: User;
}

export enum PublicStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
}
