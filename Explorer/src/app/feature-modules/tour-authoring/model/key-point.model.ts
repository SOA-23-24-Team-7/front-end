export interface KeyPoint {
    id?: number;
    tourId: number;
    name: string;
    description: string;
    longitude: number;
    latitude: number;
    locationAddress?: string;
    imagePath: string;
    order: number;
}
