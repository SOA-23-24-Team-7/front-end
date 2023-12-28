import { User } from "src/app/infrastructure/auth/model/user.model";
import { Facilities } from "./facilities.model";

export interface PublicFacilityRequest {
    id?: number;
    facilityId: number;
    status: PublicStatus;
    comment?: string;
    facility?: Facilities;
    created?: Date;
    authorName: string;
    facilityName?: string;
    author?: User;
}

export enum PublicStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
}
