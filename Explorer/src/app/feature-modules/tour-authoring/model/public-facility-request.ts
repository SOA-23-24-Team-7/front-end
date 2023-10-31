import { Facilities } from "./facilities.model";

export interface PublicFacilityRequest {
    id?: number;
    facilityId: number;
    status: PublicStatus;
    comment?: string;
    facility?: Facilities;
}

export enum PublicStatus {
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
}
