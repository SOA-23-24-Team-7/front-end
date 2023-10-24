export interface Review {
    id?: number;
    rating: number;
    comment: string;
    touristId?: number;
    tourVisitDate: Date;
    commentDate?: Date;
    tourId: number;
    images: Array<string>;
}