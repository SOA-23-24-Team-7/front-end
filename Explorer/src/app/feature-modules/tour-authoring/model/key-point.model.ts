import { KeyPointSecret } from "./key-point-secret.model";

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
    haveSecret: boolean;
    secret: KeyPointSecret | null
}
