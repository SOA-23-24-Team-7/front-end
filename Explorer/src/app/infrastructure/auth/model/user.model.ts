import { TouristProgress } from "./tourist-progress.model";

export interface User {
    id: number;
    username: string;
    role: string;
    profilePicture?: string;
    isActive?: boolean;
    touristProgress?: TouristProgress;
}
