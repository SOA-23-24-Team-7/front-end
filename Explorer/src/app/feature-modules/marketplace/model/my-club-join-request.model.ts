export interface MyClubJoinRequest {
    id: number;
    clubId: number;
    clubName: string;
    requestedAt: Date;
    status: string;
}