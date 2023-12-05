export interface Coupon {
    id?: number;
    code?: string;
    discount: number;
    expirationDate: Date;
    allFromAuthor: boolean;
    tourId?: number;
}