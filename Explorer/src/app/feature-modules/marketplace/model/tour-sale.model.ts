export interface TourSale {
    id?: number;
    authorId: number;
    name: string;
    startDate: string;
    endDate: string;
    discountPercentage: number;
    tourIds: number[];
}
