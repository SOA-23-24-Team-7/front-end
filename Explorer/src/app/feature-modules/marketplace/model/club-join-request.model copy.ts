export interface ClubJoinRequest {
    id: number;
    touristId: number;
    touristName: string;
    requestedAt: Date;
    status: string;
}