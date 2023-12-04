export interface ShoppingNotification {
    id: number;
    header: string;
    tourId: number;
    touristId: number;
    description: string;
    created: Date;
    hasSeen: boolean;
}