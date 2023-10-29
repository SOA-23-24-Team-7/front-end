import { PublicStatus } from "./key-point.model";

export interface Facilities {
    id?: number;
    name: string;
    description?: string;
    imagePath?: string;
    authorId?: number;
    category: number;
    longitude: number;
    latitude: number;
    status: PublicStatus;
}
